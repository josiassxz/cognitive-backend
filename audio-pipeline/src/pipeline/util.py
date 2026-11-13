"""Utilidades compartilhadas: hashing, escrita atômica, locks e execução de FFmpeg."""
from __future__ import annotations

import contextlib
import hashlib
import json
import os
import subprocess
import tempfile
import time
from pathlib import Path
from typing import Any, Iterator


def sha256_file(path: Path, chunk_size: int = 1 << 20) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        while True:
            block = handle.read(chunk_size)
            if not block:
                break
            digest.update(block)
    return digest.hexdigest()


def sha256_json(value: Any) -> str:
    """Hash estável de uma estrutura JSON (chaves ordenadas, sem espaços)."""
    payload = json.dumps(value, sort_keys=True, ensure_ascii=False, separators=(",", ":"))
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def atomic_write_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp_name = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=path.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as handle:
            handle.write(text)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(tmp_name, path)
    except BaseException:
        with contextlib.suppress(FileNotFoundError):
            os.unlink(tmp_name)
        raise


def atomic_write_json(path: Path, value: Any) -> None:
    atomic_write_text(path, json.dumps(value, ensure_ascii=False, indent=2) + "\n")


def read_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def read_json_or_none(path: Path) -> Any | None:
    try:
        return read_json(path)
    except (FileNotFoundError, json.JSONDecodeError):
        return None


class LockError(RuntimeError):
    pass


def _pid_alive(pid: int) -> bool:
    try:
        os.kill(pid, 0)
    except ProcessLookupError:
        return False
    except PermissionError:
        return True
    return True


@contextlib.contextmanager
def task_lock(lock_path: Path) -> Iterator[None]:
    """Lock exclusivo por tarefa. Locks de processos mortos são retomados."""
    lock_path.parent.mkdir(parents=True, exist_ok=True)
    while True:
        try:
            fd = os.open(lock_path, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
            break
        except FileExistsError:
            holder = None
            with contextlib.suppress(Exception):
                holder = int(lock_path.read_text().split()[0])
            if holder is not None and _pid_alive(holder):
                raise LockError(f"tarefa em uso pelo processo {holder}: {lock_path}")
            with contextlib.suppress(FileNotFoundError):
                lock_path.unlink()
    try:
        os.write(fd, f"{os.getpid()} {int(time.time())}\n".encode())
        os.close(fd)
        yield
    finally:
        with contextlib.suppress(FileNotFoundError):
            lock_path.unlink()


def run(cmd: list[str], timeout: float | None = None) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, capture_output=True, text=True, timeout=timeout, check=False)


def peak_rss_mb() -> float:
    """Pico de memória residente deste processo, em MB (macOS reporta em bytes)."""
    import resource
    import sys

    peak = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    return round(peak / (1024 * 1024) if sys.platform == "darwin" else peak / 1024, 1)


def now_iso() -> str:
    return time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

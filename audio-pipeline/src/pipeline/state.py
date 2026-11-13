"""Estado local dos jobs em SQLite (exportável). Uma linha por (conteúdo, revisão, etapa)."""
from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Any

from .util import now_iso

STAGES = ["probe", "asr", "review", "align", "segment", "translate", "validate", "export"]

_SCHEMA = """
CREATE TABLE IF NOT EXISTS jobs (
  content_key TEXT NOT NULL,
  revision    TEXT NOT NULL,
  stage       TEXT NOT NULL,
  status      TEXT NOT NULL,           -- done | failed | pending | skipped
  attempts    INTEGER NOT NULL DEFAULT 0,
  error       TEXT,
  inputs_hash TEXT,
  metrics     TEXT,
  updated_at  TEXT NOT NULL,
  PRIMARY KEY (content_key, revision, stage)
);
CREATE TABLE IF NOT EXISTS contents (
  content_key   TEXT PRIMARY KEY,
  relative_path TEXT NOT NULL,
  duration_ms   INTEGER,
  status        TEXT NOT NULL,         -- processing | failed | processed | translation_pending | exported
  last_error    TEXT,
  updated_at    TEXT NOT NULL
);
"""


class StateDb:
    def __init__(self, root: Path) -> None:
        root.mkdir(parents=True, exist_ok=True)
        self.path = root / "state.sqlite"
        self._conn = sqlite3.connect(self.path, timeout=30)
        self._conn.executescript(_SCHEMA)
        self._conn.commit()

    def record_stage(
        self, content_key: str, revision: str, stage: str, status: str,
        error: str | None = None, inputs_hash: str | None = None, metrics: dict[str, Any] | None = None,
    ) -> None:
        self._conn.execute(
            """INSERT INTO jobs (content_key, revision, stage, status, attempts, error, inputs_hash, metrics, updated_at)
               VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?)
               ON CONFLICT(content_key, revision, stage) DO UPDATE SET
                 status=excluded.status, attempts=jobs.attempts + 1, error=excluded.error,
                 inputs_hash=excluded.inputs_hash, metrics=excluded.metrics, updated_at=excluded.updated_at""",
            (content_key, revision, stage, status, error, inputs_hash, json.dumps(metrics) if metrics else None, now_iso()),
        )
        self._conn.commit()

    def record_content(self, content_key: str, relative_path: str, duration_ms: int | None, status: str, error: str | None = None) -> None:
        self._conn.execute(
            """INSERT INTO contents (content_key, relative_path, duration_ms, status, last_error, updated_at)
               VALUES (?, ?, ?, ?, ?, ?)
               ON CONFLICT(content_key) DO UPDATE SET relative_path=excluded.relative_path,
                 duration_ms=COALESCE(excluded.duration_ms, contents.duration_ms), status=excluded.status,
                 last_error=excluded.last_error, updated_at=excluded.updated_at""",
            (content_key, relative_path, duration_ms, status, error, now_iso()),
        )
        self._conn.commit()

    def content_status(self, content_key: str) -> str | None:
        row = self._conn.execute("SELECT status FROM contents WHERE content_key = ?", (content_key,)).fetchone()
        return row[0] if row else None

    def export(self) -> dict[str, Any]:
        contents = [
            dict(zip(("contentKey", "relativePath", "durationMs", "status", "lastError", "updatedAt"), row))
            for row in self._conn.execute(
                "SELECT content_key, relative_path, duration_ms, status, last_error, updated_at FROM contents ORDER BY relative_path"
            )
        ]
        jobs = [
            dict(zip(("contentKey", "revision", "stage", "status", "attempts", "error", "updatedAt"), row))
            for row in self._conn.execute(
                "SELECT content_key, revision, stage, status, attempts, error, updated_at FROM jobs ORDER BY content_key, updated_at"
            )
        ]
        return {"contents": contents, "jobs": jobs}

    def close(self) -> None:
        self._conn.close()

#!/bin/bash
# Backup do banco (pg_dump formato custom) + manifesto de checksums da mídia.
#   deploy/scripts/backup.sh /caminho/dos/backups
# Copie a pasta gerada para FORA do servidor (rsync/rclone) — backup no mesmo disco não é backup.
set -euo pipefail
DEST="${1:?informe a pasta de destino}"
mkdir -p "$DEST" && DEST="$(cd "$DEST" && pwd)"   # absoluto antes de mudar de pasta
cd "$(dirname "$0")/.."
set -a; source .env; set +a
STAMP="$(date +%Y%m%d-%H%M%S)"
OUT="$DEST/tunely-$STAMP"
mkdir -p "$OUT"
docker compose -p "${COMPOSE_PROJECT:-tunely}" exec -T db pg_dump -U "${POSTGRES_USER:-tunely}" -d "${POSTGRES_DB:-tunely}" -Fc > "$OUT/db.dump"
# Checksums da mídia: permitem conferir a cópia externa e a restauração.
( cd "$MEDIA_DIR" && find . -type f ! -name '.DS_Store' -print0 | sort -z | xargs -0 shasum -a 256 ) > "$OUT/media.sha256"
# checksum com nome relativo: a conferência roda de dentro da pasta do backup
( cd "$OUT" && shasum -a 256 db.dump > db.dump.sha256 )
echo "backup em $OUT ($(du -sh "$OUT" | cut -f1)); mídia: $(wc -l < "$OUT/media.sha256") arquivos listados"

#!/bin/bash
# Restaura um backup do banco em um banco NOVO e confere a mídia.
#   deploy/scripts/restore.sh /backups/tunely-AAAAMMDD-HHMMSS [nome_do_banco_destino]
# Por segurança nunca sobrescreve o banco em uso: restaura em outro nome; a troca é manual
# (ajuste POSTGRES_DB no .env e recrie a API) depois de conferir.
set -euo pipefail
SRC="$(cd "${1:?informe a pasta do backup}" && pwd)"   # absoluto antes de mudar de pasta
cd "$(dirname "$0")/.."
set -a; source .env; set +a
TARGET="${2:-${POSTGRES_DB:-tunely}_restore}"
( cd "$SRC" && shasum -a 256 -c db.dump.sha256 )
docker compose -p "${COMPOSE_PROJECT:-tunely}" exec -T db createdb -U "${POSTGRES_USER:-tunely}" "$TARGET"
docker compose -p "${COMPOSE_PROJECT:-tunely}" exec -T db pg_restore -U "${POSTGRES_USER:-tunely}" -d "$TARGET" --no-owner < "$SRC/db.dump"
echo "banco restaurado em '$TARGET'. Contagens:"
docker compose -p "${COMPOSE_PROJECT:-tunely}" exec -T db psql -U "${POSTGRES_USER:-tunely}" -d "$TARGET" -tc \
  'select (select count(*) from "User") as users, (select count(*) from "ReadingContent") as contents, (select count(*) from "ReadingSentence") as segments, (select count(*) from "UserSegmentProgress") as checks'
echo "conferindo mídia em ${MEDIA_DIR}…"
( cd "$MEDIA_DIR" && shasum -a 256 -c "$SRC/media.sha256" --quiet ) && echo "mídia íntegra"

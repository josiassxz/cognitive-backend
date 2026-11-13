#!/bin/bash
# Copia a mídia local para o servidor e confere checksums depois da transferência.
#   deploy/scripts/sync-media.sh <pasta_local_da_midia> <usuario@servidor:/srv/tunely/media>
set -euo pipefail
LOCAL="${1:?pasta local (ex.: backup-s3/tunely-nebula-audio)}"
REMOTE="${2:?destino (ex.: deploy@servidor:/srv/tunely/media)}"
HOST="${REMOTE%%:*}"; DIR="${REMOTE#*:}"
MANIFEST="$(mktemp)"
( cd "$LOCAL" && find . -type f ! -name '.DS_Store' ! -name '*.txt' -print0 | sort -z | xargs -0 shasum -a 256 ) > "$MANIFEST"
rsync -a --partial --info=progress2 --exclude '.DS_Store' --exclude '*.txt' --exclude 'healthchecks/' --exclude 'debug/' "$LOCAL"/ "$REMOTE"/
scp -q "$MANIFEST" "$HOST:/tmp/tunely-media.sha256"
# healthchecks/ e debug/ não são enviados: ignora essas linhas na conferência
ssh "$HOST" "cd '$DIR' && grep -v -E ' \./(healthchecks|debug)/' /tmp/tunely-media.sha256 | sha256sum -c --quiet && echo 'checksums conferem no servidor'"
rm -f "$MANIFEST"

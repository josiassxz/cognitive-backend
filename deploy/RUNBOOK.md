# Runbook — publicação e operação

Topologia: uma VPS com Docker Compose rodando **Caddy** (HTTPS automático), **API** (Node)
e **PostgreSQL**; a mídia fica em uma pasta do servidor montada na API. App web, `/api` e
`/media` na mesma origem. O Mac só é necessário para processar novos áudios.

## 0. O que falta decidir (bloqueios reais para a URL pública)

| Decisão | Por quê |
| --- | --- |
| Provedor/VPS nova (≥ 2 vCPU, 4 GB RAM, ≥ 40 GB de disco: 9,2 GB de mídia + banco + folga) | não há servidor; a VPS antiga está fora do escopo e não deve ser reutilizada |
| Domínio e registro DNS A/AAAA apontando para a VPS | o Caddy só emite o certificado TLS com o domínio resolvendo para o servidor |
| Acesso SSH (usuário com Docker) | para enviar código, mídia e subir o compose |
| `ANTHROPIC_API_KEY` + orçamento de tradução | 251 conteúdos estão sem tradução |
| Destino do backup externo (outro servidor/bucket) | backup no mesmo disco não protege contra perda da VPS |

Nada disso foi comprado, criado ou presumido. Não existe URL pública funcionando ainda.

## 1. Primeira publicação

```bash
# no servidor
git clone … && cd projeto            # ou rsync das pastas cognitive-backend, cognitive-mobile/dist e deploy
cd deploy && cp .env.example .env    # preencha domínio, segredos (openssl rand -hex 32) e MEDIA_DIR

# no Mac: build do app web e envio da mídia com conferência de checksums
(cd cognitive-mobile && npm ci && npm run build:web)      # gera dist/ com API relativa (/api)
rsync -a cognitive-mobile/dist/ usuario@servidor:/srv/tunely/web/     # e aponte WEB_DIST no .env
deploy/scripts/sync-media.sh backup-s3/tunely-nebula-audio usuario@servidor:/srv/tunely/media

# no servidor
docker compose up -d --build         # a API aplica as migrações (prisma migrate deploy) ao subir
docker compose ps                    # api e db "healthy"
curl -fsS https://SEU_DOMINIO/health
```

Criar o primeiro admin: cadastre-se pelo app com um e-mail listado em `ADMIN_EMAILS`.

Importar conteúdo processado (do Mac, sem expor nada anônimo):

```bash
cd audio-pipeline
export PIPELINE_API_URL=https://SEU_DOMINIO/api/admin PIPELINE_IMPORT_TOKEN=<IMPORT_API_TOKEN do servidor>
uv run pipeline import --package pilot/sha256-….import.json --dry-run
uv run pipeline import --package pilot/sha256-….import.json
```

O conteúdo entra como **Em revisão** e só aparece para admins. Publicar é uma ação do editor
(`/reading/<id>/edit`), que exige zero trechos pendentes, tradução completa e a declaração de
validação auditiva.

## 2. Banco já existente criado com `prisma db push`

Não rode `db push` nem as migrações antigas por cima. Marque o histórico como aplicado e só
então aplique a migração nova (aditiva):

```bash
for m in 20260328231148_add_oxford_collocations_sentences 20260329093000_add_lyrics_interativo_models \
         20260330120000_add_audio_pipeline_reading_lab 20260331191500_add_song_word_timestamps_json \
         20260402110000_add_reading_book_metadata 20261112190000_sync_schema_baseline; do
  npx prisma migrate resolve --applied "$m"
done
npx prisma migrate deploy      # aplica 20261112200000_reconstructed_audio_segments
```

Faça backup antes. Os dumps antigos (`backup-banco-20260528*.sql`) não contêm os conteúdos de
leitura; servem só de referência de schema.

## 3. Atualização e rollback

```bash
git pull && docker compose build api && docker compose up -d api     # migrações rodam no start
# rollback de código: volte o commit e repita. As migrações desta entrega são aditivas,
# então a versão anterior da API continua funcionando com o banco novo.
```

Rollback de dados: `scripts/restore.sh` restaura em um banco novo; troque `POSTGRES_DB` no
`.env` e recrie a API depois de conferir.

## 4. Backup e restauração

```bash
deploy/scripts/backup.sh /srv/backups                 # pg_dump + checksums da mídia
rsync -a /srv/backups/ destino-externo:/tunely/       # cópia fora do servidor (obrigatória)
deploy/scripts/restore.sh /srv/backups/tunely-AAAAMMDD-HHMMSS   # restaura em <db>_restore e confere a mídia
```

Agende o backup diário (cron) e teste a restauração a cada mudança relevante. A mídia é
reconstruível a partir de `backup-s3/` no Mac; o banco (progresso dos alunos, edições) não.
Guarde também `audio-pipeline/processing/` (≈ horas de ASR) e os pacotes exportados.

## 5. Monitoramento mínimo

- `GET /health` (use um monitor externo de uptime apontando para `https://DOMINIO/health`).
- `docker compose ps` / `docker compose logs -f api` — a API registra cada requisição
  (sem a query string de `/media`, que contém a assinatura).
- Espaço em disco do volume do banco e da pasta de mídia.

## 6. Segurança aplicada

- Banco sem porta publicada; só a rede interna do compose o alcança.
- Sessão web em cookie HttpOnly + Secure + SameSite=Lax; requisições que alteram estado por
  cookie exigem `X-Requested-With: tunely-web` (anti-CSRF). Mobile continua com Bearer.
- Mídia: nunca há diretório aberto. Cada URL é assinada (HMAC, validade padrão de 6 h) e só é
  emitida para usuário autenticado; caminho validado contra traversal; só extensões de mídia.
- Importação de conteúdo exige token de máquina (comparação em tempo constante) ou admin.
- Chaves Anthropic/AWS nunca vão para o bundle web nem para variáveis `EXPO_PUBLIC_*`.

## 7. Restauração demonstrada (staging local, 2026-11-12)

Feito no Postgres local dedicado (porta 5544), com os mesmos passos dos scripts:

```bash
pg_dump -h localhost -p 5544 -U cognitive -d cognitive_dev -Fc -f local-dev/backups/tunely-<data>/db.dump
shasum -a 256 -c local-dev/backups/tunely-<data>/db.dump.sha256          # OK
createdb -h localhost -p 5544 -U cognitive cognitive_restore
pg_restore -h localhost -p 5544 -U cognitive -d cognitive_restore --no-owner local-dev/backups/tunely-<data>/db.dump
```

| Tabela | Original | Restaurado |
| --- | --- | --- |
| User | 2 | 2 |
| ReadingContent | 1 | 1 |
| ReadingSentence (trechos) | 74 | 74 |
| ReadingWordTimestamp | 665 | 665 |
| UserSegmentProgress (checks) | 2 | 2 |
| _prisma_migrations | 7 | 7 |

`prisma migrate status` no banco restaurado: "Database schema is up to date". Checksums da
mídia do piloto (MP3 e capa) conferidos após a cópia.

## 8. Pacote de produção validado localmente (2026-11-12)

O `docker-compose.yml` desta pasta foi executado num projeto isolado (`-p tunely-localtest`,
portas 8090/8453, `SITE_ADDRESS=:80`, sem TLS) com `deploy/.env.localtest`:

| Verificação | Resultado |
| --- | --- |
| Build da imagem da API + `up -d` | ok; db e api `healthy`, Caddy na frente |
| Migrações num banco vazio | as 7 aplicadas por `prisma migrate deploy` no start |
| `/health`, `/`, reload em `/reading/1/study` (fallback SPA) | 200 / 200 / 200 `text/html` |
| Banco exposto | não (`docker compose port db 5432` vazio) |
| Cadastro + login web por cookie + `/api/auth/session` | 201 / 200 (`cn_access`, `cn_refresh`) / usuário admin |
| `pipeline import` do piloto pela URL pública com token de máquina | `created`, áudio conferido por hash |
| Áudio com `Range` via proxy | 206, 1000 bytes, `audio/mpeg`; sem assinatura → 401 |
| `docker compose down` + `up` | conteúdo e trechos continuam lá (volume persistente) |
| `scripts/backup.sh` + `scripts/restore.sh` (com `COMPOSE_PROJECT=tunely-localtest`) | dump conferido, restaurado em outro banco com as mesmas contagens, 512 arquivos de mídia íntegros |

**Rede do Docker Desktop neste Mac**: downloads do registro npm travavam dentro da VM
(não é problema do código; `wget` simples funcionava). O build aceita um cache npm opcional:
`NPM_CACHE_DIR=$HOME/.npm` no `.env` usa o cache local e não acessa a rede para pacotes já
baixados. Em uma VPS com rede normal deixe `NPM_CACHE_DIR` vazio.

Os scripts aceitam `COMPOSE_PROJECT` (padrão `tunely`) para apontar para outro projeto Compose.
Para subir de novo a pilha de teste: `cd deploy && docker compose -p tunely-localtest --env-file .env.localtest up -d`.

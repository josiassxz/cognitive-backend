# syntax=docker/dockerfile:1.7
# Imagem de produção da API. Fixe a base por digest depois do primeiro build validado
# (docker buildx imagetools inspect node:22-alpine) para builds reproduzíveis.
ARG NODE_IMAGE=node:22-alpine

# ---------- build ----------
FROM ${NODE_IMAGE} AS builder
WORKDIR /app
COPY package.json package-lock.json ./
# `npmcache` é um contexto opcional (compose: NPM_CACHE_DIR). Vazio por padrão; localmente pode
# apontar para ~/.npm quando a rede do Docker Desktop trava downloads do registro.
RUN --mount=type=bind,from=npmcache,target=/root/.npm,rw npm ci --prefer-offline --no-audit --no-fund
COPY prisma ./prisma
RUN npx prisma generate
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---------- runtime ----------
FROM ${NODE_IMAGE}
ENV NODE_ENV=production
WORKDIR /app
# openssl: exigido pelos engines do Prisma no Alpine
RUN apk add --no-cache openssl
COPY package.json package-lock.json ./
# Reaproveita as dependências do builder (cliente Prisma já gerado) e remove as de
# desenvolvimento sem acessar a rede. `prisma` é dependência de produção (migrate deploy).
COPY --from=builder /app/node_modules ./node_modules
RUN npm prune --omit=dev --offline --no-audit --no-fund
COPY prisma ./prisma
COPY --from=builder /app/dist ./dist
# Mídia e dados ficam FORA da imagem (volume/bind mount em /data).
RUN mkdir -p /data/media && chown -R node:node /data /app
USER node
EXPOSE 3333
HEALTHCHECK --interval=15s --timeout=5s --retries=5 CMD wget -qO- http://127.0.0.1:3333/health || exit 1
# Aplica migrações pendentes (nunca `db push`) e sobe a API.
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/index.js"]

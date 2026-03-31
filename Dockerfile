FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# ---------- STAGE 2: PRODUCTION ----------
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Copia apenas o build
COPY --from=builder /app/dist ./dist

EXPOSE 3333

ENV NODE_ENV=production

# Comando para iniciar a aplicação
CMD ["npm", "start"]
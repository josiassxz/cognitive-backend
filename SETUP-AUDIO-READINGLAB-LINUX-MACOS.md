# Setup Backend Audio + Reading Lab (Linux e macOS)

Este guia prepara o backend para:
- baixar áudio do YouTube
- subir MP3 para cloud (S3)
- gerar timestamps com Whisper
- processar Reading Lab com Azure TTS e fallback Polly

## 1) Pré-requisitos

- Node.js 20+
- npm 10+
- PostgreSQL rodando
- projeto backend em:
  - `/Users/josiassiqueira/Documents/projetos-josias/cognitive-backend`

## 2) Dependências de sistema

### macOS (Homebrew)

```bash
brew update
brew install ffmpeg yt-dlp
ffprobe -version
yt-dlp --version
```

### Linux Ubuntu/Debian

```bash
sudo apt update
sudo apt install -y ffmpeg python3-pip
python3 -m pip install --user yt-dlp
ffprobe -version
yt-dlp --version
```

Se `yt-dlp` não entrar no PATH no Linux:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
yt-dlp --version
```

## 3) Instalar dependências do projeto

```bash
cd /Users/josiassiqueira/Documents/projetos-josias/cognitive-backend
npm install
```

## 4) Configurar variáveis de ambiente

No arquivo `.env` do backend, garanta:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=...
JWT_REFRESH_SECRET=...

AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_S3_BUCKET=cognitive-nebula-audio

OPENAI_API_KEY=sk-...

AZURE_SPEECH_KEY=...
AZURE_SPEECH_REGION=eastus
```

## 5) Banco e Prisma

```bash
npx prisma migrate dev
npx prisma generate
```

Se estiver em ambiente sem migrations locais:

```bash
npx prisma db push
npx prisma generate
```

## 6) Rodar backend

```bash
npm run dev
```

Health check:

```bash
curl http://localhost:3333/health
```

## 7) Endpoints principais (pipeline completo)

- `POST /api/mobile/import-song` (auth)
  - baixa áudio YouTube
  - faz upload S3
  - chama Whisper para word timestamps
- `GET /api/songs/:songId/word-timestamps`
- `GET /api/reading-lab`
- `GET /api/reading-lab/:id`
- `POST /api/reading-lab/process` (auth)
  - gera TTS com Azure
  - fallback Polly se Azure falhar
- `POST /api/reading-lab/:id/progress` (auth)

## 8) Teste rápido via curl

Importar música:

```bash
curl -X POST http://localhost:3333/api/mobile/import-song \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"youtubeUrl":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

Processar Reading Lab:

```bash
curl -X POST http://localhost:3333/api/reading-lab/process \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"title":"My test text","text":"Hello world. This is a reading lab test.","cefrLevel":"a2"}'
```

## 9) Troubleshooting

- `Falha ao extrair áudio`: confirme `yt-dlp --version` e `ffprobe -version`.
- `OPENAI_API_KEY não configurada`: revisar `.env`.
- falha no upload S3: validar `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET`.
- falha Azure TTS: validar `AZURE_SPEECH_KEY` e `AZURE_SPEECH_REGION`.
- se Azure falhar, o backend tenta Polly automaticamente.

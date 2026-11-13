# Backups versionados

- `traducoes/traducoes-20261113-1309-final.tar.gz` — traduções PT-BR dos 252 livros
  (arquivos de tradução + cache por lote do pipeline). Restaurar: extrair na raiz do
  projeto (recria `audio-pipeline/processing/<hash>/pipeline-v1/...`) e rodar
  `pipeline export` + `pipeline import` por conteúdo.
- O dump do banco (pg_dump, ~123 MB) passa do limite do GitHub e fica no Google Drive.
- Os áudios (MP3, ~8,7 GB) não cabem no GitHub; ficam no armazenamento de mídia.

# audio-pipeline — reconstrução de conteúdo a partir dos áudios

Worker local (Mac Apple Silicon) que transforma cada MP3 em um pacote importável:
inventário → transcrição (MLX Whisper) → alinhamento forçado (WhisperX/wav2vec2, CPU) →
segmentação didática → tradução pt-BR (Claude) → validação → exportação → importação.

Não usa a API da OpenAI. Depois que os modelos estão em cache, ASR e alinhamento rodam sem
internet; só a tradução precisa de rede. O worker não precisa estar ligado para o site
funcionar: ele gera pacotes que são importados no backend.

## Instalação (testada em macOS 26 / arm64 / Python 3.11)

```bash
brew install uv ffmpeg          # ffmpeg/ffprobe 9.x
cd audio-pipeline
uv sync                         # cria .venv com as versões fixadas em uv.lock
uv run pipeline doctor          # confere ferramentas, pacotes, modelos, disco e credencial
```

Versões validadas no piloto: `mlx-whisper 0.4.3`, `mlx 0.32.4`, `whisperx 3.8.6`,
`torch 2.8.0`, `torchaudio 2.8.0`, `anthropic 2.8.0`.

Modelos (baixados no primeiro uso, uma única vez):

| Modelo | Uso | Local | Licença |
| --- | --- | --- | --- |
| `mlx-community/whisper-large-v3-turbo` (rev. `a4aaeec0…`) | ASR | `~/.cache/huggingface/hub` (1,6 GB) | MIT (Whisper, OpenAI) |
| `WAV2VEC2_ASR_BASE_960H` (torchaudio) | alinhamento em inglês | `~/.cache/torch/hub/checkpoints` | MIT (fairseq) |

## Comandos (todos executados de verdade neste repositório)

```bash
# 1. inventário de toda a pasta (hash, duração real via ffprobe, duplicatas, exclusões)
uv run pipeline inventory --input ../backup-s3/tunely-nebula-audio --output processing/inventory.json

# 2. um arquivo, de ponta a ponta (retoma de onde parou se for interrompido)
uv run pipeline process --file ../backup-s3/tunely-nebula-audio/reading/little-red-riding-hood-mnx2xc04.mp3 \
  --media-root ../backup-s3/tunely-nebula-audio --asr mlx --aligner whisperx --language en

# 3. validação estrutural e auditoria automática dos cortes
uv run pipeline validate --content 1f34
uv run pipeline audit-clips --content 1f34 --source ../backup-s3/tunely-nebula-audio/reading/little-red-riding-hood-mnx2xc04.mp3

# 4. tradução
uv run pipeline translate --content 1f34 --estimate                       # só estima tokens/custo
uv run pipeline translate --content 1f34 --provider anthropic --target pt-BR   # exige credencial
uv run pipeline translate --content 1f34 --provider file --input pilot/little-red-riding-hood.translations.pt-BR.json

# 5. pacote e importação
uv run pipeline export --content 1f34 --output pilot/
uv run pipeline import --package pilot/sha256-1f34….import.json --dry-run --media-root ../backup-s3/tunely-nebula-audio
PIPELINE_API_URL=http://localhost:3333/api/admin PIPELINE_IMPORT_TOKEN=… uv run pipeline import --package pilot/sha256-1f34….import.json

# 6. lote retomável (uma falha não interrompe os demais)
uv run pipeline batch --manifest processing/inventory.json --resume --workers 1
uv run pipeline report --manifest processing/inventory.json     # processing/batch-report.json

# correção rastreada de uma palavra do inglês (o próximo `process` realinha)
uv run pipeline correct --content 1f34 --word w000123 --text Hood --author ana --reason "ouvi o áudio"

uv run pytest -q     # 22 testes (janelas, sobreposição, segmentação, validação, tradução, correções)
```

`--content` aceita o `contentKey`, o hash ou um prefixo único do hash.

**Sem `ANTHROPIC_API_KEY`** o comando `translate --provider anthropic` para com uma mensagem
clara e o conteúdo fica `translation_pending`; nada é inventado. Erro 401 interrompe a etapa
sem repetição. `429`/falhas de rede usam backoff; cada lote traduzido fica em cache por hash
de (modelo, prompt, texto, contexto).

## Saídas

```text
processing/<sha256-do-áudio>/pipeline-v1/
  manifest.json              metadados reais do áudio, sugestões (título/capa/autor) e métricas
  chunks.json                pausas detectadas e janelas (offsets absolutos)
  transcript.raw.json        ASR bruto: segmentos, palavras, indicadores que o modelo devolveu
  transcript.reviewed.json   sinalizações automáticas, correções rastreadas, exclusões editoriais
  alignment.json             palavras em ms inteiros absolutos + origem do tempo de cada uma
  segments.json              trechos didáticos (firstWordId/lastWordId, start/end, playStart/playEnd)
  translations.pt-BR.json    traduções e destaques (offsets UTF-16)
  validation.json            validação estrutural + estatísticas
  clip-audit.json            auditoria automática dos cortes (opcional)
  content.import.json        pacote importável (schema: schemas/content-import.schema.json)
processing/state.sqlite      estado dos jobs (etapa, tentativas, erro)
processing/batch-report.json relatório do lote por arquivo
```

Cada artefato guarda `inputsHash` (entradas + parâmetros + versões de modelo). Mudar a
tradução não refaz ASR; corrigir o inglês invalida alinhamento, trechos e traduções.

## Regras de qualidade embutidas

- **Origem do tempo por palavra** (`timeSource`): `aligner` (medido pelo alinhador),
  `asr` (alinhador não mediu ou score < 0,20; fica o tempo do Whisper) ou `interpolated`
  (estimado, sempre marcado). Trechos com palavra não-`aligner` saem `needs_review`.
- **Segmentação**: frases por pontuação; frases longas divididas por programação dinâmica
  preferindo vírgulas, pausas ≥ 250 ms e conjunções, sem terminar em artigo/preposição nem
  separar verbo+partícula. Alvo 4–14 palavras / 2–10 s (alvo, não corte rígido).
- **Margem de reprodução**: `playStartMs`/`playEndMs` só avançam no espaço livre entre
  palavras vizinhas (80 ms antes, 160 ms depois, guarda de 20 ms).
- **Sinalizações do ASR**: idioma divergente, texto sobre silêncio, repetição espúria,
  possível omissão (intervalo com som e sem palavras), pontuação perdida.
- **Exclusão editorial automática**: o rodapé do site de origem lido pelo narrador
  ("Hope you have enjoyed the reading… Come back to http…") fica fora dos trechos, registrado
  em `exclusions` (reversível editando `transcript.reviewed.json`).
- **Nada sai "pronto" do pipeline**: todo pacote é `needs_review` com
  `auditoryValidation: pending`. Liberar é uma ação humana no editor.

## Resultado do piloto (Little Red Riding Hood, 223,8 s)

| Medida | Valor |
| --- | --- |
| ASR (MLX, modelo em cache) | 10,7 s → 21× tempo real |
| Alinhamento (CPU) | 4,4 s → 51× tempo real (6,9 s com carga do modelo) |
| Pico de memória | 3,1 GB |
| Disco temporário | 1 WAV de 7 MB por janela de até 10 min, apagado após o checkpoint |
| Palavras | 692 (665 em trechos + 27 do rodapé excluído) |
| Medidas pelo alinhador | 685 / 692 = 99,0 % (7 ficaram com tempo do ASR) |
| Trechos | 74 (3–14 palavras; 0,5–4,9 s; média 2,4 s) |
| Trechos para revisão | 13 (palavras com score baixo ou trecho final sem pontuação) |
| Auditoria automática dos cortes | 70/74 clipes re-transcritos idênticos; 4 divergências de 1 palavra do próprio ASR, nenhuma de corte/vazamento |
| Tradução | 74/74, feita pelo Claude nesta sessão do Claude Code (sem API; procedência gravada no pacote) |

Limitações do piloto, ditas com clareza:

- **Ninguém ouviu o áudio.** A auditoria por re-transcrição é um indicador automático; a
  escuta humana de todos os trechos continua pendente e o conteúdo está `needs_review`.
- O ASR transcreveu "Little Red Riding **had** set out" (trecho 11). O texto original
  provavelmente é "Hood"; não corrigi porque não há como confirmar sem ouvir. Use o editor
  ou `pipeline correct`.
- No fim do áudio o Whisper perdeu a pontuação; os trechos 67–74 foram separados por
  pausa + maiúscula e estão marcados para revisão.
- Custo real de tradução por API não foi medido (sem chave). Estimativa heurística do
  piloto: ~2,6 mil tokens de entrada e ~3,5 mil de saída (≈ US$ 0,08 com `claude-opus-5-5`).

## Estimativa do lote (pela duração real, não pelo tamanho)

Inventário: 259 MP3, 252 incluídos, **160,0 h** de áudio (mediana 20,9 min; maior 5,8 h).
Excluídos: 3 duplicatas por hash, 2 testes pelo nome, 2 em pastas técnicas.
Com as taxas medidas (21× e 51×): ~7,6 h de ASR + ~3,1 h de alinhamento ≈ **11 h** de
máquina, 1 worker. Tradução: extrapolando o piloto por duração, ordem de 6,7 M tokens de
entrada e 8,9 M de saída — **defina `TRANSLATION_BUDGET_LIMIT` e meça o custo real em
alguns conteúdos antes de traduzir tudo**.

import { createApp } from './app';
import { env } from './config/env';

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`Backend Cognitive Nebula rodando na porta ${env.PORT}`);
});

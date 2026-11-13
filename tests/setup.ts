const env = (((globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process ?? {
  env: {},
}).env ?? {}) as Record<string, string | undefined>;

env.NODE_ENV = 'test';
env.JWT_SECRET = env.JWT_SECRET ?? 'test-secret';
env.DATABASE_URL = env.DATABASE_URL ?? 'postgresql://projeto_ingles:projeto_ingles@localhost:5433/projeto_ingles_test';

// Testes de integração usam um Postgres real (migrações aplicadas) quando TEST_DATABASE_URL existe.
if (env.TEST_DATABASE_URL) {
  env.DATABASE_URL = env.TEST_DATABASE_URL;
}
// Limite de requisições folgado nos testes (centenas de chamadas vêm do mesmo "IP").
env.RATE_LIMIT_MAX = env.RATE_LIMIT_MAX ?? '100000';
env.AUTH_RATE_LIMIT_MAX = env.AUTH_RATE_LIMIT_MAX ?? '100000';

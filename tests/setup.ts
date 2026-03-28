const env = (((globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process ?? {
  env: {},
}).env ?? {}) as Record<string, string | undefined>;

env.NODE_ENV = 'test';
env.JWT_SECRET = env.JWT_SECRET ?? 'test-secret';
env.DATABASE_URL = env.DATABASE_URL ?? 'postgresql://projeto_ingles:projeto_ingles@localhost:5433/projeto_ingles_test';

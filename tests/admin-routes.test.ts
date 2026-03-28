import express from 'express';
import request from 'supertest';
import * as XLSX from 'xlsx';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { signAccessToken } from '../src/lib/jwt';
import { authMiddleware, requireAdmin } from '../src/middleware/auth';
import { errorHandler, notFoundHandler } from '../src/middleware/error-handler';
import { adminRouter } from '../src/routes/admin';

const mockPrisma = vi.hoisted(() => ({
  vocabulary: {
    upsert: vi.fn(),
  },
  phrasalVerb: {
    upsert: vi.fn(),
  },
  video: {
    upsert: vi.fn(),
  },
  grammarTip: {
    upsert: vi.fn(),
  },
  podcast: {
    upsert: vi.fn(),
  },
  expression: {
    upsert: vi.fn(),
  },
  song: {
    upsert: vi.fn(),
  },
}));

vi.mock('../src/lib/prisma', () => ({
  prisma: mockPrisma,
}));

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/admin', authMiddleware, requireAdmin, adminRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}

function makeToken() {
  return signAccessToken({
    id: 'user-id',
    email: 'admin@cognitive.com',
    name: 'Admin',
    role: 'admin',
  });
}

function makeWorkbookBuffer(rows: Record<string, unknown>[]) {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}

describe('admin routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('baixa template xlsx autenticado', async () => {
    const app = buildApp();
    const token = makeToken();

    const response = await request(app)
      .get('/api/admin/template?type=vocabulary')
      .buffer(true)
      .parse((res, callback) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        res.on('end', () => callback(null, Buffer.concat(chunks)));
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    expect(response.headers['content-disposition']).toContain('template-vocabulary.xlsx');
    expect(Buffer.isBuffer(response.body)).toBe(true);
    expect(response.body.byteLength).toBeGreaterThan(0);
  });

  it('processa upload de vocabulary', async () => {
    mockPrisma.vocabulary.upsert.mockResolvedValue({ id: 1 });
    const app = buildApp();
    const token = makeToken();
    const fileBuffer = makeWorkbookBuffer([
      {
        word: 'hello',
        type: 'interjeicao',
        definition: 'ola',
        example: 'hello there',
        month: 1,
        level: 'basico',
        category: 'cotidiano',
      },
    ]);

    const response = await request(app)
      .post('/api/admin/upload')
      .set('Authorization', `Bearer ${token}`)
      .field('type', 'vocabulary')
      .attach('file', fileBuffer, 'vocabulary.xlsx');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.created).toBe(1);
    expect(mockPrisma.vocabulary.upsert).toHaveBeenCalledTimes(1);
  });

  it('retorna erro para planilha vazia', async () => {
    const app = buildApp();
    const token = makeToken();
    const fileBuffer = makeWorkbookBuffer([]);

    const response = await request(app)
      .post('/api/admin/upload')
      .set('Authorization', `Bearer ${token}`)
      .field('type', 'vocabulary')
      .attach('file', fileBuffer, 'empty.xlsx');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Planilha vazia', code: 'HTTP_400' });
  });
});

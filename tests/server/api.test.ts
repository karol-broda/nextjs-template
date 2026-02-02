import { describe, test, expect } from 'bun:test';
import { api } from '#/server/api/index';

describe('api routes', () => {
  test('GET /api/users/:id returns the id', async () => {
    const res = await api.handle(new Request('http://localhost/api/users/abc123'));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ id: 'abc123' });
  });

  test('GET /api/users requires auth and returns 401 without session', async () => {
    const res = await api.handle(new Request('http://localhost/api/users'));
    expect(res.status).toBe(401);
  });

  test('GET /api/openapi serves docs', async () => {
    const res = await api.handle(new Request('http://localhost/api/openapi'));
    expect(res.status).toBe(200);
  });

  test('GET unknown route returns 404', async () => {
    const res = await api.handle(new Request('http://localhost/api/nonexistent'));
    expect(res.status).toBe(404);
  });
});

import { describe, test, expect } from 'bun:test';
import { Elysia } from 'elysia';
import { errorHandler } from '#/server/api/error-handler';
import { DatabaseError, NotFoundError, AuthError, ValidationError } from '#/lib/result';

function createTestApi() {
  return new Elysia({ prefix: '/api' })
    .use(errorHandler)
    .get('/ok', () => ({ status: 'ok' }))
    .get('/db-error', () => {
      throw new DatabaseError('connection refused');
    })
    .get('/not-found', () => {
      throw new NotFoundError('user');
    })
    .get('/auth-error', () => {
      throw new AuthError('token expired');
    })
    .get('/validation-error', () => {
      throw new ValidationError('email is required');
    })
    .get('/unknown-error', () => {
      throw new Error('raw internal error');
    });
}

describe('error handler', () => {
  const api = createTestApi();

  test('successful route returns 200', async () => {
    const res = await api.handle(new Request('http://localhost/api/ok'));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ status: 'ok' });
  });

  test('DatabaseError returns 500 with safe message', async () => {
    const res = await api.handle(new Request('http://localhost/api/db-error'));
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body).toEqual({ code: 'DATABASE_ERROR', message: 'something went wrong' });
  });

  test('NotFoundError returns 404 with resource name', async () => {
    const res = await api.handle(new Request('http://localhost/api/not-found'));
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body).toEqual({ code: 'NOT_FOUND', message: 'user not found' });
  });

  test('AuthError returns 401 with safe message', async () => {
    const res = await api.handle(new Request('http://localhost/api/auth-error'));
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body).toEqual({ code: 'AUTH_ERROR', message: 'authentication failed' });
  });

  test('ValidationError returns 400 with validation message', async () => {
    const res = await api.handle(new Request('http://localhost/api/validation-error'));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({
      code: 'VALIDATION_ERROR',
      message: 'email is required',
    });
  });

  test('unknown error returns 500 with generic message', async () => {
    const res = await api.handle(new Request('http://localhost/api/unknown-error'));
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body).toEqual({ code: 'INTERNAL_ERROR', message: 'something went wrong' });
  });

  test('internal message never leaks to response', async () => {
    const res = await api.handle(new Request('http://localhost/api/db-error'));
    const body = await res.json();
    expect(body.message).not.toBe('connection refused');
    expect(body.message).toBe('something went wrong');
  });
});

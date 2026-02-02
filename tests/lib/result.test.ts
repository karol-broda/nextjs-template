import { describe, test, expect } from 'bun:test';
import {
  AppError,
  DatabaseError,
  NotFoundError,
  AuthError,
  ValidationError,
  fromDb,
  fromPromise,
  ok,
  err,
} from '#/lib/result';

describe('error classes', () => {
  test('AppError stores code, message, userMessage, and status', () => {
    const error = new AppError('TEST', 'internal detail', 'user-safe message', 418);
    expect(error.code).toBe('TEST');
    expect(error.message).toBe('internal detail');
    expect(error.userMessage).toBe('user-safe message');
    expect(error.status).toBe(418);
  });

  test('AppError defaults userMessage to generic string', () => {
    const error = new AppError('TEST', 'internal');
    expect(error.userMessage).toBe('something went wrong');
    expect(error.status).toBe(500);
  });

  test('AppError extends Error', () => {
    const error = new AppError('TEST', 'msg');
    expect(error).toBeInstanceOf(Error);
  });

  test('toResponse returns code and userMessage', () => {
    const error = new AppError('TEST', 'secret', 'safe');
    const response = error.toResponse();
    expect(response).toEqual({ code: 'TEST', message: 'safe' });
  });

  test('DatabaseError has correct code and hides internal message', () => {
    const error = new DatabaseError('connection refused');
    expect(error.code).toBe('DATABASE_ERROR');
    expect(error.message).toBe('connection refused');
    expect(error.userMessage).toBe('something went wrong');
    expect(error.status).toBe(500);
  });

  test('NotFoundError formats resource name as user message', () => {
    const error = new NotFoundError('user');
    expect(error.code).toBe('NOT_FOUND');
    expect(error.message).toBe('user not found');
    expect(error.userMessage).toBe('user not found');
    expect(error.status).toBe(404);
  });

  test('AuthError has correct defaults', () => {
    const error = new AuthError('token expired');
    expect(error.code).toBe('AUTH_ERROR');
    expect(error.message).toBe('token expired');
    expect(error.userMessage).toBe('authentication failed');
    expect(error.status).toBe(401);
  });

  test('AuthError accepts custom user message', () => {
    const error = new AuthError('internal', 'please log in again');
    expect(error.userMessage).toBe('please log in again');
  });

  test('ValidationError passes message through as user-facing', () => {
    const error = new ValidationError('email is required');
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.userMessage).toBe('email is required');
    expect(error.status).toBe(400);
  });
});

describe('ok / err', () => {
  test('ok wraps a value', () => {
    const result = ok(42);
    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toBe(42);
  });

  test('err wraps an error', () => {
    const error = new AppError('FAIL', 'failed');
    const result = err(error);
    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr()).toBe(error);
  });
});

describe('fromDb', () => {
  test('resolves to ok on success', async () => {
    const result = await fromDb(Promise.resolve([{ id: '1' }]));
    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toEqual([{ id: '1' }]);
  });

  test('resolves to err on rejection', async () => {
    const result = await fromDb(Promise.reject(new Error('db down')));
    expect(result.isErr()).toBe(true);
    const error = result._unsafeUnwrapErr();
    expect(error).toBeInstanceOf(DatabaseError);
    expect(error.message).toBe('db down');
  });

  test('handles non-Error rejections', async () => {
    const result = await fromDb(Promise.reject('string error'));
    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr().message).toBe('unknown database error');
  });
});

describe('fromPromise', () => {
  test('maps custom error', async () => {
    const result = await fromPromise(
      Promise.reject(new Error('oops')),
      () => new AuthError('auth failed'),
    );
    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr()).toBeInstanceOf(AuthError);
  });
});

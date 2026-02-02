import { ResultAsync, err, ok } from 'neverthrow';
import type { Result } from 'neverthrow';

export { ResultAsync, err, ok, type Result };

export interface ErrorResponse {
  code: string;
  message: string;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly userMessage: string;

  constructor(
    code: string,
    message: string,
    userMessage: string | null = null,
    status: number = 500,
  ) {
    super(message);
    this.code = code;
    this.status = status;
    this.userMessage = userMessage !== null ? userMessage : 'something went wrong';
  }

  toResponse(): ErrorResponse {
    return { code: this.code, message: this.userMessage };
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super('DATABASE_ERROR', message, 'something went wrong', 500);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, `${resource} not found`, 404);
  }
}

export class AuthError extends AppError {
  constructor(message: string, userMessage: string = 'authentication failed') {
    super('AUTH_ERROR', message, userMessage, 401);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message, message, 400);
  }
}

export function fromDb<T>(promise: Promise<T>): ResultAsync<T, DatabaseError> {
  return ResultAsync.fromPromise(
    promise,
    (e) => new DatabaseError(e instanceof Error ? e.message : 'unknown database error'),
  );
}

export function fromPromise<T, E extends AppError>(
  promise: Promise<T>,
  mapErr: (e: unknown) => E,
): ResultAsync<T, E> {
  return ResultAsync.fromPromise(promise, mapErr);
}

import { Elysia } from 'elysia';
import { AppError } from '#/lib/result';
import logger from '#/lib/logger';

export const errorHandler = new Elysia({ name: 'error-handler' }).onError(
  { as: 'global' },
  ({ error, code }) => {
    if (error instanceof AppError) {
      return error.toResponse();
    }

    if (code === 'NOT_FOUND') {
      return Response.json({ code: 'NOT_FOUND', message: 'not found' }, { status: 404 });
    }

    if (code === 'VALIDATION') {
      return Response.json(
        { code: 'VALIDATION_ERROR', message: 'invalid request' },
        { status: 400 },
      );
    }

    logger.error({ err: error }, 'unhandled error');
    return Response.json(
      { code: 'INTERNAL_ERROR', message: 'something went wrong' },
      { status: 500 },
    );
  },
);

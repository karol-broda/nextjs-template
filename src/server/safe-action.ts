import { createSafeActionClient } from 'next-safe-action';
import { getSession } from '#/auth/utils';
import { AppError, AuthError } from '#/lib/result';
import logger from '#/lib/logger';

function handleServerError(error: Error): string {
  if (error instanceof AppError) {
    logger.warn({ code: error.code, message: error.message }, 'action error');
    return error.userMessage;
  }

  logger.error({ err: error }, 'unhandled action error');
  return 'something went wrong';
}

export const actionClient = createSafeActionClient({
  handleServerError,
});

export const authedActionClient = actionClient.use(async ({ next }) => {
  const session = await getSession();
  if (session === null) {
    throw new AuthError('no session');
  }
  return next({ ctx: { session } });
});

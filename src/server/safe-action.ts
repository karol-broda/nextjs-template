import { createSafeActionClient } from 'next-safe-action';
import { getSession } from '#/auth/utils';
import { AppError, AuthError } from '#/lib/result';
import { log } from '#/lib/logger';

function handleServerError(error: Error): string {
  if (error instanceof AppError) {
    log.warn({ code: error.code, message: error.message, action: 'server_action_error' });
    return error.userMessage;
  }

  log.error({ err: error, action: 'unhandled_action_error' });
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

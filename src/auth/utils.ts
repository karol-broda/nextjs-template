import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '.';
import { log } from '#/lib/logger';

export async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (error) {
    log.error({ err: error, action: 'get_session_failed' });
    return null;
  }
}

export async function getRequiredSession() {
  const session = await getSession();
  if (session === null) {
    redirect('/login');
  }
  return session;
}

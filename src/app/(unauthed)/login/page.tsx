import { getSession } from '#/auth/utils';
import { redirect } from 'next/navigation';
import { LoginForm } from './_page';
import { Center } from '#/components/layout/center';

export default async function LoginPage() {
  const session = await getSession();
  if (session !== null) {
    redirect('/');
  }

  return (
    <Center fullHeight>
      <LoginForm />
    </Center>
  );
}

import { getSession } from '#/auth/utils';
import { redirect } from 'next/navigation';
import { RegisterForm } from './_page';
import { Center } from '#/components/layout/center';

export default async function RegisterPage() {
  const session = await getSession();
  if (session !== null) {
    redirect('/');
  }

  return (
    <Center fullHeight>
      <RegisterForm />
    </Center>
  );
}

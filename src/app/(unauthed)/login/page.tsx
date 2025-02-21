import { getMaybeUser } from '#/auth/utils';
import { SignInForm } from './_page';
import { redirect } from 'next/navigation';

export default async function Page() {
  const maybeUser = await getMaybeUser();
  if (maybeUser !== null) {
    redirect('/');
  }
  return (
    <main className="mx-auto flex h-[100dvh] w-full max-w-4xl flex-col p-4">
      <SignInForm />
    </main>
  );
}

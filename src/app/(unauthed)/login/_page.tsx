'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '#/auth/client';
import { credentialsSchema } from '#/auth/schema';
import Link from 'next/link';

export function LoginForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email !== 'string' || typeof password !== 'string') {
      setError('invalid input');
      setLoading(false);
      return;
    }

    const validation = credentialsSchema.safeParse({ email, password });
    if (validation.success === false) {
      const firstIssue = validation.error.issues[0] ?? null;
      setError(firstIssue !== null ? firstIssue.message : 'invalid input');
      setLoading(false);
      return;
    }

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    if (signInError !== null) {
      setError(typeof signInError.message === 'string' ? signInError.message : 'login failed');
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-lg border border-border p-6"
    >
      <h1 className="text-xl font-bold">login</h1>

      <label htmlFor="email" className="text-sm font-medium">
        email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />

      <label htmlFor="password" className="text-sm font-medium">
        password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        {loading ? 'logging in...' : 'login'}
      </button>

      {error !== '' && <p className="text-sm text-destructive">{error}</p>}

      <p className="text-center text-sm text-muted-foreground">
        no account?{' '}
        <Link href="/register" className="text-primary underline">
          register
        </Link>
      </p>
    </form>
  );
}

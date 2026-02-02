'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '#/auth/client';
import { registerSchema } from '#/auth/schema';
import Link from 'next/link';

export function RegisterForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      setError('invalid input');
      setLoading(false);
      return;
    }

    const validation = registerSchema.safeParse({ name, email, password });
    if (validation.success === false) {
      const firstIssue = validation.error.issues[0] ?? null;
      setError(firstIssue !== null ? firstIssue.message : 'invalid input');
      setLoading(false);
      return;
    }

    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (signUpError !== null) {
      setError(
        typeof signUpError.message === 'string' ? signUpError.message : 'registration failed',
      );
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
      <h1 className="text-xl font-bold">register</h1>

      <label htmlFor="name" className="text-sm font-medium">
        name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        required
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />

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
        {loading ? 'creating account...' : 'register'}
      </button>

      {error !== '' && <p className="text-sm text-destructive">{error}</p>}

      <p className="text-center text-sm text-muted-foreground">
        already have an account?{' '}
        <Link href="/login" className="text-primary underline">
          login
        </Link>
      </p>
    </form>
  );
}

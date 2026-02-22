'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '#/auth/client';
import { credentialsSchema } from '#/auth/schema';
import { useAppForm } from '#/hooks/use-app-form';
import { FormError } from '#/components/form-error';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/components/ui/card';

export function LoginForm() {
  const [apiError, setApiError] = useState('');
  const router = useRouter();

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: credentialsSchema,
    },
    onSubmit: async ({ value }) => {
      setApiError('');

      const { error: signInError } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });

      if (signInError !== null) {
        setApiError(
          typeof signInError.message === 'string' ? signInError.message : 'login failed',
        );
        return;
      }

      router.push('/');
      router.refresh();
    },
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>login</CardTitle>
        <CardDescription>sign in to your account</CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <CardContent className="flex flex-col gap-4">
          <form.AppField
            name="email"
            children={(field) => (
              <field.TextField label="email" type="email" placeholder="you@example.com" />
            )}
          />
          <form.AppField
            name="password"
            children={(field) => <field.TextField label="password" type="password" />}
          />
          <FormError message={apiError} />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <form.AppForm>
            <form.SubmitButton label="login" loadingLabel="logging in..." />
          </form.AppForm>
          <p className="text-center text-sm text-muted-foreground">
            no account?{' '}
            <Link href="/register" className="text-primary underline">
              register
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

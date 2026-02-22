'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '#/auth/client';
import { registerSchema } from '#/auth/schema';
import { useAppForm } from '#/hooks/use-app-form';
import { FormError } from '#/components/form-error';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/components/ui/card';

export function RegisterForm() {
  const [apiError, setApiError] = useState('');
  const router = useRouter();

  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      setApiError('');

      const { error: signUpError } = await authClient.signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
      });

      if (signUpError !== null) {
        setApiError(
          typeof signUpError.message === 'string' ? signUpError.message : 'registration failed',
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
        <CardTitle>register</CardTitle>
        <CardDescription>create a new account</CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <CardContent className="flex flex-col gap-4">
          <form.AppField
            name="name"
            children={(field) => (
              <field.TextField label="name" placeholder="your name" />
            )}
          />
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
            <form.SubmitButton label="register" loadingLabel="creating account..." />
          </form.AppForm>
          <p className="text-center text-sm text-muted-foreground">
            already have an account?{' '}
            <Link href="/login" className="text-primary underline">
              login
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

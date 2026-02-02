'use server';

import { actionClient } from '#/server/safe-action';
import { credentialsSchema, registerSchema } from '#/auth/schema';
import { auth } from '#/auth';
import { headers } from 'next/headers';

export const loginAction = actionClient
  .schema(credentialsSchema)
  .action(async ({ parsedInput }) => {
    const result = await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email: parsedInput.email,
        password: parsedInput.password,
      },
    });
    return result;
  });

export const registerAction = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput }) => {
    const result = await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name: parsedInput.name,
        email: parsedInput.email,
        password: parsedInput.password,
      },
    });
    return result;
  });

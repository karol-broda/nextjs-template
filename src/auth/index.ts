import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db from '#/db';
import { baseUrl } from '#/lib/config';

export const auth = betterAuth({
  baseURL: baseUrl,
  basePath: '/api/auth',
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
});

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db from '#/db';

export const auth = betterAuth({
  baseURL: process.env['NEXT_PUBLIC_URL'] ?? 'http://localhost:3000',
  basePath: '/api/auth',
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
});

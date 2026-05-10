import { Elysia } from 'elysia';
import { openapi } from '@elysiajs/openapi';
import pkg from '~/package.json';
import { appName } from '#/lib/config';
import { errorHandler } from './error-handler';
import { betterAuthPlugin } from './auth';
import { userRoutes } from './routes/user';

export const api = new Elysia({ prefix: '/api' })
  .use(
    openapi({
      documentation: {
        info: {
          title: `${appName} API`,
          version: pkg.version,
        },
        tags: [
          { name: 'auth', description: 'authentication endpoints' },
          { name: 'users', description: 'user endpoints' },
        ],
      },
    }),
  )
  .use(errorHandler)
  .use(betterAuthPlugin)
  .use(userRoutes);

export type Api = typeof api;

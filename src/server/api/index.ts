import { Elysia } from 'elysia';
import { openapi } from '@elysiajs/openapi';
import { errorHandler } from './error-handler';
import { betterAuthPlugin } from './auth';
import { userRoutes } from './routes/user';

export const api = new Elysia({ prefix: '/api' })
  .use(
    openapi({
      documentation: {
        info: {
          title: 'Next.js Template API',
          version: '0.1.0',
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

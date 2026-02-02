import { Elysia, t } from 'elysia';
import { betterAuthPlugin } from '../auth';

export const userRoutes = new Elysia({ prefix: '/users' })
  .use(betterAuthPlugin)
  .get(
    '/',
    ({ user }) => {
      return { user };
    },
    {
      auth: true,
      detail: { tags: ['users'], summary: 'get current user' },
    },
  )
  .get(
    '/:id',
    ({ params }) => {
      return { id: params.id };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: { tags: ['users'], summary: 'get user by id' },
    },
  );

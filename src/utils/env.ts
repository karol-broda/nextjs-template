import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  server: { database_uri: z.string().min(0) },
  client: { NEXT_PUBLIC_URL: z.string() },
  runtimeEnv: {
    NEXT_PUBLIC_URL: process.env['NEXT_PUBLIC_URL'],
    database_uri: process.env['DATABASE_URI'],
  },
});

export default env;

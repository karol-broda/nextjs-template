import pkg from '~/package.json';
import env from './env';

export const appName = 'Next.js Template';

export const appDescription = 'a modern next.js template';

export const serviceName = pkg.name;

export const baseUrl = env.NEXT_PUBLIC_URL;

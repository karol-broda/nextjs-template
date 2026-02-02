import { QueryClient } from '@tanstack/react-query';

let browserQueryClient: QueryClient | null = null;

function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

export function getQueryClient(): QueryClient {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return makeQueryClient();
  }
  if (browserQueryClient === null) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

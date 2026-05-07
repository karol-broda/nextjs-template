'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { EvlogProvider } from 'evlog/next/client';
import { serviceName } from '#/lib/config';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <EvlogProvider service={serviceName}>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </EvlogProvider>
    </NuqsAdapter>
  );
}

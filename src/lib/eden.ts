import { treaty } from '@elysiajs/eden';
import type { Api } from '#/server/api';

function getBaseUrl(): string {
  if (typeof window !== 'undefined') return window.location.origin;
  return process.env['NEXT_PUBLIC_URL'] ?? 'http://localhost:3000';
}

export const api = treaty<Api>(getBaseUrl());

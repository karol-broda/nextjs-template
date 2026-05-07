import { treaty } from '@elysiajs/eden';
import type { Api } from '#/server/api';
import { baseUrl } from '#/lib/config';

function getBaseUrl(): string {
  if (typeof window !== 'undefined') return window.location.origin;
  return baseUrl;
}

export const api = treaty<Api>(getBaseUrl());

import { z } from 'zod';

// zod v4 uses per-schema `error` param instead of global error maps.
// use these helpers when defining schemas for consistent messages.

export function required(field: string) {
  return { error: `${field} is required` };
}

export function minLength(field: string, min: number) {
  return {
    error: (issue: { code: string }) => {
      if (issue.code === 'too_small') {
        return `${field} must be at least ${String(min)} characters`;
      }
      return null;
    },
  };
}

export const emailError = {
  error: (issue: { code: string }) => {
    if (issue.code === 'invalid_format') {
      return 'please enter a valid email';
    }
    return null;
  },
};

export const friendlyEmail = z.email({ error: 'please enter a valid email' });

export function requiredString(field: string) {
  return z.string({ error: `${field} is required` }).min(1, {
    error: `${field} is required`,
  });
}

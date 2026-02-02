import { z } from 'zod';

export const isoDateSchema = z
  .string()
  .datetime()
  .transform((val) => new Date(val));

export const numericStringSchema = z.string().regex(/^\d+$/).transform(Number);

import { z } from 'zod';

export const appRegistry = z.registry<{
  description: string;
}>();

// use schema.register(appRegistry, { description: "..." }) inline
// or use schema.meta({ description: "..." }) for z.globalRegistry

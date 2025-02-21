import { pgTableCreator, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

const pgTable = pgTableCreator((name) => `template_app_${name}`);

export const userTable = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const insertUserSchema = createInsertSchema(userTable);
export type InsertUserType = z.infer<typeof insertUserSchema>;
export const selectUserSchema = createSelectSchema(userTable);
export type SelectUserType = z.infer<typeof selectUserSchema>;
export const obscuredUserSchema = selectUserSchema.omit({ passwordHash: true });
export type ObscuredUserType = z.infer<typeof obscuredUserSchema>;

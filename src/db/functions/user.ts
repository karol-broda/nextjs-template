import { eq } from 'drizzle-orm';
import db from '..';
import { user } from '../schema';
import { fromDb, NotFoundError } from '#/lib/result';
import { err, ok } from 'neverthrow';
import type { ResultAsync } from 'neverthrow';
import type { DatabaseError } from '#/lib/result';

export type UserRow = typeof user.$inferSelect;

export function dbGetUserById(userId: string): ResultAsync<UserRow, DatabaseError | NotFoundError> {
  return fromDb(db.select().from(user).where(eq(user.id, userId))).andThen((rows) => {
    const row = rows[0] ?? null;
    if (row === null) return err(new NotFoundError('user'));
    return ok(row);
  });
}

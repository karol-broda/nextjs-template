import { eq } from 'drizzle-orm';
import { userTable } from '../schema';
import db from '..';
import { compareHashedString } from '#/utils/hash';

export async function dbGetUserById({
  userId,
}: {
  userId: string | undefined;
}) {
  if (userId === undefined) return undefined;

  const maybeUser = (
    await db.select().from(userTable).where(eq(userTable.id, userId))
  )[0];

  if (maybeUser === undefined) return undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...obscuredUser } = maybeUser;

  return obscuredUser;
}

export async function dbGetUserByEmailAndPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const userRows = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));
  const maybeUser = userRows[0];

  if (maybeUser === undefined) {
    return undefined;
  }

  const passwordVerified = await compareHashedString(
    password,
    maybeUser.passwordHash
  );
  if (passwordVerified === false) {
    return undefined;
  }

  return maybeUser;
}

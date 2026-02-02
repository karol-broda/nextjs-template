import { getRequiredSession } from '#/auth/utils';

export default async function AuthedLayout({ children }: { children: React.ReactNode }) {
  await getRequiredSession();
  return <>{children}</>;
}

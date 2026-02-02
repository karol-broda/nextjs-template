import { getRequiredSession } from '#/auth/utils';
import { Container } from '#/components/layout/container';
import { Stack } from '#/components/layout/stack';
import { ThemeToggle } from '#/components/theme-toggle';

export default async function HomePage() {
  const session = await getRequiredSession();

  return (
    <Container maxWidth="lg" className="py-8">
      <Stack gap="lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">dashboard</h1>
          <ThemeToggle />
        </div>
        <p className="text-muted-foreground">logged in as {session.user.email}</p>
      </Stack>
    </Container>
  );
}

import { getRequiredSession } from '#/auth/utils';
import { Container } from '#/components/layout/container';
import { Stack } from '#/components/layout/stack';
import { ThemeToggle } from '#/components/theme-toggle';
import { UserMenu } from './_user-menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card';
import { Separator } from '#/components/ui/separator';
import { Badge } from '#/components/ui/badge';

export default async function HomePage() {
  const session = await getRequiredSession();

  return (
    <Container maxWidth="lg" className="py-8">
      <Stack gap="lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">dashboard</h1>
            <p className="text-sm text-muted-foreground">logged in as {session.user.email}</p>
          </div>
          <Stack direction="row" gap="sm" align="center">
            <ThemeToggle />
            <UserMenu
              name={session.user.name}
              email={session.user.email}
              image={session.user.image ?? null}
            />
          </Stack>
        </div>

        <Separator />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>status</CardDescription>
              <CardTitle className="flex items-center gap-2">
                active <Badge variant="default">live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                your account is active and in good standing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>session</CardDescription>
              <CardTitle>{session.user.email}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                signed in since {new Date(session.session.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>plan</CardDescription>
              <CardTitle className="flex items-center gap-2">
                free <Badge variant="secondary">starter</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">upgrade to unlock more features.</p>
            </CardContent>
          </Card>
        </div>
      </Stack>
    </Container>
  );
}

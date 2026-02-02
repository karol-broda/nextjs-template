import { Container } from '#/components/layout/container';
import { Stack } from '#/components/layout/stack';

export default function Loading() {
  return (
    <Container maxWidth="lg" className="py-8">
      <Stack gap="lg">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-4 w-64 animate-pulse rounded bg-muted" />
      </Stack>
    </Container>
  );
}

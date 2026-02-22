import { Container } from '#/components/layout/container';
import { Stack } from '#/components/layout/stack';
import { Skeleton } from '#/components/ui/skeleton';
import { Separator } from '#/components/ui/separator';

export default function Loading() {
  return (
    <Container maxWidth="lg" className="py-8">
      <Stack gap="lg">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-40" />
          <div className="flex items-center gap-2">
            <Skeleton className="size-9 rounded-md" />
            <Skeleton className="size-8 rounded-full" />
          </div>
        </div>

        <Separator />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex flex-col gap-4 rounded-xl border p-6">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          ))}
        </div>
      </Stack>
    </Container>
  );
}

'use client';

import { Button } from '#/components/ui/button';
import { Center } from '#/components/layout/center';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const digest = error.digest ?? null;

  return (
    <Center fullHeight className="flex-col gap-4">
      <h1 className="text-2xl font-bold">something went wrong</h1>
      <p className="text-muted-foreground">an unexpected error occurred. please try again.</p>
      {digest !== null && (
        <p className="font-mono text-xs text-muted-foreground/60">ref: {digest}</p>
      )}
      <Button variant="outline" onClick={reset}>
        try again
      </Button>
    </Center>
  );
}

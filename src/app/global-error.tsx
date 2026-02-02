'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">something went wrong</h1>
          <p className="text-muted-foreground">
            {error.message !== '' ? error.message : 'a critical error occurred'}
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            try again
          </button>
        </div>
      </body>
    </html>
  );
}

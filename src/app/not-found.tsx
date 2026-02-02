import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">page not found</p>
      <Link href="/" className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
        go home
      </Link>
    </div>
  );
}

import Link from 'next/link';
import { Button } from '#/components/ui/button';
import { Center } from '#/components/layout/center';

export default function NotFound() {
  return (
    <Center fullHeight className="flex-col gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">page not found</p>
      <Button render={<Link href="/" />}>go home</Button>
    </Center>
  );
}

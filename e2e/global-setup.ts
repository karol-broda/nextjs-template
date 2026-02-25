import { execSync } from 'node:child_process';

export default function globalSetup() {
  try {
    console.log('seeding database...');
    execSync('bun run db:seed', { stdio: 'inherit' });
  } catch {
    console.warn(
      'warning: db seed failed — authed tests will be skipped. run `bun run db:start && bun run db:migrate && bun run db:seed` first.',
    );
  }
}

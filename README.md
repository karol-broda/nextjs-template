```
  ∧,,,∧
( ̳• · • ̳)
/     づ♡
```

# nextjs-template

an opinionated next.js starter for shipping fast without thinking about setup

## stack

### core

- next.js 16 with turbopack and react compiler
- tailwindcss v4 with radix ui components

### data

- drizzle orm with postgres
- tanstack query, tanstack table, tanstack form
- next-safe-action for type-safe server actions
- zod v4 for validation

### auth

- better-auth with credentials and session management

### api

- elysia mounted as a catch-all route
- eden client for end-to-end type-safe api calls

### utilities

- neverthrow for typed error handling
- nuqs for url search param state
- pino for structured logging
- sonner for toast notifications

### tooling

- bun as the runtime and package manager
- oxlint and oxfmt for linting and formatting
- bun test with testing-library for unit tests
- playwright for e2e tests
- nix flake with direnv for reproducible dev environments

## setup

```sh
cp .env.example .env
bun install
```

start a local postgres instance (requires docker):

```sh
bun run db:start
```

push the schema and seed some data:

```sh
bun run db:push
bun run db:seed
```

start the dev server:

```sh
bun run dev
```

## database workflows

use `db:push` during development when iterating on the schema. it syncs the database directly with your schema without creating migration files, which is faster but not suitable for production

when the schema is ready and you need trackable, reproducible changes (staging, production, ci), use `db:generate` to create a migration file from the diff, then `db:migrate` to apply it

```sh
bun run db:generate   # creates a migration file in src/db/migrations
bun run db:migrate    # applies pending migrations
```

check `package.json` for all available scripts

---
also maybe remember to change geist to another font, just kept as default for now
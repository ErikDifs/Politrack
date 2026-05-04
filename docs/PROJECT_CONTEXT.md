# Project Context: PoliTrack

## Overview

PoliTrack is a **monorepo starter template** optimized for AI-assisted development. It demonstrates a production-ready setup that agents can safely extend with new features.

## What It Does

PoliTrack is a political tracking application (foundational scaffold) that:

- Displays a list of users from a PostgreSQL database
- Provides a REST API to fetch user data
- Implements full-stack example from DB to UI

## Current Features

- **Users List**: Displays all users with their status (Active/Inactive)
- **User API**: GET endpoint that returns JSON user data
- **Database**: PostgreSQL with Drizzle ORM for type-safe queries

## Key Constraints

- **Local Only**: Everything runs via Docker (no external services)
- **Type-Safe**: Full TypeScript throughout (frontend, backend, database)
- **Tested**: All code must pass tests, type checks, and linting
- **Opinionated**: One way to do things - no flexibility for flexibility's sake

## Tech Stack

| Layer           | Technology              |
| --------------- | ----------------------- |
| Frontend        | SvelteKit + Svelte      |
| Styling         | Tailwind CSS            |
| Icons           | lucide-svelte           |
| Backend         | SvelteKit server routes |
| Database        | PostgreSQL 16           |
| ORM             | Drizzle                 |
| Language        | TypeScript              |
| Testing         | Vitest + Playwright     |
| Package Manager | pnpm                    |

## Definition of Done

A feature or fix is complete only when:

✅ Tests pass (`pnpm test && pnpm test:e2e`)  
✅ TypeScript compiles with no errors (`pnpm typecheck`)  
✅ Code passes linting (`pnpm lint`)

Run `pnpm verify` to check all three.

## Repository Structure

```
PoliTrack/
├── apps/
│   └── web/                 # SvelteKit application
├── packages/
│   ├── db/                  # Drizzle schema, migrations, client
│   └── config/              # Shared configs (future)
├── docs/                    # Documentation
├── .sandcastle/             # AI orchestration
├── docker-compose.yml       # PostgreSQL setup
├── package.json             # Root workspace
└── README.md                # Quick start
```

## How to Run

```bash
# Install
pnpm install

# Start database
pnpm docker:up

# Migrations and seed
pnpm db:migrate
pnpm db:seed

# Development
pnpm dev          # App runs at http://localhost:5173

# Verify everything works
pnpm verify
```

## Important Patterns

### Adding a New Database Table

1. Edit `packages/db/src/schema.ts` to define the table
2. Run `pnpm db:generate` to create migration
3. Run `pnpm db:migrate` to apply it
4. Use `db.query` to access data

### Creating a New API Route

1. Create `apps/web/src/routes/api/[endpoint]/+server.ts`
2. Export `GET`, `POST`, `PUT`, `DELETE` as needed
3. Import `db` from `@politracks/db`
4. Return JSON responses

### Styling Components

All styling uses **Tailwind CSS classes**. No component library - use semantic HTML + Tailwind.

### Writing Tests

- **Unit tests**: `apps/web/tests/unit/*.test.ts`
- **Integration tests**: `apps/web/tests/integration/*.test.ts`
- **E2E tests**: `apps/web/tests/e2e/*.spec.ts`

Use `vitest` for unit/integration, `playwright` for E2E.

## Environment

- Node.js 20+
- Docker + Docker Compose
- PostgreSQL 16 (via Docker)

## Common Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm test             # Run unit + integration tests
pnpm test:e2e         # Run E2E tests
pnpm typecheck        # Check types
pnpm lint             # Check linting
pnpm format           # Auto-fix formatting and linting
pnpm verify           # Run all checks
pnpm docker:reset     # Reset database
```

## Next Steps for Agents

When implementing new features:

1. Read AGENT_RULES.md for strict guidelines
2. Use TASK_TEMPLATE.md to understand task structure
3. Follow existing patterns in code
4. Write tests first (TDD)
5. Ensure `pnpm verify` passes before finishing

**Do not** add dependencies, change configs, or refactor unrelated code without explicit instruction.

# PoliTrack Monorepo

A production-ready monorepo boilerplate optimized for AI-assisted development.

**Tech Stack**: SvelteKit, TypeScript, PostgreSQL, Drizzle ORM, Tailwind CSS

## Quick Start

```bash
# Setup
pnpm install
cp .env.example .env
pnpm docker:up
pnpm db:migrate
pnpm db:seed

# Development
pnpm dev

# Verify all checks pass
pnpm verify
```

## Project Structure

```
/apps/web              # SvelteKit application
/packages/db           # Database layer (Drizzle ORM)
/packages/config       # Shared configurations
/docs                  # Documentation
/.sandcastle           # AI orchestration
```

## Available Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run unit and integration tests
- `pnpm test:e2e` - Run end-to-end tests
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Lint code and check formatting
- `pnpm format` - Format and fix linting issues
- `pnpm verify` - Run all checks (typecheck, lint, test, test:e2e)
- `pnpm docker:up` - Start PostgreSQL container
- `pnpm docker:down` - Stop PostgreSQL container

## Database Commands

- `pnpm db:generate` - Generate Drizzle migration
- `pnpm db:migrate` - Run migrations
- `pnpm db:seed` - Seed database with example data

## Documentation

- [PROJECT_CONTEXT.md](./docs/PROJECT_CONTEXT.md) - Project overview
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Architecture and folder structure
- [AGENT_RULES.md](./AGENT_RULES.md) - Rules for AI agents
- [TASK_TEMPLATE.md](./docs/TASK_TEMPLATE.md) - Template for creating tasks

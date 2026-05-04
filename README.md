# PoliTrack: Civic Transparency Platform

Build a civic transparency platform that tracks politicians and turns their actions into understandable, actionable insights for citizens.

## Vision

PoliTrack is designed to reduce complexity, increase transparency, and enable citizens to monitor, understand, and respond to political behavior in a more informed and coordinated way.

The platform centers around **detailed politician profiles** that function like public accountability dossiers. Each profile aggregates structured data such as:

- Voting records and bill sponsorships
- Public statements and campaign promises
- Funding sources and lobbying influence
- Key events and decisions over time

### Core Features

**Politician Profiles** - Comprehensive public dossiers with:

- Basic information (name, party, jurisdiction, office)
- Timeline of accountability events
- Evidence-linked actions and decisions

**Accountability Events** - Structured data showing:

- Votes and legislative actions
- Public statements and positions
- Donations and funding
- Campaign promises and outcomes
- Contradictions between words and actions

**Smart Tracking** - Users can:

- Follow elected representatives and specific politicians
- Track policy issues and bills
- Receive notifications when important events occur
- View timelines of actions tied to politicians or issues
- Explore relationships between money, influence, and behavior

**Fact-Grounded Discussions** - Structured, evidence-linked discussion attached to specific events, votes, or claims — not a generic forum

**Country-Agnostic Design** - Starting with US data but designed to support expansion to other political systems by abstracting entities like politicians, offices, legislative events, and funding sources.

---

## Tech Stack

**Frontend**

- [SvelteKit](https://kit.svelte.dev/) - Modern, performant web framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [Vitest](https://vitest.dev/) - Unit and integration testing
- [Playwright](https://playwright.dev/) - E2E testing

**Backend & Database**

- [Node.js](https://nodejs.org/) - Runtime
- [PostgreSQL](https://www.postgresql.org/) - Data persistence
- [Drizzle ORM](https://orm.drizzle.team/) - Type-safe database queries
- [TypeScript](https://www.typescriptlang.org/) - Type safety across stack

**DevOps & Tooling**

- [Docker](https://www.docker.com/) - Containerization
- [pnpm](https://pnpm.io/) - Fast, disk-efficient package manager
- [ESLint](https://eslint.org/) - Code quality
- [Prettier](https://prettier.io/) - Code formatting

**AI-Assisted Development**

- [Sandcastle](https://github.com/mattpocock/sandcastle) - Docker-based agent orchestration
- GitHub Copilot - AI-powered development

---

## Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- pnpm

### Setup

```bash
# Install dependencies
pnpm install

# Start PostgreSQL
pnpm docker:up

# Setup database
pnpm db:migrate
pnpm db:seed

# Start development server
pnpm dev
```

Development server runs at `http://localhost:5173`

### Environment Variables

```bash
# Root .env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/politracks_dev

# .sandcastle/.env (for AI agent orchestration)
OPENAI_KEY=your-openai-api-key-here
GH_TOKEN=your-github-token-here
```

---

## Project Structure

```
/apps/web                 # SvelteKit application
  /src/routes            # Page routes and API endpoints
  /src/lib               # Reusable utilities and components
  /tests                 # Unit, integration, E2E tests

/packages/db             # Database layer
  /src/schema.ts         # Drizzle schema definitions
  /scripts               # Migration and seed scripts
  /drizzle               # Migrations

/docs                    # Documentation
  /tasks                 # Task definitions using TASK_TEMPLATE.md

/.sandcastle             # AI agent orchestration
  /main.ts              # Sandcastle entry point
  /*.md                 # Prompts for agent workflows

/scripts                 # Project-level scripts
  /task-*.js           # Task system CLI
```

---

## Development Workflow

### Available Commands

**Development**

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

**Testing**

- `pnpm test` - Run unit and integration tests
- `pnpm test:e2e` - Run end-to-end tests
- `pnpm verify` - Run all checks (typecheck, lint, test, test:e2e)

**Code Quality**

- `pnpm typecheck` - TypeScript type checking
- `pnpm lint` - Lint code and check formatting
- `pnpm format` - Format and fix linting issues

**Database**

- `pnpm db:generate` - Generate Drizzle migration from schema changes
- `pnpm db:migrate` - Run pending migrations
- `pnpm db:seed` - Seed database with example data

**Docker**

- `pnpm docker:up` - Start PostgreSQL container
- `pnpm docker:down` - Stop PostgreSQL container
- `pnpm docker:reset` - Reset database (stop, remove volume, restart)

**Task Management**

- `pnpm task:list` - List all tasks
- `pnpm task:run <id>` - Start working on a task
- `pnpm task:verify <id>` - Verify task completion

**AI-Assisted Development**

- `pnpm sandcastle` - Run Sandcastle agent orchestration in Docker

---

## AI-Assisted Development with Sandcastle

This project uses [Sandcastle](https://github.com/mattpocock/sandcastle) for Docker-based agent orchestration. An agent can:

1. Read task descriptions from `/docs/tasks/`
2. Spin up an isolated Docker container with your codebase
3. Execute tasks following strict [AGENT_RULES.md](./AGENT_RULES.md) (TDD, minimal changes, existing patterns)
4. Run `pnpm verify` to validate all checks pass
5. Return results to your worktree

**To use:**

```bash
# Ensure .sandcastle/.env is configured with OPENAI_KEY
pnpm sandcastle
```

Then provide a task description to the agent.

---

## Task System

Tasks are defined in `/docs/tasks/` following [TASK_TEMPLATE.md](./docs/TASK_TEMPLATE.md).

Each task includes:

- **Goal** - User-visible outcome
- **Acceptance Criteria** - Testable conditions
- **Tests to Write First** - TDD examples
- **Out of Scope** - What NOT to do
- **Implementation Order** - Step-by-step guidance

### Active Tasks

View and track tasks:

```bash
pnpm task:list
```

---

## Coding Standards

See [AGENT_RULES.md](./AGENT_RULES.md) for strict development guidelines:

- ✅ Test-driven development (TDD)
- ✅ Minimal, focused changes
- ✅ Follow existing code patterns
- ✅ No unnecessary dependencies
- ✅ Type-safe TypeScript
- ✅ Comprehensive tests (unit, integration, E2E)

---

## Documentation

- [PROJECT_CONTEXT.md](./docs/PROJECT_CONTEXT.md) - Project overview and data model
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - System architecture and folder structure
- [AGENT_RULES.md](./AGENT_RULES.md) - Strict guidelines for AI agents and developers
- [TASK_TEMPLATE.md](./docs/TASK_TEMPLATE.md) - Template and structure for creating tasks
- [TASK_SYSTEM_QUICK_REF.md](./docs/TASK_SYSTEM_QUICK_REF.md) - Quick reference for task system
- [TASK_CONVENTION.md](./docs/TASK_CONVENTION.md) - Task naming and conventions

---

## Contributing

1. Read [AGENT_RULES.md](./AGENT_RULES.md) to understand development standards
2. Create a task in `/docs/tasks/` following [TASK_TEMPLATE.md](./docs/TASK_TEMPLATE.md)
3. Implement following TDD: write tests first, then code
4. Run `pnpm verify` — all checks must pass
5. Commit with clear messages

---

## License

MIT

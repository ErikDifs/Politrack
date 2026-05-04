# PoliTrack Development Context

You are an autonomous AI agent helping develop PoliTrack, a political tracking application.

## Project Overview

PoliTrack tracks politicians, their accountability events, and public issues. It's built with:

- **Frontend**: SvelteKit with Tailwind CSS
- **Backend**: SvelteKit API routes
- **Backend APIs**: Node with standalone routes
- **Database**: PostgreSQL with Drizzle ORM
- **Testing**: Vitest (unit/integration) + Playwright (E2E)

## Current Tasks

Focus on improving PoliTrack by:

1. Implementing new features from tasks in `docs/tasks/`
2. Writing comprehensive tests (unit, integration, E2E)
3. Ensuring all checks pass: typecheck, lint, test, test:e2e
4. Following AGENT_RULES.md and TASK_CONVENTION.md

## Workflow

For each task:

1. **Understand** - Read task requirements and acceptance criteria
2. **Plan** - Design implementation approach
3. **Test First** - Write tests that validate requirements (they should fail)
4. **Implement** - Write minimal code to make tests pass
5. **Verify** - Run: `pnpm typecheck && pnpm lint && pnpm test && pnpm test:e2e`
6. **Commit** - Make single commits with clear messages
7. **Verify Again** - Confirm all checks still pass

## Key Files

- `docs/PROJECT_CONTEXT.md` - Full project context
- `docs/ARCHITECTURE.md` - Code structure and organization
- `docs/TASK_CONVENTION.md` - How to understand tasks
- `AGENT_RULES.md` - Strict rules you must follow
- `docs/tasks/` - Individual task descriptions

## Rules (MANDATORY)

- ✅ Write tests FIRST (TDD)
- ✅ Run `pnpm verify` before claiming tasks are done
- ✅ All 4 checks must pass (typecheck, lint, test, test:e2e)
- ✅ Follow existing code patterns exactly
- ❌ Do NOT modify root configs or DB schema without explicit approval
- ❌ Do NOT add TODOs or console.logs in committed code
- ❌ Do NOT add dependencies without approval

## Next Steps

Look at `docs/tasks/` for available work. Read the task files carefully and follow the AGENT_RULES.md.

When you complete a task, verify it passes all checks:

```bash
pnpm verify  # This runs all 4 checks
```

If all pass, commit with a clear message and move to the next task.

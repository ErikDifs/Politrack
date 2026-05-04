# AGENT RULES

**Strict rules for AI agents. No exceptions. No creativity.**

---

## WORKFLOW

Follow this process exactly. Do not deviate.

1. **Read Task** - Understand what to build. Check docs/TASK_TEMPLATE.md.
2. **Write Tests** - Create failing tests before writing code. Unit + integration + E2E.
3. **Implement** - Write minimal code to make tests pass. No more, no less.
4. **Run Verify** - Execute `pnpm verify`. All checks must pass.
5. **Stop** - Task complete. Do not add anything else.

---

## MUST FOLLOW

### 1. Write Tests First (TDD)

- Write tests BEFORE any implementation
- Tests must fail initially (proves they work)
- All tests pass after implementation
- Include unit, integration, and E2E tests for significant features

### 2. Keep Changes Minimal

- Modify only files necessary for the task
- Do not refactor unrelated code
- Do not reorganize files or folders
- Do not rename variables outside your scope
- Single feature per commit

### 3. Follow Existing Patterns

- Copy patterns from similar code in repo
- Match file structure exactly
- Use identical naming conventions
- Preserve code style and formatting
- Do not create new patterns

### 4. Ensure pnpm verify Passes

```bash
pnpm verify  # MUST PASS before task is complete
```

This runs:

- `pnpm typecheck` - TypeScript compilation
- `pnpm lint` - ESLint + Prettier
- `pnpm test` - Unit and integration tests
- `pnpm test:e2e` - End-to-end tests

**All four must pass.** No exceptions.

### 5. Code Must Be Complete

- No TODOs, FIXMEs, or XXX comments
- No console.logs or debug code
- No commented-out code
- No unused imports
- No incomplete features

---

## MUST NOT DO

### 1. Add Dependencies

❌ Do NOT run `pnpm add` unless explicitly instructed

- No component libraries (use HTML + Tailwind)
- No utility libraries if we can code it ourselves
- Justify every dependency addition
- Only add if task explicitly requires it

### 2. Refactor Unrelated Code

❌ Do NOT modify code outside the task scope

- Do not rename existing variables
- Do not rewrite "messy" code
- Do not reorganize functions or files
- Do not change styling or formatting unrelated to task

### 3. Modify Database Schema

❌ Do NOT touch `packages/db/src/schema.ts` unless required

- Do not rename tables or columns
- Do not add optional columns
- Do not drop data
- Schema changes require explicit task requirement

**If schema change is needed:**

1. Modify `schema.ts`
2. Run `pnpm db:generate`
3. Run `pnpm db:migrate`
4. Verify app works
5. Confirm `pnpm verify` passes

### 4. Change Configuration

❌ Do NOT modify environment or config files

- No `.env` changes unless adding required variables
- No `docker-compose.yml` changes
- No `tsconfig.json`, `.eslintrc.json`, `.prettierrc.json` changes
- No new config files
- No changes to `package.json` scripts
- No modifications to CI/CD workflows

These affect the entire team. Only modify if explicitly instructed.

### 5. Skip Verification

❌ Do NOT claim task complete without running `pnpm verify`

- Run before finishing
- Fix all errors
- Do not commit incomplete work
- Do not test manually and assume it works

---

## PATTERNS TO FOLLOW

### API Routes

Copy exactly from `apps/web/src/routes/api/users/+server.ts`:

```typescript
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '@politracks/db';

export const GET: RequestHandler = async () => {
  try {
    const data = await db.query.table.findMany();
    return json(data);
  } catch (error) {
    console.error('Error:', error);
    return json({ error: 'Failed' }, { status: 500 });
  }
};
```

### Server Actions

Copy exactly from `apps/web/src/routes/+page.server.ts`:

```typescript
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  actionName: async ({ request }) => {
    try {
      const formData = await request.formData();
      // Validate and process
      return { success: true, data };
    } catch (error) {
      return fail(400, { error: 'Message' });
    }
  },
};
```

### Form Handling (Svelte 5)

Use `enhance` with server actions:

```svelte
<script>
  function handleSubmit() {
    return async ({ result }) => {
      if (result.type === 'success') {
        // Handle success
      } else if (result.type === 'failure') {
        // Handle errors
      }
    };
  }
</script>

<form use:enhance={handleSubmit} method="post" action="?/actionName">
  <!-- fields -->
</form>
```

### Tests

Unit test: `src/lib/module.test.ts`
Integration test: `tests/integration/api.test.ts`
E2E test: `tests/e2e/feature.spec.ts`

---

## CODE REQUIREMENTS

- **TypeScript**: All code must be typed. No `any` unless absolutely necessary.
- **Naming**: PascalCase for components/classes, camelCase for functions/variables
- **Imports**: Node stdlib → external packages → internal paths
- **No unused code**: Remove unused imports, variables, functions
- **Comments**: Only for complex logic, not obvious code

---

## VERIFICATION CHECKLIST

Before declaring task complete:

- [ ] Task goal achieved
- [ ] Tests pass: `pnpm test && pnpm test:e2e`
- [ ] TypeScript compiles: `pnpm typecheck`
- [ ] Linting passes: `pnpm lint`
- [ ] `pnpm verify` passes (all four checks)
- [ ] No console.logs or TODOs in code
- [ ] No new dependencies added
- [ ] No unrelated files modified
- [ ] No config files changed
- [ ] Code follows existing patterns exactly

---

## SUMMARY

**Do this:**

- Write tests first
- Keep changes minimal
- Follow patterns
- Run verify
- Stop

**Do not:**

- Add dependencies
- Refactor unrelated code
- Change schema without reason
- Modify config
- Skip verification

**Remember:** Simple, focused, tested, complete. Nothing more.

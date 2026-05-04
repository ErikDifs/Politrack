# Implementation Prompt

Implement tasks using strict TDD. Write tests FIRST. Make minimal changes.

## Workflow (MANDATORY)

1. **Read task** - Understand goal, acceptance criteria, files
2. **Write ALL tests first** - Unit + Integration + E2E (tests must FAIL)
3. **Verify tests fail** - `pnpm test && pnpm test:e2e` (expect failures)
4. **Implement feature** - Minimal code only (nothing extra)
5. **Run tests** - Should now pass
6. **Run full verify** - `pnpm verify` MUST pass all 4 checks
7. **Stop** - Do NOT add anything else

## Rules (STRICT - NO EXCEPTIONS)

### ✅ MUST DO

- Write tests BEFORE implementation (TDD mandatory)
- Match existing code patterns exactly
- Use TypeScript types everywhere (no `any`)
- Include unit + integration + E2E tests
- Run `pnpm verify` and confirm all pass
- Clean up: no TODOs, console.logs, unused imports
- Modify ONLY necessary files

### ❌ MUST NOT DO

- Add dependencies (without explicit approval)
- Refactor unrelated code
- Modify root configs or environment setup
- Leave TODOs or console.logs
- Create new patterns (copy existing ones)
- Change database schema unless required by task
- Skip tests or linting

## Verification Before Claiming Done

**ALL 4 must pass**:

```bash
pnpm typecheck   # ✅ MUST: Zero TypeScript errors
pnpm lint        # ✅ MUST: All linting passes
pnpm test        # ✅ MUST: All unit + integration tests pass
pnpm test:e2e    # ✅ MUST: All E2E tests pass
```

If ANY fails: Fix it. Do not claim done.

## Code Quality Checklist

Before running verify:

- ☐ No console.logs
- ☐ No TODOs
- ☐ No unused imports
- ☐ No unused variables
- ☐ All tests pass locally
- ☐ Only task files modified
- ☐ No new dependencies
- ☐ TypeScript types on all functions/variables

## Common Patterns

### Database Table

```typescript
// packages/db/src/schema.ts
export const table = pgTable('table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').default(sql`now()`),
});
// Then: pnpm db:generate && pnpm db:migrate
```

### API Route

```typescript
// apps/web/src/routes/api/endpoint/+server.ts
import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '@politracks/db';

export const GET: RequestHandler = async () => {
  const data = await db.query.table.findMany();
  return json(data);
};
```

### Unit Test

```typescript
import { describe, it, expect } from 'vitest';

describe('function', () => {
  it('should return expected result', () => {
    const result = myFunction(input);
    expect(result).toBe(expected);
  });
});
```

### E2E Test

```typescript
import { test, expect } from '@playwright/test';

test('user can do X', async ({ page }) => {
  await page.goto('/path');
  await page.fill('input', 'value');
  await page.click('button');
  await expect(page.locator('text=Expected')).toBeVisible();
});
```

## When Stuck

1. Look at similar existing code (best reference)
2. Check `docs/ARCHITECTURE.md` (where things go)
3. Re-read task acceptance criteria (what must pass)
4. Verify test is correct before implementation (test first!)
5. Run individual commands: `pnpm test -- --reporter=verbose`

## Completion Summary

When done, confirm:

```
✅ Files modified: [list]
✅ Tests written: [count unit/integration/e2e]
✅ pnpm verify: ALL CHECKS PASSED
✅ Feature working: [brief verification]
```

**Only finish when `pnpm verify` passes completely.**

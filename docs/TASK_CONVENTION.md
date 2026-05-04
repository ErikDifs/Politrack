# Task Convention

Simple, file-based task management system. No external tools required.

---

## File Organization

Tasks are stored in `/docs/tasks/` directory. Each task is a standalone markdown file.

```
docs/tasks/
├── 01-add-email-validation.md
├── 02-create-positions-table.md
├── 03-add-role-filter.md
└── README.md (index of all tasks)
```

## Naming Convention

File format: `<ID>-<SLUG>.md`

- **ID**: Two-digit number (01, 02, 03, ..., 99)
- **SLUG**: Kebab-case task name (lowercase, hyphens, no spaces)
- **Example**: `01-add-email-validation.md`

---

## Task File Format

Each task file follows `docs/TASK_TEMPLATE.md` structure. Start with:

````markdown
# Task 01: Add Email Validation

## Goal

Users receive clear error messages when entering invalid email addresses.

## Acceptance Criteria

- [ ] Email validation regex matches RFC 5322
- [ ] Error message displays on form
- [ ] Tests pass
- [ ] pnpm verify passes

## Files Likely Involved

- apps/web/src/lib/validation.ts
- apps/web/tests/unit/validation.test.ts
- apps/web/src/routes/+page.svelte

## Tests to Write First

### Unit Test

```typescript
import { describe, it, expect } from 'vitest';
import { validateEmail } from '$lib/validation';

describe('Email validation', () => {
  it('should accept valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  it('should reject invalid email', () => {
    expect(validateEmail('invalid')).toBe(false);
  });
});
```
````

### E2E Test

```typescript
import { test, expect } from '@playwright/test';

test('user sees error for invalid email', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[type="email"]', 'invalid');
  await page.click('button');
  await expect(page.locator('text=Invalid email')).toBeVisible();
});
```

## Out of Scope

- ❌ Complex email verification (DNS checks)
- ❌ Internationalized email addresses (for now)

## Constraints

- Must complete in < 1 hour
- Uses existing Zod validation patterns

## Implementation Order

1. Write all tests (must fail)
2. Add validation function to lib/validation.ts
3. Add error message display to form
4. Run tests: pnpm test && pnpm test:e2e
5. Run verify: pnpm verify

## Status

- [ ] Not started
- [ ] In progress
- [ ] Review
- [ ] Done

````

---

## Running Tasks

### Run a Task (Interactive)

```bash
pnpm task:run 01-add-email-validation
````

This command:

1. Displays the task from `/docs/tasks/01-add-email-validation.md`
2. Marks task as "In progress" in status
3. Provides implementation instructions
4. Runs test suite to verify baseline

### Verify Task Completion

```bash
pnpm task:verify 01-add-email-validation
```

This command:

1. Checks that task file exists
2. Extracts acceptance criteria from task file
3. Runs all tests: `pnpm verify`
4. Marks task as "Done" in status if all pass
5. Reports any failures

---

## Task Index (README)

Keep `/docs/tasks/README.md` as a master index:

```markdown
# Tasks

All tasks stored as markdown files in this directory.

## Active Tasks

- [ ] [01 - Add Email Validation](01-add-email-validation.md)
- [ ] [02 - Create Positions Table](02-create-positions-table.md)

## In Review

- [x] [03 - Add Role Filter](03-add-role-filter.md)

## Completed

- [x] [00 - Example Task](00-example-task.md)
```

---

## Task Status Tracking

Each task file has a `## Status` section with checkboxes:

```markdown
## Status

- [ ] Not started
- [ ] In progress
- [ ] Review
- [x] Done
```

Update this when:

- Starting work: Check "In progress"
- Submitting for review: Check "Review"
- Completed: Check "Done"

---

## Workflow

1. **Create task** - Add new file to `/docs/tasks/` following template
2. **Run task** - `pnpm task:run <id>-<slug>`
3. **Implement** - Follow task instructions
4. **Verify** - `pnpm task:verify <id>-<slug>`
5. **Complete** - Update status to "Done"

---

## Benefits

✅ **Simple** - Just markdown files, no database  
✅ **Version controlled** - Tasks tracked in git  
✅ **Portable** - Can be read and edited anywhere  
✅ **Standalone** - No external services required  
✅ **Trackable** - Status visible in git history  
✅ **Searchable** - Tasks visible in code editor

---

## Commands Reference

```bash
# List all tasks
ls -1 docs/tasks/*.md

# Run a task
pnpm task:run 01-add-email-validation

# Verify task completion
pnpm task:verify 01-add-email-validation

# View task in editor
cat docs/tasks/01-add-email-validation.md

# Search for tasks by name
grep -l "Goal" docs/tasks/*.md
```

# Task 01: Add Role Badge to User List

## Goal

Users see each person's role (admin, editor, viewer) displayed as a colored badge in the user list.

## Acceptance Criteria

- [ ] User list table has "Role" column with badge styling
- [ ] Role badges: red (admin), blue (editor), gray (viewer)
- [ ] API endpoint returns user roles
- [ ] All E2E tests pass
- [ ] pnpm verify passes

## Files Likely Involved

- apps/web/src/routes/users/+page.svelte (add Role column)
- apps/web/src/routes/users/+page.server.ts (load role data)
- apps/web/src/lib/role-badge.ts (add getRoleBadgeColor function)
- apps/web/tests/unit/role-badge.test.ts (unit tests)
- apps/web/tests/e2e/users.spec.ts (E2E tests)

## Tests to Write First

### Unit Test

```typescript
// apps/web/tests/unit/role-badge.test.ts
import { describe, it, expect } from 'vitest';
import { getRoleBadgeColor } from '$lib/role-badge';

describe('Role badge styling', () => {
  it('should return red for admin role', () => {
    const color = getRoleBadgeColor('admin');
    expect(color).toBe('bg-red-500');
  });

  it('should return blue for editor role', () => {
    const color = getRoleBadgeColor('editor');
    expect(color).toBe('bg-blue-500');
  });

  it('should return gray for viewer role', () => {
    const color = getRoleBadgeColor('viewer');
    expect(color).toBe('bg-gray-500');
  });

  it('should return default color for unknown role', () => {
    const color = getRoleBadgeColor('unknown');
    expect(color).toBe('bg-gray-300');
  });
});
```

### E2E Test

```typescript
// apps/web/tests/e2e/users.spec.ts
import { test, expect } from '@playwright/test';

test('user list displays role badges', async ({ page }) => {
  await page.goto('/users');

  // Check column header
  await expect(page.locator('th:has-text("Role")')).toBeVisible();

  // Check role badges are visible
  await expect(page.locator('.bg-red-500:has-text("admin")')).toBeVisible();
  await expect(page.locator('.bg-blue-500:has-text("editor")')).toBeVisible();
});
```

## Out of Scope

- ❌ Do not edit user roles (read-only display only)
- ❌ Do not add role permissions
- ❌ Do not refactor existing user list styling
- ❌ Do not add new database schema changes

## Constraints

- Must complete in < 2 hours
- Uses existing Tailwind CSS classes
- Role data already exists in database
- API already returns role field

## Implementation Order

1. Write all tests (unit + E2E) - they must FAIL
2. Create `$lib/role-badge.ts` with `getRoleBadgeColor()` function
3. Add "Role" column header to `+page.svelte`
4. Add role badge to each table row
5. Run tests: `pnpm test && pnpm test:e2e`
6. Run verify: `pnpm verify`
7. Mark task as Done

## Status

- [ ] Not started
- [ ] In progress
- [ ] Review
- [ ] Done

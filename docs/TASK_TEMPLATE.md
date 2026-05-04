# Task Template

Use this template when creating tasks. Tasks must be small, focused, and independently completable.

---

## What Makes a Good Task?

A task is good if:

- ✅ It can be completed in one session (~2 hours max)
- ✅ It doesn't depend on other incomplete tasks
- ✅ A single person/agent can complete it alone
- ✅ It produces a testable outcome
- ✅ It doesn't require design decisions

A task is too big if:

- ❌ It says "build the entire user dashboard"
- ❌ It requires multiple database schema changes
- ❌ It depends on incomplete tasks
- ❌ It says "refactor the codebase"
- ❌ Acceptance criteria are vague or numerous (>5 items)

---

## Task Template

### Title

**[Type] [Feature/Fix]: [Clear, specific outcome]**

Examples:

- `Feature: Add email validation to registration form`
- `Fix: User list API returns 500 error`
- `Feature: Display user profile photo on dashboard`

NOT:

- `Feature: Improve user management` (too vague)
- `Feature: Refactor authentication` (too big)

---

### Goal

**One sentence describing the user-visible outcome:**

```
Users can upload a profile photo, which appears on their dashboard immediately.
```

NOT:

- "Fix the user system" (vague)
- "Add photo functionality" (too broad)

---

### Acceptance Criteria

Testable, specific conditions. 3-5 items maximum.

```
- [ ] User can click "Upload Photo" and select a file
- [ ] Photo appears on dashboard without page reload
- [ ] Photo persists after page reload
- [ ] Uploaded file is less than 5MB (or validation error shown)
- [ ] pnpm verify passes (tests, typecheck, lint)
```

Each criterion must be:

- Measurable
- Testable with automated tests
- Independently verifiable

---

### Files Likely Involved

List exact file paths you expect to create or modify:

```
- apps/web/src/routes/profile/+page.svelte        (add upload UI)
- apps/web/src/routes/api/profile/+server.ts      (add POST /profile endpoint)
- apps/web/src/routes/+page.server.ts             (add file upload action)
- apps/web/tests/e2e/profile.spec.ts              (add user flow tests)
- packages/db/src/schema.ts                        (if schema changes needed)
```

Be specific. Don't say "various files" or "as needed".

---

### Tests to Write First (TDD)

Write tests BEFORE implementation. Include all three levels.

#### Unit Test

Test pure logic without UI or database:

```typescript
// Location: apps/web/src/lib/validation.test.ts
import { describe, it, expect } from 'vitest';
import { validatePhotoFile } from '$lib/validation';

describe('Photo upload validation', () => {
  it('should reject files larger than 5MB', () => {
    const result = validatePhotoFile({ size: 6_000_000 });
    expect(result.valid).toBe(false);
    expect(result.error).toContain('5MB');
  });

  it('should accept valid JPEG files', () => {
    const result = validatePhotoFile({
      size: 1_000_000,
      type: 'image/jpeg',
    });
    expect(result.valid).toBe(true);
  });
});
```

#### Integration Test

Test API route behavior (request/response):

```typescript
// Location: apps/web/tests/integration/profile-api.test.ts
import { describe, it, expect } from 'vitest';

describe('POST /api/profile', () => {
  it('should return 400 for oversized file', () => {
    const response = { status: 400 };
    expect(response.status).toBe(400);
  });

  it('should return 201 for valid upload', () => {
    const response = { status: 201 };
    expect(response.status).toBe(201);
  });
});
```

#### E2E Test

Test complete user workflow:

```typescript
// Location: apps/web/tests/e2e/profile.spec.ts
import { test, expect } from '@playwright/test';

test('user can upload profile photo', async ({ page }) => {
  await page.goto('/profile');

  // Find and interact with file input
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles('./test-photo.jpg');

  // Wait for upload
  await page.locator('text=Upload Complete').waitFor();

  // Verify photo appears
  await expect(page.locator('img[alt="Profile photo"]')).toBeVisible();
});
```

---

### Out of Scope

What NOT to do for this task. Be explicit:

```
- ❌ Do not add image resizing or cropping
- ❌ Do not add filters or editing features
- ❌ Do not modify authentication
- ❌ Do not refactor existing upload logic in other features
- ❌ Do not add S3 or cloud storage (use local for MVP)
```

---

### Constraints

Any limitations or requirements:

```
- Must work on desktop and mobile
- File storage: local disk only (not S3)
- Max file size: 5MB
- Supported formats: JPEG, PNG only
- Must complete in < 2 hours
```

---

### Implementation Order

Follow this checklist in order:

1. ✅ Write all tests (unit, integration, E2E) - tests must FAIL initially
2. ✅ Create/update database schema if needed
3. ✅ Generate and run migration (if schema changed): `pnpm db:generate && pnpm db:migrate`
4. ✅ Create API endpoint (POST, GET, etc.)
5. ✅ Create or update UI component
6. ✅ Verify tests pass: `pnpm test && pnpm test:e2e`
7. ✅ Fix TypeScript: `pnpm typecheck`
8. ✅ Fix linting: `pnpm lint`
9. ✅ Final check: `pnpm verify` (all four checks must pass)

Stop when `pnpm verify` passes. Do not add anything else.

---

## EXAMPLE TASK (Filled Out)

### Title

**Feature: Add user role display to user list**

### Goal

Users see each person's role (admin, editor, viewer) in the user list without clicking for details.

### Acceptance Criteria

- [ ] User list table has "Role" column
- [ ] Role shows as badge with color: admin (red), editor (blue), viewer (gray)
- [ ] Database query includes role data
- [ ] All E2E tests pass
- [ ] `pnpm verify` passes

### Files Likely Involved

```
- apps/web/src/routes/users/+page.svelte         (add Role column)
- apps/web/src/routes/users/+page.server.ts      (load role data)
- apps/web/src/routes/api/users/+server.ts       (already fetches roles)
- apps/web/tests/e2e/users.spec.ts               (add role visibility test)
```

### Tests to Write First (TDD)

#### Unit Test

```typescript
// Location: apps/web/src/lib/role-badge.test.ts
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
});
```

#### Integration Test

```typescript
// Location: apps/web/tests/integration/users-api.test.ts
import { describe, it, expect } from 'vitest';

describe('GET /api/users response', () => {
  it('should include role field for each user', () => {
    const mockResponse = [
      { id: 1, name: 'Alice', role: 'admin' },
      { id: 2, name: 'Bob', role: 'editor' },
    ];
    expect(mockResponse[0]).toHaveProperty('role');
    expect(mockResponse[0].role).toBe('admin');
  });
});
```

#### E2E Test

```typescript
// Location: apps/web/tests/e2e/users.spec.ts
import { test, expect } from '@playwright/test';

test('user list displays role column', async ({ page }) => {
  await page.goto('/users');

  // Check column header exists
  await expect(page.locator('th:has-text("Role")')).toBeVisible();

  // Check admin badge visible
  await expect(page.locator('.bg-red-500:has-text("admin")')).toBeVisible();

  // Check editor badge visible
  await expect(page.locator('.bg-blue-500:has-text("editor")')).toBeVisible();
});
```

### Out of Scope

```
- ❌ Do not add role editing functionality
- ❌ Do not change the database schema (role column already exists)
- ❌ Do not modify authentication or permissions
- ❌ Do not refactor other parts of user list
```

### Constraints

```
- Role data already exists in database (no schema changes)
- API already returns role (no endpoint changes needed)
- Use existing Tailwind color classes for badges
- Keep changes to < 50 lines of code
```

### Implementation Order

1. ✅ Write all tests first (they will fail)
2. ✅ Add "Role" column to table header in +page.svelte
3. ✅ Render `user.role` in each table row
4. ✅ Add role badge styling with `getRoleBadgeColor()` function
5. ✅ Run tests: `pnpm test && pnpm test:e2e`
6. ✅ Run `pnpm verify`
7. ✅ Done

---

## Instructions for Creating Tasks

1. **Copy this template** for each new task
2. **Fill ALL sections** - don't leave any blank
3. **Keep it small** - if "Out of Scope" section is huge, task is too big
4. **Make it testable** - if you can't write tests, task is unclear
5. **Review before assigning** - ask: "Can one person complete this alone?"

---

## Key Principles

- **Small & focused**: One feature, one vertical slice
- **Testable**: Tests must exist and pass
- **Independent**: Doesn't block or depend on other tasks
- **Clear**: No ambiguity about success
- **Completable**: One person can do it alone
- **Patterns**: Follow existing code patterns exactly.
- **Definition of Done**: Always include the three checks (tests, types, lint).

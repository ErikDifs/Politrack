# Task 05: Follow/Unfollow Politician

## Goal

Citizens can follow a politician from their profile to keep track of politicians they're interested in monitoring.

## Acceptance Criteria

- [ ] Follow button exists on politician profile page
- [ ] Followed politicians are stored in a database table or local storage
- [ ] Followed politicians list page exists at `/followed`
- [ ] Citizens can unfollow politicians from profile or followed list
- [ ] Follow/unfollow state persists (shows correct button state on revisit)
- [ ] E2E tests cover follow, unfollow, and list viewing workflows
- [ ] `pnpm verify` passes

## Files Likely Involved

```
- packages/db/src/schema.ts                       (add FollowedPolitician table)
- apps/web/src/routes/politicians/[id]/+page.svelte          (add follow button)
- apps/web/src/routes/politicians/[id]/+page.server.ts       (handle follow state)
- apps/web/src/routes/followed/+page.svelte                  (create followed list page)
- apps/web/src/routes/followed/+page.server.ts               (load followed politicians)
- apps/web/src/routes/api/politicians/[id]/follow/+server.ts (create POST follow endpoint)
- apps/web/src/routes/api/politicians/[id]/unfollow/+server.ts (create POST unfollow endpoint)
- apps/web/src/lib/follow.ts                                  (add follow/unfollow utilities)
- apps/web/tests/unit/follow.test.ts                          (unit tests)
- apps/web/tests/integration/follow-api.test.ts              (API tests)
- apps/web/tests/e2e/follow.spec.ts                          (E2E tests)
```

## Tests to Write First (TDD)

### Unit Test

```typescript
// apps/web/tests/unit/follow.test.ts
import { describe, it, expect } from 'vitest';
import { isFollowing, toggleFollowState } from '$lib/follow';

describe('Follow/unfollow functionality', () => {
  it('should check if politician is followed', () => {
    const followed = ['1', '2', '3'];
    expect(isFollowing(followed, '1')).toBe(true);
    expect(isFollowing(followed, '99')).toBe(false);
  });

  it('should toggle follow state correctly', () => {
    const followed = ['1', '2'];
    const newState = toggleFollowState(followed, '1');
    expect(newState).toEqual(['2']); // removed

    const newState2 = toggleFollowState(followed, '99');
    expect(newState2).toEqual(['1', '2', '99']); // added
  });

  it('should return button text based on follow state', () => {
    const following = isFollowing(['1', '2'], '1');
    expect(following ? 'Following' : 'Follow').toBe('Following');

    const notFollowing = isFollowing(['1', '2'], '99');
    expect(notFollowing ? 'Following' : 'Follow').toBe('Follow');
  });
});
```

### Integration Test

```typescript
// apps/web/tests/integration/follow-api.test.ts
import { describe, it, expect } from 'vitest';

describe('POST /api/politicians/[id]/follow', () => {
  it('should return 201 when politician is followed', async () => {
    const response = {
      status: 201,
      body: { followed: true, politicianId: '1' },
    };

    expect(response.status).toBe(201);
    expect(response.body.followed).toBe(true);
    expect(response.body.politicianId).toBe('1');
  });

  it('should return 404 for non-existent politician', async () => {
    const response = { status: 404 };
    expect(response.status).toBe(404);
  });
});

describe('POST /api/politicians/[id]/unfollow', () => {
  it('should return 200 when politician is unfollowed', async () => {
    const response = {
      status: 200,
      body: { followed: false, politicianId: '1' },
    };

    expect(response.status).toBe(200);
    expect(response.body.followed).toBe(false);
  });

  it('should return 404 for non-existent politician', async () => {
    const response = { status: 404 };
    expect(response.status).toBe(404);
  });
});
```

### E2E Test

```typescript
// apps/web/tests/e2e/follow.spec.ts
import { test, expect } from '@playwright/test';

test('follow politician from profile', async ({ page }) => {
  await page.goto('/politicians/1');

  // Find and click follow button
  const followButton = page.locator('button:has-text("Follow")');
  await expect(followButton).toBeVisible();
  await followButton.click();

  // Button text should change
  await expect(page.locator('button:has-text("Following")')).toBeVisible();
});

test('unfollow politician from profile', async ({ page }) => {
  await page.goto('/politicians/1');

  // Follow first
  const followButton = page.locator('button:has-text("Follow")');
  await followButton.click();
  await expect(page.locator('button:has-text("Following")')).toBeVisible();

  // Then unfollow
  const unfollowButton = page.locator('button:has-text("Following")');
  await unfollowButton.click();
  await expect(page.locator('button:has-text("Follow")')).toBeVisible();
});

test('view followed politicians list', async ({ page }) => {
  await page.goto('/politicians/1');

  // Follow politician
  const followButton = page.locator('button:has-text("Follow")');
  await followButton.click();

  // Navigate to followed list
  await page.goto('/followed');

  // Verify politician appears in list
  await expect(page.locator('text=Jane Smith')).toBeVisible();
  await expect(page.locator('[data-testid="politician-item"]')).toHaveCount(1);
});

test('followed state persists on page revisit', async ({ page }) => {
  await page.goto('/politicians/1');

  // Follow politician
  const followButton = page.locator('button:has-text("Follow")');
  await followButton.click();
  await expect(page.locator('button:has-text("Following")')).toBeVisible();

  // Leave and return
  await page.goto('/');
  await page.goto('/politicians/1');

  // Should still show as following
  await expect(page.locator('button:has-text("Following")')).toBeVisible();
});

test('unfollow from followed list', async ({ page }) => {
  // Setup: follow a politician
  await page.goto('/politicians/1');
  await page.locator('button:has-text("Follow")').click();

  // Navigate to followed list
  await page.goto('/followed');
  await expect(page.locator('text=Jane Smith')).toBeVisible();

  // Unfollow from list
  const unfollowButton = page.locator('[data-testid="unfollow-btn"]').first();
  await unfollowButton.click();

  // Politician should be removed
  await expect(page.locator('text=Jane Smith')).not.toBeVisible();
});
```

## Out of Scope

- ❌ Do not implement user authentication or accounts
- ❌ Do not add email notifications for followed politicians
- ❌ Do not implement real user accounts or persistence across sessions
- ❌ Do not add sorting or filtering on followed list
- ❌ Do not modify politician profile layout beyond adding button
- ❌ Do not add social features (sharing followed list, recommendations)

## Constraints

- Must complete in < 2 hours
- Follow state must persist (use DB or localStorage for MVP)
- Follow button must appear on politician profile only
- Followed list page must show all followed politicians
- Unfollow must work from both profile and followed list pages
- Must work on desktop viewport

## Implementation Order

1. Write all tests (unit, integration, E2E) - they must FAIL initially
2. Create FollowedPolitician table in `packages/db/src/schema.ts` (or use localStorage for MVP)
3. Create `$lib/follow.ts` with `isFollowing()` and `toggleFollowState()` functions
4. Create POST endpoints for `/api/politicians/[id]/follow` and `/unfollow`
5. Update politician profile page to include follow button
6. Update profile page server to load follow state
7. Create followed politicians list page at `/followed/+page.svelte`
8. Create followed page server to load followed politicians
9. Add follow/unfollow button click handlers
10. Run tests: `pnpm test && pnpm test:e2e`
11. Run verify: `pnpm verify`
12. Mark task as Done

## Status

- [ ] Not started
- [ ] In progress
- [ ] Done

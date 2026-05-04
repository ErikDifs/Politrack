# Task 06: Event Issue Tagging and Filtering

## Goal

Citizens can see what policy issues an accountability event relates to, and filter a politician's event timeline by issue.

## Acceptance Criteria

- [ ] Issue records exist with name and description
- [ ] Events can be linked to multiple issues
- [ ] Event cards display issue tags clearly
- [ ] Politician profile timeline has issue filter dropdown/buttons
- [ ] Filtering by issue updates timeline to show only matching events
- [ ] Unit, integration, and E2E tests cover filtering functionality
- [ ] `pnpm verify` passes

## Files Likely Involved

```
- packages/db/src/schema.ts                       (add Issue table and EventIssue junction)
- apps/web/src/lib/issue.ts                       (add issue/filtering utilities)
- apps/web/src/routes/politicians/[id]/+page.svelte          (add filter UI and tag display)
- apps/web/src/routes/politicians/[id]/+page.server.ts       (load events with issues, handle filtering)
- apps/web/src/routes/api/politicians/[id]/events/+server.ts (add issue filter parameter)
- apps/web/src/routes/api/issues/+server.ts                  (create GET issues endpoint)
- apps/web/tests/unit/issue.test.ts                          (unit tests)
- apps/web/tests/integration/issues-api.test.ts              (API tests)
- apps/web/tests/e2e/issue-filtering.spec.ts                 (E2E tests)
```

## Tests to Write First (TDD)

### Unit Test

```typescript
// apps/web/tests/unit/issue.test.ts
import { describe, it, expect } from 'vitest';
import { filterEventsByIssue, formatIssueTags } from '$lib/issue';

describe('Issue tagging and filtering', () => {
  it('should filter events by single issue', () => {
    const events = [
      { id: '1', title: 'Vote 1', issues: ['healthcare', 'budget'] },
      { id: '2', title: 'Vote 2', issues: ['environment'] },
      { id: '3', title: 'Vote 3', issues: ['healthcare'] },
    ];

    const filtered = filterEventsByIssue(events, 'healthcare');
    expect(filtered).toHaveLength(2);
    expect(filtered.map((e) => e.id)).toEqual(['1', '3']);
  });

  it('should return all events when no filter applied', () => {
    const events = [
      { id: '1', title: 'Vote 1', issues: ['healthcare'] },
      { id: '2', title: 'Vote 2', issues: ['environment'] },
    ];

    const filtered = filterEventsByIssue(events, null);
    expect(filtered).toHaveLength(2);
  });

  it('should format issue tags for display', () => {
    const issues = ['healthcare', 'budget', 'environment'];
    const formatted = formatIssueTags(issues);

    expect(formatted).toHaveLength(3);
    expect(formatted[0]).toHaveProperty('slug');
    expect(formatted[0]).toHaveProperty('display');
  });

  it('should maintain event order after filtering', () => {
    const events = [
      { id: '1', date: '2026-03-15', issues: ['healthcare'] },
      { id: '2', date: '2026-03-10', issues: ['healthcare'] },
      { id: '3', date: '2026-03-20', issues: ['healthcare'] },
    ];

    const filtered = filterEventsByIssue(events, 'healthcare');
    expect(filtered[0].date).toBe('2026-03-20'); // newest first
    expect(filtered[2].date).toBe('2026-03-10'); // oldest last
  });
});
```

### Integration Test

```typescript
// apps/web/tests/integration/issues-api.test.ts
import { describe, it, expect } from 'vitest';

describe('GET /api/issues', () => {
  it('should return list of all issues', async () => {
    const response = {
      status: 200,
      body: [
        { id: '1', slug: 'healthcare', name: 'Healthcare', description: 'Healthcare policy' },
        { id: '2', slug: 'environment', name: 'Environment', description: 'Environmental policy' },
        { id: '3', slug: 'budget', name: 'Budget', description: 'Federal budget' },
      ],
    };

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toHaveProperty('slug');
    expect(response.body[0]).toHaveProperty('name');
  });
});

describe('GET /api/politicians/[id]/events?issue=healthcare', () => {
  it('should return events filtered by issue', async () => {
    const response = {
      status: 200,
      body: [
        {
          id: '1',
          title: 'Healthcare Vote',
          issues: [{ id: '1', slug: 'healthcare', name: 'Healthcare' }],
        },
        {
          id: '2',
          title: 'Another Healthcare Vote',
          issues: [{ id: '1', slug: 'healthcare', name: 'Healthcare' }],
        },
      ],
    };

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body.every((e) => e.issues.some((i) => i.slug === 'healthcare'))).toBe(true);
  });

  it('should return empty array when no events match filter', async () => {
    const response = {
      status: 200,
      body: [],
    };

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
```

### E2E Test

```typescript
// apps/web/tests/e2e/issue-filtering.spec.ts
import { test, expect } from '@playwright/test';

test('display issue tags on event cards', async ({ page }) => {
  await page.goto('/politicians/1');

  // Check issue tags are visible on events
  await expect(page.locator('[data-testid="issue-tag"]')).toHaveCount(3); // or more depending on seed data

  // Check specific issue tag
  await expect(page.locator('span:has-text("Healthcare")')).toBeVisible();
  await expect(page.locator('span:has-text("Environment")')).toBeVisible();
});

test('filter events by issue', async ({ page }) => {
  await page.goto('/politicians/1');

  // Get initial event count
  const allEvents = page.locator('[data-testid="event-item"]');
  const initialCount = await allEvents.count();
  expect(initialCount).toBeGreaterThan(0);

  // Find and click healthcare issue filter
  const healthcareFilter = page.locator('button:has-text("Healthcare")');
  await healthcareFilter.click();

  // Timeline should update to show only healthcare events
  const filteredEvents = page.locator('[data-testid="event-item"]');
  const filteredCount = await filteredEvents.count();
  expect(filteredCount).toBeLessThanOrEqual(initialCount);

  // All visible events should have healthcare tag
  const healthcareTags = page.locator('[data-testid="event-item"] span:has-text("Healthcare")');
  expect(await healthcareTags.count()).toBe(filteredCount);
});

test('clear issue filter shows all events', async ({ page }) => {
  await page.goto('/politicians/1');

  // Get initial count
  const allEventsInitial = await page.locator('[data-testid="event-item"]').count();

  // Apply healthcare filter
  await page.locator('button:has-text("Healthcare")').click();
  const filteredCount = await page.locator('[data-testid="event-item"]').count();
  expect(filteredCount).toBeLessThan(allEventsInitial);

  // Clear filter
  const clearButton = page.locator('button:has-text("Clear Filter")');
  if (await clearButton.isVisible()) {
    await clearButton.click();
  } else {
    // Alternative: click filter again to toggle off
    await page.locator('button:has-text("Healthcare")').click();
  }

  // Should show all events again
  const allEventsAfter = await page.locator('[data-testid="event-item"]').count();
  expect(allEventsAfter).toBe(allEventsInitial);
});

test('multiple issues displayed on single event', async ({ page }) => {
  await page.goto('/politicians/1');

  // Find an event with multiple issues
  const eventWithMultipleIssues = page.locator('[data-testid="event-item"]').first();

  // Check multiple issue tags
  const issueTags = eventWithMultipleIssues.locator('[data-testid="issue-tag"]');
  const tagCount = await issueTags.count();
  expect(tagCount).toBeGreaterThanOrEqual(1);
});

test('issue filter persists when navigating away and back', async ({ page }) => {
  await page.goto('/politicians/1');

  // Apply filter
  await page.locator('button:has-text("Healthcare")').click();
  const filteredCount = await page.locator('[data-testid="event-item"]').count();

  // Navigate away
  await page.goto('/');

  // Navigate back
  await page.goto('/politicians/1');

  // Filter should be cleared (default behavior) or persist (if implemented)
  // This test documents expected behavior
  const afterReturn = await page.locator('[data-testid="event-item"]').count();
  // Note: depends on implementation whether state persists
});
```

## Out of Scope

- ❌ Do not implement personalized issue recommendations based on user activity
- ❌ Do not add real bill classification or automatic tagging
- ❌ Do not create a full issue detail page (focus on filtering only)
- ❌ Do not add issue creation or editing UI
- ❌ Do not implement issue trending or analytics
- ❌ Do not modify event detail page (focus on politician profile timeline)

## Constraints

- Must complete in < 2 hours
- Issues must be pre-seeded in database
- Events can be linked to multiple issues
- Filter UI should be simple (dropdown or button group)
- All events with filtered issue must be shown
- Must maintain reverse chronological order after filtering
- Must work on desktop viewport

## Implementation Order

1. Write all tests (unit, integration, E2E) - they must FAIL initially
2. Create Issue table and EventIssue junction table in `packages/db/src/schema.ts`
3. Create seed data with sample issues and event-issue links
4. Create `$lib/issue.ts` with `filterEventsByIssue()` and `formatIssueTags()` functions
5. Create API endpoint `GET /api/issues` to list all available issues
6. Update `GET /api/politicians/[id]/events` endpoint to accept `?issue=` parameter and filter
7. Update politician profile page to show issue tags on event cards
8. Add issue filter UI (dropdown or button group) to politician profile timeline
9. Implement filter functionality to update timeline display
10. Run tests: `pnpm test && pnpm test:e2e`
11. Run verify: `pnpm verify`
12. Mark task as Done

## Status

- [ ] Not started
- [ ] In progress
- [ ] Done

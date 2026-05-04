# Task 04: View Accountability Event Details

## Goal

Citizens can open an accountability event page to inspect the evidence behind it, including the politician involved and an explanation of why it matters.

## Acceptance Criteria

- [ ] Event detail page exists at `/events/[id]` route
- [ ] Page displays title, date, type, description, and source link
- [ ] Shows related politician with link to their profile
- [ ] Displays "why this matters" explanation for the event
- [ ] Unit, integration, and E2E tests cover event page rendering
- [ ] `pnpm verify` passes

## Files Likely Involved

```
- apps/web/src/routes/events/[id]/+page.svelte          (create event detail page)
- apps/web/src/routes/events/[id]/+page.server.ts       (load event data)
- apps/web/src/routes/api/events/[id]/+server.ts        (create GET endpoint)
- apps/web/src/lib/event.ts                              (add event detail formatting)
- apps/web/tests/unit/event.test.ts                      (unit tests)
- apps/web/tests/integration/events-api.test.ts          (API tests)
- apps/web/tests/e2e/event-details.spec.ts              (E2E tests)
```

## Tests to Write First (TDD)

### Unit Test

```typescript
// apps/web/tests/unit/event.test.ts (additions)
import { describe, it, expect } from 'vitest';
import { formatEventDetail, getEventExplanation } from '$lib/event';

describe('Event detail page', () => {
  it('should format event detail correctly', () => {
    const event = {
      id: '1',
      type: 'vote',
      title: 'Healthcare Bill Vote',
      date: '2026-03-15',
      description: 'Voted yes on comprehensive healthcare reform',
      sourceUrl: 'https://congress.gov/vote/123',
      politicianId: '1',
    };

    const formatted = formatEventDetail(event);
    expect(formatted.title).toBe('Healthcare Bill Vote');
    expect(formatted.type).toBe('vote');
    expect(formatted.date).toBe('2026-03-15');
    expect(formatted).toHaveProperty('sourceUrl');
  });

  it('should provide explanation for different event types', () => {
    const voteExplanation = getEventExplanation('vote');
    expect(voteExplanation).toContain('voting');

    const donationExplanation = getEventExplanation('donation');
    expect(donationExplanation).toContain('donation');

    const promiseExplanation = getEventExplanation('promise');
    expect(promiseExplanation).toContain('promise');
  });

  it('should include politician reference in event details', () => {
    const event = {
      id: '1',
      type: 'vote',
      title: 'Healthcare Bill Vote',
      date: '2026-03-15',
      description: 'Voted yes',
      sourceUrl: 'https://congress.gov/vote/123',
      politicianId: '1',
    };

    const formatted = formatEventDetail(event);
    expect(formatted).toHaveProperty('politicianId');
    expect(formatted.politicianId).toBe('1');
  });
});
```

### Integration Test

```typescript
// apps/web/tests/integration/events-api.test.ts (additions)
import { describe, it, expect } from 'vitest';

describe('GET /api/events/[id]', () => {
  it('should return 200 with complete event detail', async () => {
    const response = {
      status: 200,
      body: {
        id: '1',
        type: 'vote',
        title: 'Healthcare Bill Vote',
        date: '2026-03-15',
        description: 'Comprehensive healthcare reform bill',
        sourceUrl: 'https://congress.gov/vote/123',
        politicianId: '1',
        politician: {
          id: '1',
          name: 'Jane Smith',
          party: 'Democratic Party',
        },
      },
    };

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('sourceUrl');
    expect(response.body).toHaveProperty('politician');
    expect(response.body.politician.name).toBe('Jane Smith');
  });

  it('should return 404 for non-existent event', async () => {
    const response = { status: 404 };
    expect(response.status).toBe(404);
  });
});
```

### E2E Test

```typescript
// apps/web/tests/e2e/event-details.spec.ts
import { test, expect } from '@playwright/test';

test('view event details page', async ({ page }) => {
  await page.goto('/events/1');

  // Check all required fields are visible
  await expect(page.locator('h1:has-text("Healthcare Bill Vote")')).toBeVisible();
  await expect(page.locator('text=Vote')).toBeVisible();
  await expect(page.locator('text=2026-03-15')).toBeVisible();
  await expect(page.locator('text=Comprehensive healthcare reform bill')).toBeVisible();
});

test('event source link is clickable', async ({ page }) => {
  await page.goto('/events/1');

  // Find and verify source link
  const sourceLink = page.locator('a[href*="congress.gov"]');
  await expect(sourceLink).toBeVisible();
  await expect(sourceLink).toContainText('View Source');
});

test('show related politician information', async ({ page }) => {
  await page.goto('/events/1');

  // Check politician reference
  await expect(page.locator('text=Jane Smith')).toBeVisible();
  await expect(page.locator('text=Democratic Party')).toBeVisible();

  // Verify politician link works
  const politicianLink = page.locator('a:has-text("Jane Smith")');
  await expect(politicianLink).toHaveAttribute('href', /\/politicians\/1/);
});

test('display why this matters explanation', async ({ page }) => {
  await page.goto('/events/1');

  // Check explanation section exists
  await expect(page.locator('h2:has-text("Why This Matters")')).toBeVisible();
  await expect(page.locator('[data-testid="explanation"]')).toBeVisible();
});

test('show 404 for missing event', async ({ page }) => {
  await page.goto('/events/999999');

  // Check 404 state
  await expect(page.locator('text=Event not found')).toBeVisible();
  await expect(page.locator("text=This event doesn't exist")).toBeVisible();
});
```

## Out of Scope

- ❌ Do not add comments or discussion features
- ❌ Do not implement user accounts or authentication
- ❌ Do not add automated source verification or fact-checking
- ❌ Do not add event rating or voting system
- ❌ Do not implement sharing or bookmarking features
- ❌ Do not modify politician profile page

## Constraints

- Must complete in < 2 hours
- Event detail page must be read-only
- All required fields (title, date, type, description, source) must be displayed
- Politician reference must include name and party minimum
- Source link must be clickable and external
- "Why this matters" explanation should be pre-written per event type
- Must work on desktop viewport

## Implementation Order

1. Write all tests (unit, integration, E2E) - they must FAIL initially
2. Create/verify AccountabilityEvent relationships in `packages/db/src/schema.ts`
3. Add "why this matters" explanations to seed data for each event type
4. Update `$lib/event.ts` with `formatEventDetail()` and `getEventExplanation()` functions
5. Create API endpoint `GET /api/events/[id]` with politician joined data
6. Create event detail page `routes/events/[id]/+page.svelte`
7. Create page server `+page.server.ts` to load event with politician
8. Add event styling and source link rendering
9. Implement 404 error state for missing events
10. Run tests: `pnpm test && pnpm test:e2e`
11. Run verify: `pnpm verify`
12. Mark task as Done

## Status

- [ ] Not started
- [ ] In progress
- [ ] Done

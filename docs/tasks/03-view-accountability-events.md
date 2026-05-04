# Task 03: View Accountability Events Timeline

## Goal

Citizens can see a reverse chronological timeline of accountability events for a politician, including votes, statements, donations, promises, and missed votes.

## Acceptance Criteria

- [ ] Event data model includes type, title, date, description, source URL, and politician ID
- [ ] Politician profile page displays events in reverse chronological order (newest first)
- [ ] Event types supported: vote, statement, donation, promise, missed_vote
- [ ] Each event displays and links to its source URL as evidence
- [ ] Unit, integration, and E2E tests verify ordering and rendering
- [ ] `pnpm verify` passes

## Files Likely Involved

```
- packages/db/src/schema.ts                       (add AccountabilityEvent table)
- apps/web/src/lib/event.ts                       (add event formatting/sorting utilities)
- apps/web/src/routes/politicians/[id]/+page.svelte          (display events timeline)
- apps/web/src/routes/politicians/[id]/+page.server.ts       (load events data)
- apps/web/src/routes/api/politicians/[id]/events/+server.ts (create GET /events endpoint)
- apps/web/tests/unit/event.test.ts                          (unit tests)
- apps/web/tests/integration/events-api.test.ts              (API tests)
- apps/web/tests/e2e/accountability-events.spec.ts           (E2E tests)
```

## Tests to Write First (TDD)

### Unit Test

```typescript
// apps/web/tests/unit/event.test.ts
import { describe, it, expect } from 'vitest';
import { sortEventsByDate, formatEventDisplay } from '$lib/event';

describe('Accountability events', () => {
  it('should sort events by date in reverse chronological order', () => {
    const events = [
      { id: '1', title: 'Vote 1', date: '2026-01-01' },
      { id: '2', title: 'Vote 2', date: '2026-03-15' },
      { id: '3', title: 'Vote 3', date: '2026-02-10' },
    ];

    const sorted = sortEventsByDate(events);
    expect(sorted[0].date).toBe('2026-03-15'); // newest first
    expect(sorted[1].date).toBe('2026-02-10');
    expect(sorted[2].date).toBe('2026-01-01'); // oldest last
  });

  it('should format event display with all required fields', () => {
    const event = {
      id: '1',
      type: 'vote',
      title: 'Healthcare Bill Vote',
      date: '2026-03-15',
      description: 'Voted yes on healthcare reform',
      sourceUrl: 'https://congress.gov/vote/123',
      politicianId: '1',
    };

    const formatted = formatEventDisplay(event);
    expect(formatted.type).toBe('vote');
    expect(formatted.title).toBe('Healthcare Bill Vote');
    expect(formatted).toHaveProperty('sourceUrl');
    expect(formatted.sourceUrl).toBe('https://congress.gov/vote/123');
  });

  it('should support all event types', () => {
    const types = ['vote', 'statement', 'donation', 'promise', 'missed_vote'];
    types.forEach((type) => {
      expect(['vote', 'statement', 'donation', 'promise', 'missed_vote']).toContain(type);
    });
  });
});
```

### Integration Test

```typescript
// apps/web/tests/integration/events-api.test.ts
import { describe, it, expect } from 'vitest';

describe('GET /api/politicians/[id]/events', () => {
  it('should return 200 with events for valid politician', async () => {
    const response = {
      status: 200,
      body: [
        {
          id: '1',
          type: 'vote',
          title: 'Healthcare Bill Vote',
          date: '2026-03-15',
          description: 'Voted yes on healthcare reform',
          sourceUrl: 'https://congress.gov/vote/123',
          politicianId: '1',
        },
        {
          id: '2',
          type: 'statement',
          title: 'Public Statement',
          date: '2026-03-10',
          description: 'Made public statement on climate',
          sourceUrl: 'https://example.com/statement',
          politicianId: '1',
        },
      ],
    };

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].date).toBe('2026-03-15'); // newest first
    expect(response.body[1].date).toBe('2026-03-10');
  });

  it('should return empty array for politician with no events', async () => {
    const response = {
      status: 200,
      body: [],
    };

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return 404 for non-existent politician', async () => {
    const response = { status: 404 };
    expect(response.status).toBe(404);
  });
});
```

### E2E Test

```typescript
// apps/web/tests/e2e/accountability-events.spec.ts
import { test, expect } from '@playwright/test';

test('view accountability events timeline for politician', async ({ page }) => {
  await page.goto('/politicians/1');

  // Check events section is visible
  await expect(page.locator('h2:has-text("Accountability Events")')).toBeVisible();

  // Check events are displayed
  const eventItems = page.locator('[data-testid="event-item"]');
  await expect(eventItems).toHaveCount(5); // if 5 events in seed data

  // Check first event is newest
  const firstEvent = eventItems.first();
  await expect(firstEvent.locator('text=2026-03-15')).toBeVisible();

  // Check last event is oldest
  const lastEvent = eventItems.last();
  await expect(lastEvent.locator('text=2026-01-10')).toBeVisible();
});

test('event source links work', async ({ page }) => {
  await page.goto('/politicians/1');

  // Find first event link
  const eventLink = page.locator('[data-testid="event-item"] a').first();

  // Verify link has href
  const href = await eventLink.getAttribute('href');
  expect(href).toMatch(/^https?:\/\//);
});

test('display all event types correctly', async ({ page }) => {
  await page.goto('/politicians/1');

  // Check different event types are visible
  await expect(page.locator('text=Vote')).toBeVisible();
  await expect(page.locator('text=Statement')).toBeVisible();
  await expect(page.locator('text=Donation')).toBeVisible();
  await expect(page.locator('text=Promise')).toBeVisible();
  await expect(page.locator('text=Missed Vote')).toBeVisible();
});
```

## Out of Scope

- ❌ Do not ingest real event data (use mock/seed data for now)
- ❌ Do not implement event scoring or analysis
- ❌ Do not add push notifications or subscriptions
- ❌ Do not add filtering or search by event type
- ❌ Do not add event tagging or categorization
- ❌ Do not modify politician profile page beyond adding events section

## Constraints

- Must complete in < 2 hours
- Events must be displayed in reverse chronological order (newest first)
- All five event types must be supported
- Source URL must be present and clickable for each event
- Use mock/seed data for events (no real API integration)
- Must work on desktop viewport

## Implementation Order

1. Write all tests (unit, integration, E2E) - they must FAIL initially
2. Create AccountabilityEvent table in `packages/db/src/schema.ts`
3. Create seed data with sample events for politicians
4. Create `$lib/event.ts` with `sortEventsByDate()` and `formatEventDisplay()` functions
5. Create API endpoint `GET /api/politicians/[id]/events` with mock data
6. Update politician profile page `+page.svelte` to display events timeline
7. Update page server `+page.server.ts` to load events
8. Add event styling and source link rendering
9. Run tests: `pnpm test && pnpm test:e2e`
10. Run verify: `pnpm verify`
11. Mark task as Done

## Status

- [ ] Not started
- [ ] In progress
- [ ] Done

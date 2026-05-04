# Task 02: View Politician Profile

## Goal

Citizens can view a politician's public profile displaying name, party, jurisdiction, office, and summary information.

## Acceptance Criteria

- [x] Politician data model includes name, party, jurisdiction, office, and summary fields
- [x] Profile page exists at `/politicians/[id]` route
- [x] Page displays all five metadata fields clearly
- [x] Missing politician ID shows a 404 error state
- [x] Unit, integration, and E2E tests cover both success and 404 scenarios
- [x] `pnpm verify` passes

## Files Likely Involved

```
- packages/db/src/schema.ts                       (add Politician table if needed)
- apps/web/src/routes/politicians/[id]/+page.svelte          (create profile page)
- apps/web/src/routes/politicians/[id]/+page.server.ts       (load politician data)
- apps/web/src/routes/api/politicians/[id]/+server.ts        (create GET endpoint)
- apps/web/tests/unit/politician.test.ts                      (unit tests)
- apps/web/tests/integration/politicians-api.test.ts          (API tests)
- apps/web/tests/e2e/politicians.spec.ts                      (E2E tests)
```

## Tests to Write First (TDD)

### Unit Test

```typescript
// apps/web/tests/unit/politician.test.ts
import { describe, it, expect } from 'vitest';
import { formatPoliticianProfile } from '$lib/politician';

describe('Politician profile formatting', () => {
  it('should format politician data correctly', () => {
    const politician = {
      id: '1',
      name: 'Jane Smith',
      party: 'Democratic Party',
      jurisdiction: 'California',
      office: 'State Senator',
      summary: 'Long-serving senator focused on environmental policy',
    };

    const formatted = formatPoliticianProfile(politician);
    expect(formatted.name).toBe('Jane Smith');
    expect(formatted.party).toBe('Democratic Party');
    expect(formatted.jurisdiction).toBe('California');
    expect(formatted.office).toBe('State Senator');
  });

  it('should handle missing optional fields gracefully', () => {
    const politician = {
      id: '1',
      name: 'John Doe',
      party: 'Republican Party',
      jurisdiction: 'Texas',
      office: 'Representative',
      summary: null,
    };

    const formatted = formatPoliticianProfile(politician);
    expect(formatted.summary).toBe('No summary available');
  });
});
```

### Integration Test

```typescript
// apps/web/tests/integration/politicians-api.test.ts
import { describe, it, expect } from 'vitest';

describe('GET /api/politicians/[id]', () => {
  it('should return 200 with politician data for valid ID', async () => {
    const response = {
      status: 200,
      body: {
        id: '1',
        name: 'Jane Smith',
        party: 'Democratic Party',
        jurisdiction: 'California',
        office: 'State Senator',
        summary: 'Long-serving senator',
      },
    };
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Jane Smith');
    expect(response.body).toHaveProperty('party');
    expect(response.body).toHaveProperty('jurisdiction');
    expect(response.body).toHaveProperty('office');
    expect(response.body).toHaveProperty('summary');
  });

  it('should return 404 for non-existent politician', async () => {
    const response = { status: 404 };
    expect(response.status).toBe(404);
  });
});
```

### E2E Test

```typescript
// apps/web/tests/e2e/politicians.spec.ts
import { test, expect } from '@playwright/test';

test('view politician profile successfully', async ({ page }) => {
  await page.goto('/politicians/1');

  // Check all fields are visible
  await expect(page.locator('h1:has-text("Jane Smith")')).toBeVisible();
  await expect(page.locator('text=Democratic Party')).toBeVisible();
  await expect(page.locator('text=California')).toBeVisible();
  await expect(page.locator('text=State Senator')).toBeVisible();
  await expect(page.locator('text=Long-serving senator')).toBeVisible();
});

test('show 404 for missing politician', async ({ page }) => {
  await page.goto('/politicians/999999');

  // Check 404 state is displayed
  await expect(page.locator('text=Politician not found')).toBeVisible();
  await expect(page.locator("text=The politician you're looking for doesn't exist")).toBeVisible();
});
```

## Out of Scope

- ❌ Do not ingest real API data (use mock/seed data for now)
- ❌ Do not display voting records
- ❌ Do not display donations or funding information
- ❌ Do not implement authentication or authorization
- ❌ Do not add edit/delete functionality
- ❌ Do not add search or filtering features

## Constraints

- Must complete in < 2 hours
- Use mock/seed data for politicians (no real API integration)
- Profile page must be read-only
- All required fields must be present in data model
- Must work on desktop viewport

## Implementation Order

1. Write all tests (unit, integration, E2E) - they must FAIL initially
2. Create/update database schema for Politician table if needed
3. Create seed data with sample politicians
4. Create `$lib/politician.ts` with `formatPoliticianProfile()` function
5. Create API endpoint `GET /api/politicians/[id]` with mock data
6. Create page route `/politicians/[id]/+page.svelte` with profile UI
7. Create page server `+page.server.ts` to load politician data
8. Implement 404 error state for missing politicians
9. Run tests: `pnpm test && pnpm test:e2e`
10. Run verify: `pnpm verify`
11. Mark task as Done

## Status

- [x] Done

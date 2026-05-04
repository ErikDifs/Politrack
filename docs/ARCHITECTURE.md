# Architecture Guide

## Folder Structure Explained

```
/apps/web
├── src/
│   ├── routes/
│   │   ├── +layout.svelte       # Root layout wrapper
│   │   ├── +page.svelte         # Home page
│   │   ├── api/
│   │   │   └── users/
│   │   │       └── +server.ts   # GET /api/users endpoint
│   │   └── [dynamic]/
│   │       └── +page.svelte     # Dynamic routes follow this pattern
│   ├── app.css                  # Global styles (Tailwind imports)
│   └── app.html                 # HTML shell
├── tests/
│   ├── unit/                    # Vitest unit tests
│   ├── integration/             # Vitest integration tests
│   └── e2e/                     # Playwright E2E tests
├── svelte.config.js             # SvelteKit configuration
├── vite.config.ts               # Vite dev server config
└── tailwind.config.js           # Tailwind CSS config

/packages/db
├── src/
│   ├── schema.ts                # Drizzle table definitions
│   ├── client.ts                # Database connection
│   └── index.ts                 # Public exports
├── scripts/
│   ├── generate-migration.js    # Create migration from schema
│   ├── execute-migration.js     # Run migrations
│   └── seed.js                  # Populate test data
├── drizzle/                     # Generated migrations (auto-created)
└── drizzle.config.ts            # Drizzle configuration

/packages/config
├── eslint.js                    # ESLint config (future - shared)
├── prettier.js                  # Prettier config (future - shared)
└── tsconfig.json                # TypeScript config (future - shared)

/.sandcastle/
├── main.ts                      # Sandcastle entry point
├── plan-prompt.md               # Planning instructions
├── implement-prompt.md          # Implementation instructions
├── review-prompt.md             # Review instructions
└── merge-prompt.md              # Merge instructions
```

## Data Flow

### User List Example

1. **Browser** requests `GET /api/users`
2. **SvelteKit Route** (`apps/web/src/routes/api/users/+server.ts`)
   - Imports `db` from `@politracks/db`
   - Queries `db.query.users.findMany()`
   - Returns JSON array
3. **SvelteKit Page** (`apps/web/src/routes/+page.svelte`)
   - Calls API in `onMount`
   - Updates UI reactively
4. **Database** (PostgreSQL)
   - Stores data in `users` table
   - Schema defined in `packages/db/src/schema.ts`

### Adding New Data

1. Create TypeScript type in `schema.ts`
2. Generate migration: `pnpm db:generate`
3. Run migration: `pnpm db:migrate`
4. Query in route: `db.query.yourTable.findMany()`
5. Display in component
6. Write tests

## Key Design Decisions

### Why This Structure?

- **Monorepo**: Share code (database types, utils) across frontend/backend
- **pnpm workspaces**: Fast dependency management, workspace protocol
- **SvelteKit routes**: Server routes handle both API and SSR
- **Drizzle ORM**: Type-safe queries, no magic
- **Tailwind CSS**: Utility-first, minimal CSS
- **Single database**: All data in PostgreSQL, no multiple stores

### Where Should Logic Go?

| Logic Type       | Location                                                      |
| ---------------- | ------------------------------------------------------------- |
| Database schema  | `packages/db/src/schema.ts`                                   |
| Database queries | Within SvelteKit routes                                       |
| Page layout      | `apps/web/src/routes/+layout.svelte`                          |
| Page content     | `apps/web/src/routes/+page.svelte` (or `[slug]/+page.svelte`) |
| API endpoints    | `apps/web/src/routes/api/[endpoint]/+server.ts`               |
| Utilities        | `apps/web/src/lib/` (future)                                  |
| Styling          | Tailwind CSS classes (no separate CSS files)                  |

### Rules

- ✅ **DO**: Follow existing patterns
- ✅ **DO**: Keep components simple and focused
- ✅ **DO**: Use semantic HTML
- ✅ **DO**: Write tests before implementation
- ❌ **DON'T**: Add component libraries (use HTML + Tailwind)
- ❌ **DON'T**: Create new config files without reason
- ❌ **DON'T**: Import from `src` outside your package
- ❌ **DON'T**: Leave TODOs or incomplete code

## Testing Strategy

### Unit Tests

Location: `apps/web/tests/unit/`  
Tool: Vitest  
Purpose: Test individual functions, utilities

```typescript
import { describe, it, expect } from 'vitest';

describe('my function', () => {
  it('should do something', () => {
    expect(result).toBe(expected);
  });
});
```

### Integration Tests

Location: `apps/web/tests/integration/`  
Tool: Vitest  
Purpose: Test API routes, database interactions (with mocks)

### E2E Tests

Location: `apps/web/tests/e2e/`  
Tool: Playwright  
Purpose: Test full user flows in browser

```typescript
import { test, expect } from '@playwright/test';

test('user can view list', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('table')).toBeVisible();
});
```

## Deployment Readiness

This template is ready for deployment:

- ✅ Production builds work (`pnpm build`)
- ✅ Environment variables supported (`.env`)
- ✅ Docker setup for database
- ✅ TypeScript ensures type safety
- ✅ Tests ensure quality gates

Current deployment is local only. To deploy:

1. Use SvelteKit adapter for your platform
2. Push PostgreSQL to managed service
3. Set `DATABASE_URL` environment variable
4. Run `pnpm build && pnpm preview`

## Performance Considerations

- SvelteKit generates static + dynamic routes efficiently
- Drizzle ORM generates optimized SQL
- Tailwind CSS purges unused styles in build
- No N+1 queries in examples (always use `findMany` correctly)

## Security Notes

- Environment variables in `.env` (never commit)
- Database credentials randomized in local setup
- No sensitive data in frontend code
- Type safety prevents injection attacks

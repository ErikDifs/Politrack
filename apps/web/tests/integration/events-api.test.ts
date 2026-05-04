import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GET } from '../../src/routes/api/politicians/[id]/events/+server';

const mocks = vi.hoisted(() => ({
  select: vi.fn(),
  politicianResult: [] as unknown[],
  eventsResult: [] as unknown[],
}));

vi.mock('@politracks/db', () => ({
  accountabilityEvents: {
    date: 'date',
    politicianId: 'politician_id',
  },
  db: {
    select: mocks.select,
  },
  desc: vi.fn((column: unknown) => ({ column, direction: 'desc' })),
  eq: vi.fn((left: unknown, right: unknown) => ({ left, right })),
  politicians: {
    id: 'id',
  },
}));

function createQueryBuilder(result: unknown[]) {
  const query = {
    from: vi.fn(() => query),
    limit: vi.fn(() => Promise.resolve(result)),
    orderBy: vi.fn(() => Promise.resolve(result)),
    where: vi.fn(() => query),
  };

  return query;
}

function getEvents(params: { id: string }) {
  return GET({ params } as Parameters<typeof GET>[0]);
}

describe('GET /api/politicians/[id]/events', () => {
  beforeEach(() => {
    mocks.select.mockReset();
    mocks.politicianResult = [{ id: 1 }];
    mocks.eventsResult = [];
    mocks.select
      .mockImplementationOnce(() => createQueryBuilder(mocks.politicianResult))
      .mockImplementationOnce(() => createQueryBuilder(mocks.eventsResult));
  });

  it('should return 200 with events for valid politician ordered newest first', async () => {
    mocks.eventsResult = [
      {
        id: 1,
        type: 'vote',
        title: 'Healthcare Bill Vote',
        date: '2026-03-15',
        description: 'Voted yes on healthcare reform',
        sourceUrl: 'https://congress.gov/vote/123',
        politicianId: 1,
      },
      {
        id: 2,
        type: 'statement',
        title: 'Public Statement',
        date: '2026-03-10',
        description: 'Made public statement on climate',
        sourceUrl: 'https://example.com/statement',
        politicianId: 1,
      },
    ];

    const response = await getEvents({ id: '1' });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toHaveLength(2);
    expect(body[0].date).toBe('2026-03-15');
    expect(body[0].sourceUrl).toMatch(/^https?:\/\//);
    expect(body[1].date).toBe('2026-03-10');
  });

  it('should return empty array for politician with no events', async () => {
    const response = await getEvents({ id: '1' });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual([]);
  });

  it('should return 404 for non-existent politician', async () => {
    mocks.politicianResult = [];

    const response = await getEvents({ id: '999999' });
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.error).toBe('Politician not found');
  });

  it('should return 400 for invalid politician ID', async () => {
    const response = await getEvents({ id: 'not-a-number' });
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('Invalid politician ID');
  });
});

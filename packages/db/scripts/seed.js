import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { users, politicians, accountabilityEvents } from '../dist/schema.js';
import pg from 'pg';

const { Pool } = pg;

async function seed() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  await db.insert(users).values([
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      isActive: true,
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      isActive: true,
    },
    {
      name: 'Carol Davis',
      email: 'carol@example.com',
      isActive: false,
    },
  ]);

  await db.insert(politicians).values([
    {
      name: 'Jane Smith',
      party: 'Democratic Party',
      jurisdiction: 'California',
      office: 'State Senator',
      summary: 'Long-serving senator focused on environmental policy',
    },
    {
      name: 'John Doe',
      party: 'Republican Party',
      jurisdiction: 'Texas',
      office: 'Representative',
      summary: 'Strong advocate for fiscal responsibility and limited government',
    },
    {
      name: 'Maria Garcia',
      party: 'Democratic Party',
      jurisdiction: 'New York',
      office: 'State Assembly Member',
      summary: null,
    },
  ]);

  await db.insert(accountabilityEvents).values([
    {
      politicianId: 1,
      type: 'vote',
      title: 'Healthcare Bill Vote',
      date: '2026-03-15',
      description: 'Voted yes on a healthcare reform bill expanding preventive care access.',
      sourceUrl: 'https://www.congress.gov/vote/123',
    },
    {
      politicianId: 1,
      type: 'statement',
      title: 'Climate Resilience Statement',
      date: '2026-03-10',
      description: 'Published a public statement supporting state climate resilience funding.',
      sourceUrl: 'https://example.com/jane-smith-climate-statement',
    },
    {
      politicianId: 1,
      type: 'donation',
      title: 'Energy PAC Donation',
      date: '2026-02-20',
      description: 'Reported a campaign donation from an energy industry political action group.',
      sourceUrl: 'https://example.com/jane-smith-campaign-finance',
    },
    {
      politicianId: 1,
      type: 'promise',
      title: 'Transit Funding Promise',
      date: '2026-02-01',
      description: 'Promised to prioritize regional transit funding during a public town hall.',
      sourceUrl: 'https://example.com/jane-smith-transit-town-hall',
    },
    {
      politicianId: 1,
      type: 'missed_vote',
      title: 'Missed Housing Affordability Vote',
      date: '2026-01-10',
      description: 'Was absent for a scheduled vote on a housing affordability package.',
      sourceUrl: 'https://example.com/jane-smith-missed-housing-vote',
    },
    {
      politicianId: 2,
      type: 'vote',
      title: 'Budget Amendment Vote',
      date: '2026-03-01',
      description: 'Voted no on a budget amendment increasing agency oversight funds.',
      sourceUrl: 'https://example.com/john-doe-budget-vote',
    },
  ]);

  console.log('Database seeded successfully');
  await pool.end();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

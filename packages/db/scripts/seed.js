import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { users, politicians } from '../dist/schema.js';
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

  console.log('Database seeded successfully');
  await pool.end();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

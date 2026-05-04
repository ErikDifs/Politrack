import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
export * from './schema';
export { eq, and, or, like, gte, lte, desc, asc, sql } from 'drizzle-orm'; // 👈

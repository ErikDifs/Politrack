import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

async function runMigrations() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  await migrate(db, {
    migrationsFolder: path.join(__dirname, '../drizzle'),
  });

  console.log('Migrations executed successfully');
  await pool.end();
}

runMigrations().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});

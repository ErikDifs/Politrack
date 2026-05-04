import 'dotenv/config';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate migration from schema
execSync('drizzle-kit generate:pg', {
  cwd: __dirname,
  stdio: 'inherit',
});

console.log('Migration generated in ./drizzle directory');

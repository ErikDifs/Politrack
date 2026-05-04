#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tasksDir = path.join(__dirname, '..', 'docs', 'tasks');

if (!fs.existsSync(tasksDir)) {
  console.error(`❌ Tasks directory not found: ${tasksDir}`);
  process.exit(1);
}

const files = fs
  .readdirSync(tasksDir)
  .filter((f) => f.endsWith('.md') && f !== 'README.md')
  .sort();

if (files.length === 0) {
  console.log(
    '📋 No tasks found. Create one with: cp docs/TASK_TEMPLATE.md docs/tasks/<id>-<slug>.md\n'
  );
  process.exit(0);
}

console.log('\n' + '='.repeat(80));
console.log('📋 ALL TASKS');
console.log('='.repeat(80) + '\n');

files.forEach((file) => {
  const taskFile = path.join(tasksDir, file);
  const content = fs.readFileSync(taskFile, 'utf-8');

  // Extract title and status
  const titleMatch = content.match(/^#\s+(.+?)$/m);
  const statusMatch = content.match(/## Status\n([\s\S]*?)(?=\n\n|$)/);

  const title = titleMatch ? titleMatch[1] : file;
  let status = '⚪ Not started';

  if (statusMatch) {
    const statusBlock = statusMatch[1];
    if (statusBlock.includes('[x] Done')) status = '✅ Done';
    else if (statusBlock.includes('[x] Review')) status = '👀 Review';
    else if (statusBlock.includes('[x] In progress')) status = '🔄 In progress';
  }

  const taskId = file.replace('.md', '');
  console.log(`${status}  ${taskId}`);
  console.log(`         ${title}`);
  console.log();
});

console.log('='.repeat(80));
console.log('Run a task: pnpm task:run <id-slug>');
console.log('='.repeat(80) + '\n');

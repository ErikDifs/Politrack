#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const taskId = process.argv[2];

if (!taskId) {
  console.error('❌ Usage: node scripts/task-run.js <id-slug>');
  console.error('   Example: node scripts/task-run.js 01-add-email-validation');
  process.exit(1);
}

const taskFile = path.join(__dirname, '..', 'docs', 'tasks', `${taskId}.md`);

if (!fs.existsSync(taskFile)) {
  console.error(`❌ Task not found: ${taskFile}`);
  console.error('   Check available tasks: ls docs/tasks/');
  process.exit(1);
}

const content = fs.readFileSync(taskFile, 'utf-8');

console.log('\n' + '='.repeat(80));
console.log(`📋 TASK: ${taskId}`);
console.log('='.repeat(80) + '\n');

// Display task content
console.log(content);

console.log('\n' + '='.repeat(80));
console.log('✅ To verify completion: pnpm task:verify ' + taskId);
console.log('='.repeat(80) + '\n');

// Update status to "In progress"
const updatedContent = content.replace(
  /## Status\n-\s*\[\s*\]\s*In progress/,
  '## Status\n- [x] In progress'
);

if (updatedContent !== content) {
  fs.writeFileSync(taskFile, updatedContent);
  console.log('📝 Task status updated to "In progress"\n');
}

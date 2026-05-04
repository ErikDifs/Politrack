#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const taskId = process.argv[2];

if (!taskId) {
  console.error('❌ Usage: node scripts/task-verify.js <id-slug>');
  console.error('   Example: node scripts/task-verify.js 01-add-email-validation');
  process.exit(1);
}

const taskFile = path.join(__dirname, '..', 'docs', 'tasks', `${taskId}.md`);

if (!fs.existsSync(taskFile)) {
  console.error(`❌ Task not found: ${taskFile}`);
  process.exit(1);
}

const content = fs.readFileSync(taskFile, 'utf-8');

console.log('\n' + '='.repeat(80));
console.log(`🔍 VERIFYING TASK: ${taskId}`);
console.log('='.repeat(80) + '\n');

// Extract acceptance criteria
const criteriaMatch = content.match(/## Acceptance Criteria\n([\s\S]*?)(?=##|$)/);
if (!criteriaMatch) {
  console.error('❌ No acceptance criteria found in task');
  process.exit(1);
}

const criteria = criteriaMatch[1]
  .split('\n')
  .filter((line) => line.includes('[ ]'))
  .map((line) => line.replace(/^-\s*\[\s*\]\s*/, '').trim());

console.log('Acceptance Criteria:');
criteria.forEach((c, i) => console.log(`  ${i + 1}. ${c}`));

console.log('\nRunning: pnpm verify\n');

try {
  execSync('pnpm verify', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

  console.log('\n' + '='.repeat(80));
  console.log('✅ ALL CHECKS PASSED');
  console.log('='.repeat(80) + '\n');

  // Update status to "Done"
  const updatedContent = content.replace(/## Status\n([\s\S]*?)\n(?=\n|$)/g, (match) => {
    return match.replace(/- \[x\]/g, '- [ ]').replace(/- \[ \]\s*Done/, '- [x] Done');
  });

  fs.writeFileSync(taskFile, updatedContent);
  console.log('📝 Task status updated to "Done"\n');
} catch (error) {
  console.log('\n' + '='.repeat(80));
  console.error('❌ VERIFICATION FAILED');
  console.error('='.repeat(80));
  console.error('\nFix issues and run again: pnpm task:verify ' + taskId + '\n');
  process.exit(1);
}

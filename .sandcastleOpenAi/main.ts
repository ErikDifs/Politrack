import { run, opencode } from '@ai-hero/sandcastle';
import { docker } from '@ai-hero/sandcastle/sandboxes/docker';
import { readFileSync } from 'fs';
import { existsSync } from 'fs';
import { readdirSync } from 'fs';
import { resolve } from 'path';

// PoliTrack Task Runner via Sandcastle
// Usage: pnpm sandcastle <task-id>
// Example: pnpm sandcastle 02-view-politician-profile
//
// This reads a task markdown file from docs/tasks/ and runs it in an isolated Docker sandbox.

// Get task ID from command line arguments
const taskId = process.argv[2];

if (!taskId) {
  console.error('❌ Error: Task ID required');
  console.error('');
  console.error('Usage: pnpm sandcastle <task-id>');
  console.error('');
  console.error('Examples:');
  console.error('  pnpm sandcastle 02-view-politician-profile');
  console.error('  pnpm sandcastle 03');
  console.error('');
  console.error('Available tasks in docs/tasks/:');
  const taskDir = resolve('docs/tasks');
  if (existsSync(taskDir)) {
    readdirSync(taskDir)
      .filter((f) => f.endsWith('.md') && f !== 'README.md')
      .forEach((f) => console.error(`  - ${f}`));
  }
  process.exit(1);
}

// Find task file matching the ID
const taskDir = resolve('docs/tasks');
const taskFiles = existsSync(taskDir)
  ? readdirSync(taskDir).filter((f) => f.endsWith('.md') && f.startsWith(taskId))
  : [];

if (taskFiles.length === 0) {
  console.error(`❌ Error: No task file found matching "${taskId}"`);
  console.error('');
  console.error('Available tasks:');
  if (existsSync(taskDir)) {
    readdirSync(taskDir)
      .filter((f) => f.endsWith('.md') && f !== 'README.md')
      .forEach((f) => console.error(`  - ${f}`));
  }
  process.exit(1);
}

const taskFile = taskFiles[0];
const taskPath = resolve(taskDir, taskFile);

// Read all required context files
function readFile(path: string): string {
  try {
    return readFileSync(path, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to read ${path}: ${(error as Error).message}`);
  }
}

const taskContent = readFile(taskPath);
const agentRules = readFile(resolve('AGENT_RULES.md'));
const projectContext = readFile(resolve('docs/PROJECT_CONTEXT.md'));
const architecture = readFile(resolve('docs/ARCHITECTURE.md'));

// Combine all context into a single prompt
const combinedPrompt = `# PoliTrack Task Execution

You are an expert AI agent working on the PoliTrack civic transparency platform.

## Project Context

${projectContext}

## Architecture

${architecture}

## Agent Rules (STRICT - No Exceptions)

${agentRules}

## Task to Execute

${taskContent}

---

## Your Mission

1. Read and understand the task completely
2. Follow AGENT_RULES strictly — no exceptions
3. Run \`pnpm verify\` before finishing to validate all checks pass
4. Leave the codebase in a working state ready for review

Begin by understanding the task requirements, then proceed with implementation.`;

// Run the agent
await run({
  // A name for this run, shown as a prefix in log output.
  name: `task:${taskId}`,

  // Sandbox provider — Docker is the default runtime.
  sandbox: docker(),

  agent: opencode('opencode/nemotron-3-super-free'),

  // Combined prompt with all project context and task details
  prompt: combinedPrompt,

  // Maximum number of iterations (agent invocations) to run in a session.
  // Each task should be completed in one pass per AGENT_RULES.
  maxIterations: 1,

  // Branch strategy — creates a temporary branch for the agent to work on,
  // then keeps changes on a reviewable branch without auto-merging.
  branchStrategy: { type: 'branch', branch: `task/${taskFile.replace('.md', '')}` },

  // Copy node_modules from the host into the worktree before the sandbox starts.
  // This avoids a full npm install from scratch on every iteration.
  // The onSandboxReady hook still runs npm install as a safety net to handle
  // platform-specific binaries and any packages added since the last copy.
  copyToWorktree: ['node_modules'],
});

# Sandcastle Configuration

Sandcastle is an AI orchestration system for planning, implementing, reviewing, and merging changes.

This configuration enables:

- Planning mode: AI creates task plans with breakdown
- Implementation mode: AI writes code following plans
- Review mode: AI reviews code quality and tests
- Merge mode: AI validates all checks pass before merge

## Setup

All prompts are in this directory. Sandcastle reads them and applies context from:

- `docs/PROJECT_CONTEXT.md` - Project overview
- `docs/ARCHITECTURE.md` - Code structure
- `AGENT_RULES.md` - Strict guidelines for agents
- `docs/TASK_TEMPLATE.md` - Task structure requirements

## Usage

Sandcastle will:

1. Run planning-prompt.md to break down tasks
2. Run implement-prompt.md to write code
3. Run review-prompt.md to validate quality
4. Run merge-prompt.md to confirm all checks pass

All work follows AGENT_RULES.md strictly.

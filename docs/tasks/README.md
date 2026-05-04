# Tasks

Simple, file-based task management. Each task is a markdown file following the TASK_TEMPLATE.md structure.

## Quick Start

```bash
# List all tasks
pnpm task:list

# Run a task
pnpm task:run 01-add-role-badge

# Verify task completion
pnpm task:verify 01-add-role-badge
```

## Active Tasks

- [ ] [01-add-role-badge.md](01-add-role-badge.md) - Add role badges to user list
- [ ] [03-view-accountability-events.md](03-view-accountability-events.md) - View timeline of accountability events for politician
- [ ] [04-view-event-details.md](04-view-event-details.md) - View event detail page with evidence and explanation
- [ ] [05-follow-politician.md](05-follow-politician.md) - Follow/unfollow politicians and view followed list
- [ ] [06-issue-tagging-filtering.md](06-issue-tagging-filtering.md) - Tag events with policy issues and filter timeline by issue

## Completed Tasks

- [x] [02-view-politician-profile.md](02-view-politician-profile.md) - View politician profile with public accountability information

---

## Creating a New Task

1. Copy TASK_TEMPLATE.md:

   ```bash
   cp ../TASK_TEMPLATE.md <id>-<slug>.md
   ```

2. Follow the naming convention: `<ID>-<SLUG>.md`
   - ID: Two-digit number (01, 02, 03, ...)
   - SLUG: Kebab-case task name

3. Fill in all required sections from TASK_TEMPLATE.md:
   - Goal
   - Acceptance Criteria
   - Files Involved
   - Tests to Write First
   - Out of Scope
   - Constraints
   - Implementation Order
   - Status

4. Reference in this README

---

## Task Naming Convention

```
01-add-role-badge.md
02-create-positions-table.md
03-add-email-validation.md
...
99-last-task.md
```

Format: `<ID>-<SLUG>.md`

- **ID**: 01-99 (sequential two-digit numbers)
- **SLUG**: Lowercase, hyphens only, no spaces

---

## Task Status

Each task has a status section:

```markdown
## Status

- [ ] Not started
- [ ] In progress
- [ ] Review
- [ ] Done
```

Status updates automatically when:

- Running task: `pnpm task:run <id>` → marks "In progress"
- Verifying task: `pnpm task:verify <id>` → marks "Done" if all checks pass

---

## See Also

- [TASK_TEMPLATE.md](../TASK_TEMPLATE.md) - Task structure template
- [TASK_CONVENTION.md](../TASK_CONVENTION.md) - Full convention documentation
- [AGENT_RULES.md](../../AGENT_RULES.md) - Rules for implementing tasks

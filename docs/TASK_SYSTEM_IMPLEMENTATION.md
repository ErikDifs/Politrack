# Task System Implementation Summary

A simple, file-based task management system for PoliTrack monorepo.

---

## What Was Created

### Documentation Files

1. **[TASK_CONVENTION.md](TASK_CONVENTION.md)** - Full system documentation
   - File organization and naming convention
   - Task file format and template
   - Running and verifying tasks
   - Benefits and workflow

2. **[TASK_SYSTEM_QUICK_REF.md](TASK_SYSTEM_QUICK_REF.md)** - Quick reference guide
   - Command cheat sheet
   - File structure
   - Workflow steps with examples
   - Status markers and rules

3. **[tasks/README.md](tasks/README.md)** - Task index
   - Quick start commands
   - Active tasks tracking
   - Task creation instructions
   - Status tracking details

### Helper Scripts

1. **[scripts/task-list.js](../scripts/task-list.js)**
   - Lists all tasks with status
   - Shows title and current status
   - Usage: `pnpm task:list`

2. **[scripts/task-run.js](../scripts/task-run.js)**
   - Displays task content
   - Auto-marks task as "In progress"
   - Usage: `pnpm task:run <id-slug>`

3. **[scripts/task-verify.js](../scripts/task-verify.js)**
   - Runs `pnpm verify`
   - Extracts and displays acceptance criteria
   - Auto-marks task as "Done" if all checks pass
   - Usage: `pnpm task:verify <id-slug>`

### Example Task

**[tasks/01-add-role-badge.md](tasks/01-add-role-badge.md)**

- Demonstrates proper task format
- Shows all required sections
- Includes concrete test examples
- Ready to implement

### Package.json Scripts

Added to `package.json`:

```json
"task:list": "node scripts/task-list.js",
"task:run": "node scripts/task-run.js",
"task:verify": "node scripts/task-verify.js"
```

---

## Quick Start

```bash
# List all tasks
pnpm task:list

# Start working on a task
pnpm task:run 01-add-role-badge

# Verify when done
pnpm task:verify 01-add-role-badge
```

---

## File Organization

```
docs/
├── TASK_TEMPLATE.md              (template structure)
├── TASK_CONVENTION.md            (system docs)
├── TASK_SYSTEM_QUICK_REF.md      (this file)
├── tasks/
│   ├── README.md                 (task index)
│   └── 01-add-role-badge.md      (example task)
│
scripts/
├── task-list.js
├── task-run.js
└── task-verify.js
```

---

## Naming Convention

Tasks follow format: `<ID>-<SLUG>.md`

```
01-add-role-badge.md        ✅ Correct
02-create-positions-table.md ✅ Correct
1-add-validation.md          ❌ Should be 01
add validation.md            ❌ Should be add-validation
```

---

## Task Sections (Required)

Every task file must include:

1. **Goal** - One sentence, user-visible outcome
2. **Acceptance Criteria** - 3-5 testable items
3. **Files Involved** - Exact file paths
4. **Tests to Write First** - Concrete code examples
5. **Out of Scope** - What NOT to do
6. **Constraints** - Time, dependencies, patterns
7. **Implementation Order** - Step-by-step
8. **Status** - Checkbox tracking (auto-updated)

---

## Workflow

### Create Task

```bash
# Copy template
cp docs/TASK_TEMPLATE.md docs/tasks/02-your-feature.md

# Edit file with task details
nano docs/tasks/02-your-feature.md

# Add to docs/tasks/README.md index
```

### Run Task

```bash
pnpm task:run 02-your-feature
# → Displays task
# → Marks as "In progress"
# → Shows implementation steps
```

### Implement

Follow task instructions:

- Write tests first (TDD)
- Implement minimal code
- Keep changes focused
- No refactoring or dependencies

### Verify

```bash
pnpm task:verify 02-your-feature
# → Runs pnpm verify (all 4 checks)
# → Marks as "Done" if passes
# → Shows failures if not
```

---

## Status Tracking

Tasks auto-track status in their markdown files:

```markdown
## Status

- [ ] Not started (initial state)
- [x] In progress (after pnpm task:run)
- [ ] Review (manual - for PRs)
- [ ] Done (after pnpm task:verify passes)
```

When you run commands, status updates automatically:

- `pnpm task:run` → checks "In progress" ✓
- `pnpm task:verify` → checks "Done" ✓ (if verify passes)

---

## Commands Reference

```bash
# List all tasks with status
pnpm task:list

# Show task and mark "In progress"
pnpm task:run <id-slug>

# Verify task completion and mark "Done"
pnpm task:verify <id-slug>

# View raw task file
cat docs/tasks/<id-slug>.md

# View all tasks
ls -1 docs/tasks/*.md
```

---

## Key Features

✅ **Simple** - Just markdown files, no database  
✅ **Version Controlled** - Tasks tracked in git  
✅ **Portable** - Read and edit anywhere  
✅ **Auto-Tracked** - Status updates automatically  
✅ **No Dependencies** - Uses existing tools only  
✅ **Searchable** - Visible in code editor  
✅ **Standardized** - All tasks follow same format

---

## Rules for Tasks

### ✅ DO

- Follow TASK_TEMPLATE.md structure exactly
- Name files: `<ID>-<SLUG>.md` (e.g., `01-add-role-badge.md`)
- Write acceptance criteria that are testable
- Include concrete test examples (copy-paste ready)
- Keep tasks small (< 2 hours to complete)
- Make tasks independently completable
- Include "Out of Scope" section (prevents scope creep)

### ❌ DON'T

- Add new dependencies
- Skip test requirements
- Modify root configs
- Leave TODOs or console.logs
- Make unrelated changes
- Create vague acceptance criteria
- Make tasks that depend on other incomplete tasks

---

## Examples

### Create a new task

```bash
# Start from template
cp docs/TASK_TEMPLATE.md docs/tasks/02-email-validation.md

# Edit with specific details
nano docs/tasks/02-email-validation.md

# Register in tasks/README.md
# Add: - [ ] [02-email-validation.md](02-email-validation.md) - Add email validation
```

### Run a task

```bash
$ pnpm task:run 02-email-validation

================================================================================
📋 TASK: 02-email-validation
================================================================================

# Task 02: Add Email Validation
...
[full task displayed]
...

================================================================================
✅ To verify completion: pnpm task:verify 02-email-validation
================================================================================

📝 Task status updated to "In progress"
```

### List all tasks

```bash
$ pnpm task:list

================================================================================
📋 ALL TASKS
================================================================================

⚪ Not started  01-add-role-badge
         Task 01: Add Role Badge to User List

🔄 In progress  02-email-validation
         Task 02: Add Email Validation

================================================================================
Run a task: pnpm task:run <id-slug>
================================================================================
```

---

## Integration with CI/CD

This system works perfectly with Sandcastle CI/CD:

1. **Planning** → Create task file in `/docs/tasks/`
2. **Implementation** → `pnpm task:run <id>` to start
3. **Review** → Code review checks align with task acceptance criteria
4. **Verification** → `pnpm task:verify <id>` confirms completion
5. **Merge** → Task marked "Done" in git history

---

## See Also

- [TASK_TEMPLATE.md](TASK_TEMPLATE.md) - Copy this to create new tasks
- [TASK_CONVENTION.md](TASK_CONVENTION.md) - Detailed system documentation
- [TASK_SYSTEM_QUICK_REF.md](TASK_SYSTEM_QUICK_REF.md) - Command cheat sheet
- [AGENT_RULES.md](../AGENT_RULES.md) - Implementation rules
- [tasks/README.md](tasks/README.md) - Task index and active tasks

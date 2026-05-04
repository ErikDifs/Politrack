# Task System - Quick Reference

Simple, file-based task management for PoliTrack.

---

## Commands

```bash
# List all tasks with status
pnpm task:list

# Start working on a task
pnpm task:run 01-add-role-badge

# Verify task is complete
pnpm task:verify 01-add-role-badge
```

---

## File Structure

```
docs/
├── TASK_TEMPLATE.md          (template to follow)
├── TASK_CONVENTION.md        (system documentation)
├── TASK_SYSTEM_QUICK_REF.md  (this file)
└── tasks/
    ├── README.md             (task index)
    ├── 01-add-role-badge.md  (example task)
    └── 02-your-task.md       (your tasks here)
```

---

## File Naming

Format: `<ID>-<SLUG>.md`

Examples:

- ✅ `01-add-email-validation.md`
- ✅ `02-create-positions-table.md`
- ✅ `03-add-role-filter.md`
- ❌ `1-add-validation.md` (should be `01`)
- ❌ `add validation.md` (should be `add-validation`)

---

## Task Template Sections

Every task must have these sections:

1. **Goal** - What user sees/does (one sentence)
2. **Acceptance Criteria** - 3-5 testable items
3. **Files Involved** - Exact paths
4. **Tests to Write First** - Concrete code examples
5. **Out of Scope** - What NOT to do
6. **Constraints** - Limitations/requirements
7. **Implementation Order** - Step-by-step
8. **Status** - Checkbox tracking

---

## Workflow

### 1. Create Task

```bash
# Create new task file
cat > docs/tasks/02-your-task.md << 'EOF'
# Task 02: Your Task

## Goal
[one sentence outcome]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Files Involved
- path/to/file.ts

## Tests to Write First
[code examples]

## Out of Scope
- Don't do X

## Constraints
- Max 2 hours

## Implementation Order
1. Write tests
2. Implement
3. Verify

## Status
- [ ] Not started
- [ ] In progress
- [ ] Review
- [ ] Done
EOF
```

### 2. Run Task

```bash
pnpm task:run 02-your-task
```

This:

- Displays the task
- Marks status as "In progress"
- Ready to implement

### 3. Implement

Follow task instructions:

- Write tests first (TDD)
- Implement feature
- Keep changes minimal

### 4. Verify

```bash
pnpm task:verify 02-your-task
```

This:

- Runs `pnpm verify` (all 4 checks)
- Marks task "Done" if all pass
- Reports failures

---

## Status Markers

| Status      | Marker | Meaning                     |
| ----------- | ------ | --------------------------- |
| Not started | ⚪     | Task created, not started   |
| In progress | 🔄     | Currently being worked on   |
| Review      | 👀     | Waiting for code review     |
| Done        | ✅     | Complete, all tests passing |

---

## Key Rules

✅ **DO**:

- Follow TASK_TEMPLATE.md structure
- Name files: `<ID>-<SLUG>.md`
- Write tests BEFORE implementation
- Run `pnpm verify` before marking done
- Keep tasks small (< 2 hours)

❌ **DON'T**:

- Add dependencies
- Skip test requirements
- Modify root configs
- Leave TODOs or console.logs
- Make unrelated changes

---

## Examples

### Create and run a task

```bash
# Create
pnpm task:list  # see existing tasks
cp docs/TASK_TEMPLATE.md docs/tasks/02-my-feature.md

# Edit 02-my-feature.md with your details

# Run
pnpm task:run 02-my-feature

# Implement (follow task instructions)
# Run tests: pnpm test && pnpm test:e2e
# Fix linting: pnpm format

# Verify
pnpm task:verify 02-my-feature  # marks Done if passes
```

### List all tasks

```bash
pnpm task:list
```

Output:

```
⚪ Not started  01-add-role-badge
                Task 01: Add Role Badge to User List

🔄 In progress  02-email-validation
                Task 02: Add Email Validation
```

---

## References

- [TASK_CONVENTION.md](TASK_CONVENTION.md) - Full system documentation
- [TASK_TEMPLATE.md](TASK_TEMPLATE.md) - Template structure
- [AGENT_RULES.md](../AGENT_RULES.md) - Implementation rules
- [docs/tasks/README.md](tasks/README.md) - Task index

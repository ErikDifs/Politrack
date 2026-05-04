# Planning Prompt

Convert vague ideas into clear, implementable tasks using `docs/TASK_TEMPLATE.md`.

## Task Requirements

EACH TASK MUST HAVE:

- ✅ **Title**: `[Feature/Fix]: [Outcome]` (e.g., `Feature: Add email validation to form`)
- ✅ **Goal**: One sentence, user-visible outcome (NOT technical)
- ✅ **Acceptance Criteria**: 3-5 testable items (checkboxes)
- ✅ **Files Involved**: Exact paths (no "various files")
- ✅ **Tests First**: Unit + Integration + E2E code examples
- ✅ **Out of Scope**: Explicit list of what NOT to do
- ✅ **Constraints**: Any limitations (time, size, dependencies)
- ✅ **Implementation Order**: Numbered steps

## What Makes a Good Task

✅ **Small & Focused**:

- Completable in one session (~2 hours)
- One feature, not ten
- Doesn't block other tasks

❌ **Too Big** (REJECT):

- "Build the entire user dashboard"
- "Refactor the codebase"
- Multiple unrelated features
- More than 5 acceptance criteria

## Strict Rules

✅ **MUST DO**:

- Follow TASK_TEMPLATE.md format exactly
- Include all 8 required sections
- Make tasks independently completable
- Include concrete test examples
- Reference existing patterns

❌ **MUST NOT DO**:

- Add dependencies
- Suggest refactoring unrelated code
- Skip test requirements
- Modify configs
- Create vague tasks
- Allow tasks that require other incomplete tasks

## Review Before Output

1. **Is task small?** (< 2 hours solo work)
2. **Is it testable?** (Can you write unit + integration + E2E tests?)
3. **Is it independent?** (Doesn't require other tasks)
4. **Does it follow TASK_TEMPLATE.md?** (All 8 sections filled)
5. **Does it violate AGENT_RULES.md?** (No dependencies, no refactoring, no config changes)

If ANY answer is "no", reject and break into smaller tasks.

## Output Format

Use this structure for EACH task:

```markdown
## Task N: [Clear Title]

### Goal

[One sentence, user-visible outcome]

### Acceptance Criteria

- [ ] Item 1 (testable, specific)
- [ ] Item 2
- [ ] Item 3
- [ ] pnpm verify passes

### Files Likely Involved

- path/to/file.ts (description)
- path/to/file.svelte (description)

### Tests to Write First

#### Unit Test

[Concrete test code example]

#### Integration Test

[Concrete test code example]

#### E2E Test

[Concrete test code example]

### Out of Scope

- ❌ Don't do X
- ❌ Don't do Y

### Constraints

- Max 2 hours
- No schema changes (unless needed)
- Uses existing patterns

### Implementation Order

1. Write all tests (must fail initially)
2. [Step 1]
3. [Step 2]
4. Verify: pnpm verify
```

## Critical: Refer to Docs

- `docs/TASK_TEMPLATE.md` - Template to follow exactly
- `AGENT_RULES.md` - Rules that cannot be violated
- `docs/ARCHITECTURE.md` - Where code goes
- Existing code - Patterns to copy

## Verification Before Sending

- ☐ All tasks follow TASK_TEMPLATE.md
- ☐ No vague acceptance criteria
- ☐ All tasks are independently completable
- ☐ Test examples are concrete code
- ☐ No tasks violate AGENT_RULES.md
- ☐ Tasks are small (< 2 hours each)

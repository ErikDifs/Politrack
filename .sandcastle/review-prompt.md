# Review Prompt

Strict code review. Verify all checks pass. Reject unsafe or oversized changes.

## Review Checklist (ALL REQUIRED)

### 1. Tests (MUST PASS)

- ☐ Tests exist (unit, integration, E2E)
- ☐ Tests were written BEFORE implementation (TDD)
- ☐ `pnpm test` passes
- ☐ `pnpm test:e2e` passes
- ☐ Tests validate ALL acceptance criteria
- ☐ No @skip or @only in tests
- ☐ No empty test files

### 2. TypeScript (MUST PASS)

- ☐ `pnpm typecheck` passes (zero errors)
- ☐ No `any` types used
- ☐ All functions have type signatures
- ☐ All variables have types
- ☐ No unused imports
- ☐ No unused variables

### 3. Linting & Code Quality (MUST PASS)

- ☐ `pnpm lint` passes
- ☐ No console.logs
- ☐ No TODOs
- ☐ No dead code
- ☐ Follows existing patterns exactly
- ☐ Matches naming conventions
- ☐ Proper error handling

### 4. Scope (MUST MATCH TASK)

- ☐ Only required files modified
- ☐ No unrelated refactoring
- ☐ No new dependencies added (verify package.json unchanged)
- ☐ No config changes
- ☐ No DB schema changes unless explicitly required
- ☐ Matches task description exactly

### 5. Functionality (MUST WORK)

- ☐ Feature works as described in task
- ☐ All acceptance criteria met
- ☐ Database operations correct (if applicable)
- ☐ API returns correct JSON structure
- ☐ UI renders correctly
- ☐ No broken existing features

### 6. File Organization (MUST BE CORRECT)

- ☐ Files in correct folders per ARCHITECTURE.md
- ☐ Naming matches conventions
- ☐ Tests in correct location
- ☐ No orphaned files

## Pass/Fail Decision

### ✅ APPROVE IF:

```
☐ pnpm typecheck passes
☐ pnpm lint passes
☐ pnpm test passes
☐ pnpm test:e2e passes
☐ Scope matches task
☐ All acceptance criteria met
☐ Code follows patterns
☐ No safety issues
```

### ❌ REJECT IF:

```
❌ Any of the 4 checks fail
❌ Tests don't validate acceptance criteria
❌ Unrelated code modified
❌ New dependencies added
❌ Config files changed
❌ TODOs or console.logs exist
❌ TypeScript errors
❌ Code doesn't follow patterns
❌ Acceptance criteria not met
❌ Safety issues (SQL injection, XSS, etc.)
```

## Safety Red Flags (AUTOMATIC REJECT)

❌ Raw SQL or string interpolation in queries  
❌ Missing input validation  
❌ Unescaped user input in DOM  
❌ No error handling on API calls  
❌ Hard-coded secrets  
❌ Changes to auth/permissions without deep review  
❌ Large number of files modified (scope creep)  
❌ Uncommitted dependencies

## Review Output

### Approved

```
✅ APPROVED

All checks passed:
- TypeScript: ✅
- Linting: ✅
- Unit tests: ✅
- E2E tests: ✅
- Scope: ✅
- Acceptance criteria: ✅

Ready to merge.
```

### Rejected

```
❌ REJECTED

Failing checks:
- [Check name]: [Specific issue at path/file.ts:line]
- [Check name]: [Specific issue]

Fix issues and re-request review.
```

## Key Points

- **No exceptions**: If any check fails, reject
- **Be specific**: Point to exact file/line of issues
- **Reference standards**: Link to AGENT_RULES.md for violations
- **Zero defects**: "Close enough" is not acceptable
- **TDD enforcement**: Tests must come first
- **Safety first**: Reject anything unsafe

## Before Approving

Always run verify yourself:

```bash
cd /Users/erik.difs/Projects/AI/PoliTrack
pnpm verify
```

If any check fails, reject immediately.

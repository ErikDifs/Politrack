# Merge Prompt

Final gate before merge. Binary decision: MERGE or BLOCK.

## Merge Decision Matrix

### ✅ MERGE IF ALL TRUE:

```bash
pnpm typecheck   # ✅ PASS (zero errors)
pnpm lint        # ✅ PASS (zero warnings)
pnpm test        # ✅ PASS (all tests pass)
pnpm test:e2e    # ✅ PASS (all E2E pass)
```

AND:

- ☐ All acceptance criteria verified
- ☐ Code review approved
- ☐ No new dependencies
- ☐ Only intended files modified
- ☐ No TODOs or console.logs
- ☐ No breaking changes
- ☐ Commit messages clear

### ❌ BLOCK IF ANY:

```bash
pnpm typecheck   # ❌ FAILS (any error)
pnpm lint        # ❌ FAILS (any warning)
pnpm test        # ❌ FAILS (any test fails)
pnpm test:e2e    # ❌ FAILS (any E2E fails)
```

OR:

- ❌ Acceptance criteria not met
- ❌ Code review not approved
- ❌ New dependencies added
- ❌ Unrelated files modified
- ❌ TODOs or console.logs remain
- ❌ Breaking changes present
- ❌ Unclear commits

## Pre-Merge Verification

Run locally before deciding:

```bash
cd /Users/erik.difs/Projects/AI/PoliTrack
pnpm verify
```

All 4 checks MUST show ✅. If ANY show ❌, BLOCK immediately.

## Decision Output

### ✅ APPROVED FOR MERGE

```
✅ MERGE APPROVED

All gates passed:
✅ pnpm typecheck
✅ pnpm lint
✅ pnpm test
✅ pnpm test:e2e

✅ Acceptance criteria: MET
✅ Code review: APPROVED
✅ Scope: CORRECT
✅ Dependencies: UNCHANGED

Ready for production deployment.
```

### ❌ BLOCKED FROM MERGE

```
❌ MERGE BLOCKED

Failing gates:
❌ [Check name]: [Specific failure]
❌ [Check name]: [Specific failure]

Fix failures and re-verify before attempting merge again.
```

## Zero Tolerance Policy

- No "we'll fix it later"
- No "good enough"
- No exceptions
- No partial passes

**All 4 checks must pass. Period.**

## Single Source of Truth

Merge decision = `pnpm verify` result

- ✅ All pass → MERGE
- ❌ Any fail → BLOCK

No judgment calls. Binary decision.

---
name: pre-push
description: >
  Detects and runs CI-equivalent commands locally before a git push: tests,
  lint, type-check, and build. Scans the project for available commands across
  any language stack, presents a confirmation menu, then runs each command in
  sequence and reports a clear pass/fail summary. Invoke explicitly with
  /pre-push — never auto-trigger.
disable-model-invocation: true
---

# pre-push

You are a local CI runner. Surface the same failures a remote CI pipeline would
catch — before the push happens.

Detect commands from actual project files. Never run anything without showing
the user exactly what will be executed and getting confirmation first.

---

## PHASE 1 — Detect CI Commands

Run all of the following silently:

```bash
cat package.json 2>/dev/null
cat Makefile 2>/dev/null
cat go.mod 2>/dev/null | head -3
cat Cargo.toml 2>/dev/null | head -10
cat pyproject.toml 2>/dev/null
ls .github/workflows/ 2>/dev/null
cat .github/workflows/*.yml 2>/dev/null | grep -E '^\s+run:' | head -30
```

From these files, build a list of candidate commands. Map them to categories:

| Category   | What to look for |
|------------|-----------------|
| test       | `scripts.test` in package.json; `go test ./...`; `cargo test`; `pytest`; `make test` |
| lint       | `scripts.lint` in package.json; `golangci-lint run`; `cargo clippy`; `ruff check`; `make lint` |
| type-check | `scripts.typecheck` or `tsc --noEmit` in package.json |
| build      | `scripts.build` in package.json; `go build ./...`; `cargo build`; `make build` |
| ci         | `run:` lines from workflow YAML files not already covered above |

For each detected command, record:
- Category (test / lint / type-check / build / ci)
- Exact command string
- Source file it was found in

If no commands are detected at all, say: "I couldn't detect any runnable
commands. What command runs your tests or CI checks?"

---

## PHASE 2 — Select and Confirm

Present the detected commands as a numbered menu:

```
I found these commands to run before pushing:

  [1] test        — [exact command]   (from [source file])
  [2] lint        — [exact command]   (from [source file])
  [3] type-check  — [exact command]   (from [source file])
  [4] build       — [exact command]   (from [source file])

Which would you like to run?
  • Say 'all' to run everything in order (recommended)
  • Say numbers like '1 2' to run a subset
  • Say 'add [command]' to include something not listed

Default order if running all: type-check → lint → test → build
```

Wait for the user's selection. Do not run anything before they respond.

After they select, confirm once:

```
I'll run:
  [1] [command]
  [2] [command]
  ...

In that order, stopping on first failure. Go?
```

Wait for yes before running anything.

---

## PHASE 3 — Execute and Report

Run each confirmed command in sequence. After each command:

- If it exits 0: mark as PASS and continue to the next.
- If it exits non-zero: mark as FAIL, show the last 30 lines of output, and
  stop. Do not run subsequent commands unless the user explicitly says
  "continue anyway".

After all commands finish (or after a failure), show a summary:

```
Pre-push check complete:

  [PASS] type-check  — tsc --noEmit
  [PASS] lint        — eslint src/
  [FAIL] test        — npm test
         ↳ [last 30 lines of failure output]

1 failure. Fix it before pushing.
```

If all pass:

```
Pre-push check complete:

  [PASS] type-check  — tsc --noEmit
  [PASS] lint        — eslint src/
  [PASS] test        — npm test
  [PASS] build       — npm run build

All checks passed. Safe to push.
```

---

## Rules

- Never run any command without showing it first and receiving confirmation.
- Never fabricate commands — only run commands found in Phase 1 or explicitly
  provided by the user.
- Never install git hooks unless the user explicitly asks for it.
- Always show the exact command being run, not a paraphrase.
- Stop on first failure by default — running later checks after a failure hides
  the root cause.

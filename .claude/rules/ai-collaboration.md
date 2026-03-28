# AI Collaboration Rules

These rules define the behavior boundaries for AI agents (Claude Code and others) working in any project that uses lair.

## Before Modifying Files

- Read the file before editing it. Never modify code you haven't read.
- If a change affects more than one file, state the scope before proceeding.
- For destructive operations (delete, overwrite, rename), confirm with the user first.
- Never silently delete files. If something should be removed, say so and wait for approval.

## Scope of Autonomous Action

**Act without confirmation:**
- Editing existing files within the current task scope
- Creating new files that were explicitly requested
- Running tests, linters, formatters
- Reading any file in the repo

**Always confirm first:**
- Deleting files or directories
- Force-pushing or amending published commits
- Changing CI/CD configuration
- Installing new dependencies (package.json, go.mod, Cargo.toml changes)
- Creating or closing GitHub issues/PRs
- Any action affecting shared state outside the local repo

## No Speculative Work

- Don't add features that weren't asked for.
- Don't refactor surrounding code while fixing a bug.
- Don't add error handling for impossible states.
- Don't add comments or docstrings to code you didn't change.
- Don't add abstractions for future requirements that don't exist yet.

## When Stuck

- If blocked after one investigation attempt, ask the user — don't retry the same failing action.
- State what you tried, what failed, and what you need to proceed.
- Don't use destructive actions (force push, reset --hard, rm -rf) to get unstuck.

## PROJECT.md and JOURNAL.md

- `PROJECT.md` is the source of truth for current project state. Read it at the start of any non-trivial task.
- `JOURNAL.md` is append-only. Never edit past entries.
- When scope, stack, or direction changes: run `project-sync` to update `PROJECT.md` and append to `JOURNAL.md`.
- Never overwrite `JOURNAL.md` — always append.

## Security

- Never commit secrets, credentials, or tokens.
- Never suggest hardcoding API keys or passwords.
- If you generate code that reads from environment variables, always generate a corresponding `.env.example`.
- Flag potential security issues immediately when spotted, even if not asked.

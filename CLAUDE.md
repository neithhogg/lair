# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

**lair** is a reusable skill set for the [skills.sh](https://skills.sh) platform. It provides three user-invocable skills (`/project-init`, `/project-sync`, `/project-config`) that bootstrap new AI-assisted projects with scope discipline and living documentation. Distributed via `npx skills add neithhogg/lair`.

## Commands

```bash
npm run setup      # Install lair skills locally + recommended third-party skills
npm run validate   # Validate all SKILL.md frontmatter (run before pushing)
```

Node 22+ required (see `.nvmrc`). No external npm dependencies.

## Architecture

### Skills (`skills/*/SKILL.md`)

Each skill is a single Markdown file with YAML frontmatter:

```yaml
---
name: skill-name        # Must match directory name exactly
description: >          # Min 20 chars; used for auto-invocation matching
  ...
disable-model-invocation: true  # Explicit /command only (no auto-trigger)
---
```

Frontmatter is validated against `scripts/skill-schema.json`. User-invocable skills must also have an `evals/` subdirectory (CI enforces this).

### The Three Skills

**`/project-init`** — 4-phase project bootstrap:
1. Discovery (5 rounds: idea, users, scope boundaries, constraints, success metrics)
2. Tech stack proposal (every choice traced to Phase 1 constraints)
3. File scaffold (generates PROJECT.md, JOURNAL.md, .gitignore, tmp/README.md)
4. Skill discovery (searches skills.sh, user multi-selects to install)

**`/project-sync`** — keeps all project docs accurate and consistent:
- Auto-reads git history and file changes to determine what shipped and what's planned
- JOURNAL.md is a plain checklist: `- [x]` done, `- [ ]` planned (no verbose entries)
- Performs a consistency pass across PROJECT.md, JOURNAL.md, CLAUDE.md — fixes stale content
- Confirms proposed changes once before writing

**`/project-config`** — generates the right AI agent context file for any codebase:
- Detects the running agent (Claude Code, Codex, Gemini CLI, Cursor, Windsurf, etc.)
- Scans the codebase for commands, architecture, and style config
- Writes CLAUDE.md, AGENTS.md, GEMINI.md, or .cursorrules as appropriate

### Living Documents Pattern

PROJECT.md (scope/stack reference) + JOURNAL.md (living checklist) travel together in every project bootstrapped by lair, giving any AI agent full session context.

### Supporting Scripts

- `scripts/setup.js` — installs lair's own skills + recommended third-party skills; failures are warnings only
- `scripts/validate-skills.js` — parses YAML frontmatter, checks schema, verifies directory/name alignment
- `scripts/skills.recommended.json` — team-vetted third-party skills to auto-install during setup

## CI

`.github/workflows/validate-skills.yml` runs on PRs touching skill files:
1. `npm run validate` — checks all SKILL.md frontmatter
2. Verifies `evals/` directories exist for each user-invocable skill

## Contributing

**Adding a skill:**
1. Create `skills/my-skill/SKILL.md` with valid frontmatter
2. Run `npm run validate` locally
3. If user-invocable, run `/skill-creator` to generate `evals/`
4. Commit as `skill: add my-skill`

**Updating recommended skills:** edit `scripts/skills.recommended.json` and PR.

**Iterating on existing skills:** re-run `/skill-creator` to refresh evals after edits to user-invocable skills.

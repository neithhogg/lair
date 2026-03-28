---
name: lair
description: AI project foundation layer. Installs three skills (project-init, project-sync, skill-writer) and four rule files (file management, gitignore, coding conventions, AI collaboration boundaries) into Claude Code. Use when starting any new project or when you want a consistent working method across projects. After installation, use project-init to start a new project, project-sync to keep it current, and skill-writer to extend the system.
---

# lair

Foundation layer for AI-assisted projects. Install once. Bring a working method everywhere.

## What's Included

### Skills

**`project-init`** — Four-phase project initialization ritual. Clarifies requirements, confirms scope, decides tech stack, then scaffolds files and installs relevant skills. Produces `PROJECT.md`, `JOURNAL.md`, `.gitignore`, and `tmp/README.md`.

**`project-sync`** — Keeps `PROJECT.md` current as the project evolves. Appends dated entries to `JOURNAL.md`. Run when scope, stack, or direction changes.

**`skill-writer`** — Turns repeatable workflow patterns into publishable Claude Code skills. Follows skills.sh specification and lair's conventions automatically.

### Rules

Injected as context automatically after installation. No invocation needed.

- **`rules/file-management.md`** — `tmp/` rules, naming conventions, forbidden patterns
- **`rules/gitignore.md`** — Standard ignore patterns by tech stack
- **`rules/coding-conventions.md`** — TypeScript, Go, Rust, and shell conventions
- **`rules/ai-collaboration.md`** — AI behavior boundaries: when to act autonomously, when to confirm, how to handle `PROJECT.md` and `JOURNAL.md`

## How to Use

**New project:**
```
Trigger: "start a new project" / "initialize this project" / "project-init"
```

**Project changed:**
```
Trigger: "sync the project" / "update PROJECT.md" / "project-sync"
```

**New skill:**
```
Trigger: "write a skill for..." / "codify this workflow" / "skill-writer"
```

## Design Principles

- **Self-referential:** lair uses its own skills and follows its own rules
- **No hardcoded opinions:** `project-init` searches skills.sh live — it doesn't prescribe a stack
- **Append-only history:** `JOURNAL.md` is never overwritten, only extended
- **Minimal surface area:** four skills, four rules, two meta-documents — no more than needed

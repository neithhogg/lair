---
name: project-init
description: >
  Initializes a new AI-assisted project through a structured multi-phase
  conversation. Use when starting a new project from scratch, or when no
  PROJECT.md exists in the current directory. Generates PROJECT.md, JOURNAL.md,
  .gitignore, and tmp/. Also finds and installs relevant skills from skills.sh.
  Invoke with /project-init — never auto-trigger.
disable-model-invocation: true
---

# project-init

You are a structured project partner. Your job is to run through four phases
in order. Never skip a phase. Never write files until Phase 3. Always wait for
explicit approval before moving to the next phase.

If PROJECT.md already exists, stop and say:
"This project already has a PROJECT.md. Use /project-sync to update it instead."

---

## PHASE 1 — Discovery

Ask questions across multiple turns. Do not ask everything at once. Be
conversational, not form-like. Cover these areas in order:

**Round 1 — The idea**
Ask: "Tell me what you're building. No constraints yet — just the raw idea."
Then reflect back: "So what I'm hearing is..."
Then ask: "What's the one thing that makes this necessary or different?"

**Round 2 — Users and value**
Ask: "Who uses this, and what do they get that they couldn't before?"
Push on vagueness. If they say "developers", ask: "Which kind? Doing what
specifically? What are they doing right now instead?"

**Round 3 — Scope boundary** (most important)
Ask: "What is explicitly NOT part of this project — things that might seem
related but you're consciously leaving out?"
If they struggle, ask: "Imagine the MVP is done and shipped. What feature
requests would you say no to?"
Require at least 3 concrete out-of-scope items before proceeding.

**Round 4 — Constraints**
Ask: "Any hard constraints? Deadline, existing systems to integrate, target
platforms, team size?"

**Round 5 — Success**
Ask: "How do you know this worked? What does done look like in 3 months?"

After all five rounds, show a summary in this exact format:

```
Project: [name]
Core purpose: [one sentence]
Primary users: [specific]

In scope:
- [item]

Out of scope (minimum 3):
- [item]

Constraints: [list or "none"]
Success looks like: [concrete description]
```

Then ask: "Does this accurately capture what you're building?
Say 'yes' to continue, or correct anything."

Do NOT proceed to Phase 2 until they say yes or an equivalent confirmation.

---

## PHASE 2 — Tech Stack Decision

Based only on what was approved in Phase 1, propose a tech stack.

Format every choice as:
```
[Layer]: [Choice]
Why: [one sentence tied to their specific constraints or scope]
Tradeoff: [what this costs them]
If you disagree: [what to say]
```

Cover: language, framework, database (if needed), auth (if needed),
hosting/infra, testing approach, key libraries.

Rules:
- Never recommend something just because it's popular
- Every choice must trace back to a Phase 1 constraint or requirement
- If their constraints point to Go or Rust, do not default to TypeScript
- Keep the stack minimal — only what the scope actually needs

Ask: "Any choices you want to override? Tell me which and why —
I'll adjust the rest accordingly."

Re-run affected choices if anything changes.

Do NOT proceed to Phase 3 until they explicitly approve the stack.

---

## PHASE 3 — File Scaffold

Show a preview of each file, then write only after they confirm.
Ask once: "Ready to generate these files?" and wait for yes.

### PROJECT.md
```markdown
# [Project Name]

## Purpose
[one paragraph from Phase 1]

## Users
[from Phase 1, specific]

## In Scope
[approved list]

## Out of Scope
[approved list — minimum 3 items]

## Tech Stack
[approved stack, each with one-line rationale]

## Constraints
[from Phase 1, or "none"]

## Success Criteria
[from Phase 1]

## Last Updated
[today's date]
```

### JOURNAL.md
```markdown
# Project Journal

A running record of decisions, pivots, and future direction.
Append — never overwrite. Run /project-sync to add new entries.

---

## [today's date] — Project initialized

### Why this project
[distilled from Phase 1 discovery]

### Key decisions made today
[tech stack choices with rationale from Phase 2]

### Future vision
[where this could go beyond the current scope]
```

### .gitignore
Generate based on the approved tech stack. Always include:
```
# IDEs
.idea/
.vscode/
*.iml
.cursor/

# OS
.DS_Store
Thumbs.db
._*

# Logs and temp
*.log
tmp/
.tmp/

# Env
.env
.env.local
.env.*.local
*.env
```

Add stack-specific entries:
- TypeScript/Node: `node_modules/`, `dist/`, `.next/`, `out/`, `*.tsbuildinfo`
- Go: `bin/`, `*.exe`, `*.test`, `vendor/`
- Rust: `target/`, `Cargo.lock` (libraries only)

### tmp/README.md
```markdown
# tmp/

Temporary workspace for AI-generated files.

Rules:
- All AI-generated intermediate files go here
- Flat structure only — no subdirectories inside tmp/
- Files named as: [task-slug]-[YYYY-MM-DD].[ext]
- This directory is gitignored
- Clean up regularly
```

Write all four files. Confirm each one was written successfully.

---

## PHASE 4 — Skill Setup

Tell the user:
"Now let's find skills for this project. I'll search skills.sh based on your
tech stack. You choose what to install — nothing happens without your confirmation."

Run searches using npx skills find based on Phase 2 tech stack:
- TypeScript → `npx skills find typescript`
- React/Next.js → `npx skills find react`, `npx skills find nextjs`
- Go → `npx skills find golang`
- Rust → `npx skills find rust`
- Any project → `npx skills find debugging`, `npx skills find git`

For each search, present results grouped by category:

```
Workflow (recommended for any project):
[ ] obra/superpowers → systematic-debugging (38K installs)
[ ] obra/superpowers → writing-plans (37K installs)
[ ] github/awesome-copilot → git-commit (17K installs)

Tech stack (based on your choices):
[ ] [results from search]

Quality:
[ ] anthropics/skills → skill-creator (103K installs)
```

Rules for recommendations:
- Only suggest skills with 1K+ installs
- Prefer verified sources: vercel-labs, anthropics, microsoft, supabase, expo
- Be honest when no strong skill exists for a domain
- Never recommend based on name alone — check install count

Ask: "Which would you like to install? You can select by number or category."

For each confirmed selection, run:
```bash
npx skills add [owner/repo] --skill [skill-name] -y
```

After all done, say:
"Setup complete. Your project is ready.
Run /project-sync any time your scope or direction changes."

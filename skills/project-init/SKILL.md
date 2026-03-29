---
name: project-init
description: >
  Bootstraps a new AI-assisted project through a structured 4-phase conversation,
  then generates PROJECT.md, JOURNAL.md, .gitignore, and tmp/README.md. Also searches
  skills.sh and installs relevant skills for the approved tech stack. Optionally
  initializes OpenSpec for spec-driven development workflows. Use when starting a new
  project or when the current directory has incomplete AI setup. Invoke with
  /project-init — never auto-trigger.
disable-model-invocation: true
---

# project-init

You are a structured project partner. Your job is to run through four phases
in order. Never write files until Phase 3. Always wait for explicit approval
before moving to the next phase.

---

## PROJECT.md Triage

Before anything else, check whether this project is already initialized.

**Step 1 — Read the directory state silently.**
Check for:
- `PROJECT.md` (read its content)
- `JOURNAL.md` (exists or not)
- `.gitignore` (exists or not)
- `CLAUDE.md`, `AGENT.md`, or `AGENTS.md` (any AI context file)

**Step 2 — Classify and act.**

**Case A — No PROJECT.md (or empty / stub < 100 chars / ≤ 1 meaningful section):**
Treat as a fresh project. Run all four phases normally.

**Case B — Fully initialized:**
PROJECT.md has ≥ 4 of these sections (Purpose, Users, In Scope, Out of Scope,
Tech Stack, Constraints, Success Criteria) AND JOURNAL.md exists AND at least
one AI context file exists.

Stop and say:
"This project looks fully initialized. Use /project-sync to update it instead."

**Case C — Partially initialized:**
PROJECT.md exists with real content, but some pieces are missing. Infer which
phases are done using these rules:
- Phase 1 done → PROJECT.md contains Purpose, Users, In Scope, Out of Scope, and Constraints
- Phase 2 done → PROJECT.md also contains a Tech Stack section
- Phase 3 done → JOURNAL.md and .gitignore both exist
- Phase 4 always offered (skill installs can't be reliably detected)

Show the user what exists and what's missing:

```
I found a PROJECT.md with some content, but your setup looks incomplete.

[x] PROJECT.md — [N] sections found
[x/·] JOURNAL.md — [found / missing]
[x/·] .gitignore — [found / missing]
[x/·] AI context file (CLAUDE.md / AGENT.md) — [found / missing]

Picking up from Phase [X]. I'll use what's already in PROJECT.md —
correct anything that's wrong as we go.
```

Then skip completed phases and run from the first incomplete phase forward.
Use content already in PROJECT.md as the approved baseline for skipped phases —
don't re-ask questions whose answers are already documented.

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
If they say "none" or "no constraints", probe gently: "What would make you
abandon a tech choice mid-build? (e.g., too slow, too expensive, no iOS support)"
This usually surfaces hidden constraints.

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

Tell the user what files you're about to create (just the names and one-line
purpose for each — don't show the full content yet), then ask once:
"Ready to generate these files?" and wait for yes.

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

Run searches using `npx skills find` based on the approved Phase 2 tech stack.
Search for each major technology and also always search for general workflow skills:

```bash
npx skills find [language]        # e.g., typescript, golang, rust, python
npx skills find [framework]       # e.g., react, nextjs, django, fastapi
npx skills find debugging
npx skills find git
```

For each search, collect the results. Then present a grouped list to the user.
Only include skills with 1K+ installs. Be honest when a search returns nothing
strong. Do not invent skill names or install counts — show what the tool actually returns.

Example presentation format:
```
Workflow (useful for any project):
[ ] owner/repo → skill-name (Xk installs)

[Technology] skills:
[ ] owner/repo → skill-name (Xk installs)
```

Ask: "Which would you like to install? You can select by number or category."

For each confirmed selection, run:
```bash
npx skills add [owner/repo] --skill [skill-name] -y
```

After all installs are confirmed, offer OpenSpec:

"One more optional setup: **OpenSpec** adds spec-driven workflows to your project.
Before you start a feature, `/opsx:propose` creates a structured proposal with
rationale, requirements, and a task checklist. `/opsx:apply` implements it.
`/opsx:archive` stores it when done. Lightweight, AI-agnostic, and version-controlled.

Want to initialize it? (yes / skip)"

If yes:
```bash
npx openspec init
```
Then say: "OpenSpec initialized. Use `/opsx:propose` when you're ready to plan your first feature."

If skip: continue to the completion message.

---

"Setup complete. Your project is ready.
Run /project-sync any time your scope or direction changes."

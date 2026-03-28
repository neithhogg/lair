---
name: project-init
description: Four-phase project initialization ritual. Creates PROJECT.md, JOURNAL.md, .gitignore, and tmp/README.md. Installs relevant skills from skills.sh based on the project's needs. Use when starting a new project or when a project exists but has no documented scope, stack, or structure. Runs a structured conversation — does not skip phases or proceed without explicit approval.
---

# project-init

Runs a four-phase initialization ritual. Each phase ends with a summary and waits for explicit approval before continuing. Do not skip phases. Do not combine phases.

---

## Phase 1 — Requirements Clarification

Ask the following questions. Do not proceed to Phase 2 until you have clear answers to all of them.

Ask one at a time if the conversation is early. Ask all at once if the user seems ready to answer quickly.

**Questions:**
1. What does this project do? (one sentence, present tense)
2. Who uses it? (yourself, a team, end users, other developers?)
3. What problem does it solve that doesn't already exist?
4. What does success look like in 3 months?
5. What are you explicitly not building? (scope boundary)

If any answer is vague, ask a follow-up. Don't accept "I'll figure it out later" for questions 1, 3, or 5 — these are the ones that prevent scope creep later.

**End of Phase 1:** Summarize the answers back. Ask: "Does this capture what you have in mind? Any corrections before we move on?"

Wait for approval.

---

## Phase 2 — Scope Confirmation

Present the scope boundary clearly:

```
Project: [name]
Does: [one sentence]
For: [who]
Success in 3 months: [what]
Out of scope: [list]
```

Ask: "Is this the right scope? If you approve, we'll move to tech stack decisions."

Wait for explicit approval (not just silence — ask again if needed).

---

## Phase 3 — Tech Stack Decisions

For each decision, state the recommendation and the reason. Don't ask open-ended "what do you want to use?" — propose a default and let the user override.

Work through these in order:

1. **Language** — Recommend based on the project type (web API → Go or TypeScript; CLI → Go or Rust; data processing → Python; full-stack → TypeScript). State why.
2. **Runtime/framework** — One recommendation per layer. No lists of options unless the user asks.
3. **Database** (if needed) — Postgres by default for anything relational. Redis only if caching is explicitly needed. SQLite for single-user tools.
4. **Testing** — Match the ecosystem's standard (Go: built-in testing + testify; TS: vitest; Python: pytest; Rust: built-in).
5. **CI** (if needed) — GitHub Actions by default.

**End of Phase 3:** Present a complete summary of the stack. Ask: "Does this stack work for you? Any changes before we scaffold?"

Wait for approval.

---

## Phase 4 — Scaffold + Skill Installation

### 4a. Generate core files

**`.gitignore`** — Generate using the rules from `rules/gitignore.md`. Include the "Always Ignore" section plus the tech-stack-specific section for the chosen language.

**`tmp/README.md`** — Create with content:
```markdown
# tmp/

Scratch files and experiments. Not committed to git.

| File/Dir | Purpose | Created |
|----------|---------|---------|
| (empty)  |         |         |
```

**`PROJECT.md`** — Generate using this template:
```markdown
# [project name] — Project State

## Current State
[one paragraph describing current status]

## What This Is
[2-4 bullet points]

## What This Is Not
[2-4 bullet points]

## Tech Stack
[stack decisions from Phase 3, each with a one-line reason]

## Scope Boundaries
**In scope:**
[list from Phase 2]

**Out of scope:**
[list from Phase 2]

## Constraints
[any hard constraints mentioned during the conversation]
```

**`JOURNAL.md`** — Generate using this template:
```markdown
# [project name] — Journal

_This file is append-only. New entries go at the top. Never edit past entries._

---

## [today's date] Project initialized

**Why this way:**
[2-3 sentences capturing the key decisions made in Phases 1-3 and why]

**Key decisions:**
[bullet list of the non-obvious choices made and their reasons]

---

## Future Vision

[1-2 paragraphs about what this project could become]
```

### 4b. Find and install relevant skills

Search for skills that match the project's needs. Use the actual `npx skills find` command — do not hardcode skill names.

Run searches for each relevant category:

```
npx skills find [language]
npx skills find [framework]
npx skills find [domain — e.g., "api", "cli", "database", "auth"]
```

Present results to the user. For each relevant skill found, show:
- Skill name
- One-line description
- Install command

Let the user select which ones to install. Install the selected ones:

```
npx skills add [skill-name]
```

Confirm each installation succeeded.

### 4c. Final summary

List everything created:
- Files generated
- Skills installed
- Next steps (what to do now that the project is initialized)

Ask: "You're set up. Anything else before we start building?"

---

## Rules Reference

This skill follows the constraints in:
- `rules/file-management.md` — file naming, tmp/ rules
- `rules/gitignore.md` — what to ignore
- `rules/ai-collaboration.md` — confirmation requirements, scope of autonomous action

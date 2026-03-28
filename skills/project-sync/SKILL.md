---
name: project-sync
description: Updates PROJECT.md when a project's scope, stack, or direction changes. Appends a dated entry to JOURNAL.md recording what changed and why. Use when the project has shifted since initialization — new tech stack decision, scope expansion or contraction, direction change, or major milestone reached. Companion skill to project-init.
---

# project-sync

Keeps `PROJECT.md` current and `JOURNAL.md` honest. Run this when something meaningful has changed about the project — not for every small commit, but for shifts in scope, stack, or direction.

`JOURNAL.md` is append-only. Never edit past entries.

---

## Step 1 — Read Current State

Read `PROJECT.md`. Present its contents to the user with this framing:

"Here's what PROJECT.md currently says. Tell me what's changed."

If `PROJECT.md` doesn't exist, tell the user to run `project-init` first.

---

## Step 2 — Identify What Changed

Ask the user to describe what's different. Probe for specifics if the answer is vague.

Categories to check:

- **Scope** — Did the project grow or shrink? New features added? Features cut?
- **Tech stack** — New language, framework, database, or tool? Something removed?
- **Direction** — Is the project still solving the same problem for the same people?
- **Constraints** — New hard limits? Old constraints lifted?
- **Status** — What phase is the project in now vs. when it was last synced?

If nothing meaningful has changed, say so and stop. Don't update files for cosmetic reasons.

---

## Step 3 — Update PROJECT.md

Edit only the sections that changed. Show a diff of what you're changing before applying it.

Ask: "Does this look right? I'll update PROJECT.md and add a journal entry."

Wait for confirmation.

Apply the edits. Only touch sections that changed — leave everything else exactly as it is.

---

## Step 4 — Append to JOURNAL.md

Append a new entry at the top of the entries section (below the header, above the previous entry):

```markdown
## [today's date] [one-line summary of what changed]

**What changed:**
[bullet list of specific changes]

**Why:**
[2-3 sentences on the reasoning or context behind the changes]
```

Never edit existing entries. Only append.

---

## Step 5 — Confirm

Show the user:
- The updated sections of `PROJECT.md`
- The new `JOURNAL.md` entry

Ask: "PROJECT.md updated and journal entry added. Anything else to capture?"

---

## Rules Reference

- `rules/ai-collaboration.md` — JOURNAL.md is append-only; confirm before modifying files

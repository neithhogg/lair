---
name: project-sync
description: >
  Keeps PROJECT.md, JOURNAL.md, and AI context files (CLAUDE.md, AGENT.md, AGENTS.md)
  accurate and consistent with each other. Automatically reads recent git history and file
  changes to determine what's been completed and what's planned. JOURNAL.md is a lightweight
  checklist — [x] for done, [ ] for planned. Also performs a consistency pass across all
  docs to catch stale or conflicting content. Use whenever scope, tech stack, or direction
  changes. Invoke with /project-sync — never auto-trigger.
disable-model-invocation: true
---

# project-sync

Keeps all project docs accurate and consistent. Run this whenever:
- Something significant was completed or shipped
- New planned work should be captured
- Scope, tech stack, or direction changed
- Docs feel out of sync with reality

Do NOT run for minor implementation details that don't change scope or direction.

---

## Step 1 — Auto-read everything silently

Run these commands silently:

```bash
git log --oneline -20
git diff HEAD --name-only
git status --short
```

Read all existing docs:
- `PROJECT.md`
- `JOURNAL.md`
- `CLAUDE.md` (if present)
- `AGENT.md` / `AGENTS.md` (if present)

From git history and file state, determine:
- What was recently completed (new `[x]` items for JOURNAL.md)
- What `[ ]` items in JOURNAL.md are now done (promote to `[x]`)
- What new `[ ]` items should be added (from context + user input in Step 2)
- Whether any `[ ]` items are no longer relevant (drop them)

**Consistency check:** Compare all docs against each other. Flag anything that conflicts or
is stale — e.g., CLAUDE.md describes a skill behavior that no longer matches SKILL.md,
PROJECT.md lists a tech choice that was changed, a doc references a file that was removed.

**Significance check:** Only proceed if there's something meaningful to update. If
everything looks current and consistent, say so and stop.

---

## Step 2 — Show proposed changes and confirm

Show everything you intend to update, keeping it concise:

```
JOURNAL.md:
  Marking [x]: "[item that shipped]"
  Adding [ ]: "[new planned item]"
  Dropping: "[item no longer relevant]"

PROJECT.md:
  CHANGING: [specific field] — [old] → [new]

CLAUDE.md:
  CHANGING: [section] — [what's stale and what replaces it]
```

Then ask two things at once:
1. "Does this look right? Say 'yes' to write."
2. "Anything new to add to the `[ ]` backlog?"

---

## Step 3 — Write all files

Once confirmed:

### JOURNAL.md
A short, structured checklist. Always overwrite the full file — this is a living doc,
not an append-only log.

```markdown
# Project Journal

_Last updated: [today's date]_

## Current
- [x] Completed item
- [x] Another completed thing

## Future
- [ ] Planned item
- [ ] Future idea
```

Rules:
- `[x]` under **Current** = shipped or done
- `[ ]` under **Future** = planned or upcoming
- One line per item — no explanations, no sub-bullets
- Keep both lists short; consolidate related items
- Update `Last updated` date every time the file is written

### PROJECT.md
Apply only what changed. Update `Last Updated` to today.

### CLAUDE.md (if present)
Fix any stale sections identified in Step 1. Don't rewrite sections that are still accurate.

### AGENT.md / AGENTS.md (if present)
Same — fix stale, preserve accurate.

Confirm: "Updated: [list of files]."

---

## Step 4 — Check for stale skills

Ask: "Did the tech stack change in a way that might need new skills?"

If yes:
```bash
npx skills find [new technology]
```

Present strong matches (1K+ installs, verified source) and ask if they want to install.

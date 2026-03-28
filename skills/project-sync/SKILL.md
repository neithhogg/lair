---
name: project-sync
description: >
  Updates PROJECT.md when the project scope, tech stack, or direction has
  changed. Appends a dated entry to JOURNAL.md recording what changed and why.
  Use whenever a significant decision is made mid-project. Invoke with
  /project-sync — never auto-trigger.
disable-model-invocation: true
---

# project-sync

Keeps the project's living documents accurate. Run this whenever:
- Scope changes (something added or removed)
- Tech stack decision is revised
- A significant pivot happens
- Constraints change
- You want to record a major decision for future reference

---

## Step 1 — Read current state

Read PROJECT.md silently. Then summarise what you understand:

```
Current project: [name]
Last updated: [date from PROJECT.md]
Current scope summary: [2-3 sentences]
Current tech stack: [brief list]
```

Ask: "What's changed since this was written?"

Listen carefully. The change might be:
- A feature added or removed from scope
- A tech choice reversed
- A new constraint discovered
- A strategic pivot
- A refinement of understanding

Ask follow-up questions until you understand exactly what changed and why.

---

## Step 2 — Update PROJECT.md

Show a diff of what you propose to change:

```
CHANGING:
  In Scope: removing "[old item]", adding "[new item]"
  Tech Stack: changing [old] → [new]
  Constraints: adding "[new constraint]"

KEEPING THE SAME:
  Purpose, Users, Out of Scope, Success Criteria
```

Ask: "Does this look right? Say 'yes' to write the changes."

Write the updated PROJECT.md. Update the `Last Updated` date to today.

---

## Step 3 — Append to JOURNAL.md

Append this entry to the bottom of JOURNAL.md (never overwrite):

```markdown
---

## [today's date] — [one-line description of what changed]

### What changed
[specific changes to scope/stack/direction]

### Why
[the reasoning or discovery that drove the change]

### Impact on what gets built next
[what this means for near-term work, if anything]
```

Confirm the entry was appended.

---

## Step 4 — Check for stale skills

Ask: "Did the tech stack change in a way that might need new skills?"

If yes, offer to run a targeted search:
```bash
npx skills find [new technology]
```

Present any strong matches (1K+ installs, verified source) and ask if they
want to install.

Then say: "PROJECT.md and JOURNAL.md are up to date."

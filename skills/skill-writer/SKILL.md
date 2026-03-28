---
name: skill-writer
description: Generates new Claude Code skills in SKILL.md format, ready to publish to skills.sh. Applies lair's rules and conventions automatically. Use when you've identified a repeatable pattern in your workflow and want to codify it as a reusable skill. Guides you through naming, description, trigger conditions, and step-by-step instructions.
---

# skill-writer

Turns a repeatable workflow pattern into a publishable Claude Code skill. The output is a `SKILL.md` file that follows the skills.sh specification and lair's conventions.

---

## Step 1 — Understand the Pattern

Ask the user to describe the workflow they want to codify. Listen for:

- What triggers the skill (what does the user say or do?)
- What the skill produces (files, commands, analysis, structured output?)
- What decisions the skill makes along the way
- What the user has to approve vs. what runs automatically

If the description is vague, ask: "Walk me through the last time you did this manually. What did you do first?"

Don't start writing until you understand the full workflow end to end.

---

## Step 2 — Define the Skill Metadata

Propose a name and description. Apply these constraints automatically:

**Name rules:**
- Max 64 characters
- Lowercase + hyphens only
- No consecutive hyphens
- Gerund form preferred (e.g., `analyzing-logs`, `generating-reports`)
- No "claude", "anthropic", or XML tags

**Description rules:**
- Max 1024 characters
- Third person (not "I can" or "you can")
- Covers: what it does + when to use it + specific trigger keywords
- Be specific enough that Claude knows when to activate it unprompted

Present: `name` and `description`. Ask: "Does this name and description capture it correctly?"

Wait for approval before continuing.

---

## Step 3 — Design the Skill Body

Structure the SKILL.md body as a numbered sequence of steps. For each step:

- State what Claude does
- State what the user needs to provide or decide
- State when to wait for approval vs. proceed automatically

Apply these patterns from lair's rules:

**From `rules/ai-collaboration.md`:**
- Steps that modify files must show what they'll change and wait for confirmation
- Steps that delete files always require explicit user approval
- Autonomous steps (running commands, reading files) don't need confirmation

**From `rules/file-management.md`:**
- New files go in predictable locations, not repo root
- Use kebab-case naming

Keep the body under 500 lines. If the skill is complex, split into:
- Main `SKILL.md` with the core flow
- `reference/` subdirectory for detailed reference material

Show the complete draft. Ask: "Does this match the workflow you had in mind? Any steps missing or wrong?"

---

## Step 4 — Generate the File

Create the skill directory and `SKILL.md` file:

```
skills/[skill-name]/SKILL.md
```

If reference files are needed:
```
skills/[skill-name]/reference/[topic].md
```

---

## Step 5 — Publish Readiness Check

Before finishing, verify:

- [ ] Name is valid (lowercase, hyphens, max 64 chars)
- [ ] Description covers what + when to use
- [ ] Body is under 500 lines
- [ ] No hardcoded time-sensitive information
- [ ] File references are one level deep from `SKILL.md`
- [ ] No Windows-style paths

If the skill is in `neithhogg/lair`, it's publishable immediately — just push to GitHub.

Tell the user: "Skill written at `skills/[name]/SKILL.md`. To publish: push to GitHub. Users install with `npx skills add [github-username]/[repo]`."

---

## Rules Reference

- `rules/ai-collaboration.md` — confirmation requirements, scope of autonomous action
- `rules/file-management.md` — file naming, directory structure

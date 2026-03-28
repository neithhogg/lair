---
name: skill-writer
description: >
  Captures a repeated workflow or pattern as a new reusable skill, formatted
  for skills.sh publication. Use when you notice you're doing the same thing
  manually 2-3 times, or when you say "I wish the AI always did X". Writes
  the new skill directly into the lair repo. Invoke with /skill-writer — never
  auto-trigger.
disable-model-invocation: true
---

# skill-writer

Turns repeated patterns into reusable, publishable skills.
Built on top of the approach from `anthropics/skill-creator`, adapted for
neithhogg's conventions and the skills.sh publication format.

The lair repo lives at: `/Users/albertmin/Documents/GitHub/lair/`

---

## Step 1 — Understand the pattern

First, check if this conversation already contains the workflow to capture.
If the user said "turn this into a skill", extract the pattern from the
conversation history — the steps taken, tools used, corrections made.

If starting fresh, ask:
"What do you find yourself doing repeatedly that you want the AI to always
handle the same way?"

Listen, then reflect back with a structured summary:

```
Pattern: [name for this behaviour]
Trigger: [when should this activate — what does the user say or what happens]
Steps: [what happens, in order]
Output: [what the user gets]
Invocation: [user-triggered /command or silent background rule]
```

Ask: "Does this capture it? Anything missing?"

---

## Step 2 — Classify the skill

Determine which type this is:

**Active skill** (user-triggered, has side effects)
→ `disable-model-invocation: true`
→ User invokes with `/skill-name`
→ Directory: `/Users/albertmin/Documents/GitHub/lair/skills/[skill-name]/`

**Background rule** (silent, always-on, no side effects)
→ `user-invocable: false`
→ Claude loads automatically when relevant
→ Directory: `/Users/albertmin/Documents/GitHub/lair/skills/rule-[name]/`

Tell the user which type and why. Ask if they agree.

---

## Step 3 — Draft the SKILL.md

Draft the complete SKILL.md:

```markdown
---
name: [kebab-case-name]
description: >
  [What this skill does and exactly when to use it. Be specific —
  this is how Claude decides to trigger it. Include key phrases a
  user might say to trigger it.]
[disable-model-invocation: true   # if active skill]
[user-invocable: false            # if background rule]
---

# [Skill Name]

[One paragraph: what this does and why it exists.]

---

## [Steps or Instructions]

## [Output format, if relevant]
```

Apply lair conventions throughout:
- Temp files → `tmp/[task-slug]-[YYYY-MM-DD].[ext]`
- No nested directories
- Confirm before writing permanent files
- English for all code and file names

Show the full draft. Ask: "Does this look right? Any adjustments?"

---

## Step 4 — Write the file

Create the directory and write SKILL.md into the lair repo:
`/Users/albertmin/Documents/GitHub/lair/skills/[skill-name]/SKILL.md`

Confirm it was written. Then say:

"Done. To publish:
1. `cd /Users/albertmin/Documents/GitHub/lair`
2. `git add . && git commit -m 'skill: add [skill-name]'`
3. `git push`

Anyone using lair can then run `npx skills update` to get it."

---

## Step 5 — Suggest trigger tests (optional)

Ask: "Want to verify the description triggers correctly?"

If yes, list:
- 3 user messages that SHOULD trigger this skill
- 2 user messages that should NOT

This helps tune the `description` field for accurate auto-invocation.

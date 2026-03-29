---
name: project-config
description: >
  Detects the running AI agent environment (Claude Code, Codex, Gemini CLI,
  Cursor, Windsurf, etc.), scans the codebase, and generates the appropriate
  context config file: CLAUDE.md, AGENTS.md, GEMINI.md, or .cursorrules.
  Also offers AGENTS.md as a cross-agent universal standard. Use when
  starting work in a new codebase or when no agent context file exists.
  Never auto-trigger — invoke explicitly with /project-config.
disable-model-invocation: true
---

# project-config

You are a codebase analyst and AI agent configurator. Your job is to generate
an accurate context file for the AI agent currently running — so future sessions
start informed, not blank.

Run all four phases in order. Never skip a phase. Never write files until
Phase 3. Always wait for explicit confirmation before writing.

---

## PHASE 1 — Agent Detection

Check the following signals in order. Stop at the first definitive match.
Run these silently before showing anything to the user.

**Check 1 — Environment variables (high confidence)**

```bash
printenv | grep -E 'CLAUDECODE|CURSOR_AGENT|GEMINI_CLI|CODEX_AGENT|OPENAI_CODEX|WINDSURF_AGENT|^AGENT='
```

Map results to agents:
- `CLAUDECODE` non-empty → Claude Code
- `CURSOR_AGENT` non-empty → Cursor
- `GEMINI_CLI` non-empty → Gemini CLI
- `CODEX_AGENT` or `OPENAI_CODEX` non-empty → OpenAI Codex
- `WINDSURF_AGENT` non-empty → Windsurf
- `AGENT=goose` → Goose
- `AGENT=amp` → Amp

**Check 2 — Config directories (medium confidence)**

If no env var matched, check which config dirs exist:

```bash
ls -d ~/.claude ~/.gemini ~/.cursor ~/.codex 2>/dev/null
```

Map results:
- `~/.claude/` → likely Claude Code
- `~/.gemini/` → likely Gemini CLI
- `~/.cursor/` → likely Cursor
- `~/.codex/` → likely OpenAI Codex

**Detection result — three outcomes:**

**A. Clear match:** Report what you found and its confidence.
Example: `Detected: Claude Code (CLAUDECODE env var — high confidence)`

Then ask: "Is this the agent you want to configure for?
Say yes, or tell me which agent to target instead."

Wait for confirmation before Phase 2.

**B. Ambiguous (2+ signals conflict):** List what you found. Ask the user
to choose from: Claude Code / OpenAI Codex / Gemini CLI / Cursor / Windsurf /
Other. Do not guess.

**C. No signal found:** Say "I couldn't detect an agent automatically."
Present the same list. Note: AGENTS.md works as a universal standard if unsure.

Do NOT proceed to Phase 2 until the target agent is confirmed.

---

## PHASE 2 — Inventory

Check which context files already exist. Run:

```bash
ls CLAUDE.md AGENTS.md GEMINI.md .cursorrules .github/copilot-instructions.md 2>/dev/null
```

Report in this exact format:

```
Existing context files:
  CLAUDE.md       — present (last modified: [date from ls -l])
  AGENTS.md       — not found
  GEMINI.md       — not found
  .cursorrules    — not found
```

For any file that already exists, ask:
"[filename] already exists. Do you want to (a) overwrite it, (b) append to it,
or (c) skip it and only create missing files?"

Wait for their answer before Phase 3.

---

## PHASE 3 — Scan and Generate

**Scan the codebase silently. Run all of these:**

```bash
# 1. Description and context
cat README.md 2>/dev/null | head -40
cat PROJECT.md 2>/dev/null | head -20

# 2. Build commands
cat package.json 2>/dev/null
cat Makefile 2>/dev/null | grep -E '^[a-zA-Z][a-zA-Z0-9_-]*:' | head -15
cat go.mod 2>/dev/null | head -5
cat Cargo.toml 2>/dev/null | head -10
cat pyproject.toml 2>/dev/null | head -20

# 3. Directory structure
ls -1

# 4. Style config
ls .eslintrc* .eslintrc.json .prettierrc* tsconfig.json .golangci.yml rustfmt.toml 2>/dev/null

# 5. CI
ls .github/workflows/ 2>/dev/null | head -5

# 6. Contributing rules
cat CONTRIBUTING.md 2>/dev/null | head -30
```

**Hard constraint: Only include commands you confirmed exist in the files above.
If a command is not found, write "not detected". Never fabricate.**

**Target length: 80–130 lines.**

Now generate the appropriate file based on the confirmed agent:

---

### Claude Code → CLAUDE.md

```markdown
# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## What This Repo Is
[One paragraph from README.md or PROJECT.md. If neither has a clear description,
describe what you inferred from directory structure and file fingerprints.]

## Commands

### Build
[exact command from package.json scripts.build / Makefile / go build, or "not detected"]

### Test
[exact command from package.json scripts.test / go test / cargo test, or "not detected"]

### Lint
[exact command from package.json scripts.lint / Makefile, or "not detected"]

### Run / Start
[exact command from package.json scripts.start / scripts.dev, or "not detected"]

## Architecture
[2–4 sentences on directory layout and core modules, based on ls -1 output.
Name top-level directories and their purpose if inferrable.]

## Code Style
[Infer from tsconfig.json, .eslintrc, .prettierrc, .golangci.yml, rustfmt.toml.
If no style config found: "No style config detected — add conventions here."]

## Key Conventions
[Any patterns found in CONTRIBUTING.md or PROJECT.md. Omit this section entirely
if nothing relevant was found.]

## Last Updated
[today's date in YYYY-MM-DD format]
```

---

### OpenAI Codex / Windsurf / GitHub Copilot → AGENTS.md

```markdown
# AGENTS.md

## What This Repo Is
[Same description used in CLAUDE.md above.]

## Repo Map

| Path | Purpose |
|------|---------|
| [dir/] | [one-line purpose inferred from name/contents] |

Only list top-level directories and key root files. Skip: .git, node_modules,
dist, build, .next, target, vendor.

## Commands

| Task  | Command                   |
|-------|---------------------------|
| Build | [exact or "not detected"] |
| Test  | [exact or "not detected"] |
| Lint  | [exact or "not detected"] |
| Run   | [exact or "not detected"] |

## Development Guidelines

[Subsections only for what was found:]

### Code Style
[From style config files, or omit if none found.]

### Testing
[From CONTRIBUTING.md or inferred from test file structure, or omit.]

### Commits
[From CONTRIBUTING.md if present, or omit.]

## Out of Scope
[From PROJECT.md Out of Scope section if present. Omit entirely otherwise.]

## Last Updated
[today's date in YYYY-MM-DD format]
```

---

### Gemini CLI → GEMINI.md

Use the exact same structure as CLAUDE.md above, with the filename GEMINI.md.
Content and sections are identical — Gemini CLI loads GEMINI.md the same way
Claude Code loads CLAUDE.md.

---

### Cursor → .cursorrules

Plain text only. No markdown headers. No bullet points. Direct imperative
rules, each on its own line.

```
This repo is [one-sentence description from README.md].

Build: [exact command or "not detected"]
Test: [exact command or "not detected"]
Lint: [exact command or "not detected"]
Run: [exact command or "not detected"]

Top-level directories:
[dir/] — [one-line purpose]
[dir/] — [one-line purpose]

Code style: [key rules from config files, or "no style config found"]

[If CONTRIBUTING.md has rules:] Contributing: [key rules]

Last updated: [today's date in YYYY-MM-DD format]
```

---

### Unknown agent → AGENTS.md

Use the AGENTS.md template above. It is the cross-agent standard and compatible
with Codex, Windsurf, GitHub Copilot, Claude Code, and 60,000+ public repos.

---

After writing the file, confirm:
`Written: [filename] ([N] lines)`

Do NOT proceed to Phase 4 until at least one file is written successfully.

---

## PHASE 4 — Cross-Agent Compatibility

Ask:
"Do you want AGENTS.md as a cross-agent universal standard?
It's compatible with Codex, Windsurf, GitHub Copilot, and is used by 60,000+
public repos as a baseline. (yes / no / already have one)"

If yes and AGENTS.md doesn't exist: generate it now using the AGENTS.md
template from Phase 3. Use the codebase data already scanned — do not re-scan.

If the agent you just configured for was already Codex/Windsurf/Copilot
(meaning you already wrote AGENTS.md), skip Phase 4.

End with:
"Done. Run /project-sync any time your architecture, commands, or stack
changes to keep these files accurate."

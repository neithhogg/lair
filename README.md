# lair

> neithhogg's AI project foundation — install once, carry everywhere.

```bash
npx skills add neithhogg/lair
```

## What it does

`lair` installs two things into any AI-assisted project:

**Skills you invoke deliberately**

| Command | What it does |
|---|---|
| `/project-init` | Multi-phase conversation to bootstrap a new project — requirement discovery, scope lock, tech stack decision, file scaffold, skill installation |
| `/project-sync` | Update PROJECT.md when scope changes, append a record to JOURNAL.md |

**Rules that silently govern AI behaviour**

| Rule | Effect |
|---|---|
| `rule-file-management` | All AI-generated temp files go in `tmp/` — flat, no nesting |
| `rule-gitignore` | Standard .gitignore for TS / Go / Rust + IDEs + OS files |
| `rule-coding-conventions` | Naming and structure conventions for TypeScript, Go, and Rust |
| `rule-ai-collaboration` | Confirm before large changes, no silent deletes, scope discipline |

## Quick start

```bash
# 1. New project
mkdir my-project && cd my-project
npx skills add neithhogg/lair

# 2. Open Claude Code, then:
/project-init
```

## How it works

`project-init` runs a four-phase conversation:
1. **Discovery** — clarify what you're building over multiple turns
2. **Tech stack** — propose a minimal stack with explicit tradeoffs
3. **Scaffold** — generate `PROJECT.md`, `JOURNAL.md`, `.gitignore`, `tmp/`
4. **Skills** — search skills.sh for your stack, multi-select install

`project-sync` keeps `PROJECT.md` current and `JOURNAL.md` append-only —
together they give any AI agent full project context across sessions.

## Contributing / Setup

After cloning:

```bash
npm run setup
```

Installs all of lair's skills plus the team's recommended third-party skills
into every AI tool you have installed (Claude Code, Cursor, Codex, Gemini CLI, etc.).

To add a recommended skill for the team, edit `scripts/skills.recommended.json` and open a PR.

### Skill quality

Before merging changes to a user-invocable skill (`project-init`, `project-sync`):

1. Open Claude Code in this repo
2. Run `/skill-creator` and point it at the skill
3. Let it evaluate trigger accuracy and generate evals
4. Check in the resulting `skills/{name}/evals/` files with your PR

## Iterating lair itself

```bash
git clone https://github.com/neithhogg/lair && cd lair
# Make changes to skills/ or scripts/
git add . && git commit -m "skill: add [name]"
git push
# Other projects update with:
npx skills update
```

## Stack coverage

TypeScript · React · Next.js · Go · Rust

## License

MIT

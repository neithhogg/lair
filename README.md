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
| `/skill-creator` | Build, test, and benchmark a new skill with evals and description optimisation |

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

`skill-creator` builds new skills with full eval lifecycle — intent capture, test
cases, benchmarking, grading, and description optimisation for accurate triggering.

## Iterating lair itself

```bash
cd /Users/albertmin/Documents/GitHub/lair
# Make changes
git add . && git commit -m "skill: add [name]"
git push
# Other projects update with:
npx skills update
```

## Stack coverage

TypeScript · React · Next.js · Go · Rust

## License

MIT

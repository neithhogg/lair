# File Management Rules

## tmp/ Directory

- All temporary, experimental, or scratch files go in `tmp/`
- `tmp/` is always gitignored
- Never create nested temp directories (`tmp/foo/bar/` is forbidden — use `tmp/foo-bar/`)
- Every `tmp/` must have a `tmp/README.md` listing what's in it and why

## Naming Conventions

- Files: `kebab-case.ext` (e.g., `auth-service.ts`, `parse-config.go`)
- Directories: `kebab-case/` (e.g., `user-profiles/`, `api-clients/`)
- No spaces in file or directory names
- No uppercase in paths (exception: `README.md`, `SKILL.md`, `PROJECT.md`, `JOURNAL.md`, `LICENSE`)
- Config files follow their ecosystem convention (`.env`, `Makefile`, `Dockerfile` are fine as-is)

## Forbidden Patterns

- No files at repo root other than: `SKILL.md`, `PROJECT.md`, `JOURNAL.md`, `README.md`, `LICENSE`, standard config files (`.gitignore`, `Makefile`, `Dockerfile`, `package.json`, etc.)
- No `__pycache__/`, `.DS_Store`, `*.pyc`, `node_modules/` committed to git
- No hardcoded secrets or credentials in any file (use `.env` + `.env.example`)

## File Size Guidelines

- Source files: aim for under 300 lines; split at 500
- SKILL.md files: keep under 500 lines (skills.sh requirement)
- Markdown docs: no hard limit, but prefer multiple focused files over one monolith

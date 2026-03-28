# Project Journal

A running record of decisions, pivots, and future direction.
Append — never overwrite. Run /project-sync to add new entries.

---

## 2026-03-28 — Project initialized

### Why this project
Manual rule copying between AI projects was the status quo. Every new project started without conventions, and there was no consistent layer shared across Claude Code, Cursor, and Codex workflows. lair is the fix: one public repo that any project can pull from.

### Key decisions made today
- **Markdown + YAML frontmatter** — stay native to skills.sh, no build tooling needed
- **Public GitHub repo** — skills.sh distribution requires it; also the right call for community adoption
- **Semver git tags** — enables version pinning, important as the skill set evolves
- **GitHub Actions for frontmatter validation** — lightweight CI that catches broken skills before merge
- **No domain or language specificity** — keeping the scope general-purpose ensures the skills stay portable across all AI project types

### Future vision
As adoption grows, this repo could become a reference implementation for AI project conventions. Potential directions: a curated "starter pack" install command, community contributions via PR, and a changelog-driven release process to track what changed between versions.

# lair

## Purpose
A public, reusable skill set for skills.sh that encodes personal conventions for AI-assisted development. Designed to work across Claude Code, Cursor, and Codex so any AI-involved project can start with the right rules already in place — no manual copying between projects.

## Users
Primary: personal use and team. Secondary: the broader AI developer community via public GitHub repo.

## In Scope
- Custom rules for AI-assisted development workflows
- Skills compatible with Claude Code, Cursor, and Codex
- Shareable via public GitHub repo (`npx skills add neithhogg/lair`)
- General-purpose AI project conventions, not tied to any one domain or language stack

## Out of Scope
- Domain-specific skills (finance, healthcare, gaming, etc.)
- Language-specific skills (Python-only, Go-only, etc.)
- Database or RAG tooling

## Tech Stack
- **Format:** Markdown + YAML frontmatter — skills.sh native format, no build step required
- **Distribution:** Public GitHub repo — required by skills.sh resolution mechanism
- **Versioning:** Git tags (semver) — allows users to pin with `npx skills add neithhogg/lair@v1.0.0`
- **Testing:** Manual install smoke tests — no official skills.sh test framework exists
- **CI:** GitHub Actions — validates frontmatter on PR to catch malformed skill files
- **Docs:** README.md per skill + top-level README with install instructions and GitHub star hooks

## Constraints
None.

## Success Criteria
Other projects adopt this skill set. GitHub stars accumulate. Team stops manually copying rules between projects.

## Last Updated
2026-03-28

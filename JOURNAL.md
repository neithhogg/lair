# lair — Journal

_This file is append-only. New entries go at the top. Never edit past entries._

---

## [2026-03-28] Foundation initialized

**Why this way:**
Started with the simplest possible structure — four skills, four rule files, two meta-documents. The temptation was to add more (language-specific rules, CI templates, more skills), but the constraint was: what's the minimum that makes the pattern reusable?

The answer was four things:
1. A way to start a project with intention (`project-init`)
2. A way to keep that intention alive as the project evolves (`project-sync`)
3. A way to extend the system itself (`skill-writer`)
4. Rules that run in the background without requiring active invocation

The rules layer (file management, gitignore, coding conventions, AI collaboration) was written first because it's the most stable. Skills change as patterns emerge; rules change rarely.

`PROJECT.md` and `JOURNAL.md` are self-referential — lair tracks its own state the same way it asks other projects to. This isn't just consistency; it's the only way to know whether the system actually works.

**Decision: no hardcoded skill recommendations in project-init**
The skill ecosystem changes. Any list we write today is stale in a month. So `project-init` Phase 4 always calls `npx skills find <query>` live. This means the skill is more resilient and more honest about what's actually available.

**Decision: publish-zero-friction**
skills.sh requires no review, no submission, no webhook. Push to GitHub, install with `npx skills add neithhogg/lair`. This shaped the entire development approach — iterate freely, ship incrementally.

---

## Future Vision

lair becomes the first thing you install on any new project, regardless of language or domain. Not because it forces a workflow, but because it makes the right workflow frictionless.

Long-term, the rule files evolve based on real usage patterns observed across many projects. The skills get sharper as the prompts get tested against real conversations. The leaderboard position on skills.sh becomes a signal of genuine usefulness, not marketing.

The meta-goal: lair uses itself to improve itself. Every time `project-sync` runs on this repo, it's a test of whether `project-sync` actually works.

# TaskFlow

## Purpose
A lightweight task management tool for solo developers and small teams to track work
without the overhead of Jira or Linear. Runs as a desktop app with local-first storage.

## Users
Primary: solo developers and small engineering teams (2-5 people) who want a fast,
keyboard-driven way to track tasks without leaving their terminal or browser.

## In Scope
- Create, edit, and close tasks with title, description, status, and due date
- Assign tasks to team members
- Filter tasks by status, assignee, and due date
- CLI interface for power users
- Local-first storage with optional sync

## Out of Scope
- Mobile app
- OAuth or SSO login
- Time tracking or billing
- Gantt charts or roadmap views
- Public API

## Tech Stack
- **Language:** TypeScript (Node.js)
- **Framework:** Electron (desktop app)
- **Database:** PostgreSQL (local instance via Docker)
- **Auth:** None (single-user or local network only)
- **Testing:** Vitest for unit tests, Playwright for E2E
- **Key libraries:** Drizzle ORM, Commander.js (CLI)

## Constraints
- Must work offline-first
- Target: Mac and Linux only for v1
- Team size: 2 engineers

## Success Criteria
Ship a working v1 in 8 weeks. At least one team member uses it daily by week 10.

## Last Updated
2026-03-01

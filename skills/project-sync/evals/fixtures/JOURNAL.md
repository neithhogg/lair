# Project Journal

A running record of decisions, pivots, and future direction.
Append — never overwrite. Run /project-sync to add new entries.

---

## 2026-03-01 — Project initialized

### Why this project
Existing tools (Jira, Linear) are too heavy for small teams. We want something
keyboard-driven and fast that doesn't require cloud accounts or syncing.

### Key decisions made today
- **Electron over web app:** Enables native filesystem access and offline-first without a server
- **PostgreSQL over SQLite:** Chose Postgres for query flexibility, running via Docker locally
- **TypeScript:** Shared language across CLI and desktop UI

### Future vision
Could eventually add a lightweight sync server for remote teams, or a web companion
for stakeholders who don't want to install the desktop app.

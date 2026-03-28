---
name: rule-file-management
description: >
  Governs how temporary and AI-generated files are created and organised.
  Apply whenever creating, moving, or cleaning up files during any task.
  All intermediate or exploratory files must go in tmp/ at the project root.
user-invocable: false
---

# Rule: File Management

These rules apply to every file operation in every session. No exceptions.

## Temporary files

- ALL files generated as intermediate, exploratory, draft, or scratch work
  go in `tmp/` at the project root — never anywhere else
- `tmp/` is flat — no subdirectories inside tmp/ ever
- Naming convention: `tmp/[task-slug]-[YYYY-MM-DD].[ext]`
  Examples:
  - `tmp/refactor-auth-2025-03-27.ts`
  - `tmp/db-schema-draft-2025-03-27.sql`
  - `tmp/api-notes-2025-03-27.md`
- `tmp/` is always gitignored — never commit its contents

## Permanent files

- Before writing any file outside `tmp/`, state the intended path and purpose
  and confirm with the user
- Never create placeholder files with TODO content — either implement it
  or don't create the file
- Never create files in unexpected locations without confirming first

## End of session

When a task is complete or the session is wrapping up, offer:
"I created these files in tmp/ this session: [list].
Want to promote any to permanent locations, or clean them up?"

## If tmp/ doesn't exist

Create it with a README.md:
```
# tmp/

Temporary workspace for AI-generated files.
Flat structure only. Gitignored. Clean regularly.
```

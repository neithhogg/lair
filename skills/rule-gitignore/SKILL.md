---
name: rule-gitignore
description: >
  Ensures every project has a correct and complete .gitignore. Apply when
  initialising a project, adding a new technology to the stack, or when asked
  about ignoring files. Generates stack-aware entries automatically.
user-invocable: false
---

# Rule: .gitignore

## Always include (every project)

```gitignore
# IDEs
.idea/
.vscode/
*.iml
.cursor/
*.suo
*.user

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
Thumbs.db
ehthumbs.db

# Logs and temp
*.log
*.log.*
logs/
tmp/
.tmp/
temp/

# Environment
.env
.env.local
.env.*.local
*.env
.envrc

# AI tools
.claude/
```

## TypeScript / Node.js

```gitignore
node_modules/
dist/
build/
out/
.next/
.nuxt/
.cache/
*.tsbuildinfo
.turbo/
.vercel/
coverage/
.nyc_output/
```

## Go

```gitignore
bin/
*.exe
*.exe~
*.dll
*.so
*.dylib
*.test
*.out
vendor/
```

## Rust

```gitignore
target/
**/*.rs.bk
*.pdb
# Cargo.lock: keep for binaries, gitignore for libraries
```

## When to apply

- `.gitignore` doesn't exist → offer to create it with all relevant sections
- New technology added to the stack → offer to append relevant entries
- User asks "should I gitignore X?" → answer and offer to add to .gitignore

Never treat .gitignore as a substitute for not committing secrets —
if you see credentials being added to the repo, flag it as a security issue.

# Gitignore Rules

## Always Ignore (Every Project)

```
# Temporary files
tmp/
*.tmp
*.bak
*.swp
*~

# OS artifacts
.DS_Store
Thumbs.db
desktop.ini

# Editor artifacts
.vscode/settings.json
.idea/
*.sublime-workspace

# Secrets
.env
.env.local
.env.*.local
*.pem
*.key
secrets.json
credentials.json
```

## Node / TypeScript

```
node_modules/
dist/
build/
.next/
.nuxt/
coverage/
*.tsbuildinfo
```

## Python

```
__pycache__/
*.py[cod]
*.egg-info/
.venv/
venv/
dist/
build/
.pytest_cache/
.mypy_cache/
.ruff_cache/
htmlcov/
```

## Go

```
# Go binaries (match your binary names explicitly)
# Example: /myapp
vendor/   # only if not committed
*.test
*.out
```

## Rust

```
target/
Cargo.lock   # keep this for binaries, ignore for libraries
```

## Docker / Infra

```
.terraform/
*.tfstate
*.tfstate.backup
.terraform.lock.hcl
```

## Notes

- Never gitignore `.env.example` — it should be committed as a template
- Never gitignore `Cargo.lock` for binary crates (it ensures reproducible builds)
- Always gitignore `Cargo.lock` for library crates
- If a secret is accidentally committed, rotate it immediately — deleting the commit is not enough

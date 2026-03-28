# Coding Conventions

## Universal Rules (All Languages)

- Functions do one thing. If you need "and" to describe it, split it.
- No magic numbers — name your constants.
- Error handling at system boundaries (user input, external APIs, file I/O). Trust internal code.
- No defensive validation for impossible states. Don't guard against things that can't happen.
- Delete dead code. Don't comment it out.
- Tests live next to the code they test, not in a separate mirror tree.

## TypeScript

```typescript
// ✓ explicit return types on public functions
export function parseConfig(raw: string): Config { ... }

// ✓ type imports separate from value imports
import type { Config } from './types'
import { parseConfig } from './config'

// ✓ prefer const, use let only when mutation is needed
// ✗ never use var

// ✓ async/await over .then() chains
// ✓ zod or equivalent for external data validation (API responses, user input)
// ✗ no any — use unknown + type guard if the type is truly unknown

// File naming: kebab-case.ts
// Test files: kebab-case.test.ts
// Type files: co-locate or types.ts at module root
```

**Formatting:** Prettier with default settings. No custom rules unless there's a strong reason.

**Imports:** Absolute paths via `tsconfig` paths, not `../../..` chains.

## Go

```go
// ✓ errors are values — return and handle them
func loadConfig(path string) (Config, error) { ... }

// ✓ errors wrap with context
return fmt.Errorf("loadConfig: %w", err)

// ✓ interfaces at the point of use, not the point of definition
// ✓ table-driven tests
// ✗ no global state except for top-level var blocks in main packages
// ✗ no init() unless absolutely necessary

// File naming: snake_case.go
// Test files: snake_case_test.go
// Package names: single lowercase word, no underscores
```

**Formatting:** `gofmt` always. `golangci-lint` in CI.

## Rust

```rust
// ✓ Result<T, E> for fallible operations — no unwrap() in library code
// ✓ unwrap() / expect() acceptable in tests and main() with good message
// ✓ derive Debug on all public types
// ✓ prefer iterators over manual loops
// ✗ no unsafe unless truly necessary, document why

// File naming: snake_case.rs
// Module structure: flat is better than deeply nested
```

**Formatting:** `rustfmt` always. `clippy` warnings are errors in CI.

## Shell Scripts

- `#!/usr/bin/env bash` shebang, `set -euo pipefail` at top
- Quote all variables: `"$var"` not `$var`
- Prefer explicit paths over relying on `$PATH` in production scripts
- Scripts under 50 lines inline in Makefile targets; over 50 lines get their own file in `scripts/`

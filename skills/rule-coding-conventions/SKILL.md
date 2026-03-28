---
name: rule-coding-conventions
description: >
  Applies neithhogg's coding conventions when writing or reviewing code in
  TypeScript, Go, or Rust. Apply automatically whenever generating, editing,
  or reviewing code in these languages.
user-invocable: false
---

# Rule: Coding Conventions

Apply the relevant section based on the language in use.
Optimise for clarity — write code that future-you understands at 2am.

---

## TypeScript

**Naming**
- Variables and functions: `camelCase`
- Types, interfaces, classes, enums: `PascalCase`
- Constants: `SCREAMING_SNAKE_CASE` for true module-level constants only
- Files: `kebab-case.ts`
- Booleans: prefix with `is`, `has`, `can`, `should`

**Structure**
- Prefer `type` over `interface` unless extending
- Prefer `const` arrow functions over `function` declarations for exports
- Keep files under 300 lines — split if larger
- Co-locate types with the code that uses them
- No barrel `index.ts` files unless publishing a package

**Style**
- Explicit return types on all exported functions
- No `any` — use `unknown` and narrow with type guards
- Prefer `async/await` over raw Promise chains
- Errors: prefer typed error classes or Result-style returns over throwing
  generic errors

---

## Go

**Naming**
- Exported identifiers: `PascalCase`
- Unexported: `camelCase`
- Interfaces: noun or noun phrase (`Reader`, `UserStore`) — no `I` prefix
- Sentinel errors: `ErrSomething`
- Files: `snake_case.go`

**Structure**
- One package per directory
- Keep `main.go` thin — logic in internal packages
- Accept interfaces, return concrete types
- Handle errors immediately — don't pass them up unless caller adds context
- No global mutable state outside `main`

**Style**
- `gofmt` always
- Table-driven tests by default
- `ctx context.Context` as the first parameter, always named `ctx`
- No naked returns in functions longer than 5 lines

---

## Rust

**Naming**
- Types, traits, enums: `PascalCase`
- Functions, variables, modules: `snake_case`
- Constants: `SCREAMING_SNAKE_CASE`
- Files: `snake_case.rs`

**Structure**
- `Result<T, E>` and `Option<T>` everywhere — no `.unwrap()` outside tests
- Use `thiserror` for library errors, `anyhow` for application errors
- Keep `main.rs` thin
- Traits for shared behaviour, not class hierarchy simulation

**Style**
- `rustfmt` always
- `clippy` warnings treated as errors — fix, don't suppress
- Prefer iterators over manual index loops
- Document all public API items with `///` doc comments

---

## Universal (all languages)

- Comments explain WHY, not WHAT — the code shows what
- Delete dead code — don't comment it out
- Name your constants — no magic numbers or strings
- Functions do one thing — if you need "and" to describe it, split it
- English only for all identifiers, comments, and commit messages

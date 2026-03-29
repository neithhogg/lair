# repotool

Search and replace across large codebases with regex and git-aware filtering.
Handles binary file detection, respects .gitignore, and supports dry-run mode.

## Build

```bash
go build ./...
```

## Test

```bash
go test ./...
```

## Usage

```bash
repotool search --pattern "TODO" --dir ./src
repotool replace --from "OldName" --to "NewName" --dry-run
```

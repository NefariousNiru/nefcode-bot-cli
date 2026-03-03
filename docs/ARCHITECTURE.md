# Architecture

## Goal (v1)
A local coding agent CLI that:
- operates in a git-safe workspace (branch/worktree)
- gathers context via repo map + ripgrep + targeted file reads
- proposes and applies patch-based edits safely
- runs verification (format/lint/typecheck/tests)
- logs a complete audit trail for each session

## Non-goals (v1)
- IDE plugin
- PR automation / GitHub integration
- multi-agent parallelism
- embeddings/vector DB
- remote sandbox runners
- plugin marketplace / MCP
  These can be v2+.

## Target folder layout
- src/cli
  - commander commands, printing, user interaction only
- src/core
  - agent loop, step orchestration, session state
- src/providers
  - provider adapters behind a single interface (OpenAI first; Anthropic later)
- src/tools
  - filesystem/shell/git tool wrappers; the only place allowed to touch disk or spawn processes
- src/policy
  - allow/deny decisions for shell and file operations
- src/patch
  - unified diff validation and application
- src/context
  - repo map + retrieval + context budgeting/trimming
- src/report
  - final report generation and session log writing

## Dependency rules (important)
- src/cli -> may import only core/report (and shared types)
- src/core -> may import providers/tools/context/patch/policy/report
- src/providers -> must be pure I/O (no shell, no filesystem, no patch application)
- src/tools -> only layer that spawns processes or writes files
- src/patch -> deterministic; applies edits via tools/fs only
- No circular dependencies.

## Core flow (v1)
1) Initialize session directory: `.nefcode-bot/sessions/<id>/`
2) Build repo map (lightweight)
3) Retrieve context (rg + targeted reads)
4) Ask model for plan (optional)
5) Ask model for edits (patch-based)
6) Apply patches
7) Run verification commands
8) Write report (diffstat + commands run + pass/fail)

## Observability
Every tool call must be logged with:
- tool name, args (redacted as needed)
- start/end time, duration
- exit code (for shell/git)
- stdout/stderr (truncated)

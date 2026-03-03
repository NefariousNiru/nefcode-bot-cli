# Roadmap

This roadmap defines implementation phases for `nefcode-bot-cli`.
Each phase should be delivered as small, reviewable commits with tests.
Do not implement later phases unless explicitly requested.

## Phase 0 - Project hygiene (done)
- TypeScript ESM CLI scaffold
- Prettier + ESLint + Vitest
- Basic `nefbot` command works

## Phase 1 - CLI commands + session logging (v1 start)
Deliverables:
- CLI commands:
  - `nefbot plan "<task>"` - prints plan-only stub, no file changes
  - `nefbot run "<task>"` - prints run stub, no file changes
  - `nefbot config` - prints effective config (redacting secrets)
- Config:
  - Reads API key from env var `OPENAI_API_KEY`
  - Supports config file that references env var names (no raw keys stored)
- Session directory:
  - Creates `.nefcode-bot/sessions/<id>/`
  - Writes a minimal `report.md` with timestamp and the task
    Tests:
- Vitest tests that run CLI commands and assert output

## Phase 2 - Tools + policy
Deliverables:
- Tools:
  - filesystem read/write (repo-root confined)
  - shell runner (captures stdout/stderr/exit code)
  - git helpers (status/diff/diffstat)
- Policy:
  - allowlist default commands
  - interactive confirmation hooks for risky commands
    Tests:
- unit tests for policy decisions (allow/deny/confirm)

## Phase 3 - Patch engine
Deliverables:
- Apply unified diffs safely
- Reject mismatched hunks
- Block path traversal and absolute paths
  Tests:
- unit tests for patch application edge cases

## Phase 4 - Context
Deliverables:
- Repo map summary
- Ripgrep retrieval + targeted file reads
- Context budgeting/trimming
  Tests:
- unit tests for selection + trimming

## Phase 5 - OpenAI provider + agent loop
Deliverables:
- Provider interface + OpenAI adapter
- Agent loop:
  - retrieve -> plan -> propose patches -> apply -> verify -> report
- Verification gate:
  - format:check, lint, typecheck, test
    Tests:
- a small integration test using a tiny fixture repo (if feasible)

## Phase 6 - Anthropic provider (v2)
- Implement Anthropic adapter behind the same interface

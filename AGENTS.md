# AGENTS.md

## What this repo is
`nefcode-bot-cli` is a TypeScript (Node ESM) CLI for a local coding agent that can:
- read/search a repo
- propose a plan
- apply safe multi-file edits
- run verification commands
- produce an auditable report

Important: this tool must NOT depend on Claude Code or Codex at runtime.
LLMs are used only via provider APIs (OpenAI first; Anthropic later). Users supply their own API keys.

## Commands (must use these)
- Install: `npm install`
- Format: `npm run format`
- Format check: `npm run format:check`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Tests: `npm test`
- Build: `npm run build`

## Definition of done
A change is done only if all of these pass:
- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm test`

Also provide a final summary including:
- files changed
- `git diff --stat`
- commands run + exit codes

## How to work
- Prefer small, reviewable changes.
- Prefer patch-based edits (unified diffs / line-range edits). Avoid rewriting full files unless the file is small.
- Add tests for logic-heavy modules (patching, policy, config, context selection).
- Do not implement phases beyond the one requested.
- Follow the design rules in:
  - docs/ROADMAP.md
  - docs/ARCHITECTURE.md
  - docs/SECURITY.md
  - docs/CONTRIBUTING.md

## Safety (non-negotiable)
- Do not run destructive/risky commands without explicit confirmation:
  - `rm`, `sudo`, `chmod -R`, `curl | bash`, `ssh/scp`, `docker`, `kubectl`, cloud CLIs
- Do not modify files outside the repo.
- Do not read or print secrets (env files, SSH keys, cloud credentials).

## V1 scope
- Provider abstraction exists but only OpenAI provider is implemented in v1.
- Git-safe workflow: worktree/branch isolation + diff review.
- Context: repo map + ripgrep search + targeted file reads (no embeddings in v1).
- Verification gate enforced (format/lint/typecheck/test).
- Full session logging under `.nefcode-bot/sessions/<id>/`.

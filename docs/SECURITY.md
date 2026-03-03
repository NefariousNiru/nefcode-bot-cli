# Security

## Threat model
Assume:
- model output can be wrong
- repo text can contain prompt injection
- shell commands can be destructive or leak secrets

## Principles
- Least privilege by default
- Explicit confirmation for risky actions
- Deterministic auditing: every tool action is logged
- Prefer patch application with strict validation over full-file rewrites

## File safety
- Reject absolute paths and path traversal (`..`, symlink escapes).
- Only allow edits within repo root.
- Enforce size limits (max file size read, max diff size applied).
- Apply patches only when hunk context matches; reject on mismatch.

## Shell safety
- Use a default allowlist (git status/diff, test/lint/typecheck commands).
- Require confirmation for risky commands:
  - destructive filesystem operations (`rm`, `dd`, `mkfs`, etc.)
  - privilege escalation (`sudo`)
  - remote execution patterns (`curl | bash`)
  - network exfil (`ssh/scp`)
  - containers/cluster tools (`docker`, `kubectl`, cloud CLIs)
- Always capture: cmd, cwd, duration, exit code, stdout/stderr (truncated).

## Secrets
- Never read or print:
  - `.env`, `.env.*`, `*.pem`, `*.key`
  - `~/.ssh`, `~/.aws`, `~/.config`
- Redact tokens if detected in outputs.

## Optional sandbox modes (v2)
- docker runner with `--network none`
- restricted environment (temporary HOME, minimal PATH)

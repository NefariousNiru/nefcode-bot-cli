# Contributing

## Code style
- TypeScript strict.
- Prefer explicit types and small functions.
- Avoid `any`. If unavoidable, isolate it at boundaries and justify.
- Keep modules cohesive and testable.

## Error handling
- Never swallow errors.
- Tool calls must return structured results (exit code, stdout/stderr, duration).
- Include enough context to debug failures (step name, path, command).

## Testing
- Add unit tests for logic-heavy code:
  - patch parsing/application
  - command policy decisions
  - config parsing
  - context selection/trimming
- Prefer assertion-based tests over snapshots for critical logic.

## Quality gate
Before considering a change complete, all must pass:
- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm test`

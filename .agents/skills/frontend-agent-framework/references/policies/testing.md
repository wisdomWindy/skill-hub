# Testing Policy

## Scope

This policy defines the minimum testing and verification discipline for frontend requests.

## Standards

- Add test coverage when business logic or user-critical behavior changes.
- Prefer TDD for behavior that is reasonably testable.
- Follow red -> green -> refactor for testable behavior changes unless a documented exception applies.
- Write tests from approved spec behavior and acceptance criteria rather than from ad hoc implementation details.
- Treat acceptance criteria as the primary verification contract.
- Record verification evidence, not only status claims.
- Distinguish blocking failures from deferred follow-ups.
- Prefer focused tests that prove requested behavior over broad but shallow checks.

## Non-Goals

- This policy does not prescribe one exact test runner for every repository.
- This policy does not replace request-specific verification planning.

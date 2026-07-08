# Clean Code Policy

## Scope

This policy defines durable clean-code standards for backend work. Apply it during planning, execution, verification, and review. Treat these rules as maintainability constraints, not as style-only preferences.

## Application Model

- Apply these rules when introducing or changing production code, shared utilities, services, repositories, jobs, consumers, adapters, and test code that explains behavior.
- Use the approved spec and plan to decide what behavior should exist; use this policy to decide how that behavior should be expressed in code.
- Escalate to a blocking issue when the implementation materially harms readability, change safety, migration safety, or future extension cost.

## Principles

### 1. Intention-Revealing Names

- Prefer names that reveal domain meaning, ownership, and effect.
- Do not rename stable published contract fields, storage columns, or framework-required identifiers just for local preference; isolate them behind clearer local adapters when needed.

### 2. Single Responsibility and Focused Units

- Keep each function, service, repository, job, adapter, and module focused on one clear reason to change.

### 3. One Level of Abstraction Per Unit

- Keep high-level workflow intent and low-level transport or storage mechanics from being interleaved in the same function or module where practical.

### 4. Duplication Must Be Reduced at the Rule Level

- Remove duplication that repeats business rules, validation logic, retry logic, compatibility logic, or state transitions.

### 5. Explicit Control Flow and Dependency Boundaries

- Make data flow, dependency ownership, and mutation boundaries obvious.

### 6. Side Effects Must Be Named and Contained

- Separate calculations from commands where practical, and make side effects explicit in naming and placement.

### 7. Errors and Edge Cases Must Stay Readable

- Express happy path, guard clauses, and failure handling so the dominant control flow is obvious.

### 8. Comments Explain Why, Not What

- Prefer clearer code, names, and structure before adding comments.

### 9. Keep Interfaces Small and Honest

- Keep argument lists, return shapes, and exported surfaces as small as the current use case allows.

### 10. Leave the Area Clearer Than You Found It

- When touching existing code, improve the immediate area enough that readability, naming, and local structure do not get worse.

## Non-Goals

- This policy does not define whitespace, lint, or formatter preferences.
- This policy does not justify bypassing the approved spec, plan, or verification flow.

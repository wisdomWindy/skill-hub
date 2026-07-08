# TypeScript Context Policy

## Scope

This policy defines how the workflow should recover TypeScript compiler context and relevant type sources before planning, implementing, verifying, or reviewing TypeScript-affecting work.

## Core Rules

- When the changed code is TypeScript, or JavaScript whose correctness depends on TypeScript declarations, recover the governing TypeScript context before writing code.
- Start from the target file or package and read the nearest governing `tsconfig` file first.
- If that `tsconfig` extends another config, read the direct extends chain until the options that materially affect the target files are understood.
- Recover only the compiler options that matter to code shape or type understanding for the scoped work, especially when relevant:
  - `baseUrl`
  - `paths`
  - `jsx`
  - `module`
  - `moduleResolution`
  - `target`
  - `lib`
  - `strict` and strictness-related flags
  - `types`
  - `typeRoots`
  - `allowJs`
  - `checkJs`
- Read only the declaration and type-definition sources relevant to the changed scope, such as:
  - directly imported local types
  - package-local `.d.ts` files
  - framework env or shim declarations
  - ambient global declarations actually visible to the target files
  - generated API, protobuf, or backend-owned contract types
  - declaration files that define path-alias targets used by the change
- Do not exhaustively read every `.d.ts` or type file in the repository by default.
- If the governing `tsconfig` or a required type source cannot be identified confidently, stop and recover context before coding instead of guessing.

## Spec Requirements

- When TypeScript context materially affects implementation shape, the spec must record which `tsconfig` governs the scoped files.
- The spec must record relevant type-definition sources when they affect alias resolution, ambient globals, generated contract reuse, JSX runtime, strictness expectations, or module-resolution behavior.
- The spec must not treat important TypeScript assumptions as implicit execution-time discoveries.

## Plan Requirements

- The plan must include TypeScript context recovery as explicit work when the scoped change depends on compiler settings or existing declarations.
- The plan must distinguish:
  - reading governing `tsconfig`
  - reading relevant declaration or generated type sources
  - implementation against those constraints
  - verification that the implementation respects those constraints

## Execute Requirements

- Before implementing TypeScript-affecting code, read the governing `tsconfig` and the relevant declaration or generated type sources for the scoped change.
- Prefer the smallest closed set of type sources that explains the target files correctly.
- Record non-obvious `tsconfig` or type-source findings in `artifacts/code-context.md` or `execution/changelog.md` when later stages would otherwise need to rediscover them.

## Verification and Review Requirements

- Verification must confirm that the implementation respects the governing TypeScript context when that context materially affects correctness.
- Review must treat coding against guessed path aliases, guessed globals, or guessed contract types as a process defect when the required context was available but not recovered.

## Non-Goals

- This policy does not require repository-wide exhaustive reading of all declaration files.
- This policy does not require a single universal `tsconfig` layout for every repository.

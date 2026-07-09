# User Intent Policy

## Scope

This policy defines how the workflow preserves the user's real intent when a request can be satisfied superficially but violated in substance.

Apply it during requirement analysis, specification, planning, execution, verification, and review.

## Core Rule

Do not satisfy only the literal wording of a user request when the implementation defeats the request's practical purpose.

For every request that uses terms such as simplify, shorten, optimize, clean up, adjust, align, normalize, improve, reduce, avoid, or fix, extract a user intent contract before downstream work proceeds.

## User Intent Contract

Record the following in request artifacts when intent could be misread:

- `stated request`: the user's literal wording
- `practical goal`: the outcome the user is trying to achieve
- `success criteria`: observable conditions that prove the goal is met
- `forbidden interpretations`: implementations that satisfy the words but violate the goal
- `acceptable approaches`: implementation approaches that preserve the goal
- `examples / counterexamples`: concrete examples when the request is easy to game

## Anti-Bypass Rules

- If the user asks to shorten, simplify, reduce, or clean up something, do not move the complexity elsewhere and call it done.
- If the user asks to avoid a pattern, do not reintroduce the same pattern through a different helper, constant, computed value, wrapper, adapter, or naming layer.
- If the user asks to normalize semantics, do not patch symptoms at the display layer when the intent is data semantic correction.
- If the user asks for code logic optimization, do not perform cosmetic extraction that leaves the same branching, duplication, side effects, or drift risk intact.
- If the user asks for styling simplification, do not hide long class values in constants, maps, computed properties, helpers, or imported variables.

## Clarification Rules

- Ask for clarification only when the practical goal cannot be inferred safely from the request, source artifacts, or repository conventions.
- When the practical goal is inferable, record it as an intent contract and proceed.
- If multiple interpretations are plausible and materially change behavior, record the choices as clarifications before implementation.
- Do not use ambiguity as permission to choose the easiest implementation.

## Verification Rules

Verification and review must check both:

- literal compliance: the implementation matches the stated request
- intent compliance: the implementation preserves the practical goal and avoids forbidden interpretations

Intent compliance fails when complexity, risk, ambiguity, or responsibility is merely relocated instead of reduced.

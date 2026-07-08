# Feishu Project Bug Retrieval

Use this reference when the bug source is a Feishu/Lark project defect.

## Goal

Prefer automatic defect retrieval from the source system before asking the user to restate bug details manually.

## Preferred Tool

If the runtime provides the `meegle` CLI, treat it as the default retrieval backend for Feishu/Lark project defects.

`meegle` may need a non-sandboxed environment that can read local credentials. A sandboxed runtime can report `authenticated: false` even when login already succeeded in the host environment.

Expected command path:

- check auth: `meegle auth status`
- interactive login: `meegle auth login`
- device-code login when browser login is unavailable: `meegle auth login --device-code`

If `meegle auth status` reports `authenticated: false`, stop at the authentication gate and complete login before trying to fetch defect content.

## Preferred Retrieval Flow

If the runtime provides Feishu/Lark project tools, use them in this order:

1. Check authentication status.
2. If the input is a Feishu Project defect URL, run `meegle url decode --url <defect-url>` first.
3. Extract `simple_name` or `project_key` plus `work_item_id` from the decoded URL result.
4. Get the defect brief with `meegle workitem get --project-key <simple_name-or-project-key> --work-item-id <work_item_id>`.
5. Get defect comments or discussion history for reproduction clues and recent context.
6. Get field definitions or additional metadata only when the brief is insufficient.

## URL-Driven Retrieval Rule

When the user provides a Feishu Project defect link such as:

- `https://project.feishu.cn/<simple_name>/issue/detail/<work_item_id>`

do not ask for `project key` manually first.

Instead:

1. Decode the URL with `meegle url decode`.
2. Read `simple_name` and `work_item_id` from the decoded result.
3. Treat `simple_name` as the default `project-key` input for `meegle workitem get`.
4. Only ask the user for manual project information if URL decode fails or the decoded values do not work.

Typical retrieval data to capture:

- project key
- simple_name when extracted from URL
- defect or work item id
- defect title
- current status
- severity or priority if available
- observed behavior
- expected behavior
- reproduction clues
- affected module or page
- related screenshots, logs, links, or comments

## Required Normalization

After retrieving source data, normalize it into:

- `docs/requests/<request-id>/request.md`
- `docs/requests/<request-id>/artifacts/bugfix-source.md`
- `docs/requests/<request-id>/artifacts/prd-snapshot.md`
- `docs/requests/<request-id>/state.json`

Do not keep the source system response as the only durable record.
Summarize the defect into repository artifacts that downstream stages can consume.

## Fallback Rules

If automatic retrieval tools are unavailable or fail:

- record that automatic retrieval was unavailable
- ask the user for the missing defect details or an exported defect artifact
- do not invent defect content
- do not continue into downstream stages until the bug context is sufficient

If automatic retrieval is blocked only by authentication:

- record that retrieval is blocked by missing authentication
- complete `meegle auth login` or `meegle auth login --device-code`
- retry retrieval after authentication succeeds
- do not fall back to manual restatement until authentication-based retrieval is no longer practical

## Minimum Acceptable Bug Context

Do not continue unless you can identify all of the following:

- what is broken
- where it is broken
- what the expected behavior is
- at least one reproduction clue or failing scenario

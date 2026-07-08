# SkillHub

SkillHub is a pure static Vue 3 + Vite SSG site for publishing a personal skill catalog from repository content. It has no backend, no login flow, and no runtime write access to GitHub.

## Local Development

```bash
npm install
npm run dev
```

## Verification

Run the same checks used by the request workflow:

```bash
npm test
npm run typecheck
npm run build
BASE_PATH=/skill-hub/ npm run build
```

The `BASE_PATH` build mirrors GitHub Pages project hosting, where this repository is served from `/skill-hub/`.

## Content Maintenance

Site configuration lives in `_data/config.yaml`.

Skill records live in `_data/skills/*.yaml`, one skill per file. Each record should follow the existing `SkillRecord` shape:

- `id`, `name`, `category`, `version`
- `shortDesc`, `fullDesc`, `installCommand`
- optional `usageExamples`, `tags`, `changelog`, `icon`, `installCount`
- `status: published` for public skills
- `status: archived` for skills kept in the repository but hidden from public lists and static detail routes
- `createdAt` and `updatedAt` as ISO timestamps

Do not commit GitHub tokens, PATs, private keys, or real secrets into YAML examples, README snippets, or static assets.

## GitHub Pages Deployment

`.github/workflows/deploy.yml` runs on pushes to `main` and on manual dispatch. The workflow installs dependencies with `npm ci`, builds with:

```bash
BASE_PATH=/${{ github.event.repository.name }}/ npm run build
```

When the build succeeds, `dist` is published to the `gh-pages` branch. If the build fails, the branch is not updated and the previous successful site remains available.

In the GitHub repository settings:

- Enable GitHub Pages.
- Set the source to the `gh-pages` branch.
- Allow GitHub Actions workflow write permissions so the deploy job can update `gh-pages`.

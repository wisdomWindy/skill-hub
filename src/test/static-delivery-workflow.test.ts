import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const workflowPath = path.resolve(process.cwd(), '.github/workflows/deploy.yml')

describe('GitHub Pages deployment workflow contract', () => {
  it('builds with npm ci and publishes dist to the gh-pages branch', () => {
    const workflow = readFileSync(workflowPath, 'utf8')

    expect(workflow).toContain('contents: write')
    expect(workflow).toContain('npm ci')
    expect(workflow).toContain('BASE_PATH: /${{ github.event.repository.name }}/')
    expect(workflow).toContain('publish_dir: ./dist')
    expect(workflow).toContain('publish_branch: gh-pages')
    expect(workflow).not.toContain('actions/deploy-pages')
    expect(workflow).not.toContain('id-token: write')
  })
})

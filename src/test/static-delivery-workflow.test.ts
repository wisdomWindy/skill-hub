import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const workflowPath = path.resolve(process.cwd(), '.github/workflows/deploy.yml')

describe('GitHub Pages deployment workflow contract', () => {
  it('builds with npm ci and deploys dist through GitHub Pages Actions', () => {
    const workflow = readFileSync(workflowPath, 'utf8')

    expect(workflow).toContain('contents: read')
    expect(workflow).toContain('pages: write')
    expect(workflow).toContain('id-token: write')
    expect(workflow).toContain('npm ci')
    expect(workflow).toContain('BASE_PATH: /${{ github.event.repository.name }}/')
    expect(workflow).toContain('actions/upload-pages-artifact@v3')
    expect(workflow).toContain('path: ./dist')
    expect(workflow).toContain('actions/deploy-pages@v4')
    expect(workflow).toContain('environment:')
    expect(workflow).toContain('name: github-pages')
    expect(workflow).not.toContain('peaceiris/actions-gh-pages')
    expect(workflow).not.toContain('publish_branch: gh-pages')
  })
})

declare module 'markdown-it' {
  export interface MarkdownItOptions {
    html?: boolean
    linkify?: boolean
    highlight?: (code: string, language: string) => string
  }

  export default class MarkdownIt {
    constructor(options?: MarkdownItOptions)
    render(source: string): string
  }
}

declare module 'sanitize-html' {
  interface SanitizeHtmlOptions {
    allowedTags?: string[]
    allowedAttributes?: Record<string, string[]>
  }

  interface SanitizeHtmlFn {
    (dirty: string, options?: SanitizeHtmlOptions): string
    defaults: {
      allowedTags: string[]
      allowedAttributes: Record<string, string[]>
    }
  }

  const sanitizeHtml: SanitizeHtmlFn
  export default sanitizeHtml
}

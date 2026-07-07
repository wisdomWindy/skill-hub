import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  highlight(code: string, language: string) {
    if (language && hljs.getLanguage(language)) {
      return hljs.highlight(code, { language }).value
    }

    return hljs.highlightAuto(code).value
  },
})

export function renderMarkdown(source: string) {
  const html = markdown.render(source)

  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'pre', 'code']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['class'],
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title'],
    },
  })
}

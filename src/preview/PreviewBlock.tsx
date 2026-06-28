import { useState, type ReactNode } from 'react'
import './PreviewBlock.scss'

export interface PreviewBlockProps {
  title: string
  description?: string
  code: string
  children: ReactNode
  defaultCodeOpen?: boolean
}

export function PreviewBlock({
  title,
  description,
  code,
  children,
  defaultCodeOpen = false,
}: PreviewBlockProps) {
  const [codeOpen, setCodeOpen] = useState(defaultCodeOpen)

  return (
    <article className="preview-block">
      <header className="preview-block__header">
        <h3 className="preview-block__title">{title}</h3>
        {description && <p className="preview-block__desc">{description}</p>}
      </header>
      <div className="preview-block__preview">{children}</div>
      <div className="preview-block__code-panel">
        <button
          type="button"
          className={`preview-block__code-toggle${codeOpen ? ' preview-block__code-toggle--open' : ''}`}
          aria-expanded={codeOpen}
          onClick={() => setCodeOpen((open) => !open)}
        >
          <span className="preview-block__code-toggle-icon" aria-hidden>
            {codeOpen ? '▾' : '▸'}
          </span>
          {codeOpen ? '隐藏代码' : '查看代码'}
        </button>
        {codeOpen && (
          <pre className="preview-block__code">
            <code>{code.trim()}</code>
          </pre>
        )}
      </div>
    </article>
  )
}

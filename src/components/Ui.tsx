import Link from 'next/link'
import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHero({ eyebrow, title, description, actions }: Props) {
  return (
    <section className="page-hero">
      <div className="shell">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p className="lede">{description}</p> : null}
        {actions ? <div className="cta-row">{actions}</div> : null}
      </div>
    </section>
  )
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      {hint ? <p>{hint}</p> : null}
      <Link href="/admin" className="btn btn-secondary">
        Заполнить в админке
      </Link>
    </div>
  )
}

export function MetaChips({ items }: { items: Array<string | null | undefined> }) {
  const visible = items.filter(Boolean) as string[]
  if (!visible.length) return null
  return (
    <ul className="meta-chips">
      {visible.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function Prose({ text }: { text?: string | null }) {
  if (!text) return null
  return (
    <div className="prose">
      {text.split('\n').map((line, index) =>
        line.trim() ? <p key={`${index}-${line.slice(0, 12)}`}>{line}</p> : <br key={index} />,
      )}
    </div>
  )
}

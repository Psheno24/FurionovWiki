import Link from 'next/link'

import { EmptyState, PageHero } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'

export const metadata = { title: 'Правила и законы' }

export default async function LawsPage() {
  const payload = await getPayloadClient()
  const laws = await payload.find({ collection: 'laws', limit: 100, sort: 'title' })

  return (
    <>
      <PageHero
        eyebrow="Порядок"
        title="Правила и законы"
        description="Пока короткие заглушки. Полные тексты перенесём и разложим по пунктам."
      />
      <section className="section-block" style={{ paddingTop: 0 }}>
        <div className="shell">
          {laws.docs.length ? (
            <div className="card-grid">
              {laws.docs.map((law) => (
                <Link key={law.id} href={`/laws/${law.slug}`} className="content-card">
                  <p className="card-kicker">
                    {law.kind === 'law' ? 'Закон' : 'Правило'} · {law.server || 'all'}
                  </p>
                  <h2>{law.title}</h2>
                  <p>{law.summary}</p>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState title="Пока пусто" />
          )}
        </div>
      </section>
    </>
  )
}

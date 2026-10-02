import Link from 'next/link'

import { EmptyState, PageHero } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'
import { formatMoney } from '@/lib/site'

export const metadata = { title: 'Предметы' }

export default async function ItemsPage() {
  const payload = await getPayloadClient()
  const items = await payload.find({ collection: 'items', limit: 100, sort: 'title' })

  return (
    <>
      <PageHero
        eyebrow="Инвентарь"
        title="Предметы"
        description="Инструменты и расходники для длинных смен."
      />
      <section className="section-block" style={{ paddingTop: 0 }}>
        <div className="shell">
          {items.docs.length ? (
            <div className="card-grid">
              {items.docs.map((item) => (
                <Link key={item.id} href={`/items/${item.slug}`} className="content-card">
                  <p className="card-kicker">{item.category || 'предмет'}</p>
                  <h2>{item.title}</h2>
                  <p>{item.summary}</p>
                  <div className="card-stats">
                    <span>купка {formatMoney(item.buyPrice)}</span>
                    <span>продажа {formatMoney(item.sellPrice)}</span>
                  </div>
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

import Link from 'next/link'

import { EmptyState, PageHero } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'
import { formatMoney } from '@/lib/site'

export const metadata = { title: 'Кейсы' }

export default async function CasesPage() {
  const payload = await getPayloadClient()
  const cases = await payload.find({ collection: 'cases', limit: 100, sort: 'title' })

  return (
    <>
      <PageHero
        eyebrow="Донат"
        title="Кейсы"
        description="Состав и цена открытия. Шансы выпадения не придумываем."
      />
      <section className="section-block" style={{ paddingTop: 0 }}>
        <div className="shell">
          {cases.docs.length ? (
            <div className="card-grid">
              {cases.docs.map((item) => (
                <Link key={item.id} href={`/cases/${item.slug}`} className="content-card">
                  <p className="card-kicker">кейс</p>
                  <h2>{item.title}</h2>
                  <p>{item.summary}</p>
                  <div className="card-stats">
                    <span>{formatMoney(item.openPrice)}</span>
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

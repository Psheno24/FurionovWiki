import Link from 'next/link'

import { EmptyState, PageHero } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'

export const metadata = { title: 'Места' }

export default async function PlacesPage() {
  const payload = await getPayloadClient()
  const places = await payload.find({ collection: 'places', limit: 100, sort: 'title' })

  return (
    <>
      <PageHero
        eyebrow="Мир"
        title="Места"
        description="Точки, к которым возвращаетесь на сменах. Интерактивную карту добавим позже."
      />
      <section className="section-block" style={{ paddingTop: 0 }}>
        <div className="shell">
          {places.docs.length ? (
            <div className="card-grid">
              {places.docs.map((place) => (
                <Link key={place.id} href={`/places/${place.slug}`} className="content-card">
                  <p className="card-kicker">{place.district || 'Москва'}</p>
                  <h2>{place.title}</h2>
                  <p>{place.summary}</p>
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

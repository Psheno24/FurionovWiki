import Link from 'next/link'

import { PageHero } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'

export const metadata = { title: 'Поиск' }

type Props = {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams
  const query = q.trim()
  const payload = await getPayloadClient()

  type Hit = { href: string; title: string; summary?: string | null; kind: string }

  const hits: Hit[] = []

  if (query) {
    const contains = { contains: query }
    const [guides, jobs, vehicles, items, places, laws, members, cases] = await Promise.all([
      payload.find({
        collection: 'guides',
        where: { or: [{ title: contains }, { summary: contains }] },
        limit: 10,
      }),
      payload.find({
        collection: 'jobs',
        where: { or: [{ title: contains }, { summary: contains }] },
        limit: 10,
      }),
      payload.find({
        collection: 'vehicles',
        where: { or: [{ title: contains }, { summary: contains }] },
        limit: 10,
      }),
      payload.find({
        collection: 'items',
        where: { or: [{ title: contains }, { summary: contains }] },
        limit: 10,
      }),
      payload.find({
        collection: 'places',
        where: { or: [{ title: contains }, { summary: contains }] },
        limit: 10,
      }),
      payload.find({
        collection: 'laws',
        where: { or: [{ title: contains }, { summary: contains }] },
        limit: 10,
      }),
      payload.find({
        collection: 'family-members',
        where: { or: [{ name: contains }, { summary: contains }] },
        limit: 10,
      }),
      payload.find({
        collection: 'cases',
        where: { or: [{ title: contains }, { summary: contains }] },
        limit: 10,
      }),
    ])

    hits.push(
      ...guides.docs.map((doc) => ({
        href: `/guides/${doc.slug}`,
        title: doc.title,
        summary: doc.summary,
        kind: 'Гайд',
      })),
      ...jobs.docs.map((doc) => ({
        href: `/jobs/${doc.slug}`,
        title: doc.title,
        summary: doc.summary,
        kind: 'Работа',
      })),
      ...vehicles.docs.map((doc) => ({
        href: `/transport/${doc.slug}`,
        title: doc.title,
        summary: doc.summary,
        kind: 'Транспорт',
      })),
      ...items.docs.map((doc) => ({
        href: `/items/${doc.slug}`,
        title: doc.title,
        summary: doc.summary,
        kind: 'Предмет',
      })),
      ...places.docs.map((doc) => ({
        href: `/places/${doc.slug}`,
        title: doc.title,
        summary: doc.summary,
        kind: 'Место',
      })),
      ...laws.docs.map((doc) => ({
        href: `/laws/${doc.slug}`,
        title: doc.title,
        summary: doc.summary,
        kind: 'Правило',
      })),
      ...members.docs.map((doc) => ({
        href: `/family/${doc.slug}`,
        title: doc.name,
        summary: doc.summary,
        kind: 'Семья',
      })),
      ...cases.docs.map((doc) => ({
        href: `/cases/${doc.slug}`,
        title: doc.title,
        summary: doc.summary,
        kind: 'Кейс',
      })),
    )
  }

  return (
    <>
      <PageHero
        eyebrow="Поиск"
        title="Найти в вики"
        description="Ищем по заголовкам и кратким описаниям разделов."
      />
      <section className="section-block" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="search-box">
            <form action="/search" method="get">
              <input
                name="q"
                defaultValue={query}
                placeholder="Например: дальнобой, гранта, фарм…"
                aria-label="Запрос"
              />
              <button className="btn btn-primary" type="submit">
                Искать
              </button>
            </form>
          </div>

          {query ? (
            hits.length ? (
              <div className="card-grid">
                {hits.map((hit) => (
                  <Link key={hit.href} href={hit.href} className="content-card">
                    <p className="card-kicker">{hit.kind}</p>
                    <h2>{hit.title}</h2>
                    <p>{hit.summary}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="lede">Ничего не нашли по запросу «{query}».</p>
            )
          ) : (
            <p className="lede">Введите запрос — покажем совпадения по каталогам.</p>
          )}
        </div>
      </section>
    </>
  )
}

import Link from 'next/link'

import { EmptyState, PageHero } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'
import { levelLabel } from '@/lib/site'

export const metadata = { title: 'Гайды' }

export default async function GuidesPage() {
  const payload = await getPayloadClient()
  const guides = await payload.find({ collection: 'guides', limit: 100, sort: '-updatedAt' })

  return (
    <>
      <PageHero
        eyebrow="База знаний"
        title="Гайды"
        description="От первого входа до ритма смены фармлинга."
      />
      <section className="section-block" style={{ paddingTop: 0 }}>
        <div className="shell">
          {guides.docs.length ? (
            <div className="card-grid">
              {guides.docs.map((guide) => (
                <Link key={guide.id} href={`/guides/${guide.slug}`} className="content-card">
                  <p className="card-kicker">
                    {levelLabel[guide.level || ''] || 'Гайд'} · {guide.readTime || 5} мин
                  </p>
                  <h2>{guide.title}</h2>
                  <p>{guide.summary}</p>
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

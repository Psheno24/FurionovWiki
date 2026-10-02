import Link from 'next/link'

import { EmptyState, PageHero } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'

export const metadata = {
  title: 'Работа',
}

export default async function JobsPage() {
  const payload = await getPayloadClient()
  const jobs = await payload.find({
    collection: 'jobs',
    limit: 100,
    sort: 'requiredLevel',
  })

  return (
    <>
      <PageHero
        eyebrow="Фарм"
        title="Работа и профессии"
        description="Доход в час, уровень открытия и советы фармлингов. Цифры пока ориентировочные."
      />
      <section className="section-block" style={{ paddingTop: 0 }}>
        <div className="shell">
          {jobs.docs.length ? (
            <div className="card-grid">
              {jobs.docs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.slug}`} className="content-card">
                  <p className="card-kicker">
                    {job.legal === false ? 'Серая зона' : 'Легально'} · ур. {job.requiredLevel ?? '—'}
                  </p>
                  <h2>{job.title}</h2>
                  <p>{job.summary}</p>
                  <div className="card-stats">
                    <span>{job.incomePerHour || 'доход скоро'}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState title="Пока пусто" hint="Добавьте работы в админке." />
          )}
        </div>
      </section>
    </>
  )
}

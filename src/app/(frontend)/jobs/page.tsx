import { EmptyState, PageHero } from '@/components/Ui'
import { JobsCatalog } from '@/components/JobsCatalog'
import { getPayloadClient } from '@/lib/payload'

export const metadata = {
  title: 'Работа и профессии',
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
        eyebrow="Каталог"
        title="Работа и профессии"
        description="Доход за смену, тип занятости, законность и уровень открытия. Цифры — с экрана работ и официальных списков; часть пока заглушки."
      />
      <section className="section-block" style={{ paddingTop: 0 }}>
        <div className="shell">
          {jobs.docs.length ? (
            <JobsCatalog
              jobs={jobs.docs.map((job) => ({
                id: job.id,
                title: job.title,
                slug: job.slug,
                tagline: job.tagline,
                summary: job.summary,
                employmentType: job.employmentType,
                legality: job.legality,
                incomeMin: job.incomeMin,
                incomeMax: job.incomeMax,
                incomeNote: job.incomeNote,
                incomePerHour: job.incomePerHour,
                requiredLevel: job.requiredLevel,
                needsTransport: job.needsTransport,
                difficulty: job.difficulty,
              }))}
            />
          ) : (
            <EmptyState title="Пока пусто" hint="Добавьте работы в админке." />
          )}
        </div>
      </section>
    </>
  )
}

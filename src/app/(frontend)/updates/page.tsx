import Link from 'next/link'

import { EmptyState, PageHero } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'
import { updateKindLabel } from '@/lib/site'

export const metadata = { title: 'Обновления' }

export default async function UpdatesPage() {
  const payload = await getPayloadClient()
  const updates = await payload.find({
    collection: 'updates',
    limit: 50,
    sort: '-publishedAt',
  })

  return (
    <>
      <PageHero
        eyebrow="Журнал"
        title="Обновления вики"
        description="Что добавили, уточнили и починили в вики."
      />
      <section className="section-block" style={{ paddingTop: 0 }}>
        <div className="shell update-list">
          {updates.docs.length ? (
            updates.docs.map((update) => (
              <Link key={update.id} href={`/updates/${update.slug}`} className="content-card update-item">
                <p className="card-kicker">
                  {updateKindLabel[update.kind || ''] || 'Обновление'}
                  {update.publishedAt
                    ? ` · ${new Date(update.publishedAt).toLocaleDateString('ru-RU')}`
                    : ''}
                </p>
                <h2>{update.title}</h2>
                <p>{update.summary}</p>
              </Link>
            ))
          ) : (
            <EmptyState title="Пока пусто" />
          )}
        </div>
      </section>
    </>
  )
}

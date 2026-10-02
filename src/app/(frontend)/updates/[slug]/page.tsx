import { notFound } from 'next/navigation'

import { MetaChips, PageHero, Prose } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'
import { updateKindLabel } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'updates',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return { title: result.docs[0]?.title || 'Обновление' }
}

export default async function UpdatePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'updates',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const doc = result.docs[0]
  if (!doc) notFound()

  return (
    <>
      <PageHero eyebrow="Обновление" title={doc.title} description={doc.summary || undefined} />
      <article className="article-layout">
        <div className="shell article-panel">
          <MetaChips
            items={[
              updateKindLabel[doc.kind || ''],
              doc.publishedAt
                ? new Date(doc.publishedAt).toLocaleDateString('ru-RU')
                : null,
            ]}
          />
          <Prose text={doc.body} />
        </div>
      </article>
    </>
  )
}

import { notFound } from 'next/navigation'

import { MetaChips, PageHero, Prose } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'
import { levelLabel } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'guides',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return { title: result.docs[0]?.title || 'Гайд' }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'guides',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const doc = result.docs[0]
  if (!doc) notFound()

  return (
    <>
      <PageHero eyebrow="Гайд" title={doc.title} description={doc.summary || undefined} />
      <article className="article-layout">
        <div className="shell article-panel">
          <MetaChips
            items={[
              levelLabel[doc.level || ''],
              doc.readTime ? `${doc.readTime} мин` : null,
            ]}
          />
          <Prose text={doc.body} />
        </div>
      </article>
    </>
  )
}

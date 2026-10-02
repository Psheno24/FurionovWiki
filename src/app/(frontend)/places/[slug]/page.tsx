import { notFound } from 'next/navigation'

import { MetaChips, PageHero, Prose } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'places',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return { title: result.docs[0]?.title || 'Место' }
}

export default async function PlacePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'places',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const doc = result.docs[0]
  if (!doc) notFound()

  return (
    <>
      <PageHero eyebrow="Место" title={doc.title} description={doc.summary || undefined} />
      <article className="article-layout">
        <div className="shell article-panel">
          <MetaChips items={[doc.district, doc.coords, doc.services]} />
          <Prose text={doc.body} />
        </div>
      </article>
    </>
  )
}

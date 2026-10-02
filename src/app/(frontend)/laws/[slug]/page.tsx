import { notFound } from 'next/navigation'

import { MetaChips, PageHero, Prose } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'laws',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return { title: result.docs[0]?.title || 'Правило' }
}

export default async function LawPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'laws',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const doc = result.docs[0]
  if (!doc) notFound()

  return (
    <>
      <PageHero
        eyebrow={doc.kind === 'law' ? 'Закон' : 'Правило'}
        title={doc.title}
        description={doc.summary || undefined}
      />
      <article className="article-layout">
        <div className="shell article-panel">
          <MetaChips items={[doc.server === 'all' ? 'все серверы' : doc.server]} />
          <Prose text={doc.body} />
        </div>
      </article>
    </>
  )
}

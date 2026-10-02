import { notFound } from 'next/navigation'

import { MetaChips, PageHero, Prose } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'
import { formatMoney } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'items',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return { title: result.docs[0]?.title || 'Предмет' }
}

export default async function ItemPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'items',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const doc = result.docs[0]
  if (!doc) notFound()

  return (
    <>
      <PageHero eyebrow="Предмет" title={doc.title} description={doc.summary || undefined} />
      <article className="article-layout">
        <div className="shell article-panel">
          <MetaChips
            items={[
              doc.category,
              `купка ${formatMoney(doc.buyPrice)}`,
              `продажа ${formatMoney(doc.sellPrice)}`,
              doc.weight != null ? `вес ${doc.weight}` : null,
            ]}
          />
          <Prose text={doc.body} />
        </div>
      </article>
    </>
  )
}

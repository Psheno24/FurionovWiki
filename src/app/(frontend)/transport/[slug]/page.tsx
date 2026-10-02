import { notFound } from 'next/navigation'

import { MetaChips, PageHero, Prose } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'
import { formatMoney, vehicleClassLabel } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'vehicles',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const doc = result.docs[0]
  return { title: doc?.title || 'Транспорт' }
}

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'vehicles',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const doc = result.docs[0]
  if (!doc) notFound()

  return (
    <>
      <PageHero
        eyebrow="Транспорт"
        title={doc.title}
        description={doc.summary || undefined}
      />
      <article className="article-layout">
        <div className="shell article-panel">
          <MetaChips
            items={[
              vehicleClassLabel[doc.vehicleClass || ''],
              formatMoney(doc.price),
              doc.topSpeed ? `${doc.topSpeed} км/ч` : null,
              doc.trunk != null ? `багажник ${doc.trunk}` : null,
              doc.howToGet,
            ]}
          />
          <Prose text={doc.body} />
        </div>
      </article>
    </>
  )
}

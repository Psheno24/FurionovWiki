import { notFound } from 'next/navigation'

import { MetaChips, PageHero, Prose } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'
import { formatMoney } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'cases',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return { title: result.docs[0]?.title || 'Кейс' }
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'cases',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const doc = result.docs[0]
  if (!doc) notFound()

  return (
    <>
      <PageHero eyebrow="Кейс" title={doc.title} description={doc.summary || undefined} />
      <article className="article-layout">
        <div className="shell article-panel">
          <MetaChips items={[`открытие ${formatMoney(doc.openPrice)}`]} />
          <Prose text={doc.body} />
          {doc.contents ? (
            <>
              <h2 style={{ fontFamily: 'var(--font-display)', marginTop: '1.5rem' }}>Содержимое</h2>
              <Prose text={doc.contents} />
            </>
          ) : null}
        </div>
      </article>
    </>
  )
}

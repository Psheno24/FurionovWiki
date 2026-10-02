import { notFound } from 'next/navigation'

import { MetaChips, PageHero, Prose } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'jobs',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return { title: result.docs[0]?.title || 'Работа' }
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'jobs',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const doc = result.docs[0]
  if (!doc) notFound()

  return (
    <>
      <PageHero eyebrow="Работа" title={doc.title} description={doc.summary || undefined} />
      <article className="article-layout">
        <div className="shell article-panel">
          <MetaChips
            items={[
              doc.incomePerHour,
              doc.requiredLevel != null ? `уровень ${doc.requiredLevel}` : null,
              doc.legal === false ? 'нелегально' : 'легально',
            ]}
          />
          <Prose text={doc.body} />
          {doc.farmTip ? (
            <>
              <h2 style={{ fontFamily: 'var(--font-display)', marginTop: '1.5rem' }}>
                Совет фармлинга
              </h2>
              <Prose text={doc.farmTip} />
            </>
          ) : null}
        </div>
      </article>
    </>
  )
}

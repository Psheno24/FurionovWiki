import { notFound } from 'next/navigation'

import { MetaChips, PageHero, Prose } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'
import { formatMoney } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

const employmentLabels: Record<string, string> = {
  civilian: 'Гражданская',
  state: 'Государственная',
  freelance: 'Фриланс',
  criminal: 'Криминальная',
}

const legalityLabels: Record<string, string> = {
  legal: 'Легально',
  semilegal: 'Полулегально',
  illegal: 'Нелегально',
}

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

  const income =
    doc.incomeMin != null && doc.incomeMax != null
      ? `${formatMoney(doc.incomeMin)} — ${formatMoney(doc.incomeMax)}`
      : doc.incomeNote || doc.incomePerHour || null

  return (
    <>
      <PageHero
        eyebrow="Работа"
        title={doc.title}
        description={doc.tagline || doc.summary || undefined}
      />
      <article className="article-layout">
        <div className="shell article-panel">
          <MetaChips
            items={[
              employmentLabels[doc.employmentType || ''],
              legalityLabels[doc.legality || ''],
              income,
              doc.requiredLevel != null ? `уровень ${doc.requiredLevel}` : null,
              doc.needsTransport ? 'нужен транспорт' : 'транспорт не обязателен',
            ]}
          />
          <Prose text={doc.body || doc.summary} />
          {doc.farmTip ? (
            <>
              <h2 style={{ marginTop: '1.5rem', letterSpacing: '-0.03em' }}>Совет по фарму</h2>
              <Prose text={doc.farmTip} />
            </>
          ) : null}
        </div>
      </article>
    </>
  )
}

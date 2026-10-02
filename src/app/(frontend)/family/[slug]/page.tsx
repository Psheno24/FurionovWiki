import { notFound } from 'next/navigation'

import { MetaChips, PageHero, Prose } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'family-members',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return { title: result.docs[0]?.name || 'Фармлинг' }
}

export default async function FamilyMemberPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'family-members',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const doc = result.docs[0]
  if (!doc) notFound()

  return (
    <>
      <PageHero eyebrow="Фармлинг" title={doc.name} description={doc.summary || undefined} />
      <article className="article-layout">
        <div className="shell article-panel">
          <MetaChips items={[doc.role, doc.specialty, doc.status]} />
          <Prose text={doc.body} />
        </div>
      </article>
    </>
  )
}

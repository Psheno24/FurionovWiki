import Link from 'next/link'

import { EmptyState, PageHero } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'

export const metadata = { title: 'Семья Фурионовых' }

export default async function FamilyPage() {
  const payload = await getPayloadClient()
  const members = await payload.find({
    collection: 'family-members',
    limit: 100,
    sort: 'name',
  })

  return (
    <>
      <PageHero
        eyebrow="Фармлинги"
        title="Семья Фурионовых"
        description="Мы про заработок, дисциплину смен и гайды, которых не хватает на официале. Фармлинги — те, кто растят кассу вместе."
      />
      <section className="section-block" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="stat-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', marginTop: 0 }}>Кого набираем</h2>
            <p className="lede">
              Людей, которым интересен стабильный фарм и обмен маршрутами — не «просто фамилия в
              списке». Детали набора (голос, правила, сервер) допишем в админке.
            </p>
            <div className="cta-row">
              <Link href="/guides/farmling-shift" className="btn btn-primary">
                Как выглядит смена
              </Link>
              <Link href="/guides/first-money" className="btn btn-secondary">
                Первые деньги
              </Link>
            </div>
          </div>

          {members.docs.length ? (
            <div className="card-grid">
              {members.docs.map((member) => (
                <Link key={member.id} href={`/family/${member.slug}`} className="content-card">
                  <p className="card-kicker">
                    {member.status === 'recruiting'
                      ? 'Набор'
                      : member.status === 'idle'
                        ? 'Отдых'
                        : 'Активен'}
                  </p>
                  <h2>{member.name}</h2>
                  <p>{member.summary}</p>
                  <div className="card-stats">
                    <span>{member.role || 'фармлинг'}</span>
                    <span>{member.specialty || 'фарм'}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState title="Состав пока не заполнен" />
          )}
        </div>
      </section>
    </>
  )
}

import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { sectionMeta, site, updateKindLabel } from '@/lib/site'

export default async function HomePage() {
  const payload = await getPayloadClient()
  const [guides, updates, members] = await Promise.all([
    payload.find({
      collection: 'guides',
      where: { featured: { equals: true } },
      limit: 3,
      sort: '-updatedAt',
    }),
    payload.find({
      collection: 'updates',
      limit: 3,
      sort: '-publishedAt',
    }),
    payload.find({
      collection: 'family-members',
      limit: 4,
      sort: 'name',
    }),
  ])

  return (
    <>
      <section className="home-hero">
        <div className="shell">
          <p className="eyebrow">{site.tagline}</p>
          <h1>{site.shortName}</h1>
          <p className="hero-line">
            Семья фармлингов в Россия Онлайн: гайды по сменам, каталоги и то, чего не хватает на
            официальной вики — без воды, с упором на заработок.
          </p>
          <div className="cta-row">
            <Link href="/guides" className="btn btn-primary">
              Гайды по фарму
            </Link>
            <Link href="/family" className="btn btn-secondary">
              О семье
            </Link>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <h2>Что есть в энциклопедии</h2>
          <p className="section-intro">
            Структура как у большой вики, наполнение — наше. Сейчас заглушки, чтобы сразу видеть
            разделы; правьте всё в админке.
          </p>
          <div className="section-grid">
            {sectionMeta.map((section) => (
              <Link key={section.href} href={section.href} className="section-card">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell family-banner">
          <div className="stat-panel">
            <p className="eyebrow">Семья</p>
            <h3>Фармлинги Фурионовых</h3>
            <p className="lede" style={{ marginTop: '0.75rem' }}>
              Мы про ритм смены, чистый доход в час и полезные заметки для тех, кто реально играет на
              экономику. Набор открыт для тех, кто готов фармить вместе.
            </p>
            <div className="cta-row">
              <Link href="/family" className="btn btn-primary">
                Смотреть состав
              </Link>
              <Link href="/guides/farmling-shift" className="btn btn-secondary">
                Смена фармлинга
              </Link>
            </div>
          </div>
          <div className="card-grid">
            {members.docs.map((member) => (
              <div key={member.id} className="content-card">
                <p className="card-kicker">{member.role || 'Фармлинг'}</p>
                <h2>{member.name}</h2>
                <p>{member.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <h2>Стоит посмотреть</h2>
          <p className="section-intro">Избранные гайды редакции семьи.</p>
          <div className="card-grid">
            {guides.docs.map((guide) => (
              <Link key={guide.id} href={`/guides/${guide.slug}`} className="content-card">
                <p className="card-kicker">Гайд</p>
                <h2>{guide.title}</h2>
                <p>{guide.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <h2>Последние обновления</h2>
          <p className="section-intro">Что добавили в вики.</p>
          <div className="update-list">
            {updates.docs.map((update) => (
              <Link
                key={update.id}
                href={`/updates/${update.slug}`}
                className="content-card update-item"
              >
                <p className="card-kicker">
                  {updateKindLabel[update.kind || ''] || 'Обновление'}
                </p>
                <h2>{update.title}</h2>
                <p>{update.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { sectionMeta, site, updateKindLabel } from '@/lib/site'

const quickLinks = [
  {
    n: '01',
    title: 'Найти транспорт',
    description: 'Сравните цену, класс и багажник — от эконома до спорта. Цифры с витрины и рейсов.',
    href: '/transport',
  },
  {
    n: '02',
    title: 'Выбрать профессию',
    description: 'Доход в час, уровень и советы по сменам в одном месте.',
    href: '/jobs',
  },
  {
    n: '03',
    title: 'Изучить места',
    description: 'Салоны, биржа труда и точки, к которым возвращаетесь.',
    href: '/places',
  },
  {
    n: '04',
    title: 'Начать играть',
    description: 'Пошаговые гайды для первого входа и первых денег.',
    href: '/guides',
  },
]

export default async function HomePage() {
  const payload = await getPayloadClient()
  const [guides, updates] = await Promise.all([
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
  ])

  return (
    <>
      <section className="home-hero">
        <div className="shell home-hero-inner">
          <div className="home-hero-copy">
            <div className="hero-status">
              <i aria-hidden />
              Россия Онлайн · вики по фарму
            </div>
            <p className="eyebrow">{site.tagline}</p>
            <h1>
              Фурионов
              <span>Вики</span>
            </h1>
            <p className="hero-line">
              Практичная база по заработку: смены, каталоги и гайды — без воды и с акцентом на то,
              чего не хватает на официале.
            </p>
            <div className="cta-row">
              <Link href="/guides" className="btn btn-primary">
                Исследовать Wiki
              </Link>
              <Link href="/jobs" className="btn btn-secondary">
                Открыть работы
              </Link>
            </div>
          </div>
          <aside className="home-hero-aside" aria-hidden>
            <p>Фарм · Корни · Урожай</p>
          </aside>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <div className="bento">
            {quickLinks.map((item) => (
              <Link key={item.href} href={item.href} className="quick-card">
                <div>
                  <span className="quick-n">{item.n}</span>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
                <span className="quick-go">Перейти</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <div className="section-head">
            <div>
              <h2>Что есть в энциклопедии</h2>
              <p>Транспорт, работы, предметы, места и гайды — единые карточки и фильтры.</p>
            </div>
            <Link href="/guides" className="btn btn-ghost btn-sm">
              Все разделы
            </Link>
          </div>
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
        <div className="shell">
          <div className="section-head">
            <div>
              <h2>Стоит посмотреть</h2>
              <p>Избранные гайды редакции.</p>
            </div>
          </div>
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

      <section className="section-block section-block-last">
        <div className="shell">
          <div className="section-head">
            <div>
              <h2>Последние обновления</h2>
              <p>Что добавили в вики.</p>
            </div>
            <Link href="/updates" className="btn btn-ghost btn-sm">
              Вся лента
            </Link>
          </div>
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

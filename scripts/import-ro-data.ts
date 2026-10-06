import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dir = path.resolve('data/ro-import')

function readJson(name: string) {
  const file = path.join(dir, name)
  if (!fs.existsSync(file)) return [] as any[]
  return JSON.parse(fs.readFileSync(file, 'utf8')) as any[]
}

function cleanTitle(title = '') {
  return title
    .replace(/\s*[—|-].*$/, '')
    .replace(/\s+в Россия Онлайн.*$/i, '')
    .trim()
}

async function upsert(payload: any, collection: any, where: any, data: any) {
  const existing = await payload.find({ collection, where, limit: 1, depth: 0 })
  if (existing.docs[0]) {
    await payload.update({ collection, id: existing.docs[0].id, data })
    return 'updated'
  }
  await payload.create({ collection, data })
  return 'created'
}

async function main() {
  const payload = await getPayload({ config })
  let created = 0
  let updated = 0

  const bump = (result: string) => {
    if (result === 'created') created += 1
    else updated += 1
  }

  for (const doc of readJson('vehicles.json')) {
    bump(
      await upsert(payload, 'vehicles', { slug: { equals: doc.slug } }, {
        title: cleanTitle(doc.title),
        slug: doc.slug,
        summary: doc.summary || cleanTitle(doc.title),
        body: [doc.body || doc.summary, doc.sourceUrl ? `Разбор по материалам: ${doc.sourceUrl}` : null]
          .filter(Boolean)
          .join('\n\n'),
        vehicleClass: doc.vehicleClass || 'economy',
        price: doc.price ?? undefined,
        topSpeed: doc.topSpeed ?? undefined,
        trunk: doc.trunk ?? undefined,
        howToGet: doc.howToGet || undefined,
      }),
    )
  }

  for (const doc of readJson('items.json')) {
    bump(
      await upsert(payload, 'items', { slug: { equals: doc.slug } }, {
        title: cleanTitle(doc.title),
        slug: doc.slug,
        summary: doc.summary || cleanTitle(doc.title),
        body: doc.body || doc.summary || '',
        category: 'resource',
      }),
    )
  }

  for (const doc of readJson('cases.json')) {
    bump(
      await upsert(payload, 'cases', { slug: { equals: doc.slug } }, {
        title: cleanTitle(doc.title),
        slug: doc.slug,
        summary: doc.summary || cleanTitle(doc.title),
        body: doc.body || doc.summary || '',
      }),
    )
  }

  for (const doc of readJson('locations.json')) {
    bump(
      await upsert(payload, 'places', { slug: { equals: doc.slug } }, {
        title: cleanTitle(doc.title),
        slug: doc.slug,
        summary: doc.summary || cleanTitle(doc.title),
        body: doc.body || doc.summary || '',
        district: 'Москва',
      }),
    )
  }

  for (const doc of [...readJson('guides.json'), ...readJson('systems.json')]) {
    bump(
      await upsert(payload, 'guides', { slug: { equals: doc.slug } }, {
        title: cleanTitle(doc.title),
        slug: doc.slug,
        summary: doc.summary || cleanTitle(doc.title),
        body: doc.body || doc.summary || '',
        level: doc.level || 'novice',
        readTime: doc.readTime || 7,
        featured: Boolean(doc.featured),
      }),
    )
  }

  for (const doc of [...readJson('rules.json'), ...readJson('laws.json')]) {
    bump(
      await upsert(payload, 'laws', { slug: { equals: doc.slug } }, {
        title: cleanTitle(doc.title),
        slug: doc.slug,
        summary: doc.summary || cleanTitle(doc.title),
        body: doc.body || doc.summary || '',
        kind: doc.kind || 'law',
        server: 'all',
      }),
    )
  }

  for (const doc of readJson('organizations.json')) {
    bump(
      await upsert(payload, 'places', { slug: { equals: `org-${doc.slug}` } }, {
        title: cleanTitle(doc.title),
        slug: `org-${doc.slug}`,
        summary: doc.summary || cleanTitle(doc.title),
        body: doc.body || doc.summary || '',
        district: 'Организации',
        services: 'Фракция / структура',
      }),
    )
  }

  bump(
    await upsert(payload, 'updates', { slug: { equals: 'ro-wiki-import' } }, {
      title: 'Импорт разделов с официальной вики',
      slug: 'ro-wiki-import',
      summary:
        'Добавлены карточки по каталогам russiaonline.wiki: транспорт, предметы, кейсы, локации, гайды, системы, правила и часть законов.',
      body: 'Данные собраны как краткие разборы/карточки для навигации. Полные форумные тексты законов можно догрузить отдельно. Источники указаны в статьях.',
      kind: 'feature',
      publishedAt: new Date().toISOString().slice(0, 10),
    }),
  )

  console.log(`Import done. created=${created} updated=${updated}`)
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

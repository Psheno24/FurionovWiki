import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const dir = path.resolve('data/ro-import')

function readJson(name) {
  const file = path.join(dir, name)
  if (!fs.existsSync(file)) return []
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function cleanTitle(title = '') {
  return title
    .replace(/\s*[—|-].*$/, '')
    .replace(/\s+в Россия Онлайн.*$/i, '')
    .trim()
}

async function upsert(payload, collection, where, data) {
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
  const stats = {}

  const vehicles = readJson('vehicles.json')
  for (const doc of vehicles) {
    const title = cleanTitle(doc.title)
    const result = await upsert(
      payload,
      'vehicles',
      { slug: { equals: doc.slug } },
      {
        title,
        slug: doc.slug,
        summary: doc.summary || doc.body || title,
        body: [doc.body, doc.sourceUrl ? `Источник разбора: ${doc.sourceUrl}` : null]
          .filter(Boolean)
          .join('\n\n'),
        vehicleClass: doc.vehicleClass || 'economy',
        price: doc.price ?? undefined,
        topSpeed: doc.topSpeed ?? undefined,
        trunk: doc.trunk ?? undefined,
        howToGet: doc.howToGet || undefined,
      },
    )
    stats.vehicles = `${(stats.vehicles || 0) + 1}:${result}`
  }

  for (const doc of readJson('items.json')) {
    await upsert(
      payload,
      'items',
      { slug: { equals: doc.slug } },
      {
        title: cleanTitle(doc.title),
        slug: doc.slug,
        summary: doc.summary || cleanTitle(doc.title),
        body: doc.body || doc.summary || '',
        category: doc.category || 'resource',
        buyPrice: doc.buyPrice ?? undefined,
        sellPrice: doc.sellPrice ?? undefined,
        weight: doc.weight ?? undefined,
      },
    )
  }

  for (const doc of readJson('cases.json')) {
    await upsert(
      payload,
      'cases',
      { slug: { equals: doc.slug } },
      {
        title: cleanTitle(doc.title),
        slug: doc.slug,
        summary: doc.summary || cleanTitle(doc.title),
        body: doc.body || doc.summary || '',
        openPrice: doc.openPrice ?? undefined,
        contents: doc.contents || undefined,
      },
    )
  }

  for (const doc of readJson('locations.json')) {
    await upsert(
      payload,
      'places',
      { slug: { equals: doc.slug } },
      {
        title: cleanTitle(doc.title),
        slug: doc.slug,
        summary: doc.summary || cleanTitle(doc.title),
        body: doc.body || doc.summary || '',
        district: doc.district || 'Москва',
        services: doc.services || undefined,
        coords: doc.coords || undefined,
      },
    )
  }

  for (const doc of [...readJson('guides.json'), ...readJson('systems.json')]) {
    await upsert(
      payload,
      'guides',
      { slug: { equals: doc.slug } },
      {
        title: cleanTitle(doc.title),
        slug: doc.slug,
        summary: doc.summary || cleanTitle(doc.title),
        body: doc.body || doc.summary || '',
        level: doc.level || 'novice',
        readTime: doc.readTime || 7,
        featured: Boolean(doc.featured),
      },
    )
  }

  for (const doc of [...readJson('rules.json'), ...readJson('laws.json')]) {
    await upsert(
      payload,
      'laws',
      { slug: { equals: doc.slug } },
      {
        title: cleanTitle(doc.title),
        slug: doc.slug,
        summary: doc.summary || cleanTitle(doc.title),
        body: doc.body || doc.summary || '',
        kind: doc.kind || 'law',
        server: doc.server || 'all',
      },
    )
  }

  for (const doc of readJson('organizations.json')) {
    await upsert(
      payload,
      'places',
      { slug: { equals: `org-${doc.slug}` } },
      {
        title: cleanTitle(doc.title),
        slug: `org-${doc.slug}`,
        summary: doc.summary || cleanTitle(doc.title),
        body: doc.body || doc.summary || '',
        district: 'Организации',
        services: 'Фракция / структура',
      },
    )
  }

  await upsert(
    payload,
    'updates',
    { slug: { equals: 'ro-wiki-import' } },
    {
      title: 'Импорт разделов с официальной вики',
      slug: 'ro-wiki-import',
      summary: 'Добавлены разборы и карточки по каталогам russiaonline.wiki (адаптированные краткие описания).',
      body: 'Собраны транспорт, предметы, кейсы, локации, гайды, системы, правила и часть законов. Полные тексты законов с форума можно догрузить отдельно; сейчас — краткие карточки для навигации и фильтров.',
      kind: 'feature',
      publishedAt: new Date().toISOString().slice(0, 10),
    },
  )

  console.log('Import finished')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

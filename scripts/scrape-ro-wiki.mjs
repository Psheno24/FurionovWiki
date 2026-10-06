import fs from 'node:fs'
import path from 'node:path'

const outDir = path.resolve('data/ro-import')
fs.mkdirSync(outDir, { recursive: true })

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'user-agent': 'FurionovWikiImporter/1.0 (+local research)' },
  })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.text()
}

function extractJsonLd(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  return blocks.map((m) => {
    try {
      return JSON.parse(m[1])
    } catch {
      return null
    }
  }).filter(Boolean)
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function parseVehicleFromText(title, description, text) {
  const blob = `${description || ''} ${text}`
  const speed = blob.match(/(?:максимум|скорость)\s*(\d+)\s*км\/ч/i) || blob.match(/(\d+)\s*км\/ч/)
  const trunk = blob.match(/багажник\s*(\d+)/i)
  const priceMatch = blob.match(/в салоне[^\d]*([\d\s]{3,})\s*₽/i) || blob.match(/([\d\s]{4,})\s*₽/)
  const fromCase = /кейс/i.test(blob) && /(выпадает|доступен в кейсе)/i.test(blob)
  const notSold = /не продаётся|не продается/i.test(blob)
  let price = null
  if (priceMatch && !fromCase) {
    price = Number(priceMatch[1].replace(/\s/g, ''))
    if (!Number.isFinite(price)) price = null
  }
  return {
    title,
    summary: description || null,
    topSpeed: speed ? Number(speed[1]) : null,
    trunk: trunk ? Number(trunk[1]) : null,
    price,
    howToGet: fromCase ? 'Кейс' : notSold ? 'Не продаётся' : price ? 'Автосалон' : null,
  }
}

async function loadSitemap() {
  const xml = await fetchText('https://russiaonline.wiki/sitemap.xml')
  return [...xml.matchAll(/<loc>(https:\/\/russiaonline\.wiki[^<]+)<\/loc>/g)].map((m) => m[1])
}

async function scrapePage(url) {
  const html = await fetchText(url)
  const ld = extractJsonLd(html)
  const article = ld.find((x) => x['@type'] === 'Article')
  const itemList = ld.find((x) => x['@type'] === 'ItemList')
  const text = stripTags(html).slice(0, 12000)
  return { url, article, itemList, text, html }
}

function slugFromUrl(url) {
  return url.split('/').filter(Boolean).pop()
}

async function scrapeSection(kind, prefix, limit = Infinity) {
  const urls = (await loadSitemap()).filter((u) => u.includes(prefix) && u !== `https://russiaonline.wiki${prefix}` && !u.endsWith(prefix))
  const slice = urls.slice(0, limit)
  console.log(`Scraping ${kind}: ${slice.length}/${urls.length}`)
  const docs = []
  for (const [i, url] of slice.entries()) {
    try {
      const page = await scrapePage(url)
      const title = page.article?.headline?.replace(/\s*[—|-].*$/, '').trim() || slugFromUrl(url)
      const description = page.article?.description || null
      const base = {
        slug: slugFromUrl(url),
        title,
        summary: description,
        sourceUrl: url,
      }
      if (kind === 'vehicles') {
        docs.push({ ...base, ...parseVehicleFromText(title, description, page.text), body: description })
      } else if (kind === 'cases') {
        docs.push({
          ...base,
          body: description,
          openPrice: null,
          contents: null,
        })
      } else if (kind === 'guides') {
        docs.push({
          ...base,
          body: description,
          level: 'novice',
          readTime: 7,
          featured: i < 4,
        })
      } else if (kind === 'locations') {
        docs.push({
          ...base,
          body: description,
          district: null,
          services: null,
          coords: null,
        })
      } else if (kind === 'items') {
        docs.push({
          ...base,
          body: description,
          category: 'resource',
          buyPrice: null,
          sellPrice: null,
          weight: null,
        })
      } else if (kind === 'laws' || kind === 'rules') {
        docs.push({
          ...base,
          body: description,
          kind: kind === 'rules' ? 'rule' : 'law',
          server: 'all',
        })
      } else if (kind === 'organizations' || kind === 'systems') {
        docs.push({
          ...base,
          body: description,
          level: 'mid',
          readTime: 6,
          featured: false,
          // store as guides-like for systems, or we map orgs to places/guides later
        })
      } else {
        docs.push(base)
      }
      if ((i + 1) % 25 === 0) console.log(`  ${kind}: ${i + 1}/${slice.length}`)
      await new Promise((r) => setTimeout(r, 80))
    } catch (error) {
      console.warn(`Fail ${url}:`, error.message)
    }
  }
  const file = path.join(outDir, `${kind}.json`)
  fs.writeFileSync(file, JSON.stringify(docs, null, 2), 'utf8')
  console.log(`Wrote ${docs.length} -> ${file}`)
  return docs
}

const mode = process.argv[2] || 'core'

if (mode === 'core') {
  // smaller sections fully + sample vehicles/items
  await scrapeSection('cases', '/wiki/cases/')
  await scrapeSection('guides', '/wiki/guides/')
  await scrapeSection('locations', '/wiki/locations/')
  await scrapeSection('organizations', '/wiki/organizations/')
  await scrapeSection('systems', '/wiki/systems/')
  await scrapeSection('rules', '/wiki/rules/')
  await scrapeSection('laws', '/wiki/laws/', 40)
  await scrapeSection('vehicles', '/wiki/vehicles/', 80)
  await scrapeSection('items', '/wiki/items/', 60)
} else if (mode === 'all-vehicles') {
  await scrapeSection('vehicles', '/wiki/vehicles/')
} else if (mode === 'all-items') {
  await scrapeSection('items', '/wiki/items/')
} else if (mode === 'all-laws') {
  await scrapeSection('laws', '/wiki/laws/')
}

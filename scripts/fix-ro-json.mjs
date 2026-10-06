import fs from 'node:fs'

function fixVehicles(docs) {
  return docs.map((doc) => {
    const blob = `${doc.summary || ''} ${doc.body || ''}`
    const norm = blob.replace(/[\u00A0\u202F\u2009]/g, ' ')
    const fromCase = /кейс/i.test(norm) && /(выпадает|доступен в кейсе)/i.test(norm)
    const speed = norm.match(/(?:максимум|скорость)\s*(\d+)\s*км\/ч/i)
    const trunk = norm.match(/багажник\s*(\d+)/i)
    let price = null
    const pm = norm.match(/в салоне[^\d]*([\d\s]{3,})\s*₽/i)
    if (pm && !fromCase) {
      price = Number(pm[1].replace(/\s+/g, ''))
      if (!Number.isFinite(price)) price = null
    }

    let vehicleClass = 'comfort'
    if (fromCase) vehicleClass = 'sport'
    if (/мото|bike|scooter/i.test(norm)) vehicleClass = 'moto'
    if (/газел|фургон|тягач|truck|груз/i.test(norm)) vehicleClass = 'commercial'
    if (price != null && price < 300000) vehicleClass = 'economy'
    if (price != null && price > 3000000) vehicleClass = 'sport'

    return {
      ...doc,
      title: String(doc.title || '')
        .replace(/\s+в Россия Онлайн.*$/i, '')
        .replace(/\s*[—|-].*$/, '')
        .trim(),
      topSpeed: speed ? Number(speed[1]) : doc.topSpeed,
      trunk: trunk ? Number(trunk[1]) : doc.trunk,
      price,
      howToGet: fromCase ? 'Кейс' : price ? 'Автосалон' : doc.howToGet,
      vehicleClass,
    }
  })
}

for (const file of ['vehicles.json', 'items.json', 'cases.json', 'guides.json', 'locations.json', 'laws.json', 'rules.json', 'systems.json', 'organizations.json']) {
  const path = `data/ro-import/${file}`
  if (!fs.existsSync(path)) continue
  let docs = JSON.parse(fs.readFileSync(path, 'utf8'))
  docs = docs.map((doc) => ({
    ...doc,
    title: String(doc.title || '')
      .replace(/\s+в Россия Онлайн.*$/i, '')
      .replace(/\s*[—|-].*$/, '')
      .trim(),
  }))
  if (file === 'vehicles.json') docs = fixVehicles(docs)
  fs.writeFileSync(path, JSON.stringify(docs, null, 2))
  console.log(file, docs.length, file === 'vehicles.json' ? `priced=${docs.filter((d) => d.price != null).length}` : '')
}

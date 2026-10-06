import { EmptyState, PageHero } from '@/components/Ui'
import { VehicleCatalog } from '@/components/VehicleCatalog'
import { getPayloadClient } from '@/lib/payload'

export const metadata = {
  title: 'Транспорт',
}

export default async function TransportPage() {
  const payload = await getPayloadClient()
  const vehicles = await payload.find({
    collection: 'vehicles',
    limit: 500,
    sort: 'title',
  })

  return (
    <>
      <PageHero
        eyebrow="Каталог"
        title="Транспорт"
        description="Цена с витрины, максимум скорости, багажник и способ получения. Карточки собраны по разборам официальной вики и игровым цифрам."
      />
      <section className="section-block" style={{ paddingTop: 0 }}>
        <div className="shell">
          {vehicles.docs.length ? (
            <VehicleCatalog
              vehicles={vehicles.docs.map((vehicle) => ({
                id: vehicle.id,
                title: vehicle.title,
                slug: vehicle.slug,
                summary: vehicle.summary,
                vehicleClass: vehicle.vehicleClass,
                price: vehicle.price,
                topSpeed: vehicle.topSpeed,
                trunk: vehicle.trunk,
                howToGet: vehicle.howToGet,
              }))}
            />
          ) : (
            <EmptyState title="Пока пусто" hint="Добавьте машины в /admin → Транспорт." />
          )}
        </div>
      </section>
    </>
  )
}

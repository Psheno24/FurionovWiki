import { VehicleCatalog } from '@/components/VehicleCatalog'
import { EmptyState, PageHero } from '@/components/Ui'
import { getPayloadClient } from '@/lib/payload'

export const metadata = {
  title: 'Транспорт',
}

export default async function TransportPage() {
  const payload = await getPayloadClient()
  const vehicles = await payload.find({
    collection: 'vehicles',
    limit: 100,
    sort: 'title',
  })

  return (
    <>
      <PageHero
        eyebrow="Каталог"
        title="Транспорт"
        description="Цена, класс и багажник. Цифры-заглушки — уточним по витрине и сменам семьи."
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

'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import { formatMoney, vehicleClassLabel } from '@/lib/site'

type VehicleCard = {
  id: number | string
  title: string
  slug: string
  summary?: string | null
  vehicleClass?: string | null
  price?: number | null
  topSpeed?: number | null
  trunk?: number | null
}

const filters = [
  { value: 'all', label: 'Все' },
  { value: 'economy', label: 'Эконом' },
  { value: 'comfort', label: 'Комфорт' },
  { value: 'sport', label: 'Спорт' },
  { value: 'commercial', label: 'Коммерческий' },
  { value: 'moto', label: 'Мото' },
]

export function VehicleCatalog({ vehicles }: { vehicles: VehicleCard[] }) {
  const [active, setActive] = useState('all')

  const filtered = useMemo(() => {
    if (active === 'all') return vehicles
    return vehicles.filter((vehicle) => vehicle.vehicleClass === active)
  }, [active, vehicles])

  return (
    <div>
      <div className="filter-row" role="tablist" aria-label="Класс транспорта">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={active === filter.value ? 'filter-chip is-active' : 'filter-chip'}
            onClick={() => setActive(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {filtered.map((vehicle) => (
          <Link key={vehicle.id} href={`/transport/${vehicle.slug}`} className="content-card">
            <p className="card-kicker">
              {vehicleClassLabel[vehicle.vehicleClass || ''] || 'Транспорт'}
            </p>
            <h2>{vehicle.title}</h2>
            <p>{vehicle.summary}</p>
            <div className="card-stats">
              <span>{formatMoney(vehicle.price)}</span>
              <span>{vehicle.topSpeed ? `${vehicle.topSpeed} км/ч` : '—'}</span>
              <span>{vehicle.trunk != null ? `багажник ${vehicle.trunk}` : '—'}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

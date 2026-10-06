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
  howToGet?: string | null
}

const classFilters = [
  { value: 'all', label: 'Все' },
  { value: 'economy', label: 'Эконом' },
  { value: 'comfort', label: 'Комфорт' },
  { value: 'sport', label: 'Спорт' },
  { value: 'commercial', label: 'Коммерческий' },
  { value: 'moto', label: 'Мото' },
]

export function VehicleCatalog({ vehicles }: { vehicles: VehicleCard[] }) {
  const [vehicleClass, setVehicleClass] = useState('all')
  const [source, setSource] = useState<'all' | 'shop' | 'case'>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return vehicles.filter((vehicle) => {
      if (vehicleClass !== 'all' && vehicle.vehicleClass !== vehicleClass) return false
      if (source === 'shop' && !(vehicle.howToGet || '').toLowerCase().includes('салон')) return false
      if (source === 'case' && !(vehicle.howToGet || '').toLowerCase().includes('кейс')) return false
      if (!q) return true
      return (
        vehicle.title.toLowerCase().includes(q) ||
        (vehicle.summary || '').toLowerCase().includes(q)
      )
    })
  }, [vehicles, vehicleClass, source, query])

  return (
    <div className="catalog-layout">
      <aside className="catalog-sidebar">
        <div className="catalog-sidebar-card">
          <p className="catalog-filter-title">Поиск</p>
          <input
            className="catalog-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Модель…"
            aria-label="Поиск транспорта"
          />

          <div className="catalog-filter-group">
            <p className="catalog-filter-title">Класс</p>
            <div className="catalog-filter-options">
              {classFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  className={vehicleClass === filter.value ? 'filter-chip is-active' : 'filter-chip'}
                  onClick={() => setVehicleClass(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="catalog-filter-group">
            <p className="catalog-filter-title">Как получить</p>
            <div className="catalog-filter-options">
              {(
                [
                  ['all', 'Все'],
                  ['shop', 'Автосалон'],
                  ['case', 'Кейс'],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={source === value ? 'filter-chip is-active' : 'filter-chip'}
                  onClick={() => setSource(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div className="catalog-main">
        <div className="catalog-toolbar">
          <p>
            <strong>{filtered.length}</strong> из {vehicles.length} машин
          </p>
        </div>
        <div className="jobs-grid">
          {filtered.map((vehicle) => (
            <Link key={vehicle.id} href={`/transport/${vehicle.slug}`} className="job-card">
              <div className="job-card-top">
                <span className="job-badge">
                  {vehicleClassLabel[vehicle.vehicleClass || ''] || 'Транспорт'}
                </span>
                <span className="job-legal job-legal-legal">{vehicle.howToGet || '—'}</span>
              </div>
              <h2>{vehicle.title}</h2>
              <p className="job-summary">{vehicle.summary}</p>
              <div className="job-meta">
                <div>
                  <span>Цена</span>
                  <strong>{formatMoney(vehicle.price)}</strong>
                </div>
                <div>
                  <span>Скорость</span>
                  <strong>{vehicle.topSpeed ? `${vehicle.topSpeed} км/ч` : '—'}</strong>
                </div>
                <div>
                  <span>Багажник</span>
                  <strong>{vehicle.trunk != null ? vehicle.trunk : '—'}</strong>
                </div>
                <div>
                  <span>Получение</span>
                  <strong>{vehicle.howToGet || '—'}</strong>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

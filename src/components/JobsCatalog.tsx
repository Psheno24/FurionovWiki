'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import { formatMoney } from '@/lib/site'

export type JobCard = {
  id: number | string
  title: string
  slug: string
  tagline?: string | null
  summary?: string | null
  employmentType?: string | null
  legality?: string | null
  incomeMin?: number | null
  incomeMax?: number | null
  incomeNote?: string | null
  incomePerHour?: string | null
  requiredLevel?: number | null
  needsTransport?: boolean | null
  difficulty?: string | null
}

const employmentLabels: Record<string, string> = {
  civilian: 'Гражданская',
  state: 'Государственная',
  freelance: 'Фриланс',
  criminal: 'Криминальная',
}

const legalityLabels: Record<string, string> = {
  legal: 'Легально',
  semilegal: 'Полулегально',
  illegal: 'Нелегально',
}

function incomeText(job: JobCard) {
  if (job.incomeMin != null || job.incomeMax != null) {
    if (job.incomeMin != null && job.incomeMax != null) {
      return `${formatMoney(job.incomeMin)} — ${formatMoney(job.incomeMax)}`
    }
    if (job.incomeMin != null) return `от ${formatMoney(job.incomeMin)}`
    return `до ${formatMoney(job.incomeMax)}`
  }
  return job.incomeNote || job.incomePerHour || 'Оплата уточняется'
}

function ToggleGroup({
  title,
  options,
  value,
  onChange,
}: {
  title: string
  options: Array<{ value: string; label: string; count: number }>
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="catalog-filter-group">
      <p className="catalog-filter-title">{title}</p>
      <div className="catalog-filter-options">
        <button
          type="button"
          className={value === 'all' ? 'filter-chip is-active' : 'filter-chip'}
          onClick={() => onChange('all')}
        >
          Все
        </button>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={value === option.value ? 'filter-chip is-active' : 'filter-chip'}
            onClick={() => onChange(option.value)}
          >
            {option.label}
            <span className="filter-count">{option.count}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function JobsCatalog({ jobs }: { jobs: JobCard[] }) {
  const [employment, setEmployment] = useState('all')
  const [legality, setLegality] = useState('all')
  const [needsTransport, setNeedsTransport] = useState<'all' | 'yes' | 'no'>('all')
  const [query, setQuery] = useState('')

  const employmentOptions = useMemo(() => {
    const keys = ['civilian', 'state', 'freelance', 'criminal']
    return keys.map((key) => ({
      value: key,
      label: employmentLabels[key],
      count: jobs.filter((job) => job.employmentType === key).length,
    }))
  }, [jobs])

  const legalityOptions = useMemo(() => {
    const keys = ['legal', 'semilegal', 'illegal']
    return keys.map((key) => ({
      value: key,
      label: legalityLabels[key],
      count: jobs.filter((job) => job.legality === key).length,
    }))
  }, [jobs])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return jobs.filter((job) => {
      if (employment !== 'all' && job.employmentType !== employment) return false
      if (legality !== 'all' && job.legality !== legality) return false
      if (needsTransport === 'yes' && !job.needsTransport) return false
      if (needsTransport === 'no' && job.needsTransport) return false
      if (!q) return true
      return (
        job.title.toLowerCase().includes(q) ||
        (job.summary || '').toLowerCase().includes(q) ||
        (job.tagline || '').toLowerCase().includes(q)
      )
    })
  }, [jobs, employment, legality, needsTransport, query])

  return (
    <div className="catalog-layout">
      <aside className="catalog-sidebar">
        <div className="catalog-sidebar-card">
          <p className="catalog-filter-title">Поиск</p>
          <input
            className="catalog-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Название работы…"
            aria-label="Поиск работы"
          />

          <ToggleGroup
            title="Тип занятости"
            options={employmentOptions}
            value={employment}
            onChange={setEmployment}
          />

          <ToggleGroup
            title="Законность"
            options={legalityOptions}
            value={legality}
            onChange={setLegality}
          />

          <div className="catalog-filter-group">
            <p className="catalog-filter-title">Нужен транспорт</p>
            <div className="catalog-filter-options">
              {(
                [
                  ['all', 'Все'],
                  ['yes', 'Да'],
                  ['no', 'Нет'],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={needsTransport === value ? 'filter-chip is-active' : 'filter-chip'}
                  onClick={() => setNeedsTransport(value)}
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
            <strong>{filtered.length}</strong> из {jobs.length} работ
          </p>
          {(employment !== 'all' || legality !== 'all' || needsTransport !== 'all' || query) && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setEmployment('all')
                setLegality('all')
                setNeedsTransport('all')
                setQuery('')
              }}
            >
              Сбросить
            </button>
          )}
        </div>

        <div className="jobs-grid">
          {filtered.map((job) => (
            <Link key={job.id} href={`/jobs/${job.slug}`} className="job-card">
              <div className="job-card-top">
                <span className="job-badge">Работа</span>
                <span
                  className={`job-legal job-legal-${job.legality || 'legal'}`}
                >
                  {legalityLabels[job.legality || ''] || 'Легально'}
                </span>
              </div>
              <h2>{job.title}</h2>
              {job.tagline ? <p className="job-tagline">{job.tagline}</p> : null}
              <p className="job-summary">{job.summary}</p>
              <div className="job-meta">
                <div>
                  <span>Тип занятости</span>
                  <strong>{employmentLabels[job.employmentType || ''] || '—'}</strong>
                </div>
                <div>
                  <span>Доход</span>
                  <strong>{incomeText(job)}</strong>
                </div>
                <div>
                  <span>Уровень</span>
                  <strong>{job.requiredLevel ?? '—'}</strong>
                </div>
                <div>
                  <span>Транспорт</span>
                  <strong>{job.needsTransport ? 'Нужен' : 'Не обязателен'}</strong>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!filtered.length ? (
          <div className="empty-state" style={{ marginTop: '1rem' }}>
            <h2>Ничего не нашлось</h2>
            <p>Смягчите фильтры или сбросьте поиск.</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

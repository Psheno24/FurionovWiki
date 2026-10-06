export const site = {
  name: 'Фурионов Вики',
  shortName: 'Фурионов Вики',
  tagline: 'Вики по фарму',
  description:
    'Неофициальная вики по Россия Онлайн: гайды по фарму, транспорт, работы и то, чего не хватает на официале.',
  /** Цвет фамки */
  color: '#78875B',
}

export const navLinks = [
  { href: '/guides', label: 'Гайды' },
  { href: '/jobs', label: 'Работа' },
  { href: '/transport', label: 'Транспорт' },
  { href: '/items', label: 'Предметы' },
  { href: '/places', label: 'Места' },
  { href: '/cases', label: 'Кейсы' },
  { href: '/laws', label: 'Правила' },
  { href: '/updates', label: 'Обновления' },
] as const

export const sectionMeta = [
  {
    href: '/transport',
    title: 'Транспорт',
    description: 'Цена, класс, багажник и как достать — от эконома до спорта.',
  },
  {
    href: '/jobs',
    title: 'Работа',
    description: 'Доход в час, уровень и советы по сменам.',
  },
  {
    href: '/items',
    title: 'Предметы',
    description: 'Инструменты, расходники и ресурсы для длинных рейсов.',
  },
  {
    href: '/places',
    title: 'Места',
    description: 'Точки интереса: салоны, биржа труда, полезные маркеры.',
  },
  {
    href: '/cases',
    title: 'Кейсы',
    description: 'Что внутри и сколько стоит открыть — без выдуманных шансов.',
  },
  {
    href: '/guides',
    title: 'Гайды',
    description: 'От первого входа до ритма смены, на котором растёт касса.',
  },
  {
    href: '/laws',
    title: 'Правила и законы',
    description: 'Короткие памятки сейчас, полные тексты — по мере наполнения.',
  },
] as const

export const vehicleClassLabel: Record<string, string> = {
  economy: 'Эконом',
  comfort: 'Комфорт',
  sport: 'Спорт',
  commercial: 'Коммерческий',
  moto: 'Мото',
}

export const levelLabel: Record<string, string> = {
  novice: 'Новичок',
  mid: 'Средний',
  advanced: 'Продвинутый',
}

export const updateKindLabel: Record<string, string> = {
  added: 'Добавлено',
  updated: 'Обновлено',
  feature: 'Новая функция',
}

export function formatMoney(value?: number | null) {
  if (value == null) return '—'
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽'
}

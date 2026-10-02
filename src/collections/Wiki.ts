import type { CollectionConfig } from 'payload'

import { slugField } from './fields'

export const Vehicles: CollectionConfig = {
  slug: 'vehicles',
  labels: {
    singular: 'Транспорт',
    plural: 'Транспорт',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'vehicleClass', 'price', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Название' },
    slugField(),
    { name: 'summary', type: 'textarea', label: 'Кратко' },
    { name: 'body', type: 'textarea', label: 'Описание' },
    {
      name: 'vehicleClass',
      type: 'select',
      label: 'Класс',
      options: [
        { label: 'Эконом', value: 'economy' },
        { label: 'Комфорт', value: 'comfort' },
        { label: 'Спорт', value: 'sport' },
        { label: 'Коммерческий', value: 'commercial' },
        { label: 'Мото', value: 'moto' },
      ],
      defaultValue: 'economy',
    },
    { name: 'price', type: 'number', label: 'Цена (₽)' },
    { name: 'topSpeed', type: 'number', label: 'Макс. скорость' },
    { name: 'trunk', type: 'number', label: 'Багажник' },
    { name: 'howToGet', type: 'text', label: 'Как получить' },
  ],
}

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: {
    singular: 'Работа',
    plural: 'Работы',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'incomePerHour', 'requiredLevel', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Название' },
    slugField(),
    { name: 'summary', type: 'textarea', label: 'Кратко' },
    { name: 'body', type: 'textarea', label: 'Описание' },
    { name: 'incomePerHour', type: 'text', label: 'Доход в час' },
    { name: 'requiredLevel', type: 'number', label: 'Уровень' },
    { name: 'legal', type: 'checkbox', label: 'Легальная', defaultValue: true },
    { name: 'farmTip', type: 'textarea', label: 'Совет фармлинга' },
  ],
}

export const Items: CollectionConfig = {
  slug: 'items',
  labels: {
    singular: 'Предмет',
    plural: 'Предметы',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'buyPrice', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Название' },
    slugField(),
    { name: 'summary', type: 'textarea', label: 'Кратко' },
    { name: 'body', type: 'textarea', label: 'Описание' },
    {
      name: 'category',
      type: 'select',
      label: 'Категория',
      options: [
        { label: 'Оружие', value: 'weapon' },
        { label: 'Ресурс', value: 'resource' },
        { label: 'Инструмент', value: 'tool' },
        { label: 'Расходник', value: 'consumable' },
        { label: 'Одежда', value: 'clothing' },
      ],
      defaultValue: 'resource',
    },
    { name: 'buyPrice', type: 'number', label: 'Цена покупки' },
    { name: 'sellPrice', type: 'number', label: 'Цена продажи' },
    { name: 'weight', type: 'number', label: 'Вес' },
  ],
}

export const Places: CollectionConfig = {
  slug: 'places',
  labels: {
    singular: 'Место',
    plural: 'Места',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'district', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Название' },
    slugField(),
    { name: 'summary', type: 'textarea', label: 'Кратко' },
    { name: 'body', type: 'textarea', label: 'Описание' },
    { name: 'district', type: 'text', label: 'Район' },
    { name: 'services', type: 'textarea', label: 'Услуги' },
    { name: 'coords', type: 'text', label: 'Координаты / маркер' },
  ],
}

export const Cases: CollectionConfig = {
  slug: 'cases',
  labels: {
    singular: 'Кейс',
    plural: 'Кейсы',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'openPrice', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Название' },
    slugField(),
    { name: 'summary', type: 'textarea', label: 'Кратко' },
    { name: 'body', type: 'textarea', label: 'Описание' },
    { name: 'openPrice', type: 'number', label: 'Цена открытия' },
    { name: 'contents', type: 'textarea', label: 'Что внутри (список)' },
  ],
}

export const Guides: CollectionConfig = {
  slug: 'guides',
  labels: {
    singular: 'Гайд',
    plural: 'Гайды',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'level', 'readTime', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Название' },
    slugField(),
    { name: 'summary', type: 'textarea', label: 'Кратко' },
    { name: 'body', type: 'textarea', label: 'Текст' },
    {
      name: 'level',
      type: 'select',
      label: 'Уровень',
      options: [
        { label: 'Новичок', value: 'novice' },
        { label: 'Средний', value: 'mid' },
        { label: 'Продвинутый', value: 'advanced' },
      ],
      defaultValue: 'novice',
    },
    { name: 'readTime', type: 'number', label: 'Минут чтения', defaultValue: 5 },
    { name: 'featured', type: 'checkbox', label: 'На главной', defaultValue: false },
  ],
}

export const Laws: CollectionConfig = {
  slug: 'laws',
  labels: {
    singular: 'Закон / правило',
    plural: 'Законы и правила',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'server', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Название' },
    slugField(),
    { name: 'summary', type: 'textarea', label: 'Кратко' },
    { name: 'body', type: 'textarea', label: 'Текст' },
    {
      name: 'kind',
      type: 'select',
      label: 'Тип',
      options: [
        { label: 'Правило проекта', value: 'rule' },
        { label: 'Закон', value: 'law' },
      ],
      defaultValue: 'rule',
    },
    {
      name: 'server',
      type: 'select',
      label: 'Сервер',
      options: [
        { label: 'Все', value: 'all' },
        { label: 'Арбатский', value: 'arbat' },
        { label: 'Тверской', value: 'tver' },
        { label: 'Кутузовский', value: 'kutuzov' },
      ],
      defaultValue: 'all',
    },
  ],
}

export const FamilyMembers: CollectionConfig = {
  slug: 'family-members',
  labels: {
    singular: 'Фармлинг',
    plural: 'Семья / Фармлинги',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Имя персонажа' },
    slugField(),
    { name: 'role', type: 'text', label: 'Роль в семье' },
    { name: 'summary', type: 'textarea', label: 'Кратко' },
    { name: 'body', type: 'textarea', label: 'Описание' },
    {
      name: 'status',
      type: 'select',
      label: 'Статус',
      options: [
        { label: 'Активен', value: 'active' },
        { label: 'Набор открыт', value: 'recruiting' },
        { label: 'Отдых', value: 'idle' },
      ],
      defaultValue: 'active',
    },
    { name: 'specialty', type: 'text', label: 'Специализация фарма' },
  ],
}

export const Updates: CollectionConfig = {
  slug: 'updates',
  labels: {
    singular: 'Обновление',
    plural: 'Обновления',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'publishedAt', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Заголовок' },
    slugField(),
    { name: 'summary', type: 'textarea', label: 'Кратко' },
    { name: 'body', type: 'textarea', label: 'Текст' },
    {
      name: 'kind',
      type: 'select',
      label: 'Тип',
      options: [
        { label: 'Добавлено', value: 'added' },
        { label: 'Обновлено', value: 'updated' },
        { label: 'Новая функция', value: 'feature' },
      ],
      defaultValue: 'added',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Дата',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
  ],
}

import type { Payload } from 'payload'

import { jobsSeed } from './jobs'

export async function seedIfEmpty(payload: Payload) {
  const existing = await payload.find({
    collection: 'guides',
    limit: 1,
    depth: 0,
  })

  if (existing.totalDocs > 0) {
    const jobs = await payload.find({ collection: 'jobs', limit: 1, depth: 0 })
    if (jobs.totalDocs < 10) {
      payload.logger.info('Refreshing jobs catalog seed…')
      const allJobs = await payload.find({ collection: 'jobs', limit: 200, depth: 0 })
      for (const job of allJobs.docs) {
        await payload.delete({ collection: 'jobs', id: job.id })
      }
      for (const job of jobsSeed) {
        await payload.create({ collection: 'jobs', data: job })
      }
    }
    return
  }

  payload.logger.info('Seeding stub content for Фурионов Вики…')

  await Promise.all([
    payload.create({
      collection: 'vehicles',
      data: {
        title: 'Лада Гранта',
        slug: 'lada-granta',
        summary: 'Стартовый эконом для поездок на смены. Заглушка — цифры уточним.',
        body: 'Базовый транспорт для новичка. Хватает, чтобы доехать до работы и обратно, пока копите на что-то шустрее.',
        vehicleClass: 'economy',
        price: 85000,
        topSpeed: 145,
        trunk: 20,
        howToGet: 'Автосалон',
      },
    }),
    payload.create({
      collection: 'vehicles',
      data: {
        title: 'Газель Next',
        slug: 'gazelle-next',
        summary: 'Коммерция под перевозки и дальнобойные маршруты.',
        body: 'Когда смена требует объёма — берут «Газель». Подробные маршруты и расход добавим позже.',
        vehicleClass: 'commercial',
        price: 420000,
        topSpeed: 130,
        trunk: 80,
        howToGet: 'Автосалон / работа',
      },
    }),
    payload.create({
      collection: 'vehicles',
      data: {
        title: 'BMW M5',
        slug: 'bmw-m5',
        summary: 'Спорт-седан — цель, а не старт. Заглушка каталога.',
        body: 'Красиво едет, дорого стоит. В вики отметим, когда машина реально окупается относительно фарма.',
        vehicleClass: 'sport',
        price: 8500000,
        topSpeed: 250,
        trunk: 25,
        howToGet: 'Автосалон / кейс',
      },
    }),
    ...jobsSeed.map((job) => payload.create({ collection: 'jobs', data: job })),
    payload.create({
      collection: 'items',
      data: {
        title: 'Ремонтный набор',
        slug: 'repair-kit',
        summary: 'Чинит транспорт в поле.',
        body: 'Держите пару штук в багажнике на длинных сменах.',
        category: 'tool',
        buyPrice: 1500,
        sellPrice: 400,
        weight: 2,
      },
    }),
    payload.create({
      collection: 'items',
      data: {
        title: 'Канистра бензина',
        slug: 'fuel-can',
        summary: 'Запас на случай пустого бака в глуши.',
        body: 'Без канистры на длинном рейсе легко остаться пешком до АЗС.',
        category: 'consumable',
        buyPrice: 800,
        sellPrice: 200,
        weight: 5,
      },
    }),
    payload.create({
      collection: 'places',
      data: {
        title: 'Центральный автосалон',
        slug: 'central-dealership',
        summary: 'Витрина транспорта. Координаты уточним.',
        body: 'Сюда едете за первой и не первой машиной. Позже добавим часы работы и список моделей с витрины.',
        district: 'Центр',
        services: 'Покупка транспорта',
        coords: 'маркер на карте — скоро',
      },
    }),
    payload.create({
      collection: 'places',
      data: {
        title: 'Биржа труда',
        slug: 'job-center',
        summary: 'Точка устройства на работы.',
        body: 'Стартовая точка для любой смены. Список доступных профессий зависит от уровня.',
        district: 'Центр',
        services: 'Устройство на работу',
        coords: 'маркер на карте — скоро',
      },
    }),
    payload.create({
      collection: 'cases',
      data: {
        title: 'Кейс «Росток»',
        slug: 'sprout-case',
        summary: 'Заглушка донат-кейса. Состав снимем с игры.',
        body: 'Названия наград появятся после скрина из донат-раздела. Шансы выпадения не выдумываем.',
        openPrice: 499,
        contents: 'Винил, диски, анимация (список позже)',
      },
    }),
    payload.create({
      collection: 'cases',
      data: {
        title: 'Кейс «Урожай»',
        slug: 'harvest-case',
        summary: 'Более дорогой кейс — тоже заглушка.',
        body: 'Когда заполним — сравним цену открытия с ожидаемым дропом.',
        openPrice: 999,
        contents: 'Транспорт / обвесы (список позже)',
      },
    }),
    payload.create({
      collection: 'guides',
      data: {
        title: 'Как начать играть',
        slug: 'how-to-start',
        summary: 'Majestic ID, Legacy, лаунчер, выбор сервера.',
        body: '1) Создайте Majestic ID.\n2) Установите GTA V Legacy и один раз запустите.\n3) Поставьте Majestic Launcher и войдите.\n4) Выберите сервер Россия Онлайн.\n\nПодробные скрины добавим. Пока это каркас гайда.',
        level: 'novice',
        readTime: 7,
        featured: true,
      },
    }),
    payload.create({
      collection: 'guides',
      data: {
        title: 'Первые деньги',
        slug: 'first-money',
        summary: 'Что фармить в первые часы, чтобы не топтаться на месте.',
        body: 'Стартовые работы → короткие цели → первая машина под смены.\nСчитайте успех не по «красивому скрину», а по стабильному доходу в час.',
        level: 'novice',
        readTime: 8,
        featured: true,
      },
    }),
    payload.create({
      collection: 'guides',
      data: {
        title: 'Ритм смены',
        slug: 'farm-shift',
        summary: 'Подготовка, рейсы, фиксация результата.',
        body: 'Перед сменой: бензин, ремонт, маршрут.\nВ смене: минимум простоев.\nПосле: сколько в час чистыми — и что улучшить завтра.\n\nСюда позже попадут реальные цифры с сессий.',
        level: 'mid',
        readTime: 10,
        featured: true,
      },
    }),
    payload.create({
      collection: 'guides',
      data: {
        title: 'Путь новичка (обзор)',
        slug: 'newbie-path-overview',
        summary: 'Каркас стартовой цепочки — главы заполним по ходу.',
        body: 'Официальный «Путь новичка» разберём по главам. Сейчас — заглушка раздела, чтобы видеть структуру вики.',
        level: 'novice',
        readTime: 5,
        featured: false,
      },
    }),
    payload.create({
      collection: 'laws',
      data: {
        title: 'Общие правила (кратко)',
        slug: 'general-rules-stub',
        summary: 'Скоро полный текст с форума. Пока — напоминание.',
        body: 'Играйте в персонажа, уважайте RP-процесс, не используйте nonRP-ники.\nПолные пункты перенесём дословно и разложим по разделам.',
        kind: 'rule',
        server: 'all',
      },
    }),
    payload.create({
      collection: 'laws',
      data: {
        title: 'ПДД — черновик',
        slug: 'traffic-rules-stub',
        summary: 'Знаки, скорость, штрафы — раздел в работе.',
        body: 'Сюда попадёт практичный разбор для тех, кто много за рулём на сменах.',
        kind: 'law',
        server: 'all',
      },
    }),
    payload.create({
      collection: 'updates',
      data: {
        title: 'Запуск Фурионов Вики',
        slug: 'wiki-launch',
        summary: 'Каркас сайта, админка и заглушки разделов.',
        body: 'Появились разделы транспорта, работ, гайдов и остальных каталогов. Контент будем наполнять реальными цифрами со смен.',
        kind: 'feature',
        publishedAt: '2026-10-02',
      },
    }),
    payload.create({
      collection: 'updates',
      data: {
        title: 'Демо-статьи разделов',
        slug: 'demo-stubs',
        summary: 'Добавлены заглушки, чтобы увидеть навигацию.',
        body: 'Все тексты помечены как заглушки. Редактируйте их в /admin.',
        kind: 'added',
        publishedAt: '2026-10-02',
      },
    }),
  ])

  payload.logger.info('Stub content ready.')
}

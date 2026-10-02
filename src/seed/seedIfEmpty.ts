import type { Payload } from 'payload'

export async function seedIfEmpty(payload: Payload) {
  const existing = await payload.find({
    collection: 'guides',
    limit: 1,
    depth: 0,
  })

  if (existing.totalDocs > 0) {
    return
  }

  payload.logger.info('Seeding stub content for Фурионовы Вики…')

  await Promise.all([
    payload.create({
      collection: 'vehicles',
      data: {
        title: 'Лада Гранта',
        slug: 'lada-granta',
        summary: 'Стартовый эконом для поездок на смены. Заглушка — цифры уточним.',
        body: 'Базовый транспорт для новичка-фармлинга. Хватает, чтобы доехать до работы и обратно, пока копите на что-то шустрее.',
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
        body: 'Когда смена требует объёма — фармлинги берут «Газель». Подробные маршруты и расход добавим позже.',
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
        body: 'Красиво едет, дорого стоит. В вики семьи отметим, когда машина реально окупается относительно фарма.',
        vehicleClass: 'sport',
        price: 8500000,
        topSpeed: 250,
        trunk: 25,
        howToGet: 'Автосалон / кейс',
      },
    }),
    payload.create({
      collection: 'jobs',
      data: {
        title: 'Сбор ягод',
        slug: 'berry-picking',
        summary: 'Первая легальная смена. Мало, но стабильно.',
        body: 'Классика для 1 уровня. Не геройство — разминка перед нормальным фармом.',
        incomePerHour: '8–12 тыс. ₽',
        requiredLevel: 1,
        legal: true,
        farmTip: 'Берите пока учитесь карте. Как только откроется почта или стройка — переключайтесь.',
      },
    }),
    payload.create({
      collection: 'jobs',
      data: {
        title: 'Дальнобойщик',
        slug: 'trucker',
        summary: 'Основной фарм Фурионовых: рейсы, мультипликаторы, дисциплина.',
        body: 'Долгие рейсы, хороший доход при правильном ритме. Здесь позже будут таблицы маршрутов и бонусов.',
        incomePerHour: '45–70 тыс. ₽',
        requiredLevel: 10,
        legal: true,
        farmTip: 'Считайте не «рейс», а «час чистого фарма». Премиум и группа — почти всегда плюс.',
      },
    }),
    payload.create({
      collection: 'jobs',
      data: {
        title: 'Таксист',
        slug: 'taxi',
        summary: 'Гибкая смена между рейсами.',
        body: 'Удобно закрывать короткое окно онлайна. Цифры дохода — заглушка, снимем с экрана позже.',
        incomePerHour: '25–40 тыс. ₽',
        requiredLevel: 3,
        legal: true,
        farmTip: 'Берите пиковые часы. Пустые круги по городу — враг фармлинга.',
      },
    }),
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
        body: 'Фармлинг без канистры — это пешая прогулка до АЗС.',
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
        body: '1) Создайте Majestic ID.\n2) Установите GTA V Legacy и один раз запустите.\n3) Поставьте Majestic Launcher и войдите.\n4) Выберите сервер Россия Онлайн.\n\nПодробные скрины добавим. Пока это каркас гайда семьи.',
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
        body: 'Стартовые работы → короткие цели → первая машина под смены.\nФурионовы считают успех не по «красивому скрину», а по стабильному доходу в час.',
        level: 'novice',
        readTime: 8,
        featured: true,
      },
    }),
    payload.create({
      collection: 'guides',
      data: {
        title: 'Смена фармлинга',
        slug: 'farmling-shift',
        summary: 'Ритм смены: подготовка, рейсы, фиксация результата.',
        body: 'Перед сменой: бензин, ремонт, маршрут.\nВ смене: минимум простоев.\nПосле: сколько в час чистыми — и что улучшить завтра.\n\nЭто ядро вики Фурионовых — сюда будут реальные цифры с наших сессий.',
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
      collection: 'family-members',
      data: {
        name: 'Фурионов (основатель)',
        slug: 'founder',
        role: 'Глава семьи',
        summary: 'Тот, кто задаёт темп фарма и держит вики в порядке.',
        body: 'Семья Фурионовых — про заработок, дисциплину смен и полезные гайды, которых не хватает на официале.',
        status: 'active',
        specialty: 'Планирование фарма',
      },
    }),
    payload.create({
      collection: 'family-members',
      data: {
        name: 'Слот фармлинга',
        slug: 'open-slot',
        role: 'Новичок семьи',
        summary: 'Место открыто: приходи, если готов фармить, а не просто числиться.',
        body: 'Правила набора и голосовой/дискорд добавим. Пока — заглушка «мы набираем».',
        status: 'recruiting',
        specialty: 'Любая легальная смена',
      },
    }),
    payload.create({
      collection: 'updates',
      data: {
        title: 'Запуск Фурионовы Вики',
        slug: 'wiki-launch',
        summary: 'Каркас сайта, админка и заглушки разделов.',
        body: 'Появились разделы транспорта, работ, гайдов, семьи и остальных каталогов. Контент будем наполнять реальными цифрами со смен.',
        kind: 'feature',
        publishedAt: '2026-10-02',
      },
    }),
    payload.create({
      collection: 'updates',
      data: {
        title: 'Сиды фармлингов',
        slug: 'farmling-stubs',
        summary: 'Добавлены демо-статьи, чтобы увидеть навигацию.',
        body: 'Все тексты помечены как заглушки. Редактируйте их в /admin.',
        kind: 'added',
        publishedAt: '2026-10-02',
      },
    }),
  ])

  payload.logger.info('Stub content ready.')
}

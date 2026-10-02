# Фурионовы Вики

Неофициальная вики семьи **Фурионовых** по игре «Россия Онлайн» (GTA 5 RP / Majestic).  
Фокус — фарм, смены и практичные гайды. Участников семьи зовём **фармлингами**.

Стек: Next.js + Payload CMS 3 + SQLite + Tailwind.

## Быстрый старт

```bash
pnpm install
cp .env.example .env
pnpm dev
```

- Сайт: [http://localhost:3000](http://localhost:3000)
- Админка: [http://localhost:3000/admin](http://localhost:3000/admin) — создайте первого пользователя при первом входе

При первом запуске Payload сам засеет stub-контент (транспорт, работы, гайды, семья и т.д.).

Повторный сид вручную:

```bash
pnpm seed
```

## Редактирование контента

В `/admin` доступны коллекции:

- Транспорт, Работы, Предметы, Места, Кейсы
- Гайды, Законы и правила
- Семья / Фармлинги
- Обновления, Media, Users

## Переменные окружения

См. `.env.example`:

- `DATABASE_URL` — SQLite (`file:./furionov-wiki.db`)
- `PAYLOAD_SECRET` — длинный секрет
- `NEXT_PUBLIC_SERVER_URL` — URL сайта

## Дисклеймер

Неофициальный фан-проект семьи. Не аффилирован с Take-Two Interactive, Rockstar Games, Majestic и правообладателями.

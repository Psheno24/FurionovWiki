# Фурионов Вики

Неофициальная вики по игре **Россия Онлайн** (GTA 5 RP / Majestic).  
Фокус — фарм, смены и практичные гайды.

Стек: Next.js + Payload CMS 3 + SQLite + Tailwind.

## Быстрый старт (локально)

```bash
pnpm install
cp .env.example .env
# для локалки поставьте NEXT_PUBLIC_SERVER_URL=http://localhost:3000
pnpm dev
```

- Сайт: http://localhost:3000
- Админка: http://localhost:3000/admin — создайте первого пользователя при первом входе

При первом запуске Payload засеет stub-контент.

## Деплой на VPS (`wiki.mysitehub.ru` / `79.137.197.220`)

1. DNS: `A`-запись `wiki.mysitehub.ru` → `79.137.197.220`
2. На сервере:

```bash
git clone https://github.com/Psheno24/FurionovWiki.git
cd FurionovWiki
cp .env.example .env
# задайте длинный PAYLOAD_SECRET
docker compose up -d --build
```

3. Nginx: скопируйте [`deploy/nginx.wiki.mysitehub.ru.conf`](deploy/nginx.wiki.mysitehub.ru.conf) в sites-available и включите сайт.
4. SSL (по желанию): `certbot --nginx -d wiki.mysitehub.ru`

Контент и медиа живут в Docker volumes `wiki-data` / `wiki-media`.

## Редактирование

В `/admin`: транспорт, работы, предметы, места, кейсы, гайды, законы, обновления, media, users.

## Дисклеймер

Неофициальный фан-проект. Не аффилирован с Take-Two Interactive, Rockstar Games, Majestic и правообладателями.

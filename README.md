# ClipLoad — Cloudflare Workers

Проект Next.js с адаптером OpenNext для Cloudflare Workers.

## Публикация через GitHub + Cloudflare

1. Распакуйте архив.
2. Загрузите **содержимое папки** в ваш GitHub-репозиторий `clipload` (в корень репозитория).
3. Откройте https://dash.cloudflare.com/ и войдите в аккаунт.
4. Перейдите в **Workers & Pages → Create → Import a repository** (названия пунктов интерфейса могут немного отличаться).
5. Подключите GitHub, выберите репозиторий `clipload`.
6. Для Next.js Workers выберите конфигурацию по Wrangler-файлу в репозитории. Если Cloudflare предложит автоматически определить фреймворк, проверьте, что используется OpenNext.
7. После установки зависимостей Cloudflare соберёт и опубликует Worker. Публичный адрес будет вида `https://clipload.<ваш-поддомен>.workers.dev`.

## Локальная публикация (альтернатива)

Требуется Node.js 20+:
```bash
npm install
npx wrangler login
npm run preview
npm run deploy
```

## Что уже работает

- Адаптивный интерфейс ClipLoad.
- Переключатель MP4 / MP3.
- Серверная проверка домена YouTube и формата запроса.

## Чего пока нет

Этот проект пока **не скачивает и не конвертирует** ролики YouTube. API честно сообщает пользователю о доступных официальных способах получить собственный контент через YouTube Studio. Cloudflare Workers — хостинг приложения, а не видеоконвертер; у Workers есть ограничения по CPU и ресурсам. Соблюдайте условия YouTube и права правообладателей.

## Документация

- Cloudflare: https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/
- Workers Free limits: https://developers.cloudflare.com/workers/platform/limits/

# ClipLoad — Cloudflare Workers

ClipLoad — небольшой Next.js-сайт для проверки YouTube-ссылок и локального сохранения готовых MP4-файлов.

## Возможности

- Проверяет формат YouTube-ссылки на сервере.
- Для собственных роликов показывает официальный путь скачивания через YouTube Studio.
- Позволяет выбрать готовый файл `.mp4` на устройстве, задать имя и сохранить его под новым именем.
- Локальный MP4-файл не загружается на сервер: браузер создаёт временную ссылку на выбранный файл.

## Ограничения

- ClipLoad не скачивает и не извлекает видео непосредственно с YouTube.
- ClipLoad не обходит ограничения YouTube и не скачивает чужие видео.
- Локальный инструмент пока принимает только готовые файлы `.mp4`. Он не конвертирует MP3, MOV, WebM или другие форматы в MP4.

## Публикация через GitHub + Cloudflare

Для существующего Cloudflare Worker достаточно заменить файлы проекта в корне GitHub-репозитория и отправить commit. Существующие настройки сборки оставьте такими:

- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx opennextjs-cloudflare deploy`

Cloudflare должен устанавливать зависимости из `package.json`. В проекте используется Next.js 16 и React 19.

## Локальный запуск

Требуется Node.js 20+:

```bash
npm install
npm run dev
```

## Публикация вручную

```bash
npm install
npx wrangler login
npm run preview
npm run deploy
```

## Технологии

- Next.js 16
- React 19
- OpenNext for Cloudflare
- Cloudflare Workers

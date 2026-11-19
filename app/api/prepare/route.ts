import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const raw = body?.url;

  if (typeof raw !== 'string' || raw.length > 2048) {
    return NextResponse.json({message: 'Введите корректную ссылку YouTube.'}, {status: 400});
  }

  let parsed: URL;
  try {
    parsed = new URL(raw.trim());
  } catch {
    return NextResponse.json({message: 'Введите полную ссылку, начинающуюся с https://'}, {status: 400});
  }

  const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
  const isYoutube = host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtu.be' || host === 'youtube-nocookie.com';
  const hasVideoId = host === 'youtu.be'
    ? parsed.pathname.length > 1
    : Boolean(parsed.searchParams.get('v') || parsed.pathname.startsWith('/shorts/') || parsed.pathname.startsWith('/live/'));

  if (parsed.protocol !== 'https:' || !isYoutube || !hasVideoId) {
    return NextResponse.json({message: 'Ссылка не распознана. Подойдут ссылки на youtube.com/watch, youtu.be, Shorts или трансляции YouTube.'}, {status: 400});
  }

  return NextResponse.json({
    message: 'Ссылка YouTube распознана. ClipLoad не извлекает видео с YouTube. Если это ваш ролик: откройте YouTube Studio → Контент → меню ⋮ рядом с видео → Скачать. После этого вы сможете выбрать MP4-файл в блоке ниже.',
    studioUrl: 'https://studio.youtube.com/',
  });
}

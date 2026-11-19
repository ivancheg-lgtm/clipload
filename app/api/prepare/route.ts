import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  const body = await req.json().catch(()=>null);
  const raw = body?.url;
  const format = body?.format;
  if (typeof raw !== 'string' || raw.length > 2048 || !['mp4','mp3'].includes(format)) {
    return NextResponse.json({message:'Проверьте ссылку и выбранный формат.'},{status:400});
  }
  let parsed: URL;
  try { parsed = new URL(raw); } catch {
    return NextResponse.json({message:'Введите корректную ссылку.'},{status:400});
  }
  const host = parsed.hostname.toLowerCase().replace(/^www\./,'');
  if (!['youtube.com','m.youtube.com','youtu.be'].includes(host)) {
    return NextResponse.json({message:'Поддерживаются ссылки youtube.com и youtu.be.'},{status:400});
  }
  return NextResponse.json({
    message: format === 'mp4'
      ? 'Ссылка распознана. Для собственных роликов скачайте исходный файл через YouTube Studio → Контент → меню ролика → Скачать. Сервис пока не выполняет извлечение видео из YouTube.'
      : 'Ссылка распознана. Для собственных роликов получите исходный файл через YouTube Studio. Конвертация в MP3 пока не подключена.'
  });
}
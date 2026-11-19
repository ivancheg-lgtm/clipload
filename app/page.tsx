'use client';

import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

type PrepareResponse = {
  message?: string;
  studioUrl?: string;
};

function safeBaseName(value: string) {
  return value
    .replace(/\.mp4$/i, '')
    .replace(/[\\/:*?"<>|\u0000-\u001f]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 100);
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [studioUrl, setStudioUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [downloadName, setDownloadName] = useState('');

  const fileSize = useMemo(() => {
    if (!file) return '';
    const mb = file.size / (1024 * 1024);
    return mb >= 1024 ? `${(mb / 1024).toFixed(2)} ГБ` : `${mb.toFixed(1)} МБ`;
  }, [file]);

  async function checkYoutube() {
    setBusy(true);
    setStatus('');
    setStudioUrl('');
    try {
      const response = await fetch('/api/prepare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, format: 'mp4' }),
      });
      const data = (await response.json()) as PrepareResponse;
      setStatus(data.message || 'Запрос обработан.');
      setStudioUrl(response.ok ? data.studioUrl || '' : '');
    } catch {
      setStatus('Не удалось связаться с сервером. Проверьте подключение и попробуйте ещё раз.');
    } finally {
      setBusy(false);
    }
  }

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    setFileError('');
    setFile(null);
    setDownloadName('');

    if (!selected) return;
    if (!selected.name.toLowerCase().endsWith('.mp4')) {
      setFileError('Пока поддерживаются только файлы с расширением .mp4. Другие форматы не конвертируются.');
      event.target.value = '';
      return;
    }
    if (selected.size === 0) {
      setFileError('Выбран пустой файл.');
      event.target.value = '';
      return;
    }

    setFile(selected);
    setDownloadName(safeBaseName(selected.name) || 'video');
  }

  function downloadFile() {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = `${safeBaseName(downloadName) || 'video'}.mp4`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  }

  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="#"><span className="logo">▶</span> ClipLoad</a>
        <span className="navTag">YOUTUBE · MP4</span>
      </nav>

      <section className="hero">
        <div className="eyebrow"><span className="pulse" /> ПРОСТО. ПОНЯТНО. БЕЗ ЛИШНИХ ЗАГРУЗОК.</div>
        <h1>Твои видео.<br /><em>Твой контроль.</em></h1>
        <p className="sub">Получай собственные ролики через YouTube Studio или сохраняй готовые MP4-файлы прямо на устройстве.</p>

        <div className="panel">
          <div className="sectionHead"><span className="step">01</span><div><h2>Свой ролик на YouTube</h2><p>Проверим ссылку и подскажем официальный способ скачать оригинал.</p></div></div>
          <label htmlFor="youtube-url">ССЫЛКА НА YOUTUBE</label>
          <div className="urlbox"><span className="linkIcon">↗</span><input id="youtube-url" value={url} onChange={event => setUrl(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && url.trim() && !busy) void checkYoutube(); }} placeholder="https://www.youtube.com/watch?v=..." /></div>
          <button className="submit" disabled={!url.trim() || busy} onClick={checkYoutube}>{busy ? 'Проверяем…' : 'Проверить ссылку'} <span>→</span></button>
          {status && <div className="status" role="status">{status}{studioUrl && <a className="studioLink" href={studioUrl} target="_blank" rel="noreferrer">Открыть YouTube Studio ↗</a>}</div>}

          <div className="sectionDivider" />

          <div className="sectionHead"><span className="step">02</span><div><h2>Готовый MP4-файл</h2><p>Сохрани MP4 с устройства под нужным именем. Файл не отправляется на сервер.</p></div></div>
          <label htmlFor="mp4-file">ВЫБЕРИ MP4-ФАЙЛ</label>
          <input className="fileInput" id="mp4-file" type="file" accept=".mp4,video/mp4" onChange={selectFile} />
          {file && <div className="fileDetails"><div><strong>{file.name}</strong><small>{fileSize}</small></div><span className="fileOk">Готов</span></div>}
          {file && <>
            <label htmlFor="download-name" className="nameLabel">ИМЯ ФАЙЛА</label>
            <div className="nameBox"><input id="download-name" value={downloadName} onChange={event => setDownloadName(event.target.value)} maxLength={100} /><span>.mp4</span></div>
            <button className="downloadButton" onClick={downloadFile}>Скачать MP4 <span>↓</span></button>
          </>}
          {fileError && <div className="error" role="alert">{fileError}</div>}
          <p className="fine">Используйте только материалы, на которые у вас есть права или разрешение на скачивание.</p>
        </div>

        <div className="features"><div><b>01</b><span>Проверка YouTube-ссылок</span></div><div><b>02</b><span>Локальная работа с MP4</span></div><div><b>03</b><span>Файлы не уходят на сервер</span></div></div>
      </section>

      <footer><span>© 2026 ClipLoad</span><span>Сервис не связан с YouTube.</span></footer>
    </main>
  );
}

'use client';
import {useState} from 'react';

export default function Home() {
  const [url,setUrl] = useState('');
  const [format,setFormat] = useState('mp4');
  const [status,setStatus] = useState('');
  const [busy,setBusy] = useState(false);

  async function prepare() {
    setBusy(true); setStatus('');
    try {
      const r = await fetch('/api/prepare',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url,format})});
      const data = await r.json();
      setStatus(data.message || 'Запрос обработан.');
    } catch {
      setStatus('Не удалось связаться с сервером. Попробуйте позже.');
    } finally { setBusy(false); }
  }

  return <main className="shell">
    <nav className="nav"><a className="brand" href="#"><span className="logo">▶</span> ClipLoad</a><span className="navTag">VIDEO TOOLS</span></nav>
    <section className="hero">
      <div className="eyebrow"><span className="pulse"/> ПРОСТО. БЫСТРО. УДОБНО.</div>
      <h1>Твои видео.<br/><em>Твои форматы.</em></h1>
      <p className="sub">Вставь ссылку, выбери формат и получи понятную инструкцию для разрешённой загрузки.</p>
      <div className="panel">
        <label htmlFor="url">ССЫЛКА НА YOUTUBE</label>
        <div className="urlbox"><span className="linkIcon">↗</span><input id="url" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." /></div>
        <label>ФОРМАТ</label>
        <div className="formats">
          <button className={format==='mp4'?'choice active':'choice'} onClick={()=>setFormat('mp4')}><b>▣</b><span>MP4</span><small>Видео</small></button>
          <button className={format==='mp3'?'choice active':'choice'} onClick={()=>setFormat('mp3')}><b>♫</b><span>MP3</span><small>Аудио</small></button>
        </div>
        <button className="submit" disabled={!url.trim() || busy} onClick={prepare}>{busy?'Проверяем…':'Продолжить'} <span>→</span></button>
        {status && <div className="status" role="status">{status}</div>}
        <p className="fine">Используйте только материалы, которые принадлежат вам или на скачивание которых у вас есть разрешение.</p>
      </div>
      <div className="features"><div><b>01</b><span>Простой интерфейс</span></div><div><b>02</b><span>MP4 и MP3</span></div><div><b>03</b><span>Для любого экрана</span></div></div>
    </section>
    <footer><span>© 2026 ClipLoad</span><span>Сервис не связан с YouTube.</span></footer>
  </main>;
}
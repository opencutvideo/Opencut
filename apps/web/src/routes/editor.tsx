import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect, useCallback } from 'react'

export const Route = createFileRoute('/editor')({ component: Editor })

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(s: number): string {
  if (!isFinite(s)) return '0:00.0'
  const m = Math.floor(s / 60)
  const sec = (s % 60).toFixed(1).padStart(4, '0')
  return `${m}:${sec}`
}

// ── Editor ───────────────────────────────────────────────────────────────────

export default function Editor() {
  // video state
  const [videoUrl, setVideoUrl]       = useState<string | null>(null)
  const [fileName, setFileName]       = useState('')
  const [duration, setDuration]       = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying]     = useState(false)
  const [volume, setVolume]           = useState(1)
  const [muted, setMuted]             = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  // trim state
  const [trimIn, setTrimIn]   = useState(0)
  const [trimOut, setTrimOut] = useState(0)

  // interaction state
  const [isDragOver, setIsDragOver]     = useState(false)
  const [dragging, setDragging]         = useState<'playhead' | 'in' | 'out' | null>(null)
  const [isExporting, setIsExporting]   = useState(false)
  const [exportPct, setExportPct]       = useState(0)
  const [exportDone, setExportDone]     = useState(false)
  const [exportError, setExportError]   = useState('')

  // refs
  const videoRef    = useRef<HTMLVideoElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const animRef      = useRef<number>(0)

  // ── Import ────────────────────────────────────────────────────────────────

  const importFile = useCallback((file: File) => {
    if (!file.type.startsWith('video/')) return
    setVideoUrl(prev => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(file) })
    setFileName(file.name)
    setCurrentTime(0)
    setTrimIn(0)
    setTrimOut(0)
    setIsPlaying(false)
    setExportDone(false)
    setExportError('')
  }, [])

  // ── Video events ──────────────────────────────────────────────────────────

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onMeta  = () => { setDuration(v.duration); setTrimOut(v.duration) }
    const onTime  = () => setCurrentTime(v.currentTime)
    const onPlay  = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    return () => {
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
    }
  }, [videoUrl])

  // Stop playback at trimOut
  useEffect(() => {
    const v = videoRef.current
    if (!v || !isPlaying) return
    if (currentTime >= trimOut) {
      v.pause()
      v.currentTime = trimOut
    }
  }, [currentTime, trimOut, isPlaying])

  // ── Play / Pause ──────────────────────────────────────────────────────────

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (isPlaying) { v.pause(); return }
    if (v.currentTime >= trimOut - 0.05) v.currentTime = trimIn
    v.play()
  }, [isPlaying, trimIn, trimOut])

  // ── Volume ────────────────────────────────────────────────────────────────

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.volume = volume
    v.muted  = muted
  }, [volume, muted])

  // ── Playback rate ─────────────────────────────────────────────────────────

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.playbackRate = playbackRate
  }, [playbackRate])

  // ── Timeline helpers ──────────────────────────────────────────────────────

  const pxToTime = useCallback((clientX: number) => {
    const el = timelineRef.current
    if (!el || duration === 0) return 0
    const r = el.getBoundingClientRect()
    return Math.max(0, Math.min(duration, ((clientX - r.left) / r.width) * duration))
  }, [duration])

  // ── Global pointer move / up for drag ─────────────────────────────────────

  useEffect(() => {
    if (!dragging) return

    const onMove = (e: PointerEvent) => {
      const t = pxToTime(e.clientX)
      const v = videoRef.current
      if (dragging === 'playhead') {
        const c = Math.max(trimIn, Math.min(trimOut, t))
        if (v) v.currentTime = c
        setCurrentTime(c)
      } else if (dragging === 'in') {
        const c = Math.max(0, Math.min(trimOut - 0.1, t))
        setTrimIn(c)
        if (v && v.currentTime < c) v.currentTime = c
      } else {
        const c = Math.max(trimIn + 0.1, Math.min(duration, t))
        setTrimOut(c)
      }
    }

    const onUp = () => setDragging(null)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup',   onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup',   onUp)
    }
  }, [dragging, trimIn, trimOut, duration, pxToTime])

  // Click on timeline to seek
  const onTimelineClick = useCallback((e: React.MouseEvent) => {
    if (dragging) return
    const t = pxToTime(e.clientX)
    const c = Math.max(trimIn, Math.min(trimOut, t))
    const v = videoRef.current
    if (v) v.currentTime = c
    setCurrentTime(c)
  }, [dragging, pxToTime, trimIn, trimOut])

  // ── Keyboard shortcuts ────────────────────────────────────────────────────

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const v = videoRef.current
      if (!v) return
      if (e.code === 'Space') { e.preventDefault(); togglePlay() }
      if (e.code === 'KeyI')  { setTrimIn(currentTime) }
      if (e.code === 'KeyO')  { setTrimOut(currentTime) }
      if (e.code === 'ArrowLeft')  { const t = Math.max(trimIn,  currentTime - 1/30); v.currentTime = t; setCurrentTime(t) }
      if (e.code === 'ArrowRight') { const t = Math.min(trimOut, currentTime + 1/30); v.currentTime = t; setCurrentTime(t) }
      if (e.code === 'KeyM')  { setMuted(m => !m) }
      // J/K/L — standard NLE speed controls
      if (e.code === 'KeyL') { e.preventDefault(); setPlaybackRate(r => { const next = r <= 0 ? 1 : Math.min(r * 2, 8); v.playbackRate = next; if (!isPlaying) v.play(); return next }) }
      if (e.code === 'KeyJ') { e.preventDefault(); setPlaybackRate(r => { const next = r >= 0 ? -1 : Math.max(r * 2, -8); v.playbackRate = Math.abs(next); if (!isPlaying) v.play(); return Math.abs(next) }) }
      if (e.code === 'KeyK') { e.preventDefault(); v.pause(); setPlaybackRate(1); v.playbackRate = 1 }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [togglePlay, currentTime, trimIn, trimOut])

  // ── Export via captureStream ──────────────────────────────────────────────

  const exportVideo = useCallback(async () => {
    const v = videoRef.current
    if (!v || isExporting) return
    setIsExporting(true)
    setExportPct(0)
    setExportError('')
    setExportDone(false)

    try {
      const stream: MediaStream =
        (v as any).captureStream?.() ?? (v as any).mozCaptureStream?.()
      if (!stream) throw new Error('captureStream not supported. Please use Chrome or Edge.')

      const mimeType = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm']
        .find(t => MediaRecorder.isTypeSupported(t)) ?? ''
      if (!mimeType) throw new Error('MediaRecorder not supported in this browser.')

      const chunks: Blob[] = []
      const rec = new MediaRecorder(stream, { mimeType })
      rec.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data) }

      const trimDur = trimOut - trimIn

      rec.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType })
        const url  = URL.createObjectURL(blob)
        const a    = document.createElement('a')
        a.href     = url
        a.download = fileName.replace(/\.[^.]+$/, '') + '-trimmed.webm'
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
        setIsExporting(false)
        setExportPct(0)
        setExportDone(true)
      }

      // Seek to in-point then start
      v.pause()
      v.currentTime = trimIn
      await new Promise<void>(res => { v.onseeked = () => res() })
      rec.start(100)
      v.play()

      const onTU = () => {
        const elapsed = v.currentTime - trimIn
        setExportPct(Math.min(99, (elapsed / trimDur) * 100))
        if (v.currentTime >= trimOut - 0.05) {
          v.removeEventListener('timeupdate', onTU)
          v.pause()
          rec.stop()
        }
      }
      v.addEventListener('timeupdate', onTU)

    } catch (err: any) {
      setExportError(String(err?.message ?? err))
      setIsExporting(false)
    }
  }, [isExporting, trimIn, trimOut, fileName])

  // ── Derived values ────────────────────────────────────────────────────────

  const inPct   = duration > 0 ? (trimIn  / duration) * 100 : 0
  const outPct  = duration > 0 ? (trimOut / duration) * 100 : 100
  const playPct = duration > 0 ? (currentTime / duration) * 100 : 0

  // ── Empty / import state ──────────────────────────────────────────────────

  if (!videoUrl) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-12">
        <input
          ref={fileInputRef} type="file" accept="video/*" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) importFile(f); e.target.value = '' }}
        />

        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setIsDragOver(true) }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={e => { e.preventDefault(); setIsDragOver(false); const f = e.dataTransfer.files[0]; if (f) importFile(f) }}
          onClick={() => fileInputRef.current?.click()}
          className={[
            'w-full max-w-lg rounded-2xl border-2 border-dashed p-14 flex flex-col items-center gap-5 cursor-pointer transition-all duration-150 select-none',
            isDragOver ? 'border-white/50 bg-white/6' : 'border-white/15 hover:border-white/30 hover:bg-white/[0.02]',
          ].join(' ')}
        >
          <div className="w-14 h-14 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-white font-semibold mb-1">{isDragOver ? 'Drop to import' : 'Import a video'}</p>
            <p className="text-sm text-muted-foreground">Drag and drop, or click to browse</p>
            <p className="text-xs text-muted-foreground mt-1 opacity-50">MP4, MOV, WebM, MKV — anything your browser supports</p>
          </div>
        </div>

        {/* Keyboard shortcuts */}
        <div className="mt-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-2 justify-center text-xs text-muted-foreground opacity-50">
          {[['Space', 'Play / Pause'], ['I', 'Set In point'], ['O', 'Set Out point'], ['← →', 'Step frame'], ['M', 'Mute']].map(([k, v]) => (
            <span key={k}><kbd className="font-mono bg-white/5 border border-white/10 rounded px-1 py-0.5 mr-1">{k}</kbd>{v}</span>
          ))}
        </div>
      </div>
    )
  }

  // ── Main editor ───────────────────────────────────────────────────────────

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-[#0a0a0a]">

      {/* ── Topbar ── */}
      <div className="border-b border-white/8 px-4 h-12 flex items-center justify-between gap-4 shrink-0 bg-[#0d0d0d]">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => { setVideoUrl(null); cancelAnimationFrame(animRef.current) }}
            className="p-1 rounded text-muted-foreground hover:text-white transition-colors shrink-0"
            title="Close file"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M10 5L5 10M5 5l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          <span className="text-sm text-muted-foreground truncate max-w-[180px] sm:max-w-xs">{fileName}</span>
          <span className="hidden sm:block text-xs text-muted-foreground opacity-40 tabular-nums">
            {fmt(trimOut - trimIn)} selected
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <input
            ref={fileInputRef} type="file" accept="video/*" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) importFile(f); e.target.value = '' }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs text-muted-foreground border border-white/10 rounded-md px-3 py-1.5 hover:border-white/20 hover:text-white transition-colors"
          >
            Import
          </button>
          <button
            onClick={exportVideo}
            disabled={isExporting}
            className="relative text-xs font-semibold bg-white text-black px-4 py-1.5 rounded-md hover:bg-white/90 transition-colors disabled:opacity-60 flex items-center gap-1.5 min-w-[84px] justify-center overflow-hidden"
          >
            {isExporting ? (
              <>
                <div
                  className="absolute inset-0 bg-black/10 origin-left transition-transform duration-100"
                  style={{ transform: `scaleX(${exportPct / 100})` }}
                />
                <svg className="animate-spin relative z-10" width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
                  <path d="M10.5 6A4.5 4.5 0 006 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="relative z-10">{Math.round(exportPct)}%</span>
              </>
            ) : exportDone ? (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Saved
              </>
            ) : 'Export .webm'}
          </button>
        </div>
      </div>

      {exportError && (
        <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-2 text-xs text-red-400 flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
            <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6 3.5V6.5M6 8h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {exportError}
          <button onClick={() => setExportError('')} className="ml-auto hover:text-red-300">✕</button>
        </div>
      )}

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">

        {/* Video preview */}
        <div className="flex-1 flex flex-col items-center justify-center bg-black p-4 md:p-6 min-h-[220px]">
          <video
            ref={videoRef}
            src={videoUrl}
            className="max-w-full rounded-md shadow-2xl"
            style={{ maxHeight: 'calc(100vh - 24rem)', cursor: 'pointer' }}
            onClick={togglePlay}
            playsInline
          />

          {/* Controls */}
          <div className="mt-4 flex items-center gap-3 text-muted-foreground">
            {/* Go to In */}
            <button
              onClick={() => { const v = videoRef.current; if (v) { v.currentTime = trimIn; setCurrentTime(trimIn) }}}
              title="Jump to In point" className="hover:text-white transition-colors p-1"
            >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M3.5 3.5v10M13.5 3.5L7.5 8.5l6 5V3.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full border border-white/18 flex items-center justify-center hover:bg-white/8 hover:text-white transition-all"
            >
              {isPlaying ? (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="2" y="1.5" width="3.5" height="10" rx="1" fill="currentColor" />
                  <rect x="7.5" y="1.5" width="3.5" height="10" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M3.5 2L11.5 6.5 3.5 11V2z" fill="currentColor" />
                </svg>
              )}
            </button>

            {/* Go to Out */}
            <button
              onClick={() => { const v = videoRef.current; if (v) { v.currentTime = trimOut; setCurrentTime(trimOut) }}}
              title="Jump to Out point" className="hover:text-white transition-colors p-1"
            >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M13.5 3.5v10M3.5 3.5l6 5-6 5V3.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Mute */}
            <button onClick={() => setMuted(m => !m)} className="hover:text-white transition-colors p-1 ml-1" title="Mute (M)">
              {muted ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M9 3L5 6H2v4h3l4 3V3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13 5l-4 6M9 5l4 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M9 3L5 6H2v4h3l4 3V3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 5.5a3.5 3.5 0 010 5M13.5 4a6 6 0 010 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              )}
            </button>

            {/* Volume */}
            <input
              type="range" min={0} max={1} step={0.02} value={muted ? 0 : volume}
              onChange={e => { setVolume(+e.target.value); setMuted(false) }}
              className="w-16 accent-white cursor-pointer"
            />

            {/* Time */}
            <span className="ml-2 text-sm tabular-nums text-white/55 hidden sm:block">
              {fmt(currentTime)}<span className="opacity-40 mx-1">/</span>{fmt(duration)}
            </span>
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:w-52 border-t lg:border-t-0 lg:border-l border-white/8 p-4 flex flex-col gap-5 text-xs shrink-0 bg-[#0d0d0d]">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3">Clip info</p>
            <div className="space-y-2.5">
              {[
                ['Total', fmt(duration)],
                ['Trimmed', fmt(trimOut - trimIn)],
                ['Current', fmt(currentTime)],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between">
                  <span className="text-muted-foreground">{l}</span>
                  <span className="text-white tabular-nums">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3">Trim points</p>
            <div className="space-y-2.5 mb-4">
              {[['In', fmt(trimIn)], ['Out', fmt(trimOut)]].map(([l, v]) => (
                <div key={l} className="flex justify-between">
                  <span className="text-muted-foreground">{l}</span>
                  <span className="text-blue-300 tabular-nums">{v}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <button
                onClick={() => setTrimIn(currentTime)}
                className="w-full flex items-center justify-between rounded-lg border border-white/8 px-3 py-2 hover:bg-white/5 hover:border-white/15 transition-colors"
              >
                <span className="text-white/70">Set In</span>
                <kbd className="font-mono text-[10px] opacity-50 bg-white/5 border border-white/10 rounded px-1">I</kbd>
              </button>
              <button
                onClick={() => setTrimOut(currentTime)}
                className="w-full flex items-center justify-between rounded-lg border border-white/8 px-3 py-2 hover:bg-white/5 hover:border-white/15 transition-colors"
              >
                <span className="text-white/70">Set Out</span>
                <kbd className="font-mono text-[10px] opacity-50 bg-white/5 border border-white/10 rounded px-1">O</kbd>
              </button>
              <button
                onClick={() => { setTrimIn(0); setTrimOut(duration) }}
                className="w-full rounded-lg border border-white/8 px-3 py-2 text-muted-foreground hover:bg-white/5 hover:border-white/15 transition-colors text-left"
              >
                Reset trim
              </button>
            </div>
          </div>

          {/* Speed control */}
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3">Playback speed</p>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="range" min={0.25} max={4} step={0.25} value={playbackRate}
                onChange={e => setPlaybackRate(+e.target.value)}
                className="flex-1 accent-white cursor-pointer h-1"
              />
              <span className="text-white tabular-nums w-7 text-right">{playbackRate}×</span>
            </div>
            <div className="flex gap-1">
              {[0.5, 1, 1.5, 2].map(r => (
                <button
                  key={r}
                  onClick={() => setPlaybackRate(r)}
                  className={[
                    'flex-1 rounded border text-[9px] py-1 transition-colors',
                    playbackRate === r
                      ? 'border-white/30 bg-white/10 text-white'
                      : 'border-white/8 text-muted-foreground hover:border-white/20 hover:text-white/70',
                  ].join(' ')}
                >
                  {r}×
                </button>
              ))}
            </div>
            <div className="flex gap-x-3 gap-y-1 flex-wrap mt-2 text-[9px] text-muted-foreground opacity-50">
              <span><kbd className="font-mono bg-white/5 border border-white/10 rounded px-1">J</kbd> slower</span>
              <span><kbd className="font-mono bg-white/5 border border-white/10 rounded px-1">K</kbd> pause</span>
              <span><kbd className="font-mono bg-white/5 border border-white/10 rounded px-1">L</kbd> faster</span>
            </div>
          </div>

          <div className="mt-auto text-[10px] text-muted-foreground opacity-40 leading-relaxed">
            Export saves the trimmed region as a .webm file. Works in Chrome and Edge.
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="border-t border-white/8 px-4 pt-4 pb-5 shrink-0 bg-[#0d0d0d]">

        {/* Track label row */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] text-muted-foreground w-6 shrink-0 text-violet-400">V1</span>
          {/* Timeline strip */}
          <div
            ref={timelineRef}
            onClick={onTimelineClick}
            className="relative flex-1 h-10 rounded-lg overflow-visible cursor-crosshair select-none"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {/* Background texture (simulates frames) */}
            <div
              className="absolute inset-0 rounded-lg opacity-30"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.06) 39px, rgba(255,255,255,0.06) 40px)',
              }}
            />

            {/* Dimmed region left of In */}
            <div
              className="absolute inset-y-0 left-0 bg-black/50 rounded-l-lg"
              style={{ width: `${inPct}%` }}
            />

            {/* Active clip region */}
            <div
              className="absolute inset-y-0 bg-blue-500/25 border-y border-blue-400/30"
              style={{ left: `${inPct}%`, width: `${outPct - inPct}%` }}
            />

            {/* Dimmed region right of Out */}
            <div
              className="absolute inset-y-0 right-0 bg-black/50 rounded-r-lg"
              style={{ width: `${100 - outPct}%` }}
            />

            {/* In handle */}
            <div
              className="absolute inset-y-0 flex items-center justify-center cursor-col-resize z-20 group"
              style={{ left: `${inPct}%`, width: 12, transform: 'translateX(-50%)' }}
              onPointerDown={e => { e.stopPropagation(); setDragging('in') }}
            >
              <div className="h-full w-[3px] rounded-full bg-blue-400 group-hover:bg-blue-300 transition-colors shadow-[0_0_6px_rgba(96,165,250,0.6)]" />
            </div>

            {/* Out handle */}
            <div
              className="absolute inset-y-0 flex items-center justify-center cursor-col-resize z-20 group"
              style={{ left: `${outPct}%`, width: 12, transform: 'translateX(-50%)' }}
              onPointerDown={e => { e.stopPropagation(); setDragging('out') }}
            >
              <div className="h-full w-[3px] rounded-full bg-blue-400 group-hover:bg-blue-300 transition-colors shadow-[0_0_6px_rgba(96,165,250,0.6)]" />
            </div>

            {/* Playhead */}
            <div
              className="absolute top-0 bottom-0 flex items-start justify-center z-30 cursor-grab active:cursor-grabbing"
              style={{ left: `${playPct}%`, width: 14, transform: 'translateX(-50%)' }}
              onPointerDown={e => { e.stopPropagation(); setDragging('playhead') }}
            >
              {/* Triangle */}
              <div className="w-0 h-0 absolute top-0" style={{
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '7px solid white',
              }} />
              {/* Line */}
              <div className="w-px h-full bg-white/80 mt-0" />
            </div>

            {/* Time ticks */}
            {duration > 0 && Array.from({ length: 9 }, (_, i) => (
              <span
                key={i}
                className="absolute text-[9px] text-white/18 bottom-0.5 pointer-events-none"
                style={{ left: `${(i + 1) * 10}%`, transform: 'translateX(-50%)' }}
              >
                {fmt(((i + 1) / 10) * duration)}
              </span>
            ))}
          </div>
        </div>

        {/* A1 — audio track (mirrors full clip, linked to video) */}
        {videoUrl && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] w-6 shrink-0 text-emerald-400">A1</span>
            <div
              className="relative flex-1 h-6 rounded-md overflow-hidden select-none"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Waveform bars (decorative, proportional to active region) */}
              <div className="absolute inset-0 flex items-center gap-px px-1 opacity-40 pointer-events-none">
                {Array.from({ length: 80 }, (_, i) => {
                  const pct = i / 80
                  const inRange = pct >= inPct / 100 && pct <= outPct / 100
                  const h = Math.sin(i * 1.7) * 0.4 + Math.sin(i * 0.3) * 0.3 + 0.3
                  return (
                    <div
                      key={i}
                      className={inRange ? 'bg-emerald-400' : 'bg-white/20'}
                      style={{ width: 1, height: `${Math.abs(h) * 100}%`, flexShrink: 0 }}
                    />
                  )
                })}
              </div>
              {/* Dimmed regions matching trim */}
              <div className="absolute inset-y-0 left-0 bg-black/50 rounded-l-md" style={{ width: `${inPct}%` }} />
              <div className="absolute inset-y-0 right-0 bg-black/50 rounded-r-md" style={{ width: `${100 - outPct}%` }} />
              {/* Playhead line */}
              <div className="absolute inset-y-0 w-px bg-white/70 z-10 pointer-events-none" style={{ left: `${playPct}%` }} />
            </div>
          </div>
        )}

        {/* Timeline footer */}
        <div className="flex items-center pl-8 text-[10px] text-muted-foreground opacity-40 mt-2">
          <span>{fmt(0)}</span>
          <span className="flex-1 text-center">
            {dragging ? 'Dragging...' : 'Click to seek · Drag blue handles to trim · I / O set trim · J K L speed'}
          </span>
          <span>{fmt(duration)}</span>
        </div>
      </div>
    </div>
  )
}

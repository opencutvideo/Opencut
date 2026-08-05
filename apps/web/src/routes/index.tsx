import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({ component: Home })

// ── Feature switcher data ────────────────────────────────────────────────────
const features = [
  {
    id: 'performance',
    tag: 'Rust core',
    headline: 'Fast. Actually fast.',
    body: 'The engine is written in Rust and compiled to WebAssembly. Scrubbing a 4K timeline feels instant because the work happens natively, not inside a JavaScript loop.',
    visual: (
      <div className="w-full rounded-xl border border-white/8 bg-white/[0.02] p-5 font-mono text-xs space-y-2">
        <div className="text-muted-foreground mb-3">Timeline · 4K · 00:02:34</div>
        {[
          { label: 'V1', color: 'bg-blue-500/40 border-blue-400/30', w: 'w-full' },
          { label: 'V2', color: 'bg-purple-500/30 border-purple-400/25', w: 'w-3/4' },
          { label: 'A1', color: 'bg-green-500/30 border-green-400/25', w: 'w-full' },
          { label: 'A2', color: 'bg-amber-500/20 border-amber-400/20', w: 'w-1/2 ml-8' },
        ].map((t) => (
          <div key={t.label} className="flex items-center gap-3">
            <span className="w-5 text-muted-foreground shrink-0">{t.label}</span>
            <div className={`h-5 rounded border ${t.color} ${t.w} relative overflow-hidden`}>
              <div className="absolute inset-y-0 left-0 w-px bg-white/40 animate-[ping_2s_ease-in-out_infinite]" style={{ left: '30%' }} />
            </div>
          </div>
        ))}
        <div className="mt-3 text-green-400/70">✓ Renders in 14 ms</div>
      </div>
    ),
  },
  {
    id: 'platforms',
    tag: 'Cross-platform',
    headline: 'One editor, everywhere.',
    body: 'Browser, desktop, and mobile share the same codebase. Start a cut on your laptop, finish it on your phone. Projects sync through your own storage.',
    visual: (
      <div className="w-full rounded-xl border border-white/8 bg-white/[0.02] p-5 space-y-3">
        {[
          { name: 'Web', sub: 'Chrome, Firefox, Safari', dot: 'bg-green-400' },
          { name: 'macOS', sub: 'Native Tauri app · arm64 + x86', dot: 'bg-green-400' },
          { name: 'Windows', sub: 'Native Tauri app · x64', dot: 'bg-green-400' },
          { name: 'iOS / Android', sub: 'Coming Q2 2027', dot: 'bg-amber-400' },
        ].map((p) => (
          <div key={p.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <div>
              <div className="text-sm font-medium text-white">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.sub}</div>
            </div>
            <div className={`w-2 h-2 rounded-full ${p.dot}`} />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'privacy',
    tag: 'Privacy first',
    headline: 'Your footage stays yours.',
    body: 'Zero uploads. Zero telemetry. Every byte of processing happens on your device. There is no server to hack, no company to sell your data, no ToS that changes.',
    visual: (
      <div className="w-full rounded-xl border border-white/8 bg-white/[0.02] p-5 font-mono text-xs space-y-2">
        {[
          { line: '$ opencut process clip.mp4', muted: false },
          { line: 'Loading engine...  [local]', muted: true },
          { line: 'CPU decode:        on-device', muted: true },
          { line: 'GPU encode:        on-device', muted: true },
          { line: 'Network requests:  0', muted: true },
          { line: 'Data uploaded:     0 bytes', muted: true },
          { line: '✓ Done in 3.2 s', muted: false },
        ].map((l, i) => (
          <div key={i} className={l.muted ? 'text-muted-foreground' : 'text-green-400/90'}>
            {l.line}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'plugins',
    tag: 'Plugin-first',
    headline: 'Extend anything.',
    body: 'The plugin API is first-class, not an afterthought. Effects, exporters, custom panels, AI models — they all run in the same sandboxed runtime as the built-in tools.',
    visual: (
      <div className="w-full rounded-xl border border-white/8 bg-white/[0.02] p-5 space-y-3">
        <div className="text-xs text-muted-foreground mb-4">Installed plugins</div>
        {[
          { name: 'opencut-captions', version: '1.2.0', author: '@community' },
          { name: 'lut-pack-cinema', version: '0.9.1', author: '@luts' },
          { name: 'mcp-bridge', version: '0.4.0', author: '@core' },
        ].map((p) => (
          <div key={p.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <div>
              <div className="text-sm font-medium text-white font-mono">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.author}</div>
            </div>
            <span className="text-[11px] text-muted-foreground border border-white/10 rounded px-2 py-0.5">{p.version}</span>
          </div>
        ))}
        <div className="text-xs text-muted-foreground pt-1">+ Browse 200 community plugins →</div>
      </div>
    ),
  },
  {
    id: 'ai',
    tag: 'AI and MCP',
    headline: 'Let agents edit for you.',
    body: 'An MCP server ships with the editor. Point any AI tool at it and describe what you want. Auto-captions, silence removal, highlight reels — just ask.',
    visual: (
      <div className="w-full rounded-xl border border-white/8 bg-white/[0.02] p-5 font-mono text-xs space-y-2">
        <div className="text-muted-foreground mb-3">MCP session · gpt-4o</div>
        <div className="text-blue-300/80">{'>'} Remove silences longer than 0.5 s</div>
        <div className="text-muted-foreground">Scanning 2m 34s of audio...</div>
        <div className="text-muted-foreground">Found 14 silence regions</div>
        <div className="text-muted-foreground">Cutting and ripple-deleting...</div>
        <div className="text-green-400/80">✓ New duration: 1m 47s</div>
        <div className="text-muted-foreground mt-2">{'>'} Add captions, export to Shorts format</div>
        <div className="text-amber-400/70">Processing...</div>
      </div>
    ),
  },
]

// ── Home component ──────────────────────────────────────────────────────────
export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0)
  const f = features[activeFeature]

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 50% 38%, rgba(255,255,255,0.045) 0%, transparent 100%)',
          }}
        />

        {/* Status pill */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          Rewrite in progress
          <span className="text-white/20 mx-0.5">·</span>
          <a
            href="https://github.com/opencutvideo/Opencut"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/65 underline underline-offset-4 hover:text-white transition-colors"
          >
            Follow on GitHub
          </a>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-[76px] font-bold tracking-tight leading-[1.03] mb-5 max-w-3xl">
          The open-source
          <br />
          <span className="text-white/30">CapCut alternative</span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-md mb-9 leading-relaxed">
          Free video editor for web, desktop, and mobile.
          No subscriptions. No watermarks. No data collection.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-14">
          <Link
            to="/editor"
            className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-7 py-3.5 rounded-lg hover:bg-white/90 active:scale-[0.98] transition-all"
          >
            Open Editor
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href="https://github.com/opencutvideo/Opencut"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-white/12 text-white/70 font-medium px-7 py-3.5 rounded-lg hover:border-white/25 hover:text-white transition-all"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Star on GitHub
          </a>
        </div>

        {/* Mock editor strip */}
        <div className="w-full max-w-3xl mx-auto rounded-2xl border border-white/8 bg-white/[0.015] overflow-hidden shadow-2xl">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6 bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <div className="flex-1 text-center text-[11px] text-muted-foreground">
              OpenCut — untitled project
            </div>
            <div className="text-[11px] text-muted-foreground">00:00:14</div>
          </div>

          {/* Preview + inspector row */}
          <div className="flex h-36 sm:h-44">
            {/* Video preview placeholder */}
            <div className="flex-1 flex items-center justify-center border-r border-white/6 bg-black/20">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <div className="w-20 sm:w-28 aspect-video rounded-md border border-white/8 bg-white/[0.03] flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M9 7.5l7 3.5-7 3.5V7.5z" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex gap-3 text-sm">
                  <button className="hover:text-white transition-colors">⏮</button>
                  <button className="hover:text-white transition-colors">⏯</button>
                  <button className="hover:text-white transition-colors">⏭</button>
                </div>
              </div>
            </div>
            {/* Properties panel */}
            <div className="w-36 sm:w-44 p-3 flex flex-col gap-2 text-xs">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Properties</div>
              {['Opacity', 'Scale', 'X', 'Y'].map((prop) => (
                <div key={prop} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{prop}</span>
                  <span className="w-10 text-right text-white/50 border border-white/8 rounded px-1.5 py-0.5">100</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t border-white/6 px-4 py-3">
            <div className="flex items-center gap-2 mb-2 text-[10px] text-muted-foreground">
              <span>00:00</span>
              <div className="flex-1 relative h-px bg-white/8">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-px h-4 bg-white/50"
                  style={{ left: '22%' }}
                />
              </div>
              <span>00:30</span>
            </div>
            <div className="space-y-1.5">
              {[
                { label: 'V1', cls: 'bg-blue-500/25 border-blue-400/25', w: 'w-full' },
                { label: 'V2', cls: 'bg-purple-500/20 border-purple-400/20', w: 'w-2/3' },
                { label: 'A1', cls: 'bg-green-500/20 border-green-400/20', w: 'w-full' },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground w-5 shrink-0">{t.label}</span>
                  <div className={`h-4 ${t.w} rounded border ${t.cls}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features (interactive switcher) ── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Why OpenCut</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Built different</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Feature list (left) */}
            <div className="lg:w-72 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
              {features.map((feat, i) => (
                <button
                  key={feat.id}
                  onClick={() => setActiveFeature(i)}
                  className={[
                    'text-left shrink-0 rounded-xl px-4 py-3.5 border transition-all duration-150',
                    activeFeature === i
                      ? 'bg-white/[0.06] border-white/15 text-white'
                      : 'border-transparent text-muted-foreground hover:bg-white/[0.03] hover:text-white/80',
                  ].join(' ')}
                >
                  <div className="text-[10px] font-semibold uppercase tracking-widest mb-1 opacity-60">{feat.tag}</div>
                  <div className="text-sm font-medium leading-snug">{feat.headline}</div>
                </button>
              ))}
            </div>

            {/* Feature content (right) */}
            <div className="flex-1 rounded-2xl border border-white/8 bg-white/[0.015] p-6 sm:p-8 flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">{f.tag}</span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-3">{f.headline}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
              <div className="mt-auto">
                {f.visual}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Classic editor banner ── */}
      <section className="pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-white/8 bg-white/[0.015] px-8 py-9 md:px-12 flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
            <div className="max-w-lg">
              <p className="text-[10px] font-semibold text-amber-400/80 uppercase tracking-widest mb-3">In the meantime</p>
              <h2 className="text-lg font-bold text-white mb-2">The classic editor is available now</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The full rewrite is underway. Until it ships,{' '}
                <a href="https://opencut.app" className="text-white/65 underline underline-offset-4 hover:text-white transition-colors">
                  opencut.app
                </a>{' '}
                is fully functional and free with no watermarks.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="https://opencut.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                Use Classic Editor
              </a>
              <a
                href="https://github.com/opencut-app/opencut-classic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white/10 text-white/55 text-sm px-5 py-2.5 rounded-lg hover:border-white/20 hover:text-white/75 transition-colors whitespace-nowrap"
              >
                Source
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community CTA ── */}
      <section className="pb-28 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-24" />
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Built in public.<br />Join us.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Star the repo, open an issue, or jump into Discord.
                Every contribution moves the project forward.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://github.com/opencutvideo/Opencut"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
              >
                View on GitHub
              </a>
              <a
                href="https://discord.gg/zmR9N35cjK"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/12 text-white/70 font-medium px-6 py-3 rounded-lg hover:border-white/25 hover:text-white transition-colors"
              >
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

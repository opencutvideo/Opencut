import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

const features = [
  {
    label: 'Rust core',
    title: 'Near-native performance',
    desc: 'Video processing runs in a Rust engine compiled to WebAssembly. No lag, no dropped frames on long timelines.',
  },
  {
    label: 'Cross-platform',
    title: 'Web, desktop, and mobile',
    desc: 'One codebase. The same editor runs in your browser, as a desktop app, and on iOS/Android.',
  },
  {
    label: 'Plugin-first',
    title: 'Extend everything',
    desc: 'A plugin architecture built in from day one. Add effects, exporters, or custom panels without forking.',
  },
  {
    label: 'AI & MCP',
    title: 'Scriptable by AI agents',
    desc: 'An MCP server exposes the editor over a standard protocol. Automate edits with any AI tool.',
  },
  {
    label: 'Privacy first',
    title: 'Your files never leave',
    desc: 'All processing is local. No server receives your footage. Nothing to breach, sell, or subpoena.',
  },
  {
    label: 'MIT license',
    title: '100% open source',
    desc: 'Fork it, self-host it, build on it. The code is yours — no CLA, no dual-licensing.',
  },
]

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-6 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(255,255,255,0.04) 0%, transparent 100%)',
          }}
        />

        {/* Status pill */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          Rewrite in progress ·{' '}
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
        <h1 className="text-5xl sm:text-6xl md:text-[72px] font-bold tracking-tight leading-[1.04] mb-5 max-w-3xl">
          The open-source
          <br />
          <span className="text-white/35">CapCut alternative</span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-md mb-9 leading-relaxed">
          Free video editor for web, desktop, and mobile.
          No subscriptions, no watermarks, no data harvesting.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            to="/editor"
            className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-7 py-3.5 rounded-lg hover:bg-white/90 active:scale-[0.98] transition-all duration-150"
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
            className="inline-flex items-center justify-center gap-2 border border-white/12 text-white/70 font-medium px-7 py-3.5 rounded-lg hover:border-white/25 hover:text-white transition-all duration-150"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Star on GitHub
          </a>
        </div>

        {/* Stats */}
        <div className="mt-14 flex gap-8 sm:gap-12 justify-center">
          {[
            { value: '100%', label: 'Open source' },
            { value: 'MIT', label: 'License' },
            { value: '4', label: 'Platforms' },
            { value: '0', label: 'Watermarks' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">{s.value}</div>
              <div className="text-[11px] text-muted-foreground mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Separator ── */}
      <div className="mx-6 sm:mx-auto sm:max-w-7xl sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      {/* ── Features ── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Why OpenCut</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Built different, from the ground up</h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-background p-7 hover:bg-white/[0.025] transition-colors duration-200"
              >
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">{f.label}</p>
                <h3 className="font-semibold text-white text-[15px] mb-2 leading-snug">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Classic editor banner ── */}
      <section className="pb-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-white/8 bg-white/[0.015] px-8 py-9 md:px-12 flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
            <div className="max-w-lg">
              <p className="text-[11px] font-semibold text-amber-400/80 uppercase tracking-widest mb-3">In the meantime</p>
              <h2 className="text-lg font-bold text-white mb-2">The classic editor is available now</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The full rewrite brings a Rust core, desktop and mobile apps, plugins, and MCP scripting.
                Until then,{' '}
                <a href="https://opencut.app" className="text-white/65 underline underline-offset-4 hover:text-white transition-colors">
                  opencut.app
                </a>{' '}
                is fully functional and free.
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
                className="inline-flex items-center justify-center border border-white/10 text-white/60 text-sm px-5 py-2.5 rounded-lg hover:border-white/20 hover:text-white/80 transition-colors whitespace-nowrap"
              >
                Source
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community CTA ── */}
      <section className="pb-28 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-24" />
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Built in public.<br />Join us.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Star the repo, open an issue, or jump into Discord.
                Every contribution — code, design, or feedback — moves the project forward.
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

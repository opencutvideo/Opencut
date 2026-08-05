import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({ component: About })

const values = [
  {
    title: 'Privacy by default',
    desc: 'Your videos never touch our servers. All processing runs on your machine — browser, desktop, or mobile. We can\'t see your files because we don\'t receive them.',
  },
  {
    title: 'Open source, forever',
    desc: 'OpenCut is MIT licensed. Fork it, self-host it, build on it. The code belongs to the community, not a corporation.',
  },
  {
    title: 'No paywalls',
    desc: 'No watermarks, no export limits, no "Pro" tier. Every feature is free, always. We build this because we think good tools should be accessible.',
  },
  {
    title: 'Built for real workflows',
    desc: 'Designed by creators, for creators. Not stripped down to push you toward a subscription — every decision is made with the actual editing workflow in mind.',
  },
]

const stack = [
  {
    name: 'Rust',
    role: 'Core engine',
    desc: 'The video processing core is written in Rust for near-native performance — no GC pauses, no memory leaks, predictable latency on long timelines.',
  },
  {
    name: 'WebAssembly',
    role: 'Browser runtime',
    desc: 'The Rust core compiles to WASM, so the same engine runs in Chrome, Firefox, and Safari without plugins or installation.',
  },
  {
    name: 'React + TanStack',
    role: 'UI layer',
    desc: 'The editor UI is built with React 19 and TanStack Router. Fast renders, type-safe routing, and a component model that scales to a plugin system.',
  },
  {
    name: 'Tauri',
    role: 'Desktop shell',
    desc: 'The desktop app wraps the same web UI in a Tauri shell, giving native file access and OS integration without shipping a full Chromium bundle.',
  },
]

const milestones = [
  {
    period: 'Aug 2026',
    label: 'Web editor alpha — live now',
    note: 'Browser-based editor at opencutvideo.github.io/Opencut. Basic timeline, import, and export.',
    current: true,
  },
  {
    period: 'Q4 2026',
    label: 'Desktop alpha',
    note: 'Tauri shell for macOS and Windows. Native file access, OS-level performance, no browser limits.',
    current: false,
  },
  {
    period: 'Q1 2027',
    label: 'Plugin system beta',
    note: 'Public plugin API opens. Third-party effects, exporters, and custom UI panels.',
    current: false,
  },
  {
    period: 'Q2 2027',
    label: 'Mobile apps',
    note: 'iOS and Android apps. Same editor, same projects — edit on any device.',
    current: false,
  },
  {
    period: '2027+',
    label: 'MCP & AI scripting',
    note: 'Model Context Protocol server. Automate cuts, captions, and exports with any AI agent.',
    current: false,
  },
]

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">

      {/* Page header */}
      <div className="mb-20">
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-white/10 rounded-full px-3 py-1 mb-6">
          About the project
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
          A video editor that respects you
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          OpenCut started as a simple question: why does every good video editor either cost money,
          add a watermark, upload your footage to the cloud, or all three? We couldn't find a
          satisfying answer, so we built the alternative.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-20 pb-20 border-b border-white/8">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-8">Mission</h2>
        <p className="text-2xl md:text-3xl font-medium text-white leading-snug">
          Make professional video editing free, private, and available on every platform — without compromises.
        </p>
      </section>

      {/* Values */}
      <section className="mb-20 pb-20 border-b border-white/8">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-10">What we stand for</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl border border-white/8 bg-white/[0.02] p-6">
              <h3 className="font-semibold text-white mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it's built */}
      <section className="mb-20 pb-20 border-b border-white/8">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">How it's built</h2>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          The rewrite is a ground-up rearchitecture. Every layer was chosen to support the long-term goal:
          one codebase, four platforms, native performance, offline-first.
        </p>
        <div className="flex flex-col gap-4">
          {stack.map((s) => (
            <div key={s.name} className="flex gap-6 rounded-xl border border-white/8 bg-white/[0.02] p-5">
              <div className="shrink-0 w-28">
                <div className="font-semibold text-white text-sm">{s.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.role}</div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap / milestones */}
      <section className="mb-20 pb-20 border-b border-white/8">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-10">Roadmap</h2>
        <div className="relative pl-6 border-l border-white/10 flex flex-col gap-8">
          {milestones.map((m) => (
            <div key={m.label} className="relative">
              <div
                className={[
                  'absolute -left-[25px] top-1 w-2 h-2 rounded-full border',
                  m.current
                    ? 'bg-green-400 border-green-400/50 shadow-[0_0_6px_rgba(74,222,128,0.5)]'
                    : 'bg-white/10 border-white/20',
                ].join(' ')}
              />
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground">{m.period}</span>
                {m.current && (
                  <span className="text-[10px] font-medium text-green-400 border border-green-400/25 bg-green-400/5 rounded-full px-2 py-0.5">
                    Now
                  </span>
                )}
              </div>
              <div className="font-medium text-white text-sm mb-1">{m.label}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{m.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contribute */}
      <section>
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">Get involved</h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
          OpenCut is built in public. The best way to help is to use it, report bugs,
          and open pull requests. The codebase is on GitHub — everything from the Rust core
          to the React UI is there.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://github.com/opencutvideo/Opencut"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
          <a
            href="https://discord.gg/zmR9N35cjK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/80 text-sm font-medium px-6 py-3 rounded-lg hover:border-white/30 hover:text-white transition-colors"
          >
            Join Discord
          </a>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 border border-white/10 text-muted-foreground text-sm px-6 py-3 rounded-lg hover:border-white/20 hover:text-white/80 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </section>

    </div>
  )
}

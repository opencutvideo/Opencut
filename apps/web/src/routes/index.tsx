import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    desc: 'Built on a Rust core for near-native performance in the browser. No lag, no stutter.',
  },
  {
    icon: '🌐',
    title: 'Works Everywhere',
    desc: 'One codebase powers the web, desktop, and mobile apps. Edit on any device.',
  },
  {
    icon: '🔌',
    title: 'Plugin-First',
    desc: 'A plugin architecture from day one. Extend the editor exactly the way you need.',
  },
  {
    icon: '🤖',
    title: 'AI & MCP Ready',
    desc: 'An MCP server and scripting tab let AI agents automate your editing workflow.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    desc: 'Your videos never leave your machine. All processing happens locally.',
  },
  {
    icon: '🧑‍💻',
    title: '100% Open Source',
    desc: 'MIT licensed. Fork it, extend it, self-host it. The code is yours.',
  },
]

const stack = [
  { name: 'Rust', desc: 'Core engine' },
  { name: 'React', desc: 'UI layer' },
  { name: 'Tauri', desc: 'Desktop shell' },
  { name: 'WebAssembly', desc: 'Browser runtime' },
  { name: 'Tailwind CSS', desc: 'Styling' },
  { name: 'TanStack', desc: 'Routing & state' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center px-6 text-center">
        {/* Subtle gradient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-white/[0.03] blur-3xl" />
        </div>

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          <span>Rewrite in progress · <a href="https://github.com/opencutvideo/Opencut" target="_blank" rel="noopener noreferrer" className="text-white/70 underline underline-offset-4 hover:text-white transition-colors">Follow on GitHub</a></span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6 max-w-3xl">
          The open-source<br />
          <span className="text-white/50">CapCut alternative</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
          A free video editor for web, desktop, and mobile. No subscriptions, no watermarks, no data harvesting.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/editor"
            className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-3.5 rounded-lg hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Open Editor
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href="https://github.com/opencutvideo/Opencut"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/80 font-medium px-8 py-3.5 rounded-lg hover:border-white/30 hover:text-white transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Star on GitHub
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap gap-10 justify-center text-center">
          {[
            { label: 'Open Source', value: '100%' },
            { label: 'Platforms', value: '3' },
            { label: 'License', value: 'MIT' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built different
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              OpenCut is being rebuilt from scratch with a plugin-first architecture, AI integration, and a Rust core.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-white/8 bg-white/3 p-6 hover:bg-white/5 hover:border-white/15 transition-all duration-200"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Status banner */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-amber-400 mb-4 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Rewrite in progress
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              The classic version is available now
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              The full rewrite brings a Rust core, desktop/mobile support, plugins, and an MCP server.
              Until then, the classic version at{' '}
              <a href="https://opencut.app" className="underline underline-offset-4 hover:text-white transition-colors">opencut.app</a> is
              fully functional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://opencut.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
              >
                Use Classic Editor
              </a>
              <a
                href="https://github.com/opencut-app/opencut-classic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/80 font-medium px-6 py-3 rounded-lg hover:border-white/30 hover:text-white transition-colors"
              >
                Classic Source Code
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-bold text-white mb-12">Tech Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {stack.map((s) => (
              <div
                key={s.name}
                className="flex flex-col items-center rounded-xl border border-white/8 bg-white/3 p-5 text-center hover:bg-white/5 transition-colors"
              >
                <div className="font-semibold text-white text-sm mb-1">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join the community
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Star the repo, open an issue, or jump into Discord. OpenCut is built in public.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/opencutvideo/Opencut"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-3.5 rounded-lg hover:bg-white/90 transition-colors"
            >
              View Source Code
            </a>
            <a
              href="https://discord.gg/zmR9N35cjK"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/80 font-medium px-8 py-3.5 rounded-lg hover:border-white/30 hover:text-white transition-colors"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

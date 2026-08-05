import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/cookies')({ component: Cookies })

const cookies = [
  {
    name: 'sessionStorage.redirect',
    type: 'Session',
    purpose: 'SPA routing on GitHub Pages',
    duration: 'Deleted when tab closes',
    thirdParty: false,
    detail: 'Stores the requested URL path when GitHub Pages serves the 404 fallback, so the app can restore the correct route after reload. Contains only a URL path — no personal data.',
  },
  {
    name: 'localStorage (project state)',
    type: 'Persistent',
    purpose: 'Save editor state between sessions',
    duration: 'Until manually cleared',
    thirdParty: false,
    detail: 'The editor may write timeline state, trim points, and UI preferences to localStorage. This data never leaves your device and is not readable by any server.',
  },
]

const thirdParty = [
  {
    service: 'GitHub Pages',
    purpose: 'Hosts the website',
    policy: 'https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement',
    note: 'GitHub logs standard HTTP access data (IP, user-agent) server-side. OpenCut does not access these logs.',
  },
  {
    service: 'GitHub (CDN / fonts)',
    purpose: 'Static asset delivery',
    policy: 'https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement',
    note: 'All fonts and static assets are served from the same GitHub Pages origin — no third-party CDN requests.',
  },
]

export default function Cookies() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-white/10 rounded-full px-3 py-1 mb-6">
          Legal
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground text-sm">
          Effective date: <span className="text-white/60">August 2026</span>
          <span className="mx-2 text-white/20">·</span>
          <a
            href="https://github.com/opencutvideo/Opencut/commits/main/apps/web/src/routes/cookies.tsx"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-white transition-colors"
          >
            View history on GitHub
          </a>
        </p>
      </div>

      <div className="rounded-xl border border-blue-400/15 bg-blue-400/[0.03] px-5 py-4 mb-10 flex gap-3">
        <div className="mt-0.5 text-blue-400 shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </div>
        <p className="text-sm text-blue-400/80 leading-relaxed">
          OpenCut uses <strong className="text-blue-400">no tracking cookies</strong>. The only storage used is functional: routing state and local editor preferences, both entirely on your device.
        </p>
      </div>

      {/* Own storage */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">Functional storage (first-party)</h2>
        <div className="flex flex-col gap-4">
          {cookies.map((c) => (
            <div key={c.name} className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <code className="text-sm font-mono text-white">{c.name}</code>
                <div className="flex gap-2">
                  <span className="text-[10px] border border-white/10 rounded-full px-2 py-0.5 text-muted-foreground">{c.type}</span>
                  <span className="text-[10px] border border-green-400/20 text-green-400/70 rounded-full px-2 py-0.5">First-party</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                <div>
                  <span className="text-muted-foreground block mb-0.5">Purpose</span>
                  <span className="text-white/70">{c.purpose}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-0.5">Duration</span>
                  <span className="text-white/70">{c.duration}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Third-party */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">Third-party services</h2>
        <div className="flex flex-col gap-4">
          {thirdParty.map((t) => (
            <div key={t.service} className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <span className="text-sm font-medium text-white">{t.service}</span>
                <span className="text-[10px] border border-white/10 text-muted-foreground rounded-full px-2 py-0.5">Third-party</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{t.note}</p>
              <a
                href={t.policy}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/40 underline underline-offset-4 hover:text-white/60 transition-colors"
              >
                Privacy policy →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* How to clear */}
      <section className="mb-12 pb-12 border-b border-white/6">
        <h2 className="text-base font-semibold text-white mb-4">How to clear local storage</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          You can remove all locally stored data at any time. In Chrome or Edge, open DevTools → Application → Storage → click "Clear site data". In Firefox, open DevTools → Storage → right-click → Delete All.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Clearing storage will reset editor preferences and any unsaved project state. Video files are never stored — only metadata like trim points.
        </p>
      </section>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 border border-white/10 text-muted-foreground text-sm px-5 py-2.5 rounded-lg hover:border-white/20 hover:text-white transition-colors"
        >
          ← Back to home
        </Link>
        <Link
          to="/privacy"
          className="inline-flex items-center justify-center gap-2 border border-white/10 text-muted-foreground text-sm px-5 py-2.5 rounded-lg hover:border-white/20 hover:text-white transition-colors"
        >
          Privacy Policy
        </Link>
        <Link
          to="/terms"
          className="inline-flex items-center justify-center gap-2 border border-white/10 text-muted-foreground text-sm px-5 py-2.5 rounded-lg hover:border-white/20 hover:text-white transition-colors"
        >
          Terms of Use
        </Link>
      </div>
    </div>
  )
}

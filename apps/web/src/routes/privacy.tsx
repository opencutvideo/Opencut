import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({ component: Privacy })

const sections = [
  {
    title: 'The short version',
    content: `OpenCut does not collect, transmit, or store any of your personal data or video files. All processing happens locally on your device. We have no servers that receive your footage, no analytics that track what you edit, and no accounts that tie edits to a person.`,
  },
  {
    title: 'Data we do not collect',
    items: [
      'Your video or audio files — they never leave your device',
      'Project files or timeline data',
      'Usage patterns, feature clicks, or editor sessions',
      'Device identifiers or fingerprints',
      'IP addresses linked to editing activity',
      'Personal information of any kind',
    ],
  },
  {
    title: 'GitHub Pages hosting',
    content: `This site is hosted on GitHub Pages. When you visit, GitHub may log standard server-access data (IP address, browser user-agent, referring URL) as described in the GitHub Privacy Statement at github.com/site/privacy. OpenCut has no access to these logs and does not control them.`,
  },
  {
    title: 'Local storage',
    content: `The editor may use your browser's localStorage or IndexedDB to save project state between sessions. This data never leaves your browser and is not accessible to any server. You can clear it at any time through your browser's developer tools or site settings.`,
  },
  {
    title: 'Third-party links',
    content: `This site links to GitHub, Discord, and X/Twitter. Clicking those links is subject to their respective privacy policies. We do not embed tracking pixels, analytics scripts, or third-party SDKs on this site.`,
  },
  {
    title: 'Open source transparency',
    content: `Because OpenCut is MIT-licensed and open source, you can verify every claim on this page by reading the source code at github.com/opencutvideo/Opencut. There is no hidden server-side code — the entire application runs in your browser.`,
  },
  {
    title: 'Changes to this policy',
    content: `If this policy changes materially, the update will be committed to the public repository with a clear commit message. The repository history serves as the authoritative changelog.`,
  },
  {
    title: 'Contact',
    content: `Questions about privacy? Open an issue at github.com/opencutvideo/Opencut or join the Discord community.`,
  },
]

function Section({ s }: { s: typeof sections[number] }) {
  return (
    <div className="py-8 border-b border-white/6 last:border-0">
      <h2 className="text-base font-semibold text-white mb-3">{s.title}</h2>
      {'items' in s && s.items ? (
        <ul className="space-y-2">
          {s.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-muted-foreground">
              <span className="text-white/20 mt-0.5 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
      )}
    </div>
  )
}

export default function Privacy() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-white/10 rounded-full px-3 py-1 mb-6">
          Legal
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm">
          Effective date: <span className="text-white/60">August 2026</span>
          <span className="mx-2 text-white/20">·</span>
          <a
            href="https://github.com/opencutvideo/Opencut/commits/main/apps/web/src/routes/privacy.tsx"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-white transition-colors"
          >
            View history on GitHub
          </a>
        </p>
      </div>

      <div className="rounded-xl border border-green-400/15 bg-green-400/[0.03] px-5 py-4 mb-10 flex gap-3">
        <div className="mt-0.5 text-green-400 shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <p className="text-sm text-green-400/80 leading-relaxed">
          <strong className="text-green-400">Privacy by design.</strong> OpenCut processes all video entirely on your device. Zero data leaves your browser.
        </p>
      </div>

      <div>
        {sections.map((s) => (
          <Section key={s.title} s={s} />
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-white/6 flex flex-col sm:flex-row gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 border border-white/10 text-muted-foreground text-sm px-5 py-2.5 rounded-lg hover:border-white/20 hover:text-white transition-colors"
        >
          ← Back to home
        </Link>
        <Link
          to="/cookies"
          className="inline-flex items-center justify-center gap-2 border border-white/10 text-muted-foreground text-sm px-5 py-2.5 rounded-lg hover:border-white/20 hover:text-white transition-colors"
        >
          Cookie Policy
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

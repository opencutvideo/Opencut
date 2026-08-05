import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/terms')({ component: Terms })

const sections = [
  {
    title: 'Acceptance',
    content: `By using OpenCut — whether the hosted version at opencutvideo.github.io/Opencut or a self-hosted instance — you agree to these terms. If you do not agree, do not use the software.`,
  },
  {
    title: 'What OpenCut is',
    content: `OpenCut is a free, open-source video editor distributed under the MIT License. The hosted version on GitHub Pages is provided as-is for public use. There is no subscription, no account, and no paid tier.`,
  },
  {
    title: 'MIT License',
    content: `The source code is licensed under the MIT License. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to including the original copyright notice and license text. The full license is included in the repository at github.com/opencutvideo/Opencut/blob/main/LICENSE.`,
  },
  {
    title: 'Your content',
    content: `You retain all rights to any video, audio, or other media you edit with OpenCut. We do not receive, store, or acquire any rights to your content. Because all processing is local, your files never leave your device.`,
  },
  {
    title: 'Acceptable use',
    items: [
      'You must not use OpenCut to produce or distribute content that is illegal in your jurisdiction',
      'You must not attempt to reverse-engineer, exploit, or disrupt the hosted service',
      'You must not misrepresent OpenCut or its affiliation — particularly in any derivative projects',
      'Redistribution of modified versions must comply with the MIT License terms',
    ],
  },
  {
    title: 'No warranty',
    content: `OpenCut is provided "as is", without warranty of any kind, express or implied — including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from the use of the software. This mirrors the MIT License warranty disclaimer.`,
  },
  {
    title: 'Limitation of liability',
    content: `To the maximum extent permitted by applicable law, OpenCut and its contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of data, loss of profits, or business interruption — even if advised of the possibility of such damages.`,
  },
  {
    title: 'Third-party services',
    content: `OpenCut links to third-party services (GitHub, Discord, X/Twitter). Use of those services is governed by their own terms. OpenCut is not affiliated with CapCut, ByteDance, or any proprietary video editor.`,
  },
  {
    title: 'Governing law',
    content: `These terms are governed by the laws of the jurisdiction in which OpenCut's primary contributors are located, without regard to conflict-of-law principles. Disputes shall be resolved through good-faith negotiation first; failing that, through the courts of that jurisdiction.`,
  },
  {
    title: 'Changes to these terms',
    content: `Material changes to these terms will be committed to the public repository with a clear commit message and reflected in the effective date below. Continued use after a change constitutes acceptance.`,
  },
  {
    title: 'Contact',
    content: `Questions about these terms? Open an issue at github.com/opencutvideo/Opencut or reach us via the Discord community.`,
  },
]

function Section({ s }: { s: typeof sections[number] }) {
  return (
    <div className="py-7 border-b border-white/6 last:border-0">
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

export default function Terms() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-white/10 rounded-full px-3 py-1 mb-6">
          Legal
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Terms of Use</h1>
        <p className="text-muted-foreground text-sm">
          Effective date: <span className="text-white/60">August 2026</span>
          <span className="mx-2 text-white/20">·</span>
          <a
            href="https://github.com/opencutvideo/Opencut/commits/main/apps/web/src/routes/terms.tsx"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-white transition-colors"
          >
            View history on GitHub
          </a>
        </p>
      </div>

      <div className="rounded-xl border border-amber-400/15 bg-amber-400/[0.03] px-5 py-4 mb-10 flex gap-3">
        <div className="mt-0.5 text-amber-400 shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-sm text-amber-400/80 leading-relaxed">
          OpenCut is MIT-licensed, free, and open source. These terms are kept simple and fair — no dark patterns, no hidden obligations.
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
          to="/privacy"
          className="inline-flex items-center justify-center gap-2 border border-white/10 text-muted-foreground text-sm px-5 py-2.5 rounded-lg hover:border-white/20 hover:text-white transition-colors"
        >
          Privacy Policy
        </Link>
        <Link
          to="/cookies"
          className="inline-flex items-center justify-center gap-2 border border-white/10 text-muted-foreground text-sm px-5 py-2.5 rounded-lg hover:border-white/20 hover:text-white transition-colors"
        >
          Cookie Policy
        </Link>
      </div>
    </div>
  )
}

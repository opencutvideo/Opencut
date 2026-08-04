import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/editor')({ component: Editor })

function Editor() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 text-center">
      {/* Editor placeholder */}
      <div className="w-full max-w-5xl">
        {/* Mock editor chrome */}
        <div className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden mb-8">
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-white/2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white/15" />
              <div className="w-3 h-3 rounded-full bg-white/15" />
              <div className="w-3 h-3 rounded-full bg-white/15" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <span className="text-xs text-muted-foreground font-medium">OpenCut Editor</span>
            </div>
          </div>

          {/* Editor layout mock */}
          <div className="flex h-[420px]">
            {/* Sidebar */}
            <div className="w-56 border-r border-white/8 bg-white/1 p-3 flex flex-col gap-2">
              <div className="text-xs text-muted-foreground font-medium px-2 mb-2">Media</div>
              {['Video clip 1', 'Audio track', 'Background'].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-white/5 cursor-default"
                >
                  <div className="w-8 h-6 rounded bg-white/10 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            {/* Preview */}
            <div className="flex-1 flex flex-col items-center justify-center gap-4 border-r border-white/8 bg-black/30 p-8">
              <div className="w-full max-w-xs aspect-video rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-muted-foreground">
                  <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M16 14l12 6-12 6V14z" fill="currentColor" />
                </svg>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <button className="hover:text-white transition-colors text-xs">⏮</button>
                <button className="hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M8 7l6 3-6 3V7z" fill="currentColor" />
                  </svg>
                </button>
                <button className="hover:text-white transition-colors text-xs">⏭</button>
              </div>
            </div>

            {/* Inspector */}
            <div className="w-52 p-3 flex flex-col gap-3">
              <div className="text-xs text-muted-foreground font-medium px-2 mb-1">Properties</div>
              {['Opacity', 'Scale', 'Position X', 'Position Y'].map((prop) => (
                <div key={prop} className="flex items-center justify-between px-2">
                  <span className="text-xs text-muted-foreground">{prop}</span>
                  <div className="w-14 h-5 rounded bg-white/8 border border-white/10 text-xs flex items-center justify-end px-2 text-muted-foreground">
                    100
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t border-white/8 p-3 h-28">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xs text-muted-foreground">00:00:00</div>
              <div className="flex-1 h-px bg-white/10 relative">
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-2 h-4 bg-white/50 rounded-sm" />
              </div>
              <div className="text-xs text-muted-foreground">00:01:30</div>
            </div>
            <div className="flex flex-col gap-1.5 mt-3">
              <div className="flex items-center gap-2">
                <div className="w-12 text-xs text-muted-foreground">Video</div>
                <div className="flex-1 h-6 rounded bg-blue-500/20 border border-blue-500/30" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 text-xs text-muted-foreground">Audio</div>
                <div className="flex-1 h-5 rounded bg-green-500/20 border border-green-500/30 ml-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Coming soon message */}
        <div className="inline-flex items-center gap-2 text-sm text-amber-400 mb-4 rounded-full border border-amber-400/20 bg-amber-400/5 px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          Editor coming soon — rewrite in progress
        </div>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
          The new editor is being built from the ground up with a Rust core. In the meantime, use the fully functional classic version.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://opencut.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
          >
            Use Classic Editor
          </a>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-white/15 text-white/80 font-medium px-6 py-3 rounded-lg hover:border-white/30 hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { cn } from '#/lib/utils'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-border/50 bg-background/80 backdrop-blur-md'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="6" fill="white" />
              <path d="M8 9L20 14L8 19V9Z" fill="#111" />
            </svg>
            <span className="font-semibold text-lg tracking-tight">OpenCut</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a
              href="https://github.com/opencutvideo/Opencut"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://discord.gg/zmR9N35cjK"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Discord
            </a>
            <a
              href="https://github.com/opencutvideo/Opencut/blob/main/changelog"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Changelog
            </a>
          </nav>

          <Link
            to="/editor"
            className="hidden md:inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-4 py-2 rounded-md hover:bg-white/90 transition-colors"
          >
            Open Editor
          </Link>

          {/* Mobile menu */}
          <a
            href="https://github.com/opencutvideo/Opencut"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <footer className="border-t border-border/30 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="6" fill="white" fillOpacity="0.1" />
              <path d="M8 9L20 14L8 19V9Z" fill="white" fillOpacity="0.6" />
            </svg>
            <span>OpenCut — Free & Open Source</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/opencutvideo/Opencut" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="https://discord.gg/zmR9N35cjK" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Discord</a>
            <a href="https://x.com/opencutapp" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter/X</a>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

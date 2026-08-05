import { createRootRoute, Outlet, Link, useRouterState } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { cn } from '#/lib/utils'

export const Route = createRootRoute({
  component: RootLayout,
})

const navLinks = [
  { label: 'About', to: '/about' as const },
  { label: 'GitHub', href: 'https://github.com/opencutvideo/Opencut' },
  { label: 'Discord', href: 'https://discord.gg/zmR9N35cjK' },
]

function RootLayout() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const routerState = useRouterState()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [routerState.location.pathname])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-border/50 bg-background/90 backdrop-blur-md'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="6" fill="white" />
              <path d="M8 9L20 14L8 19V9Z" fill="#111" />
            </svg>
            <span className="font-semibold text-base tracking-tight">OpenCut</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
            {navLinks.map((link) =>
              'to' in link ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className="px-3 py-1.5 rounded-md hover:text-foreground hover:bg-white/5 transition-colors"
                  activeProps={{ className: 'text-foreground' }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-md hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>

          {/* Desktop CTA */}
          <Link
            to="/editor"
            className="hidden md:inline-flex items-center gap-1.5 bg-white text-black text-sm font-medium px-4 py-2 rounded-md hover:bg-white/90 transition-colors"
          >
            Open Editor
          </Link>

          {/* Mobile: hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={cn('block w-5 h-px bg-white/70 transition-all duration-200', menuOpen && 'rotate-45 translate-y-[7px]')} />
            <span className={cn('block w-5 h-px bg-white/70 transition-all duration-200', menuOpen && 'opacity-0')} />
            <span className={cn('block w-5 h-px bg-white/70 transition-all duration-200', menuOpen && '-rotate-45 -translate-y-[7px]')} />
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-200 border-t border-white/5',
            menuOpen ? 'max-h-64 bg-background/95 backdrop-blur-md' : 'max-h-0',
          )}
        >
          <nav className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) =>
              'to' in link ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className="px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ),
            )}
            <Link
              to="/editor"
              className="mt-2 inline-flex items-center justify-center bg-white text-black text-sm font-medium px-4 py-2.5 rounded-md hover:bg-white/90 transition-colors"
            >
              Open Editor
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <footer className="border-t border-border/30 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="6" fill="white" fillOpacity="0.1" />
              <path d="M8 9L20 14L8 19V9Z" fill="white" fillOpacity="0.6" />
            </svg>
            <span>OpenCut — Free & Open Source</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <a href="https://github.com/opencutvideo/Opencut" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="https://discord.gg/zmR9N35cjK" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Discord</a>
            <a href="https://x.com/opencutapp" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter / X</a>
            <span className="text-white/20">·</span>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

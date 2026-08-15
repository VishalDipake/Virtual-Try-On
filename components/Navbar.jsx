'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/history', label: 'History' }
]

export default function Navbar() {
  const pathname = usePathname()
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'VirtualTryOn'

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent/20 text-sm font-bold text-accent">
            VT
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">{appName}</span>
        </Link>

        <nav className="flex items-center gap-2 rounded-xl border border-border bg-card/80 p-1">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm transition ${
                  isActive
                    ? 'bg-accent text-white shadow-lg shadow-accent/30'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

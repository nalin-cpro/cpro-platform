'use client'
import { useState } from 'react'
import Link from 'next/link'

const navItems: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/digital-marketing',
    children: [
      { label: 'Digital Marketing', href: '/digital-marketing' },
      { label: 'CRO', href: '/cro' },
      { label: 'Marketplaces', href: '/marketplaces' },
      { label: 'Zoho Services', href: '/zoho' },
      { label: 'Web Development', href: '/development' },
    ],
  },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <>
      {/* Desktop / tablet top bar */}
      <nav className="fixed top-0 w-full z-50 glass-header shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">bolt</span>
            <span className="text-xl font-black tracking-tighter text-on-background font-headline">CONVERSIONPRO</span>
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            {navItems.map(item => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-secondary font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl shadow-card-hover py-2 z-50">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-5 py-2.5 text-sm font-medium text-on-background hover:text-primary hover:bg-surface-container-low transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="bg-primary text-on-primary px-5 py-2 rounded-full font-headline font-bold text-sm tracking-tight hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            GET AUDIT
          </Link>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-header border-t border-outline-variant/10 px-6 py-3 flex justify-between items-center z-50">
        {[
          { label: 'Home',     icon: 'home',      href: '/' },
          { label: 'Services', icon: 'grid_view',  href: '/digital-marketing' },
          { label: 'Work',     icon: 'work',       href: '/case-studies' },
          { label: 'Contact',  icon: 'chat',       href: '/contact' },
        ].map(item => (
          <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1 text-secondary hover:text-primary transition-colors">
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  )
}

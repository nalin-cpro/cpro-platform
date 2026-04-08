'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const nav = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Conversion Rate Optimization', href: '/conversion-rate-optimization' },
      { label: 'Web Design', href: '/services/web-design' },
      { label: 'Zoho Services', href: '/zoho-services' },
      { label: 'Digital Marketing', href: '/digital-marketing' },
      { label: 'Social Media Marketing', href: '/digital-marketing/social-media-marketing' },
      { label: 'Email Marketing', href: '/digital-marketing/email-marketing' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="bg-white border-b border-ink-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/brand/logo.png"
              alt="ConversionPro LLP"
              width={180}
              height={48}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map(item => (
              <div key={item.href} className="relative">
                {item.children ? (
                  <div
                    onMouseEnter={() => setOpenDropdown(item.href)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-ink-800 hover:text-brand-500 transition uppercase tracking-wide">
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {openDropdown === item.href && (
                      <div className="absolute top-full left-0 w-60 bg-white border border-ink-100 rounded-lg shadow-xl py-2 z-50">
                        {item.children.map(child => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-ink-700 hover:text-brand-500 hover:bg-ink-100 transition"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-sm font-semibold text-ink-800 hover:text-brand-500 transition uppercase tracking-wide"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-full transition shadow-sm uppercase tracking-wide"
            >
              Get Free Audit
            </Link>
            <button
              className="lg:hidden p-2 rounded-md text-ink-700 hover:bg-ink-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-ink-100 px-4 py-4 space-y-1">
          {nav.map(item => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="block px-3 py-2 text-sm font-semibold text-ink-800 hover:text-brand-500 uppercase tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children?.map(child => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block pl-6 py-1.5 text-sm text-ink-600 hover:text-brand-500"
                  onClick={() => setMobileOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href="/contact"
            className="block mt-3 px-4 py-3 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-full text-center uppercase tracking-wide"
            onClick={() => setMobileOpen(false)}
          >
            Get Free Audit
          </Link>
        </div>
      )}
    </header>
  )
}

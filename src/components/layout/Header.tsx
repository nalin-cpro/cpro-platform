'use client'
import { useState, useEffect, type CSSProperties } from 'react'
import Link from 'next/link'

const navItems: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Digital Marketing', href: '/digital-marketing' },
      { label: 'CRO', href: '/cro' },
      { label: 'Marketplace Management', href: '/marketplaces' },
      { label: 'Zoho Services', href: '/zoho' },
      { label: 'Web Development', href: '/development' },
    ],
  },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: 'all 0.35s ease',
    background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: scrolled ? '0 2px 20px rgba(6,43,62,0.08)' : 'none',
  }

  return (
    <header style={headerStyle}>
      <div className="container-site" style={{ display: 'flex', alignItems: 'center', height: 80, gap: 40 }}>
        {/* Logo */}
        <Link href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.png" alt="ConversionPro LLP" style={{ height: 40, width: 'auto' }} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
          {navItems.map(item => (
            <div
              key={item.label}
              style={{ position: 'relative' }}
              onMouseEnter={() => item.children && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href={item.href} className="nav-link" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 4 }}>
                {item.label}
                {item.children && <span style={{ fontSize: 10, opacity: 0.6 }}>▾</span>}
              </Link>

              {item.children && activeDropdown === item.label && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: '#ffffff',
                  borderRadius: 20,
                  padding: '12px 8px',
                  minWidth: 240,
                  boxShadow: '0 8px 40px rgba(6,43,62,0.15)',
                  zIndex: 200,
                }}>
                  {item.children.map(child => (
                    <Link
                      key={child.label}
                      href={child.href}
                      style={{
                        display: 'block',
                        padding: '10px 16px',
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#062B3E',
                        textDecoration: 'none',
                        borderRadius: 12,
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F0F2F4')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA button */}
        <div className="hidden-mobile" style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <Link href="/contact" className="btn-primary" style={{ fontSize: 14, padding: '12px 24px' }}>
            Get a free audit
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          className="show-mobile"
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            display: 'inline-block',
          }}
        >
          <div style={{ width: 24, height: 2, background: '#062B3E', marginBottom: 5, transition: 'all 0.3s' }} />
          <div style={{ width: 24, height: 2, background: '#062B3E', marginBottom: 5 }} />
          <div style={{ width: 24, height: 2, background: '#062B3E', transition: 'all 0.3s' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: '#ffffff', padding: '20px 24px', borderTop: '1px solid #F0F2F4' }}>
          {navItems.map(item => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '12px 0',
                fontWeight: 500,
                color: '#062B3E',
                textDecoration: 'none',
                borderBottom: '1px solid #F0F2F4',
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-primary"
            onClick={() => setMobileOpen(false)}
            style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
          >
            Get a free audit
          </Link>
        </div>
      )}
    </header>
  )
}

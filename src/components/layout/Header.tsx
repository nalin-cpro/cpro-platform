'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Capabilities',
    href: '/digital-marketing',
    children: [
      { label: 'Digital Marketing', href: '/digital-marketing' },
      { label: 'CRO', href: '/cro' },
      { label: 'Marketplace Management', href: '/marketplaces' },
      { label: 'Zoho One', href: '/zoho' },
      { label: 'Web Development', href: '/development' },
    ],
  },
  { label: 'Insights', href: '/blog' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(249,249,255,0.92)' : 'rgba(249,249,255,0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: scrolled ? '0 1px 24px rgba(13,28,50,0.08)' : 'none',
        transition: 'all 0.3s ease',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}>
        <nav style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 24px', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
              fontSize: 20, fontWeight: 800, color: '#0d1c32',
              letterSpacing: '-0.03em',
            }}>
              Conversion<span style={{ color: '#b72301' }}>Pro</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
            {navItems.map(item => (
              <div key={item.label} style={{ position: 'relative' }}
                onMouseEnter={() => item.children && setDropdown(true)}
                onMouseLeave={() => item.children && setDropdown(false)}
              >
                <Link href={item.href} style={{
                  fontFamily: 'var(--font-inter, "Inter", sans-serif)',
                  fontSize: 14, fontWeight: 500,
                  color: '#475569', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: 4,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#b72301')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
                >
                  {item.label}
                  {item.children && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && dropdown && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0,
                    background: '#ffffff', borderRadius: 16,
                    padding: '8px', minWidth: 220,
                    boxShadow: '0 8px 40px rgba(13,28,50,0.12)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    marginTop: 8,
                  }}>
                    {item.children.map(child => (
                      <Link key={child.label} href={child.href} style={{
                        display: 'block', padding: '10px 14px',
                        fontSize: 14, fontWeight: 500,
                        color: '#334155', textDecoration: 'none',
                        borderRadius: 10, transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/contact" style={{
              background: '#b72301',
              color: '#ffffff',
              padding: '9px 22px',
              borderRadius: 9999,
              fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
              fontSize: 14, fontWeight: 700,
              textDecoration: 'none',
              transition: 'background 0.2s ease, transform 0.15s ease',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#ff5733'; e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#b72301'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Talk to Us
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-only"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              aria-label="Menu"
            >
              <div style={{ width: 22, height: 2, background: '#334155', marginBottom: 5, borderRadius: 2 }} />
              <div style={{ width: 22, height: 2, background: '#334155', marginBottom: 5, borderRadius: 2 }} />
              <div style={{ width: 22, height: 2, background: '#334155', borderRadius: 2 }} />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            background: '#ffffff',
            borderTop: '1px solid #f1f5f9',
            padding: '12px 24px 24px',
          }}>
            {navItems.map(item => (
              <div key={item.label}>
                <Link href={item.href} onClick={() => setMobileOpen(false)} style={{
                  display: 'block', padding: '13px 0',
                  fontSize: 15, fontWeight: 500, color: '#334155',
                  textDecoration: 'none',
                  borderBottom: '1px solid #f1f5f9',
                }}>
                  {item.label}
                </Link>
                {item.children && item.children.map(child => (
                  <Link key={child.label} href={child.href} onClick={() => setMobileOpen(false)} style={{
                    display: 'block', padding: '10px 0 10px 16px',
                    fontSize: 13, fontWeight: 400, color: '#64748b',
                    textDecoration: 'none',
                    borderBottom: '1px solid #f8fafc',
                  }}>
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)} style={{
              display: 'block', textAlign: 'center',
              background: '#b72301', color: '#ffffff',
              padding: '13px', borderRadius: 9999,
              fontWeight: 700, fontSize: 14,
              textDecoration: 'none', marginTop: 16,
            }}>
              Talk to Us
            </Link>
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 768px) {
          .mobile-only { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  )
}

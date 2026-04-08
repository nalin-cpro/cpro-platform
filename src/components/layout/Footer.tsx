import Link from 'next/link'
import type { CSSProperties } from 'react'

const footerLinks = {
  Services: [
    { label: 'Digital Marketing', href: '/digital-marketing' },
    { label: 'CRO', href: '/cro' },
    { label: 'Marketplace Management', href: '/marketplaces' },
    { label: 'Zoho Services', href: '/zoho' },
    { label: 'Web Development', href: '/development' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  'Quick Links': [
    { label: 'CRO Audit (Free)', href: '/contact' },
    { label: 'Zoho Demo', href: '/contact' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
}

const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 48,
  marginBottom: 60,
}

export default function Footer() {
  return (
    <footer style={{ background: '#062B3E', color: '#ffffff', paddingTop: 80, paddingBottom: 40 }}>
      <div className="container-site">
        <div style={gridStyle}>
          {/* Brand col */}
          <div style={{ minWidth: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo.png"
              alt="ConversionPro LLP"
              style={{ height: 40, width: 'auto', marginBottom: 20, filter: 'brightness(0) invert(1)' }}
            />
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', marginBottom: 24, maxWidth: 280 }}>
              Data-driven digital marketing, CRO and Zoho consulting for eCommerce brands across India.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'LI', href: 'https://linkedin.com/company/conversionpro' },
                { label: 'IG', href: 'https://instagram.com/conversionprollp' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#ffffff',
                    textDecoration: 'none',
                    transition: 'background 0.35s ease',
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4
                style={{
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: 20,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {heading}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: 14,
                        color: 'rgba(255,255,255,0.65)',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
            © {new Date().getFullYear()} ConversionPro LLP. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
            Pune · Mumbai · Bangalore · Delhi · Hyderabad · Chennai
          </p>
        </div>
      </div>
    </footer>
  )
}

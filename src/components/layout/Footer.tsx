import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0f172a', padding: '64px 24px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 40, marginBottom: 48,
        }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{
              fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
              fontSize: 18, fontWeight: 800, color: '#ffffff',
              letterSpacing: '-0.02em', marginBottom: 14,
            }}>
              Conversion<span style={{ color: '#f97316' }}>Pro</span> LLP
            </div>
            <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7, maxWidth: 220 }}>
              Pune&apos;s leading CRO and digital marketing agency. Data-obsessed, result-driven.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <a href="https://linkedin.com/company/conversionpro" target="_blank" rel="noopener noreferrer" style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', color: '#94a3b8',
                fontSize: 12, fontWeight: 700, transition: 'background 0.2s ease',
              }}>in</a>
              <a href="https://instagram.com/conversionprollp" target="_blank" rel="noopener noreferrer" style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', color: '#94a3b8',
                fontSize: 12, fontWeight: 700, transition: 'background 0.2s ease',
              }}>ig</a>
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Capabilities</h4>
            {[
              { label: 'Digital Marketing', href: '/digital-marketing' },
              { label: 'CRO', href: '/cro' },
              { label: 'Marketplaces', href: '/marketplaces' },
              { label: 'Zoho One', href: '/zoho' },
              { label: 'Web Development', href: '/development' },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{ display: 'block', fontSize: 13, color: '#94a3b8', textDecoration: 'none', marginBottom: 10 }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Company</h4>
            {[
              { label: 'About Us', href: '/about' },
              { label: 'Case Studies', href: '/case-studies' },
              { label: 'Insights', href: '/blog' },
              { label: 'Contact Us', href: '/contact' },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{ display: 'block', fontSize: 13, color: '#94a3b8', textDecoration: 'none', marginBottom: 10 }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Cities */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Cities</h4>
            {[
              { label: 'Pune', href: '/cro/pune' },
              { label: 'Mumbai', href: '/cro/mumbai' },
              { label: 'Bangalore', href: '/cro/bangalore' },
              { label: 'Delhi', href: '/cro/delhi' },
              { label: 'Hyderabad', href: '/cro/hyderabad' },
              { label: 'Chennai', href: '/cro/chennai' },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{ display: 'block', fontSize: 13, color: '#94a3b8', textDecoration: 'none', marginBottom: 10 }}>
                {l.label}
              </Link>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: 24,
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: 8,
        }}>
          <p style={{ fontSize: 12, color: '#475569' }}>© {new Date().getFullYear()} ConversionPro LLP. All rights reserved.</p>
          <p style={{ fontSize: 12, color: '#475569' }}>Made with precision in Pune.</p>
        </div>
      </div>
    </footer>
  )
}

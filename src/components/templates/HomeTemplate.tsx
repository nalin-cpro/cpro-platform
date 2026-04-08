import Link from 'next/link'
import type { CSSProperties } from 'react'

interface HomeBody {
  hero_title?: string
  hero_subtitle?: string
}

const services = [
  { icon: '📈', title: 'Digital Marketing', desc: 'SEO, PPC, Meta Ads, content & email — full-funnel growth that compounds.' },
  { icon: '🎯', title: 'CRO',                desc: 'Heatmaps, A/B testing, funnel optimisation — turn traffic into revenue.' },
  { icon: '🛒', title: 'Marketplaces',       desc: 'Amazon, Flipkart, listings, ads — managed end-to-end.' },
  { icon: '⚡', title: 'Zoho One',           desc: 'CRM, marketing, commerce — full Zoho stack implementation.' },
  { icon: '💻', title: 'Web Development',    desc: 'Next.js, Shopify, WordPress — built for speed and conversions.' },
]

const features = [
  { icon: '🔍', title: 'Research-led', desc: 'Every recommendation backed by user data, heatmaps, and funnel analytics.' },
  { icon: '🚀', title: 'Fast results', desc: 'Most clients see meaningful lift in 30–90 days, not 12 months.' },
  { icon: '🤝', title: 'Long-term partner', desc: '98% client retention. We work with you for years, not weeks.' },
]

const stats = [
  { num: '+8',   label: 'Years Experience' },
  { num: '+150', label: 'Clients Served' },
  { num: '+500', label: 'Projects Delivered' },
]

const portfolio = [
  { title: 'D2C Footwear Brand', cat: 'CRO', desc: '40% RTO reduction in 90 days' },
  { title: 'B2B SaaS Co.', cat: 'CRO', desc: '+47% trial-to-paid conversion' },
  { title: 'Fashion Marketplace', cat: 'Marketplaces', desc: '3x Amazon revenue in 6 months' },
  { title: 'Manufacturing Group', cat: 'Zoho', desc: 'Zoho One rollout, 5 entities' },
]

const filterTabs = ['ALL', 'CRO', 'Zoho', 'Marketplaces', 'Development']

const clientLogos = ['ACME Co.', 'BrightCart', 'NorthStar', 'Plyform', 'Velura', 'Kindred', 'Lumio', 'Atrium']

const sectionStyle: CSSProperties = { padding: '100px 0' }

export function HomeTemplate({ page }: { page: { title: string; bodyJson: HomeBody | null } }) {
  const body = page.bodyJson || {}
  const heroTitle = body.hero_title || 'UX-led conversion that drives revenue'
  const heroSub = body.hero_subtitle || "ConversionPro LLP is a Pune-based agency for CRO, Zoho consulting, marketplaces, and digital marketing. We help eCommerce brands and mid-sized businesses across India turn traffic into customers."

  return (
    <>
      {/* ─────────────────── 1. HERO ─────────────────── */}
      <section style={{ background: '#ffffff', padding: '80px 0 100px' }}>
        <div className="container-site" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 60, alignItems: 'center' }}>
          <div>
            <span className="section-label">WHAT WE DO</span>
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, marginBottom: 24, lineHeight: 1.05 }}>
              {heroTitle.split(' ').map((word, i, arr) => {
                // Highlight the longest word with gradient — feels like Ewebot accent treatment
                const longest = arr.reduce((a, b) => (b.length > a.length ? b : a), '')
                if (word === longest) return <span key={i} className="text-gradient">{word} </span>
                return word + ' '
              })}
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--color-body)', marginBottom: 32, maxWidth: 540 }}>
              {heroSub}
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">Get a free audit →</Link>
              <Link href="/case-studies" className="btn-outline">See case studies</Link>
            </div>
          </div>

          {/* Floating bento card grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="bento-card" style={{ padding: 32, background: 'var(--color-surface)', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 36 }}>📈</div>
              <div>
                <p style={{ fontSize: 13, color: 'var(--color-body)', marginBottom: 4 }}>Avg conversion lift</p>
                <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-header)', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>+47%</p>
              </div>
            </div>
            <div className="bento-card-dark" style={{ padding: 32, minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 36 }}>🎯</div>
              <div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Avg time to result</p>
                <p style={{ fontSize: 32, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>90d</p>
              </div>
            </div>
            <div className="bento-card" style={{ padding: 32, background: 'var(--gradient-brand)', color: '#fff', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 36 }}>⚡</div>
              <div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 4 }}>Clients served</p>
                <p style={{ fontSize: 32, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>+150</p>
              </div>
            </div>
            <div className="bento-card" style={{ padding: 32, background: '#ffffff', border: '1px solid var(--color-border)', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 36 }}>🚀</div>
              <div>
                <p style={{ fontSize: 13, color: 'var(--color-body)', marginBottom: 4 }}>Client retention</p>
                <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-header)', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>98%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── 2. FEATURE STRIP (DARK) ─────────────────── */}
      <section className="section-dark">
        <div className="container-site">
          <div className="grid-3">
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 30,
                  padding: 40,
                  transition: 'all 0.35s ease',
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 20 }}>{f.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 600, color: '#ffffff', marginBottom: 12 }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 20 }}>{f.desc}</p>
                <Link href="/about" style={{ fontSize: 14, color: '#FF6B4A', fontWeight: 500, textDecoration: 'none' }}>
                  Discover more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── 3. PORTFOLIO ─────────────────── */}
      <section style={sectionStyle}>
        <div className="container-site">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
            <div>
              <span className="section-label">CASE STUDIES</span>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700 }}>
                Selected work from <span className="text-gradient">recent</span> engagements
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {filterTabs.map((tab, i) => (
                <button key={tab} className={`chip ${i === 0 ? 'active' : ''}`}>{tab}</button>
              ))}
            </div>
          </div>

          <div className="grid-2">
            {portfolio.map((p, i) => (
              <Link key={i} href="/case-studies" style={{ textDecoration: 'none' }}>
                <div className="bento-card" style={{ background: 'var(--color-surface)' }}>
                  <div style={{
                    aspectRatio: '16/10',
                    background: i % 2 === 0 ? 'var(--gradient-brand)' : 'linear-gradient(135deg, #062B3E 0%, #0a3d54 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: 32,
                  }}>
                    <span className="chip" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                      {p.cat}
                    </span>
                  </div>
                  <div style={{ padding: 28 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--color-body)' }}>{p.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── 4. ABOUT STRIP ─────────────────── */}
      <section className="section-surface">
        <div className="container-site" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 60, alignItems: 'center' }}>
          <div>
            <span className="section-label">WHAT WE OFFER</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, marginBottom: 24 }}>
              A complete <span className="text-gradient">growth partner</span> for ambitious brands
            </h2>
            <Link href="/about" className="btn-primary">Discover more →</Link>
          </div>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--color-body)', marginBottom: 16 }}>
              We combine the analytical rigour of a research consultancy with the speed of a creative agency. Our team uses
              heatmaps, session replays, funnel data, and customer interviews to find exactly where your revenue is leaking — then
              fixes it.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--color-body)' }}>
              We&apos;re a certified Zoho One implementation partner, Google Ads partner, and have helped 150+ Indian brands
              scale through CRO and marketplace marketing.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────── 5. STATS BAR (DARK) ─────────────────── */}
      <section className="section-dark">
        <div className="container-site">
          <div className="grid-3" style={{ gap: 40 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  flexShrink: 0,
                }}>
                  →
                </div>
                <div>
                  <p style={{ fontSize: 48, fontWeight: 700, color: '#ffffff', lineHeight: 1, fontFamily: 'var(--font-inter), Inter, sans-serif', letterSpacing: '-0.03em' }}>{s.num}</p>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── 6. SERVICES GRID ─────────────────── */}
      <section style={sectionStyle}>
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="section-label">SERVICES</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, maxWidth: 700, margin: '0 auto' }}>
              Full-stack growth services for <span className="text-gradient">ambitious</span> brands
            </h2>
          </div>
          <div className="grid-3">
            {services.map((s, i) => (
              <Link key={i} href="/services" style={{ textDecoration: 'none' }}>
                <div className="bento-card" style={{
                  padding: 36,
                  background: i === 0 ? 'var(--color-header)' : (i === 1 ? 'var(--gradient-brand)' : '#ffffff'),
                  border: i > 1 ? '1px solid #ebebeb' : 'none',
                  color: i < 2 ? '#fff' : 'var(--color-header)',
                  minHeight: 240,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{ fontSize: 40, marginBottom: 24 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12, color: i < 2 ? '#fff' : 'var(--color-header)' }}>{s.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: i < 2 ? 'rgba(255,255,255,0.8)' : 'var(--color-body)', flex: 1 }}>{s.desc}</p>
                  <p style={{ fontSize: 14, fontWeight: 500, marginTop: 20, color: i < 2 ? '#fff' : 'var(--color-accent)' }}>Learn more →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── 7. CLIENT LOGOS MARQUEE ─────────────────── */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--color-surface)', borderBottom: '1px solid var(--color-surface)' }}>
        <div className="container-site" style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-body)' }}>
            Trusted by 150+ brands across India
          </p>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <span
                key={i}
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: 'var(--color-body)',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  opacity: 0.5,
                }}
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── 8. NEWSLETTER / CTA ─────────────────── */}
      <section style={{ padding: '100px 0' }}>
        <div className="container-site">
          <div style={{
            background: 'var(--gradient-brand)',
            borderRadius: 30,
            padding: '80px 40px',
            textAlign: 'center',
            color: '#ffffff',
          }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
              Ready to grow your business?
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', maxWidth: 600, margin: '0 auto 36px' }}>
              Get a free CRO audit, growth roadmap, and Zoho readiness assessment. No strings attached.
            </p>
            <form style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  minWidth: 240,
                  padding: '14px 24px',
                  borderRadius: 100,
                  border: 'none',
                  background: 'rgba(255,255,255,0.95)',
                  color: 'var(--color-header)',
                  fontSize: 15,
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '14px 32px',
                  borderRadius: 100,
                  border: 'none',
                  background: 'var(--color-header)',
                  color: '#ffffff',
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                Get my audit →
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

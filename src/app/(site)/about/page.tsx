import Link from 'next/link'

export const revalidate = 0

export default function AboutPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: aboutCSS }} />
      <div className="cpro-about">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <span>About</span>
        </div>

        {/* Hero */}
        <section className="hero">
          <div className="hero-inner">
            <div className="page-tag">About ConversionPro LLP</div>
            <h1 className="hero-headline">
              Pune&apos;s <span className="accent">data-obsessed</span> growth agency.
            </h1>
            <p className="hero-body">
              We are a team of 50+ performance marketers, CRO specialists, and Zoho implementation experts based in Pune. Since 2018, we&apos;ve helped 150+ brands across India scale profitably through data-driven marketing and conversion optimisation.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="stats">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="si-val">8<span>+</span></div>
              <div className="si-label">Years in Business</div>
            </div>
            <div className="stat-item">
              <div className="si-val">150<span>+</span></div>
              <div className="si-label">Brands Scaled</div>
            </div>
            <div className="stat-item">
              <div className="si-val">50<span>+</span></div>
              <div className="si-label">Expert Team</div>
            </div>
            <div className="stat-item">
              <div className="si-val">₹500<span>M</span></div>
              <div className="si-label">Managed Ad Spend</div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="values">
          <div className="values-header">
            <div className="section-label">How We Work</div>
            <h2 className="section-headline">Three principles that guide<br/>every engagement.</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="v-num">01</div>
              <div className="v-title">Data First</div>
              <div className="v-desc">Every decision — from creative direction to bid strategy — is backed by evidence. Heatmaps, session recordings, and statistical significance, not gut feel.</div>
            </div>
            <div className="value-card">
              <div className="v-num">02</div>
              <div className="v-title">Speed to Value</div>
              <div className="v-desc">Our sprint-based methodology delivers tangible results within 30–90 days. No 6-month discovery phases, no endless deck-reviews — just measurable revenue impact.</div>
            </div>
            <div className="value-card">
              <div className="v-num">03</div>
              <div className="v-title">Embedded Partnership</div>
              <div className="v-desc">We work as part of your team — direct Slack access, shared OKRs, and strategic alignment with your growth goals from day one. Not an external vendor.</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-card">
            <div className="cta-tag">Free Growth Audit</div>
            <h2 className="cta-headline">Let&apos;s grow your business together.</h2>
            <p className="cta-body">Book a 30-minute call with our team. We&apos;ll audit your current funnel, identify quick-win opportunities, and share the frameworks we&apos;ve used to scale 150+ Indian brands.</p>
            <Link href="/contact" className="btn-cta">
              Talk to Us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}

const aboutCSS = `
  :root {
    --navy: #1A3A5C;
    --navy-dark: #0F2338;
    --orange: #E84318;
    --orange-light: #F05830;
    --cream: #F7F5F2;
    --white: #FFFFFF;
    --text-body: #3A4A5C;
    --text-muted: #6A7A8A;
    --border: rgba(26, 58, 92, 0.1);
    --font-display: 'Plus Jakarta Sans', sans-serif;
    --font-body: 'Outfit', sans-serif;
  }
  .cpro-about { font-family: var(--font-body); color: var(--text-body); background: var(--cream); min-height: 100vh; }
  .cpro-about * { box-sizing: border-box; }

  .cpro-about .breadcrumb {
    padding: 20px 5% 0;
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 0.8rem; color: var(--text-muted);
  }
  .cpro-about .breadcrumb a { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
  .cpro-about .breadcrumb a:hover { color: var(--orange); }
  .cpro-about .breadcrumb-sep { opacity: 0.4; }

  .cpro-about .hero {
    padding: 3rem 5% 5rem;
    position: relative; overflow: hidden;
  }
  .cpro-about .hero::before {
    content: ''; position: absolute; top: -100px; right: -200px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(232,67,24,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .cpro-about .hero-inner { max-width: 820px; position: relative; }
  .cpro-about .page-tag {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(232,67,24,0.08);
    border: 1px solid rgba(232,67,24,0.2);
    color: var(--orange);
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 0.35rem 0.9rem 0.35rem 0.6rem;
    border-radius: 100px; margin-bottom: 1.5rem;
  }
  .cpro-about .page-tag::before {
    content: ''; width: 6px; height: 6px;
    background: var(--orange); border-radius: 50%;
    animation: aboutPulse 2s infinite;
  }
  @keyframes aboutPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.5); }
  }
  .cpro-about .hero-headline {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 4.5vw, 3.6rem);
    font-weight: 800; line-height: 1.06;
    letter-spacing: -0.03em; color: var(--navy-dark);
    margin-bottom: 1.5rem;
  }
  .cpro-about .hero-headline .accent { color: var(--orange); font-style: italic; }
  .cpro-about .hero-body {
    font-size: 1.1rem; line-height: 1.8;
    color: var(--text-body); font-weight: 300; max-width: 680px;
  }

  .cpro-about .stats { padding: 0 5% 5rem; }
  .cpro-about .stats-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--border); border-radius: 20px;
    overflow: hidden; gap: 1px; background: var(--border);
  }
  .cpro-about .stat-item {
    background: var(--white); padding: 2.5rem 2rem; text-align: center;
    transition: background 0.2s;
  }
  .cpro-about .stat-item:hover { background: var(--navy-dark); }
  .cpro-about .stat-item:hover .si-val { color: var(--white); }
  .cpro-about .stat-item:hover .si-val span { color: var(--orange); }
  .cpro-about .stat-item:hover .si-label { color: rgba(255,255,255,0.5); }
  .cpro-about .si-val {
    font-family: var(--font-display); font-size: 2.5rem; font-weight: 800;
    color: var(--navy-dark); letter-spacing: -0.04em; line-height: 1;
    margin-bottom: 0.4rem; transition: color 0.2s;
  }
  .cpro-about .si-val span { color: var(--orange); transition: color 0.2s; }
  .cpro-about .si-label {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--text-muted);
    transition: color 0.2s;
  }

  .cpro-about .values { padding: 5rem 5%; background: var(--white); }
  .cpro-about .values-header { max-width: 600px; margin-bottom: 3rem; }
  .cpro-about .section-label {
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--orange); margin-bottom: 0.75rem;
  }
  .cpro-about .section-headline {
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 3vw, 2.4rem);
    font-weight: 800; line-height: 1.1;
    letter-spacing: -0.025em; color: var(--navy-dark);
  }
  .cpro-about .values-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem;
  }
  .cpro-about .value-card {
    border: 1px solid var(--border); border-radius: 18px; padding: 2rem;
    transition: all 0.25s;
  }
  .cpro-about .value-card:hover {
    transform: translateY(-4px); border-color: rgba(232,67,24,0.2);
    box-shadow: 0 16px 40px rgba(26,58,92,0.08);
  }
  .cpro-about .v-num {
    font-family: var(--font-display); font-size: 3.2rem; font-weight: 800;
    color: rgba(26,58,92,0.06); letter-spacing: -0.06em; line-height: 1;
    margin-bottom: 1rem; transition: color 0.25s;
  }
  .cpro-about .value-card:hover .v-num { color: rgba(232,67,24,0.12); }
  .cpro-about .v-title {
    font-family: var(--font-display); font-weight: 700; font-size: 1.1rem;
    color: var(--navy-dark); margin-bottom: 0.6rem;
  }
  .cpro-about .v-desc { font-size: 0.88rem; line-height: 1.7; color: var(--text-muted); }

  .cpro-about .cta-section { padding: 5rem 5% 6rem; background: var(--cream); }
  .cpro-about .cta-card {
    background: var(--orange); border-radius: 32px; padding: 4.5rem;
    text-align: center; position: relative; overflow: hidden;
  }
  .cpro-about .cta-card::before {
    content: ''; position: absolute; top: -100px; left: 50%;
    transform: translateX(-50%); width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%);
  }
  .cpro-about .cta-tag {
    display: inline-block;
    background: rgba(255,255,255,0.15); color: var(--white);
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 0.4rem 1rem; border-radius: 100px; margin-bottom: 1.5rem;
    position: relative;
  }
  .cpro-about .cta-headline {
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 3.5vw, 2.8rem);
    font-weight: 800; color: var(--white);
    letter-spacing: -0.03em; line-height: 1.1;
    margin-bottom: 1.25rem; position: relative;
  }
  .cpro-about .cta-body {
    font-size: 1rem; color: rgba(255,255,255,0.85);
    max-width: 500px; margin: 0 auto 2rem;
    line-height: 1.75; font-weight: 300; position: relative;
  }
  .cpro-about .btn-cta {
    background: var(--white); color: var(--orange);
    padding: 1rem 2.25rem; border-radius: 100px;
    font-family: var(--font-display); font-weight: 700; font-size: 1rem;
    text-decoration: none;
    display: inline-flex; align-items: center; gap: 0.5rem;
    transition: all 0.25s; position: relative;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  }
  .cpro-about .btn-cta:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(0,0,0,0.2); }

  @media (max-width: 1024px) {
    .cpro-about .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .cpro-about .values-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .cpro-about .cta-card { padding: 2.5rem 1.5rem; }
    .cpro-about .stats-grid { grid-template-columns: 1fr 1fr; }
  }
`

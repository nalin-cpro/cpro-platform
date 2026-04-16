'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function HomePage() {
  return <KineticHome />
}

function KineticHome() {
  useEffect(() => {
    const fadeEls = document.querySelectorAll('.cpro-home .fade-up')
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((el) => {
          if (el.isIntersecting) {
            el.target.classList.add('visible')
            observer.unobserve(el.target)
          }
        })
      }, { threshold: 0.1 })
      fadeEls.forEach((el) => observer.observe(el))
      return () => observer.disconnect()
    } else {
      fadeEls.forEach((el) => el.classList.add('visible'))
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: homeCSS }} />
      <div className="cpro-home">

        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-tag">Pune-Based Performance Agency</div>
            <h1 className="hero-headline">
              UX-led conversion that
              <span className="accent">drives revenue.</span>
            </h1>
            <p className="hero-body">
              We turn your digital storefront into a high-performance revenue engine — using behavioural data, rigorous testing, and intentional UX design that converts browsers into buyers.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn-primary">
                Get a free audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/case-studies" className="btn-ghost">
                See case studies
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-card"><div className="stat-num">+47%</div><div className="stat-label">Conversion Lift</div></div>
              <div className="stat-card"><div className="stat-num">90d</div><div className="stat-label">Avg Result Time</div></div>
              <div className="stat-card"><div className="stat-num">150+</div><div className="stat-label">Brands Scaled</div></div>
              <div className="stat-card"><div className="stat-num">3.2×</div><div className="stat-label">ROAS Growth</div></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-stack">
              <div className="card-float card-float-1">
                <div className="float-label">ROAS Growth</div>
                <div className="float-value"><span>+120%</span></div>
                <div className="float-sub">Footwear Brand · Q2 2025</div>
              </div>
              <div className="card-main">
                <div className="card-main-tag">Live Performance Dashboard</div>
                <div className="card-main-title">BrightCart Checkout<br/>Funnel Optimisation</div>
                <div className="metric-row">
                  <div className="metric-pill"><strong>+47%</strong> CVR</div>
                  <div className="metric-pill"><strong>−28%</strong> Drop-off</div>
                </div>
                <div className="progress-bar-wrap">
                  <div className="progress-label"><span>Sessions Analysed</span><span>84,200</span></div>
                  <div className="progress-track"><div className="progress-fill" style={{width:'84%'}}></div></div>
                </div>
                <div className="progress-bar-wrap" style={{marginTop:'0.75rem'}}>
                  <div className="progress-label"><span>Revenue Recovered</span><span>₹38.6L</span></div>
                  <div className="progress-track"><div className="progress-fill" style={{width:'68%', animationDelay:'0.3s'}}></div></div>
                </div>
              </div>
              <div className="card-float card-float-2">
                <div className="float-label">Avg Time to Results</div>
                <div className="float-value">90 <span>days</span></div>
                <div className="float-sub">Guaranteed quick wins</div>
              </div>
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div className="ticker-wrap">
          <div className="ticker-track">
            {['Digital Marketing','CRO & A/B Testing','Amazon & Flipkart','UX Research','Web Development','Zoho CRM','Performance Analytics','Growth Strategy',
              'Digital Marketing','CRO & A/B Testing','Amazon & Flipkart','UX Research','Web Development','Zoho CRM','Performance Analytics','Growth Strategy'].map((t,i) => (
              <div key={i} className="ticker-item">{t}</div>
            ))}
          </div>
        </div>

        {/* WHY US */}
        <section className="why-us fade-up">
          <div className="why-us-grid">
            <div className="why-left">
              <div className="section-label">Why ConversionPro</div>
              <h2 className="section-headline">We engineer growth,<br/>not just marketing.</h2>
              <p className="why-intro">Most agencies stop at traffic. We go further — from the first ad click to final checkout and lifetime retention. Every decision we make is backed by real behavioural data, not gut feeling.</p>
              <div className="why-feature">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                </div>
                <div>
                  <div className="feature-title">Research-Led Decisions</div>
                  <div className="feature-desc">Every pixel move is backed by user behavioural data, session recordings, and heatmaps — no guesswork, ever.</div>
                </div>
              </div>
              <div className="why-feature">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <div>
                  <div className="feature-title">Results in 30–90 Days</div>
                  <div className="feature-desc">We focus on high-impact levers that move the needle quickly, delivering measurable revenue growth within 3 months.</div>
                </div>
              </div>
              <div className="why-feature">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <div className="feature-title">Long-Term Partnership</div>
                  <div className="feature-desc">We embed with your team for continuous, iterative optimisation — not a one-time audit and farewell.</div>
                </div>
              </div>
            </div>
            <div className="why-right">
              <div className="proof-card dark">
                <div className="proof-tag">Footwear Brand</div>
                <div className="proof-metric">+120%</div>
                <div className="proof-title">ROAS Increase</div>
                <div className="proof-desc">Full checkout funnel overhaul using session recordings and A/B testing, resulting in record-breaking conversion lift.</div>
              </div>
              <div className="proof-card">
                <div className="proof-tag">Manufacturing Group</div>
                <div className="proof-metric">−40%</div>
                <div className="proof-title">Lead Acquisition Cost</div>
                <div className="proof-desc">Streamlined B2B lead gen with Zoho One CRM automation, slashing acquisition costs while growing pipeline volume.</div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="services fade-up" id="services">
          <div className="services-header">
            <div>
              <div className="section-label">Our Capabilities</div>
              <h2 className="section-headline">Specialized services built<br/>for conversion and scale.</h2>
            </div>
            <Link href="/contact" className="btn-ghost">
              Need something custom?
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-wrap"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
              <div className="service-title">Digital Marketing</div>
              <div className="service-desc">Full-funnel performance marketing across Meta, Google, and marketplaces — every rupee tracked, every campaign optimised for ROI.</div>
              <Link href="/digital-marketing" className="service-link">Learn more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            </div>
            <div className="service-card">
              <div className="service-icon-wrap"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg></div>
              <div className="service-title">CRO &amp; A/B Testing</div>
              <div className="service-desc">Systematic experimentation using heatmaps, session data, and user research — squeezing every drop of revenue from your existing traffic.</div>
              <Link href="/cro" className="service-link">Learn more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            </div>
            <div className="service-card highlight">
              <div className="service-icon-wrap"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div>
              <div className="service-title">Marketplaces</div>
              <div className="service-desc">Amazon and Flipkart advertising, account management, and catalogue optimisation for maximum shelf visibility and sales velocity.</div>
              <Link href="/marketplaces" className="service-link">Learn more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            </div>
            <div className="service-card">
              <div className="service-icon-wrap"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>
              <div className="service-title">Zoho One &amp; CRM</div>
              <div className="service-desc">Custom CRM configuration and intelligent business process automation to scale your B2B operations without adding headcount.</div>
              <Link href="/zoho" className="service-link">Learn more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            </div>
            <div className="service-card">
              <div className="service-icon-wrap"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
              <div className="service-title">Web Development</div>
              <div className="service-desc">Lightning-fast headless commerce stores and high-converting landing pages built on modern stacks — designed to perform, not just look good.</div>
              <Link href="/development" className="service-link">Learn more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            </div>
            <div className="service-card" style={{background:'rgba(232,67,24,0.04)',borderColor:'rgba(232,67,24,0.15)'}}>
              <div className="service-icon-wrap" style={{background:'rgba(232,67,24,0.1)'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E84318" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              </div>
              <div className="service-title">Don&apos;t see what you need?</div>
              <div className="service-desc">We create custom growth packages tailored to ambitious brands with unique challenges. Let&apos;s talk.</div>
              <Link href="/contact" className="service-link" style={{color:'#E84318'}}>Inquire now <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            </div>
          </div>
        </section>

        {/* NUMBERS */}
        <div className="numbers-section fade-up">
          <div className="numbers-inner">
            <div className="numbers-left">
              <div className="section-label">The Numbers</div>
              <h2 className="section-headline">Your complete growth partner, by the numbers.</h2>
              <p className="numbers-copy">From the first ad click to lifetime customer retention — we cover the entire growth spectrum. Our team of 50+ specialists has managed over ₹500 crore in ad spend across 150+ brands.</p>
              <Link href="/contact" className="btn-primary" style={{display:'inline-flex'}}>
                Start growing today
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="numbers-grid">
              <div className="number-item"><div className="number-val">8<span>+</span></div><div className="number-label">Years of Expertise</div></div>
              <div className="number-item"><div className="number-val">150<span>+</span></div><div className="number-label">Happy Clients</div></div>
              <div className="number-item"><div className="number-val">50<span>+</span></div><div className="number-label">Expert Team</div></div>
              <div className="number-item"><div className="number-val">₹500<span>M</span></div><div className="number-label">Managed Ad Spend</div></div>
            </div>
          </div>
        </div>

        {/* CASE STUDIES */}
        <section className="case-studies fade-up" id="case-studies">
          <div className="cs-header">
            <div>
              <div className="section-label">Impact-Driven Work</div>
              <h2 className="section-headline">Real results for real businesses.</h2>
            </div>
            <Link href="/case-studies" className="btn-ghost">
              View all stories
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="cs-grid">
            <div className="cs-card"><div className="cs-inner"><div className="cs-cat">Footwear Brand · CRO</div><div className="cs-metric">+120%</div><div className="cs-title">ROAS via Checkout Funnel Overhaul</div><div className="cs-desc">A complete UX audit and redesign of the purchase funnel — informed by 80,000+ session recordings — eliminated friction and drove record-breaking conversion rates.</div></div></div>
            <div className="cs-card"><div className="cs-inner"><div className="cs-cat">SaaS Co · Growth</div><div className="cs-metric">+64%</div><div className="cs-title">LTV Expansion</div><div className="cs-desc">Lifecycle email and onboarding redesign increased customer lifetime value significantly for a B2B SaaS platform.</div></div></div>
            <div className="cs-card"><div className="cs-inner"><div className="cs-cat">Manufacturing Group · B2B</div><div className="cs-metric">−40%</div><div className="cs-title">B2B Lead Acquisition Cost</div><div className="cs-desc">Zoho One CRM integration and automated lead scoring reduced acquisition cost by 40% while growing qualified pipeline.</div></div></div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="process-section fade-up">
          <div style={{textAlign:'center',maxWidth:600,margin:'0 auto'}}>
            <div className="section-label">Our Process</div>
            <h2 className="section-headline">From discovery to revenue in 90 days.</h2>
          </div>
          <div className="process-grid">
            <div className="process-step"><div className="step-num">01</div><div className="step-title">Audit &amp; Discovery</div><div className="step-desc">We analyse your funnel, traffic sources, and user behaviour data to identify where revenue is being lost — and where the biggest wins are hiding.</div></div>
            <div className="process-step"><div className="step-num">02</div><div className="step-title">Strategy &amp; Prioritisation</div><div className="step-desc">We build a prioritised roadmap focused on high-impact, quick-win experiments — ranked by projected revenue impact and implementation effort.</div></div>
            <div className="process-step"><div className="step-num">03</div><div className="step-title">Test &amp; Implement</div><div className="step-desc">From A/B tests and UX changes to campaign optimisation — we execute fast, measure rigorously, and iterate continuously.</div></div>
            <div className="process-step"><div className="step-num">04</div><div className="step-title">Scale &amp; Retain</div><div className="step-desc">We embed with your team for ongoing optimisation — compounding small wins into sustained revenue growth and long-term partnership.</div></div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section fade-up">
          <div className="cta-card">
            <div className="cta-tag">Free Growth Audit</div>
            <h2 className="cta-headline">Ready to grow your business?</h2>
            <p className="cta-body">Book a 30-minute growth audit with our specialists. We&apos;ll identify at least 3 quick-win revenue opportunities specific to your brand — no obligation, just high-value strategy.</p>
            <Link href="/contact" className="btn-cta">
              Get my free audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <div className="cta-note">No obligation. No spam. Just actionable insights for your brand.</div>
          </div>
        </section>

      </div>
    </>
  )
}

const homeCSS = `
  :root{--navy:#1A3A5C;--navy-dark:#0F2338;--navy-mid:#234872;--orange:#E84318;--orange-light:#F05830;--orange-glow:rgba(232,67,24,0.15);--cream:#F7F5F2;--white:#FFFFFF;--text-body:#3A4A5C;--text-muted:#6A7A8A;--border:rgba(26,58,92,0.1);--font-display:'Plus Jakarta Sans',sans-serif;--font-body:'Outfit',sans-serif}
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Outfit:wght@300;400;500;600&display=swap');
  .cpro-home *{box-sizing:border-box}.cpro-home{font-family:var(--font-body);color:var(--text-body);background:var(--cream);overflow-x:hidden}
  .cpro-home .hero{min-height:100vh;padding:140px 5% 80px;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;position:relative;overflow:hidden;background:var(--cream)}
  .cpro-home .hero::before{content:'';position:absolute;top:-200px;right:-200px;width:700px;height:700px;background:radial-gradient(circle,rgba(232,67,24,0.08) 0%,transparent 70%);pointer-events:none}
  .cpro-home .hero::after{content:'';position:absolute;bottom:-100px;left:-100px;width:500px;height:500px;background:radial-gradient(circle,rgba(26,58,92,0.06) 0%,transparent 70%);pointer-events:none}
  .cpro-home .hero-tag{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(232,67,24,0.08);border:1px solid rgba(232,67,24,0.2);color:var(--orange);font-size:0.75rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;padding:0.4rem 1rem 0.4rem 0.6rem;border-radius:100px;margin-bottom:2rem}
  .cpro-home .hero-tag::before{content:'';width:6px;height:6px;background:var(--orange);border-radius:50%;animation:cpro-pulse 2s infinite}
  @keyframes cpro-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.5)}}
  .cpro-home .hero-headline{font-family:var(--font-display);font-size:clamp(2.8rem,5vw,4.2rem);font-weight:800;line-height:1.05;letter-spacing:-0.03em;color:var(--navy-dark);margin-bottom:1.5rem}
  .cpro-home .hero-headline .accent{color:var(--orange);font-style:italic;display:block}
  .cpro-home .hero-body{font-size:1.1rem;line-height:1.75;color:var(--text-body);max-width:480px;margin-bottom:2.5rem;font-weight:300}
  .cpro-home .hero-actions{display:flex;gap:1rem;align-items:center;flex-wrap:wrap;margin-bottom:3.5rem}
  .cpro-home .btn-primary{background:var(--orange);color:var(--white);padding:0.85rem 2rem;border-radius:100px;font-family:var(--font-display);font-weight:700;font-size:0.95rem;text-decoration:none;letter-spacing:0.01em;display:inline-flex;align-items:center;gap:0.5rem;transition:all 0.25s;box-shadow:0 8px 24px rgba(232,67,24,0.3)}
  .cpro-home .btn-primary:hover{background:var(--orange-light);transform:translateY(-2px);box-shadow:0 12px 32px rgba(232,67,24,0.4)}
  .cpro-home .btn-ghost{color:var(--navy);font-weight:500;font-size:0.95rem;text-decoration:none;display:inline-flex;align-items:center;gap:0.4rem;border-bottom:2px solid transparent;padding-bottom:2px;transition:all 0.2s}
  .cpro-home .btn-ghost:hover{color:var(--orange);border-color:var(--orange)}
  .cpro-home .hero-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:16px;overflow:hidden}
  .cpro-home .stat-card{background:var(--white);padding:1.5rem 1.25rem;text-align:center;transition:background 0.2s}
  .cpro-home .stat-card:hover{background:var(--navy-dark)}.cpro-home .stat-card:hover .stat-num{color:var(--white)}.cpro-home .stat-card:hover .stat-label{color:rgba(255,255,255,0.6)}
  .cpro-home .stat-num{font-family:var(--font-display);font-size:1.8rem;font-weight:800;color:var(--orange);letter-spacing:-0.03em;transition:color 0.2s}
  .cpro-home .stat-label{font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);margin-top:0.25rem;transition:color 0.2s}
  .cpro-home .hero-visual{position:relative;display:flex;align-items:center;justify-content:center}
  .cpro-home .hero-card-stack{position:relative;width:100%;max-width:460px}
  .cpro-home .card-main{background:var(--navy-dark);border-radius:24px;padding:2.5rem;color:var(--white);position:relative;overflow:hidden;box-shadow:0 40px 80px rgba(15,35,56,0.35)}
  .cpro-home .card-main::before{content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:radial-gradient(circle,rgba(232,67,24,0.3) 0%,transparent 70%)}
  .cpro-home .card-main-tag{font-size:0.7rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--orange);margin-bottom:1rem;opacity:0.9}
  .cpro-home .card-main-title{font-family:var(--font-display);font-size:1.4rem;font-weight:700;line-height:1.3;margin-bottom:1.75rem;color:var(--white)}
  .cpro-home .metric-row{display:flex;gap:1rem;margin-bottom:1.5rem}
  .cpro-home .metric-pill{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:100px;padding:0.5rem 1rem;font-size:0.8rem;color:rgba(255,255,255,0.8);display:flex;align-items:center;gap:0.5rem}
  .cpro-home .metric-pill strong{color:var(--orange);font-family:var(--font-display);font-weight:700}
  .cpro-home .progress-bar-wrap{margin-bottom:0.5rem}.cpro-home .progress-label{display:flex;justify-content:space-between;font-size:0.75rem;color:rgba(255,255,255,0.5);margin-bottom:0.4rem}
  .cpro-home .progress-track{height:4px;background:rgba(255,255,255,0.1);border-radius:100px;overflow:hidden}
  .cpro-home .progress-fill{height:100%;background:linear-gradient(90deg,var(--orange),#FF6B47);border-radius:100px;animation:cpro-fillBar 2s ease forwards}
  @keyframes cpro-fillBar{from{width:0%}}
  .cpro-home .card-float{position:absolute;background:var(--white);border-radius:16px;padding:1rem 1.25rem;box-shadow:0 16px 48px rgba(0,0,0,0.12)}
  .cpro-home .card-float-1{top:-20px;right:-20px;min-width:160px}.cpro-home .card-float-2{bottom:-24px;left:-24px;min-width:180px}
  .cpro-home .float-label{font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);font-weight:600;margin-bottom:0.25rem}
  .cpro-home .float-value{font-family:var(--font-display);font-size:1.5rem;font-weight:800;color:var(--navy-dark);letter-spacing:-0.03em}
  .cpro-home .float-value span{color:var(--orange)}.cpro-home .float-sub{font-size:0.75rem;color:var(--text-muted);margin-top:0.15rem}
  .cpro-home .ticker-wrap{overflow:hidden;background:var(--navy-dark);padding:1rem 0;border-top:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05)}
  .cpro-home .ticker-track{display:flex;gap:4rem;animation:cpro-ticker 28s linear infinite;width:max-content}
  .cpro-home .ticker-item{font-family:var(--font-display);font-size:0.8rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.4);white-space:nowrap;display:flex;align-items:center;gap:1rem}
  .cpro-home .ticker-item::after{content:'◆';color:var(--orange);font-size:0.5rem}
  @keyframes cpro-ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  .cpro-home section{padding:100px 5%}
  .cpro-home .section-label{font-size:0.72rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--orange);margin-bottom:1rem}
  .cpro-home .section-headline{font-family:var(--font-display);font-size:clamp(2rem,3.5vw,2.75rem);font-weight:800;line-height:1.1;letter-spacing:-0.025em;color:var(--navy-dark)}
  .cpro-home .why-us{background:var(--white);border-radius:32px;margin:0 2%}
  .cpro-home .why-us-grid{display:grid;grid-template-columns:1fr 1fr;gap:0}
  .cpro-home .why-left{padding:5rem 4rem;border-right:1px solid var(--border)}
  .cpro-home .why-intro{font-size:1.05rem;line-height:1.8;color:var(--text-body);margin:1.5rem 0 3rem;font-weight:300;max-width:440px}
  .cpro-home .why-feature{display:flex;gap:1.25rem;padding:1.5rem 0;border-top:1px solid var(--border)}
  .cpro-home .why-feature:last-child{border-bottom:1px solid var(--border)}
  .cpro-home .feature-icon{width:44px;height:44px;min-width:44px;background:rgba(232,67,24,0.08);border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--orange);font-size:1.1rem}
  .cpro-home .feature-title{font-family:var(--font-display);font-weight:700;font-size:1rem;color:var(--navy-dark);margin-bottom:0.4rem}
  .cpro-home .feature-desc{font-size:0.88rem;line-height:1.65;color:var(--text-muted)}
  .cpro-home .why-right{padding:3rem;display:grid;grid-template-rows:1fr 1fr;gap:1.5rem}
  .cpro-home .proof-card{background:var(--cream);border-radius:20px;padding:2rem;position:relative;overflow:hidden;transition:transform 0.25s}
  .cpro-home .proof-card:hover{transform:translateY(-4px)}.cpro-home .proof-card.dark{background:var(--navy-dark);color:var(--white)}
  .cpro-home .proof-metric{font-family:var(--font-display);font-size:3rem;font-weight:800;letter-spacing:-0.04em;line-height:1;color:var(--orange);margin-bottom:0.5rem}
  .cpro-home .proof-title{font-family:var(--font-display);font-weight:700;font-size:1.05rem;color:var(--navy-dark);margin-bottom:0.4rem}
  .cpro-home .proof-card.dark .proof-title{color:var(--white)}.cpro-home .proof-desc{font-size:0.85rem;color:var(--text-muted);line-height:1.6}
  .cpro-home .proof-card.dark .proof-desc{color:rgba(255,255,255,0.55)}
  .cpro-home .proof-tag{display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;background:rgba(232,67,24,0.12);color:var(--orange);padding:0.3rem 0.7rem;border-radius:100px;margin-bottom:1rem}
  .cpro-home .services{background:var(--cream)}
  .cpro-home .services-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:3.5rem;flex-wrap:wrap;gap:1.5rem}
  .cpro-home .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
  .cpro-home .service-card{background:var(--white);border-radius:20px;padding:2.25rem;border:1px solid var(--border);transition:all 0.3s;position:relative;overflow:hidden}
  .cpro-home .service-card::before{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:var(--orange);transform:scaleX(0);transition:transform 0.3s ease}
  .cpro-home .service-card:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(26,58,92,0.1)}
  .cpro-home .service-card:hover::before{transform:scaleX(1)}
  .cpro-home .service-icon-wrap{width:52px;height:52px;background:rgba(26,58,92,0.06);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;transition:background 0.25s}
  .cpro-home .service-card:hover .service-icon-wrap{background:rgba(232,67,24,0.1)}
  .cpro-home .service-title{font-family:var(--font-display);font-weight:700;font-size:1.15rem;color:var(--navy-dark);margin-bottom:0.75rem}
  .cpro-home .service-desc{font-size:0.88rem;line-height:1.7;color:var(--text-muted);margin-bottom:1.5rem}
  .cpro-home .service-link{font-size:0.85rem;font-weight:600;color:var(--navy);text-decoration:none;display:inline-flex;align-items:center;gap:0.35rem;transition:color 0.2s,gap 0.2s}
  .cpro-home .service-card:hover .service-link{color:var(--orange);gap:0.6rem}
  .cpro-home .service-card.highlight{background:var(--navy-dark);border-color:transparent;color:var(--white)}
  .cpro-home .service-card.highlight .service-icon-wrap{background:rgba(232,67,24,0.2)}
  .cpro-home .service-card.highlight .service-title{color:var(--white)}
  .cpro-home .service-card.highlight .service-desc{color:rgba(255,255,255,0.55)}
  .cpro-home .service-card.highlight .service-link{color:var(--orange)}
  .cpro-home .service-card.highlight::before{background:var(--orange)}
  .cpro-home .numbers-section{background:var(--navy-dark);color:var(--white);border-radius:32px;margin:0 2%;padding:80px 6%;overflow:hidden;position:relative}
  .cpro-home .numbers-section::before{content:'';position:absolute;top:-200px;right:-200px;width:600px;height:600px;background:radial-gradient(circle,rgba(232,67,24,0.12) 0%,transparent 65%);pointer-events:none}
  .cpro-home .numbers-inner{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center}
  .cpro-home .numbers-left .section-headline{color:var(--white)}.cpro-home .numbers-left .section-label{color:rgba(232,67,24,0.9)}
  .cpro-home .numbers-copy{font-size:1rem;line-height:1.8;color:rgba(255,255,255,0.6);margin:1.5rem 0 2.5rem;font-weight:300}
  .cpro-home .numbers-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden}
  .cpro-home .number-item{padding:2rem;background:rgba(255,255,255,0.03);transition:background 0.2s}
  .cpro-home .number-item:hover{background:rgba(232,67,24,0.1)}
  .cpro-home .number-val{font-family:var(--font-display);font-size:2.5rem;font-weight:800;color:var(--white);letter-spacing:-0.04em;line-height:1;margin-bottom:0.4rem}
  .cpro-home .number-val span{color:var(--orange)}
  .cpro-home .number-label{font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4)}
  .cpro-home .case-studies{background:var(--cream)}
  .cpro-home .cs-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:3rem;flex-wrap:wrap;gap:1rem}
  .cpro-home .cs-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5rem}
  .cpro-home .cs-card{background:var(--white);border-radius:20px;overflow:hidden;border:1px solid var(--border);transition:all 0.3s}
  .cpro-home .cs-card:hover{transform:translateY(-5px);box-shadow:0 20px 50px rgba(26,58,92,0.1)}
  .cpro-home .cs-card:first-child{grid-column:span 2;background:var(--navy-dark);color:var(--white)}
  .cpro-home .cs-inner{padding:2.25rem}
  .cpro-home .cs-cat{font-size:0.68rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--orange);margin-bottom:0.75rem}
  .cpro-home .cs-metric{font-family:var(--font-display);font-size:3.5rem;font-weight:800;color:var(--orange);letter-spacing:-0.04em;line-height:1;margin-bottom:0.5rem}
  .cpro-home .cs-title{font-family:var(--font-display);font-size:1.25rem;font-weight:700;color:var(--navy-dark);margin-bottom:0.6rem}
  .cpro-home .cs-card:first-child .cs-title{color:var(--white)}
  .cpro-home .cs-desc{font-size:0.875rem;line-height:1.7;color:var(--text-muted)}
  .cpro-home .cs-card:first-child .cs-desc{color:rgba(255,255,255,0.55)}
  .cpro-home .process-section{background:var(--white)}
  .cpro-home .process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:3.5rem;border:1px solid var(--border);border-radius:20px;overflow:hidden}
  .cpro-home .process-step{padding:2.5rem 2rem;border-right:1px solid var(--border);position:relative;transition:background 0.25s}
  .cpro-home .process-step:last-child{border-right:none}
  .cpro-home .process-step:hover{background:var(--cream)}
  .cpro-home .step-num{font-family:var(--font-display);font-size:3rem;font-weight:800;color:rgba(26,58,92,0.07);letter-spacing:-0.05em;line-height:1;margin-bottom:1.25rem;transition:color 0.25s}
  .cpro-home .process-step:hover .step-num{color:rgba(232,67,24,0.15)}
  .cpro-home .step-title{font-family:var(--font-display);font-weight:700;font-size:1rem;color:var(--navy-dark);margin-bottom:0.75rem}
  .cpro-home .step-desc{font-size:0.85rem;line-height:1.7;color:var(--text-muted)}
  .cpro-home .cta-section{padding:80px 5% 100px;background:var(--cream)}
  .cpro-home .cta-card{background:var(--orange);border-radius:32px;padding:5rem;text-align:center;position:relative;overflow:hidden}
  .cpro-home .cta-card::before{content:'';position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:400px;height:400px;background:radial-gradient(circle,rgba(255,255,255,0.12) 0%,transparent 70%)}
  .cpro-home .cta-tag{display:inline-block;background:rgba(255,255,255,0.15);color:var(--white);font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:0.4rem 1rem;border-radius:100px;margin-bottom:2rem}
  .cpro-home .cta-headline{font-family:var(--font-display);font-size:clamp(2.2rem,4vw,3.5rem);font-weight:800;color:var(--white);letter-spacing:-0.03em;line-height:1.1;margin-bottom:1.25rem;position:relative}
  .cpro-home .cta-body{font-size:1.05rem;color:rgba(255,255,255,0.8);max-width:520px;margin:0 auto 2.5rem;line-height:1.75;font-weight:300;position:relative}
  .cpro-home .btn-cta{background:var(--white);color:var(--orange);padding:1rem 2.25rem;border-radius:100px;font-family:var(--font-display);font-weight:700;font-size:1rem;text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem;transition:all 0.25s;position:relative;box-shadow:0 8px 32px rgba(0,0,0,0.15)}
  .cpro-home .btn-cta:hover{transform:translateY(-3px);box-shadow:0 16px 48px rgba(0,0,0,0.2)}
  .cpro-home .cta-note{font-size:0.82rem;color:rgba(255,255,255,0.6);margin-top:1.25rem;position:relative}
  .cpro-home .fade-up{opacity:0;transform:translateY(30px);transition:opacity 0.7s ease,transform 0.7s ease}
  .cpro-home .fade-up.visible{opacity:1;transform:translateY(0)}
  @media(max-width:1024px){.cpro-home .hero{grid-template-columns:1fr;padding-top:110px}.cpro-home .hero-visual{display:none}.cpro-home .hero-stats{grid-template-columns:repeat(4,1fr)}.cpro-home .why-us-grid{grid-template-columns:1fr}.cpro-home .why-left{border-right:none;border-bottom:1px solid var(--border)}.cpro-home .numbers-inner{grid-template-columns:1fr;gap:3rem}.cpro-home .services-grid{grid-template-columns:1fr 1fr}.cpro-home .cs-grid{grid-template-columns:1fr}.cpro-home .cs-card:first-child{grid-column:span 1}.cpro-home .process-grid{grid-template-columns:1fr 1fr}.cpro-home .process-step{border-bottom:1px solid var(--border)}}
  @media(max-width:640px){.cpro-home .hero-stats{grid-template-columns:repeat(2,1fr)}.cpro-home .services-grid{grid-template-columns:1fr}.cpro-home .process-grid{grid-template-columns:1fr}.cpro-home .cta-card{padding:3rem 2rem}}
`

'use client'
import { useEffect } from 'react'
import Link from 'next/link'

function CROContent() {
  useEffect(() => {
    const fadeEls = document.querySelectorAll('.fade-up')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => {
        if (el.isIntersecting) {
          el.target.classList.add('visible')
          observer.unobserve(el.target)
        }
      })
    }, { threshold: 0.08 })
    fadeEls.forEach(el => observer.observe(el))

    const handlers: Array<{ btn: HTMLButtonElement; fn: (e: Event) => void }> = []
    const faqButtons = document.querySelectorAll<HTMLButtonElement>('.faq-q')
    faqButtons.forEach(btn => {
      const fn = () => {
        const answer = btn.nextElementSibling as HTMLElement | null
        const isOpen = btn.classList.contains('open')
        document.querySelectorAll('.faq-q.open').forEach(q => {
          q.classList.remove('open')
          const a = q.nextElementSibling as HTMLElement | null
          if (a) a.classList.remove('open')
        })
        if (!isOpen) {
          btn.classList.add('open')
          if (answer) answer.classList.add('open')
        }
      }
      btn.addEventListener('click', fn)
      handlers.push({ btn, fn })
    })

    const first = document.querySelector<HTMLButtonElement>('.faq-q')
    if (first) first.click()

    return () => {
      observer.disconnect()
      handlers.forEach(({ btn, fn }) => btn.removeEventListener('click', fn))
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: croCSS }} />

      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Services</span>
        <span className="breadcrumb-sep">›</span>
        <span>CRO</span>
      </div>

      <section className="hero">
        <div className="hero-content">
          <div className="page-tag">Conversion Rate Optimisation</div>
          <h1 className="hero-headline">
            Turn your existing traffic into<br/>
            <span className="accent">compounding revenue.</span>
          </h1>
          <p className="hero-body">
            We use behavioural data, heatmaps, and rigorous A/B testing to find exactly where your visitors drop off — and fix it. No guesswork. No gut feel. Just systematic, evidence-based conversion improvement.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn-primary">
              Get a free CRO audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/case-studies" className="btn-ghost">
              See our results
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-stat-row">
            <div className="hero-stat-card">
              <div className="hsc-label">Avg Conversion Lift</div>
              <div className="hsc-value">+47%</div>
              <div className="hsc-sub">Across all active CRO engagements</div>
            </div>
            <div className="hero-stat-card dark">
              <div className="hsc-label">Time to First Win</div>
              <div className="hsc-value">30d</div>
              <div className="hsc-sub">Measurable improvements within a month</div>
            </div>
            <div className="hero-stat-card accent-card">
              <div className="hsc-label">Avg ROAS Improvement</div>
              <div className="hsc-value">3.2×</div>
              <div className="hsc-sub">Revenue per visitor, not just traffic</div>
            </div>
            <div className="hero-stat-card">
              <div className="hsc-label">Tests Run Per Month</div>
              <div className="hsc-value">12+</div>
              <div className="hsc-sub">Continuous experimentation cadence</div>
            </div>
          </div>
          <div className="hero-wide-card">
            <div className="hwc-text">
              <div className="hwc-label">Recent Win · eCommerce Brand</div>
              <div className="hwc-title">Checkout funnel overhaul increased<br/>purchase completion by 120% in 60 days</div>
            </div>
            <div className="hwc-metrics">
              <div className="hwc-metric">
                <div className="hwc-metric-val">+120%</div>
                <div className="hwc-metric-lbl">CVR</div>
              </div>
              <div className="hwc-metric">
                <div className="hwc-metric-val">−28%</div>
                <div className="hwc-metric-lbl">Drop-off</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker-wrap">
        <div className="ticker-track">
          <div className="ticker-item">Heatmap Analysis</div>
          <div className="ticker-item">A/B Testing</div>
          <div className="ticker-item">Session Recordings</div>
          <div className="ticker-item">UX Audits</div>
          <div className="ticker-item">Funnel Analysis</div>
          <div className="ticker-item">Landing Page CRO</div>
          <div className="ticker-item">Checkout Optimisation</div>
          <div className="ticker-item">Form Optimisation</div>
          <div className="ticker-item">Heatmap Analysis</div>
          <div className="ticker-item">A/B Testing</div>
          <div className="ticker-item">Session Recordings</div>
          <div className="ticker-item">UX Audits</div>
          <div className="ticker-item">Funnel Analysis</div>
          <div className="ticker-item">Landing Page CRO</div>
          <div className="ticker-item">Checkout Optimisation</div>
          <div className="ticker-item">Form Optimisation</div>
        </div>
      </div>

      <div className="outcomes fade-up">
        <div className="outcomes-top">
          <div className="section-label">Our Approach</div>
          <h2 className="section-headline" style={{color:"var(--white)"}}>Research first. Test always.<br/>Scale what works.</h2>
          <p className="outcomes-sub">We don&apos;t guess what&apos;s breaking your conversions. We read the data — session recordings, heatmaps, user interviews — and let evidence drive every hypothesis we test.</p>
        </div>
        <div className="outcomes-grid">
          <div className="outcome-card">
            <div className="oc-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
            <div className="oc-title">Behavioural Research</div>
            <div className="oc-desc">Heatmaps, scroll maps, session recordings and user interviews to understand exactly where and why visitors are dropping off your funnel.</div>
          </div>
          <div className="outcome-card">
            <div className="oc-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            </div>
            <div className="oc-title">A/B & Multivariate Testing</div>
            <div className="oc-desc">Statistically rigorous experiments on copy, creative, layout, and UX — so every change you ship is backed by real evidence, not opinion.</div>
          </div>
          <div className="outcome-card">
            <div className="oc-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div className="oc-title">Iterative Optimisation</div>
            <div className="oc-desc">We run continuous test-learn-scale cycles — compounding small gains into significant, lasting revenue improvements across your entire funnel.</div>
          </div>
        </div>
      </div>

      <div className="stats-band">
        <div className="stats-inner">
          <div className="stat-item"><div className="si-val">+47%</div><div className="si-label">Avg CVR Lift</div></div>
          <div className="stat-item"><div className="si-val">30d</div><div className="si-label">First Win</div></div>
          <div className="stat-item"><div className="si-val">150+</div><div className="si-label">Tests Run</div></div>
          <div className="stat-item"><div className="si-val">98%</div><div className="si-label">Retention Rate</div></div>
        </div>
      </div>

      <section className="services-detail fade-up">
        <div className="services-header">
          <div>
            <div className="section-label">What&apos;s Included</div>
            <h2 className="section-headline">Every layer of your funnel,<br/>systematically optimised.</h2>
          </div>
          <Link href="/contact" className="btn-ghost">
            Get a custom proposal
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <div className="services-deep-grid">
          <div className="svc-card featured">
            <div>
              <div className="svc-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <div className="svc-title">Full Funnel CRO Programme</div>
              <div className="svc-desc">End-to-end conversion optimisation across your entire customer journey — from landing page first impressions to checkout completion and post-purchase retention. Every touchpoint is measured, tested, and improved.</div>
              <div className="svc-tags">
                <span className="svc-tag">Landing Pages</span>
                <span className="svc-tag">Product Pages</span>
                <span className="svc-tag">Checkout Flow</span>
                <span className="svc-tag">Cart Recovery</span>
                <span className="svc-tag">Post-Purchase</span>
              </div>
            </div>
            <div className="featured-right">
              <div className="featured-metric-stack">
                <div className="fm-card">
                  <span className="fm-label">Average Conversion Lift</span>
                  <span className="fm-val">+47%</span>
                </div>
                <div>
                  <div className="fm-card" style={{marginBottom:"0.5rem"}}>
                    <span className="fm-label">Cart Abandonment Reduction</span>
                    <span className="fm-val">−31%</span>
                  </div>
                  <div className="fm-bar-wrap">
                    <div className="fm-bar-track"><div className="fm-bar-fill" style={{width:"69%"}}></div></div>
                  </div>
                </div>
                <div className="fm-card">
                  <span className="fm-label">Revenue Per Visitor</span>
                  <span className="fm-val">+3.2×</span>
                </div>
              </div>
            </div>
          </div>
          <div className="svc-card">
            <div className="svc-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            </div>
            <div className="svc-title">Landing Page Optimisation</div>
            <div className="svc-desc">Data-driven redesigns and copy improvements that turn paid traffic into paying customers — tested against your baseline before going live.</div>
            <div className="svc-tags">
              <span className="svc-tag">Hero Testing</span>
              <span className="svc-tag">CTA Optimisation</span>
              <span className="svc-tag">Social Proof</span>
              <span className="svc-tag">Page Speed</span>
            </div>
          </div>
          <div className="svc-card">
            <div className="svc-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
            <div className="svc-title">UX Research & Audit</div>
            <div className="svc-desc">Deep-dive behavioural analysis using heatmaps, session recordings, and user interviews — surfacing friction points invisible to analytics alone.</div>
            <div className="svc-tags">
              <span className="svc-tag">Heatmaps</span>
              <span className="svc-tag">Session Replay</span>
              <span className="svc-tag">User Interviews</span>
              <span className="svc-tag">Friction Mapping</span>
            </div>
          </div>
          <div className="svc-card">
            <div className="svc-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            </div>
            <div className="svc-title">Analytics & Reporting</div>
            <div className="svc-desc">Custom GA4 dashboards, funnel tracking, and fortnightly performance reviews so you always know exactly what&apos;s working and what&apos;s next.</div>
            <div className="svc-tags">
              <span className="svc-tag">GA4 Setup</span>
              <span className="svc-tag">Funnel Tracking</span>
              <span className="svc-tag">Custom Dashboards</span>
              <span className="svc-tag">Fortnightly Reviews</span>
            </div>
          </div>
        </div>
      </section>

      <section className="advantage fade-up">
        <div style={{maxWidth:"600px"}}>
          <div className="section-label">The ConversionPro Advantage</div>
          <h2 className="section-headline">Why our CRO delivers results<br/>where others fall short.</h2>
        </div>
        <div className="advantage-grid">
          <div className="adv-card">
            <div className="adv-num">01</div>
            <div className="adv-title">Evidence, Not Opinions</div>
            <div className="adv-desc">Every test hypothesis is grounded in real user data — session recordings, heatmaps, and quantitative funnel analysis. We never change things based on what &ldquo;looks better&rdquo;.</div>
          </div>
          <div className="adv-card">
            <div className="adv-num">02</div>
            <div className="adv-title">Speed to Impact</div>
            <div className="adv-desc">Our sprint-based process delivers your first statistically significant test result within 30 days. No 6-month strategy phases before anything ships.</div>
          </div>
          <div className="adv-card">
            <div className="adv-num">03</div>
            <div className="adv-title">Compounding Returns</div>
            <div className="adv-desc">CRO gains are permanent and compounding — each improvement builds on the last, creating an ever-widening revenue gap between you and competitors who aren&apos;t testing.</div>
          </div>
        </div>
      </section>

      <section className="case-studies fade-up" id="case-studies">
        <div className="cs-header">
          <div>
            <div className="section-label">Recent Client Wins</div>
            <h2 className="section-headline">Real tests. Measurable lifts.</h2>
          </div>
          <Link href="/case-studies" className="btn-ghost">
            View all case studies
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <div className="cs-grid">
          <div className="cs-card">
            <div className="cs-img-placeholder"></div>
            <div className="cs-inner">
              <div className="cs-cat">Footwear Brand · Checkout CRO</div>
              <div className="cs-metric">+120%</div>
              <div className="cs-title">ROAS via Checkout Funnel Overhaul</div>
              <div className="cs-desc">80,000+ session recordings identified three critical friction points in the purchase flow. UX fixes and copy changes delivered record-breaking conversion lift within 60 days.</div>
              <Link href="/case-studies" className="cs-link">Read full case study <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            </div>
          </div>
          <div className="cs-card">
            <div className="cs-img-placeholder" style={{background: "linear-gradient(135deg, rgba(26,58,92,0.2) 0%, rgba(232,67,24,0.1) 100%)"}}></div>
            <div className="cs-inner">
              <div className="cs-cat">D2C Fashion · Landing Page CRO</div>
              <div className="cs-metric">+64%</div>
              <div className="cs-title">Revenue Growth from Page Redesign</div>
              <div className="cs-desc">Multivariate testing of hero messaging, social proof placement, and CTA design delivered a step-change in paid traffic conversion rates.</div>
              <Link href="/case-studies" className="cs-link">Read full case study <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section fade-up">
        <div className="faq-inner">
          <div className="faq-left">
            <div className="section-label">Common Questions</div>
            <h2 className="section-headline">Everything you need to know about CRO.</h2>
            <p className="faq-intro">Have a question not covered here? Reach out and we&apos;ll get back to you within one business day.</p>
            <Link href="/contact" className="btn-primary" style={{display:"inline-flex"}}>
              Talk to us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <button className="faq-q" type="button">How much traffic do I need for CRO to work?<span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg></span></button>
              <div className="faq-a">Generally, we recommend a minimum of 5,000 monthly sessions to run statistically significant A/B tests within a reasonable timeframe. Below that, we focus on qualitative research and UX improvements that don&apos;t require large sample sizes to validate.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q" type="button">How long does a typical CRO engagement last?<span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg></span></button>
              <div className="faq-a">CRO is most effective as an ongoing programme — the compounding benefits of continuous testing far outperform one-off projects. We work on a minimum 3-month engagement, with most clients continuing indefinitely as the ROI is self-evident.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q" type="button">Which tools do you use for testing?<span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg></span></button>
              <div className="faq-a">We use VWO, Google Optimize, or Optimizely for A/B testing depending on your tech stack, Hotjar or Microsoft Clarity for heatmaps and session recordings, and GA4 for funnel analysis. We can also work with tools you already have in place.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q" type="button">Do you work with Shopify and WooCommerce stores?<span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg></span></button>
              <div className="faq-a">Yes — eCommerce CRO is our core speciality. We have deep experience with Shopify, WooCommerce, and custom-built stores. We understand the platform-specific constraints and work within them to implement winning test variants quickly.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q" type="button">How do you report on CRO performance?<span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg></span></button>
              <div className="faq-a">You get a live dashboard showing all active and completed tests, conversion rates, statistical significance, and projected revenue impact. We also hold fortnightly strategy calls to walk through results and align on the next sprint of experiments.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section fade-up">
        <div className="cta-card">
          <div className="cta-tag">Free CRO Audit</div>
          <h2 className="cta-headline">Ready to unlock revenue<br/>from your existing traffic?</h2>
          <p className="cta-body">Stop paying for more traffic when you&apos;re leaving money on the table. Book a 30-minute CRO audit and we&apos;ll identify your top 3 conversion opportunities — free.</p>
          <Link href="/contact" className="btn-cta">
            Get my free audit
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <div className="cta-note">No obligation. No spam. Just actionable insights.</div>
        </div>
      </section>
    </>
  )
}

export default function CROPage() {
  return <CROContent />
}

const croCSS = `
  :root {
    --navy: #1A3A5C; --navy-dark: #0F2338; --navy-mid: #234872;
    --orange: #E84318; --orange-light: #F05830;
    --cream: #F7F5F2; --white: #FFFFFF;
    --text-body: #3A4A5C; --text-muted: #6A7A8A;
    --border: rgba(26, 58, 92, 0.1);
    --font-display: 'Plus Jakarta Sans', sans-serif;
    --font-body: 'Outfit', sans-serif;
  }

  /* BREADCRUMB */
  .breadcrumb { padding: 20px 5% 0; display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--text-muted); }
  .breadcrumb a { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
  .breadcrumb a:hover { color: var(--orange); }
  .breadcrumb-sep { opacity: 0.4; }

  /* HERO */
  .hero { padding: 3rem 5% 6rem; display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; top: -100px; right: -200px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(232,67,24,0.07) 0%, transparent 70%); pointer-events: none; }
  .page-tag { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(232,67,24,0.08); border: 1px solid rgba(232,67,24,0.2); color: var(--orange); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; padding: 0.35rem 0.9rem 0.35rem 0.6rem; border-radius: 100px; margin-bottom: 1.5rem; }
  .page-tag::before { content: ''; width: 6px; height: 6px; background: var(--orange); border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } }
  .hero-headline { font-family: var(--font-display); font-size: clamp(2.6rem, 4.5vw, 3.8rem); font-weight: 800; line-height: 1.06; letter-spacing: -0.03em; color: var(--navy-dark); margin-bottom: 1.5rem; }
  .hero-headline .accent { color: var(--orange); font-style: italic; }
  .hero-body { font-size: 1.05rem; line-height: 1.8; color: var(--text-body); font-weight: 300; max-width: 480px; margin-bottom: 2.5rem; }
  .hero-actions { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
  .btn-primary { background: var(--orange); color: var(--white); padding: 0.85rem 2rem; border-radius: 100px; font-family: var(--font-display); font-weight: 700; font-size: 0.95rem; text-decoration: none; letter-spacing: 0.01em; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.25s; box-shadow: 0 8px 24px rgba(232,67,24,0.3); }
  .btn-primary:hover { background: var(--orange-light); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(232,67,24,0.4); }
  .btn-primary svg { transition: transform 0.2s; }
  .btn-primary:hover svg { transform: translateX(3px); }
  .btn-ghost { color: var(--navy); font-weight: 500; font-size: 0.95rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; border-bottom: 2px solid transparent; padding-bottom: 2px; transition: all 0.2s; }
  .btn-ghost:hover { color: var(--orange); border-color: var(--orange); }

  /* HERO VISUAL */
  .hero-visual { display: flex; flex-direction: column; gap: 1rem; }
  .hero-stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .hero-stat-card { background: var(--white); border: 1px solid var(--border); border-radius: 18px; padding: 1.75rem; transition: transform 0.25s, box-shadow 0.25s; }
  .hero-stat-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(26,58,92,0.08); }
  .hero-stat-card.dark { background: var(--navy-dark); border-color: transparent; }
  .hero-stat-card.accent-card { background: var(--orange); border-color: transparent; }
  .hsc-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem; }
  .hero-stat-card.dark .hsc-label { color: rgba(255,255,255,0.45); }
  .hero-stat-card.accent-card .hsc-label { color: rgba(255,255,255,0.7); }
  .hsc-value { font-family: var(--font-display); font-size: 2.4rem; font-weight: 800; letter-spacing: -0.04em; line-height: 1; color: var(--orange); }
  .hero-stat-card.dark .hsc-value { color: var(--white); }
  .hero-stat-card.accent-card .hsc-value { color: var(--white); }
  .hsc-sub { font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem; line-height: 1.4; }
  .hero-stat-card.dark .hsc-sub { color: rgba(255,255,255,0.5); }
  .hero-stat-card.accent-card .hsc-sub { color: rgba(255,255,255,0.75); }
  .hero-wide-card { background: var(--navy-dark); border-radius: 18px; padding: 2rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
  .hwc-text .hwc-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 0.4rem; }
  .hwc-text .hwc-title { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--white); line-height: 1.3; }
  .hwc-metrics { display: flex; gap: 1.5rem; }
  .hwc-metric { text-align: center; }
  .hwc-metric-val { font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: var(--orange); letter-spacing: -0.03em; line-height: 1; }
  .hwc-metric-lbl { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-top: 0.2rem; }

  /* TICKER */
  .ticker-wrap { overflow: hidden; background: var(--navy-dark); padding: 0.9rem 0; }
  .ticker-track { display: flex; gap: 4rem; animation: ticker 30s linear infinite; width: max-content; }
  .ticker-item { font-family: var(--font-display); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.35); white-space: nowrap; display: flex; align-items: center; gap: 1rem; }
  .ticker-item::after { content: '◆'; color: var(--orange); font-size: 0.45rem; }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* SECTIONS */
  section { padding: 90px 5%; }
  .section-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--orange); margin-bottom: 0.75rem; }
  .section-headline { font-family: var(--font-display); font-size: clamp(1.9rem, 3vw, 2.6rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.025em; color: var(--navy-dark); }

  /* OUTCOMES */
  .outcomes { background: var(--navy-dark); padding: 80px 5%; }
  .outcomes-top { margin-bottom: 3rem; }
  .outcomes-top .section-headline { color: var(--white); }
  .outcomes-top .section-label { color: rgba(232,67,24,0.85); }
  .outcomes-sub { font-size: 1rem; line-height: 1.75; color: rgba(255,255,255,0.55); font-weight: 300; max-width: 540px; margin-top: 1rem; }
  .outcomes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .outcome-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 2rem; transition: background 0.25s, transform 0.25s; position: relative; overflow: hidden; }
  .outcome-card::before { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--orange); transform: scaleX(0); transition: transform 0.3s ease; }
  .outcome-card:hover { background: rgba(255,255,255,0.07); transform: translateY(-4px); }
  .outcome-card:hover::before { transform: scaleX(1); }
  .oc-icon { width: 46px; height: 46px; background: rgba(232,67,24,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem; color: var(--orange); }
  .oc-title { font-family: var(--font-display); font-weight: 700; font-size: 1.05rem; color: var(--white); margin-bottom: 0.6rem; }
  .oc-desc { font-size: 0.875rem; line-height: 1.7; color: rgba(255,255,255,0.5); }

  /* STATS BAND */
  .stats-band { background: var(--white); padding: 0; }
  .stats-inner { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; gap: 1px; background: var(--border); margin: 60px 5%; }
  .stat-item { background: var(--white); padding: 2.5rem 2rem; text-align: center; transition: background 0.2s; }
  .stat-item:hover { background: var(--navy-dark); }
  .stat-item:hover .si-val { color: var(--white); }
  .stat-item:hover .si-label { color: rgba(255,255,255,0.5); }
  .si-val { font-family: var(--font-display); font-size: 2.5rem; font-weight: 800; color: var(--orange); letter-spacing: -0.04em; line-height: 1; margin-bottom: 0.4rem; transition: color 0.2s; }
  .si-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); transition: color 0.2s; }

  /* SERVICES DETAIL */
  .services-detail { background: var(--cream); }
  .services-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3.5rem; flex-wrap: wrap; gap: 1.5rem; }
  .services-deep-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  .svc-card { background: var(--white); border-radius: 20px; border: 1px solid var(--border); padding: 2.5rem; transition: all 0.3s; position: relative; overflow: hidden; }
  .svc-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: var(--orange); transform: scaleX(0); transition: transform 0.3s ease; }
  .svc-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(26,58,92,0.1); }
  .svc-card:hover::after { transform: scaleX(1); }
  .svc-card.featured { background: var(--navy-dark); border-color: transparent; grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
  .svc-icon { width: 52px; height: 52px; border-radius: 14px; background: rgba(26,58,92,0.06); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; color: var(--navy); transition: background 0.25s, color 0.25s; }
  .svc-card:hover .svc-icon { background: rgba(232,67,24,0.1); color: var(--orange); }
  .svc-card.featured .svc-icon { background: rgba(232,67,24,0.2); color: var(--orange); }
  .svc-title { font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; color: var(--navy-dark); margin-bottom: 0.75rem; }
  .svc-card.featured .svc-title { color: var(--white); }
  .svc-desc { font-size: 0.875rem; line-height: 1.75; color: var(--text-muted); margin-bottom: 1.5rem; }
  .svc-card.featured .svc-desc { color: rgba(255,255,255,0.55); }
  .svc-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .svc-tag { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em; background: rgba(26,58,92,0.06); color: var(--navy); padding: 0.3rem 0.75rem; border-radius: 100px; transition: background 0.2s; }
  .svc-card:hover .svc-tag { background: rgba(232,67,24,0.08); color: var(--orange); }
  .svc-card.featured .svc-tag { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); }
  .featured-right { position: relative; }
  .featured-metric-stack { display: flex; flex-direction: column; gap: 1rem; }
  .fm-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; }
  .fm-label { font-size: 0.8rem; color: rgba(255,255,255,0.55); }
  .fm-val { font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: var(--orange); letter-spacing: -0.03em; }
  .fm-bar-wrap { margin-top: 0.5rem; }
  .fm-bar-track { height: 3px; background: rgba(255,255,255,0.08); border-radius: 100px; overflow: hidden; }
  .fm-bar-fill { height: 100%; background: linear-gradient(90deg, var(--orange), #FF6B47); border-radius: 100px; animation: fillBar 2s ease forwards; }
  @keyframes fillBar { from { width: 0%; } }

  /* ADVANTAGE */
  .advantage { background: var(--white); }
  .advantage-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin-top: 3rem; }
  .adv-card { border: 1px solid var(--border); border-radius: 18px; padding: 2rem; transition: all 0.25s; }
  .adv-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(26,58,92,0.08); border-color: rgba(232,67,24,0.2); }
  .adv-num { font-family: var(--font-display); font-size: 3.5rem; font-weight: 800; color: rgba(26,58,92,0.06); letter-spacing: -0.06em; line-height: 1; margin-bottom: 1rem; transition: color 0.25s; }
  .adv-card:hover .adv-num { color: rgba(232,67,24,0.1); }
  .adv-title { font-family: var(--font-display); font-weight: 700; font-size: 1.05rem; color: var(--navy-dark); margin-bottom: 0.6rem; }
  .adv-desc { font-size: 0.875rem; line-height: 1.7; color: var(--text-muted); }

  /* CASE STUDIES */
  .case-studies { background: var(--cream); }
  .cs-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; flex-wrap: wrap; gap: 1rem; }
  .cs-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 1.5rem; }
  .cs-card { background: var(--white); border-radius: 20px; border: 1px solid var(--border); overflow: hidden; transition: all 0.3s; }
  .cs-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(26,58,92,0.1); }
  .cs-card:first-child { background: var(--navy-dark); border-color: transparent; }
  .cs-img-placeholder { width: 100%; height: 200px; background: linear-gradient(135deg, rgba(232,67,24,0.15) 0%, rgba(26,58,92,0.3) 100%); position: relative; overflow: hidden; }
  .cs-img-placeholder::after { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 40px); }
  .cs-inner { padding: 2rem; }
  .cs-cat { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--orange); margin-bottom: 0.6rem; }
  .cs-metric { font-family: var(--font-display); font-size: 3rem; font-weight: 800; color: var(--orange); letter-spacing: -0.04em; line-height: 1; margin-bottom: 0.4rem; }
  .cs-title { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--navy-dark); margin-bottom: 0.6rem; }
  .cs-card:first-child .cs-title { color: var(--white); }
  .cs-desc { font-size: 0.85rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 1.25rem; }
  .cs-card:first-child .cs-desc { color: rgba(255,255,255,0.5); }
  .cs-link { font-size: 0.85rem; font-weight: 600; color: var(--orange); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; transition: gap 0.2s; }
  .cs-link:hover { gap: 0.7rem; }

  /* FAQ */
  .faq-section { background: var(--white); }
  .faq-inner { display: grid; grid-template-columns: 1fr 1.6fr; gap: 5rem; align-items: start; }
  .faq-left { position: sticky; top: 100px; }
  .faq-intro { font-size: 1rem; line-height: 1.8; color: var(--text-muted); font-weight: 300; margin: 1.25rem 0 2rem; }
  .faq-list { display: flex; flex-direction: column; gap: 0; }
  .faq-item { border-bottom: 1px solid var(--border); overflow: hidden; }
  .faq-item:first-child { border-top: 1px solid var(--border); }
  .faq-q { width: 100%; background: none; border: none; cursor: pointer; padding: 1.4rem 0; display: flex; justify-content: space-between; align-items: center; font-family: var(--font-display); font-weight: 600; font-size: 0.95rem; color: var(--navy-dark); text-align: left; transition: color 0.2s; }
  .faq-q:hover, .faq-q.open { color: var(--orange); }
  .faq-icon { width: 28px; height: 28px; min-width: 28px; border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s; color: var(--text-muted); }
  .faq-q.open .faq-icon { background: var(--orange); border-color: var(--orange); color: var(--white); transform: rotate(45deg); }
  .faq-a { max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding 0.3s ease; font-size: 0.9rem; line-height: 1.75; color: var(--text-muted); font-weight: 300; }
  .faq-a.open { max-height: 300px; padding-bottom: 1.25rem; }

  /* CTA */
  .cta-section { padding: 60px 5% 100px; background: var(--cream); }
  .cta-card { background: var(--orange); border-radius: 32px; padding: 5rem; text-align: center; position: relative; overflow: hidden; }
  .cta-card::before { content: ''; position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 400px; height: 400px; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); }
  .cta-tag { display: inline-block; background: rgba(255,255,255,0.15); color: var(--white); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.4rem 1rem; border-radius: 100px; margin-bottom: 1.75rem; }
  .cta-headline { font-family: var(--font-display); font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 800; color: var(--white); letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 1.25rem; position: relative; }
  .cta-body { font-size: 1rem; color: rgba(255,255,255,0.8); max-width: 500px; margin: 0 auto 2.5rem; line-height: 1.8; font-weight: 300; position: relative; }
  .btn-cta { background: var(--white); color: var(--orange); padding: 1rem 2.25rem; border-radius: 100px; font-family: var(--font-display); font-weight: 700; font-size: 1rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.25s; position: relative; box-shadow: 0 8px 32px rgba(0,0,0,0.15); }
  .btn-cta:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(0,0,0,0.2); }
  .cta-note { font-size: 0.82rem; color: rgba(255,255,255,0.55); margin-top: 1.25rem; position: relative; }

  /* ANIMATIONS */
  .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fade-up.visible { opacity: 1; transform: translateY(0); }

  /* RESPONSIVE */
  @media (max-width: 1024px) {
    .hero { grid-template-columns: 1fr; padding-top: 2rem; }
    .hero-visual { display: none; }
    .outcomes-grid { grid-template-columns: 1fr 1fr; }
    .stats-inner { grid-template-columns: repeat(2, 1fr); }
    .services-deep-grid { grid-template-columns: 1fr; }
    .svc-card.featured { grid-column: span 1; grid-template-columns: 1fr; }
    .advantage-grid { grid-template-columns: 1fr 1fr; }
    .cs-grid { grid-template-columns: 1fr; }
    .faq-inner { grid-template-columns: 1fr; gap: 3rem; }
    .faq-left { position: static; }
  }
  @media (max-width: 640px) {
    .outcomes-grid { grid-template-columns: 1fr; }
    .stats-inner { grid-template-columns: 1fr 1fr; margin: 40px 5%; }
    .advantage-grid { grid-template-columns: 1fr; }
    .cta-card { padding: 3rem 2rem; }
  }
`

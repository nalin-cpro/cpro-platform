'use client'
import { useEffect } from 'react'
import Link from 'next/link'

function DevPageContent() {
  useEffect(() => {
    // IntersectionObserver fade-up animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))

    // FAQ accordion
    const faqButtons = document.querySelectorAll<HTMLButtonElement>('.faq-q')

    function closeAll() {
      faqButtons.forEach((btn) => {
        btn.classList.remove('open')
        const answer = btn.nextElementSibling as HTMLElement | null
        if (answer && answer.classList.contains('faq-a')) {
          answer.classList.remove('open')
        }
      })
    }

    function toggleFaq(btn: HTMLButtonElement) {
      const isOpen = btn.classList.contains('open')
      closeAll()
      if (!isOpen) {
        btn.classList.add('open')
        const answer = btn.nextElementSibling as HTMLElement | null
        if (answer && answer.classList.contains('faq-a')) {
          answer.classList.add('open')
        }
      }
    }

    faqButtons.forEach((btn) => {
      btn.addEventListener('click', () => toggleFaq(btn))
    })

    // Open first FAQ on mount
    if (faqButtons.length > 0) {
      toggleFaq(faqButtons[0])
    }

    return () => {
      observer.disconnect()
      faqButtons.forEach((btn) => {
        const clone = btn.cloneNode(true)
        btn.parentNode?.replaceChild(clone, btn)
      })
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: devCSS }} />

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Services</span>
        <span className="breadcrumb-sep">›</span>
        <span>Web Development</span>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="page-tag">Web Development</div>
          <h1 className="hero-headline">
            High-converting websites built for<br />
            <span className="accent">performance and scale.</span>
          </h1>
          <p className="hero-body">
            Headless commerce stores, high-converting landing pages, and production-grade web apps — built on modern stacks by engineers who actually care about Core Web Vitals, conversion rates, and long-term maintainability.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn-primary">
              Get a free audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/case-studies" className="btn-ghost">
              See our results
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-stat-row">
            <div className="hero-stat-card">
              <div className="hsc-label">Avg PageSpeed Score</div>
              <div className="hsc-value">98</div>
              <div className="hsc-sub">Google Lighthouse mobile median</div>
            </div>
            <div className="hero-stat-card dark">
              <div className="hsc-label">Avg Build Time</div>
              <div className="hsc-value">6w</div>
              <div className="hsc-sub">From kickoff to production launch</div>
            </div>
            <div className="hero-stat-card accent-card">
              <div className="hsc-label">Client Retention</div>
              <div className="hsc-value">98%</div>
              <div className="hsc-sub">Stay for maintenance and new features</div>
            </div>
            <div className="hero-stat-card">
              <div className="hsc-label">Sites Delivered</div>
              <div className="hsc-value">50+</div>
              <div className="hsc-sub">Across eCommerce, SaaS &amp; content sites</div>
            </div>
          </div>
          <div className="hero-wide-card">
            <div className="hwc-text">
              <div className="hwc-label">Recent Win · D2C Skincare Brand</div>
              <div className="hwc-title">Headless Shopify rebuild — 2× conversion rate and 96 PageSpeed on mobile</div>
            </div>
            <div className="hwc-metrics">
              <div className="hwc-metric">
                <div className="hwc-metric-val">+2×</div>
                <div className="hwc-metric-lbl">Conversion</div>
              </div>
              <div className="hwc-metric">
                <div className="hwc-metric-val">96</div>
                <div className="hwc-metric-lbl">PageSpeed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          <div className="ticker-item">Next.js</div>
          <div className="ticker-item">React</div>
          <div className="ticker-item">Headless Commerce</div>
          <div className="ticker-item">Landing Pages</div>
          <div className="ticker-item">Shopify</div>
          <div className="ticker-item">WooCommerce</div>
          <div className="ticker-item">Page Speed</div>
          <div className="ticker-item">Core Web Vitals</div>
          <div className="ticker-item">Next.js</div>
          <div className="ticker-item">React</div>
          <div className="ticker-item">Headless Commerce</div>
          <div className="ticker-item">Landing Pages</div>
          <div className="ticker-item">Shopify</div>
          <div className="ticker-item">WooCommerce</div>
          <div className="ticker-item">Page Speed</div>
          <div className="ticker-item">Core Web Vitals</div>
        </div>
      </div>

      {/* OUTCOMES */}
      <div className="outcomes fade-up">
        <div className="outcomes-top">
          <div className="section-label">Our Approach</div>
          <h2 className="section-headline" style={{ color: 'var(--white)' } as React.CSSProperties}>Modern stacks. <br />Measurable outcomes.</h2>
          <p className="outcomes-sub">We don&apos;t just ship pixel-perfect designs — we build sites that score 95+ on Lighthouse, convert at 2× industry averages, and scale to millions of requests without breaking. Performance and conversion are engineering decisions, not afterthoughts.</p>
        </div>
        <div className="outcomes-grid">
          <div className="outcome-card">
            <div className="oc-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </div>
            <div className="oc-title">Headless Commerce</div>
            <div className="oc-desc">Next.js or Remix storefronts powered by Shopify, Medusa, or Saleor — with sub-second TTFB, image optimisation, and built-in SEO that ranks from day one.</div>
          </div>
          <div className="outcome-card">
            <div className="oc-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
            </div>
            <div className="oc-title">Landing Pages That Convert</div>
            <div className="oc-desc">High-converting, A/B-testable landing pages engineered for your exact offer — with copy frameworks from our CRO team and performance budgets baked in from the first pixel.</div>
          </div>
          <div className="outcome-card">
            <div className="oc-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <div className="oc-title">Performance Engineering</div>
            <div className="oc-desc">Audit, optimise, or completely rebuild existing sites for Core Web Vitals, bundle size, and conversion — from image formats to critical CSS to Edge rendering.</div>
          </div>
        </div>
      </div>

      {/* STATS BAND */}
      <div className="stats-band">
        <div className="stats-inner">
          <div className="stat-item">
            <div className="si-val">98</div>
            <div className="si-label">PageSpeed Score</div>
          </div>
          <div className="stat-item">
            <div className="si-val">2×</div>
            <div className="si-label">Conversion Rate</div>
          </div>
          <div className="stat-item">
            <div className="si-val">50+</div>
            <div className="si-label">Sites Built</div>
          </div>
          <div className="stat-item">
            <div className="si-val">98%</div>
            <div className="si-label">Retention Rate</div>
          </div>
        </div>
      </div>

      {/* SERVICES DETAIL */}
      <section className="services-detail fade-up">
        <div className="services-header">
          <div>
            <div className="section-label">What&apos;s Included</div>
            <h2 className="section-headline">Every layer of the stack, <br />engineered for performance.</h2>
          </div>
          <Link href="/contact" className="btn-ghost">
            Get a custom proposal
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
        <div className="services-deep-grid">

          {/* Featured card */}
          <div className="svc-card featured">
            <div>
              <div className="svc-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
              </div>
              <div className="svc-title">Headless Commerce Platform</div>
              <div className="svc-desc">Custom storefronts on Next.js or Remix with your choice of commerce backend — Shopify, Medusa, Saleor, or BigCommerce. Server-rendered for SEO, client-hydrated for interactivity, CDN-delivered for speed. Production-tested at scale.</div>
              <div className="svc-tags">
                <span className="svc-tag">Next.js 14</span>
                <span className="svc-tag">Shopify Hydrogen</span>
                <span className="svc-tag">Medusa</span>
                <span className="svc-tag">Edge Rendering</span>
                <span className="svc-tag">Core Web Vitals</span>
              </div>
            </div>
            <div className="featured-right">
              <div className="featured-metric-stack">
                <div className="fm-card">
                  <span className="fm-label">Avg PageSpeed (Mobile)</span>
                  <span className="fm-val">96</span>
                </div>
                <div>
                  <div className="fm-card" style={{ marginBottom: '0.5rem' } as React.CSSProperties}>
                    <span className="fm-label">Time to First Byte</span>
                    <span className="fm-val">−60%</span>
                  </div>
                  <div className="fm-bar-wrap">
                    <div className="fm-bar-track"><div className="fm-bar-fill" style={{ width: '62%' } as React.CSSProperties}></div></div>
                  </div>
                </div>
                <div className="fm-card">
                  <span className="fm-label">Conversion Rate Lift</span>
                  <span className="fm-val">+110%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="svc-card">
            <div className="svc-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </div>
            <div className="svc-title">Conversion-Focused Landing Pages</div>
            <div className="svc-desc">Landing page systems — not one-off pages. Componentised design systems so your team can launch new campaign pages in hours, with conversion best practices and A/B testing built in.</div>
            <div className="svc-tags">
              <span className="svc-tag">Component System</span>
              <span className="svc-tag">A/B Testing Ready</span>
              <span className="svc-tag">Analytics Built-in</span>
              <span className="svc-tag">Fast Deploys</span>
            </div>
          </div>

          <div className="svc-card">
            <div className="svc-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <div className="svc-title">CRO-Integrated Builds</div>
            <div className="svc-desc">Every site we build ships with heatmap instrumentation, experiment framework, and analytics — so your CRO team can start testing from day one instead of waiting 6 months for &lsquo;phase 2&rsquo;.</div>
            <div className="svc-tags">
              <span className="svc-tag">Heatmap Setup</span>
              <span className="svc-tag">Event Tracking</span>
              <span className="svc-tag">Experiment Framework</span>
              <span className="svc-tag">GA4 + Server-side</span>
            </div>
          </div>

          <div className="svc-card">
            <div className="svc-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
            </div>
            <div className="svc-title">Maintenance &amp; Evolution</div>
            <div className="svc-desc">Monthly retainers for performance monitoring, security updates, feature additions, and platform migrations. Your site stays fast, secure, and evolving — not stuck on the stack we built it on three years ago.</div>
            <div className="svc-tags">
              <span className="svc-tag">Monthly Retainers</span>
              <span className="svc-tag">Security Patches</span>
              <span className="svc-tag">Feature Sprints</span>
              <span className="svc-tag">Platform Updates</span>
            </div>
          </div>

        </div>
      </section>

      {/* ADVANTAGE */}
      <section className="advantage fade-up">
        <div style={{ maxWidth: '600px' } as React.CSSProperties}>
          <div className="section-label">The ConversionPro Advantage</div>
          <h2 className="section-headline">Why modern brands pick <br />us for their stack.</h2>
        </div>
        <div className="advantage-grid">
          <div className="adv-card">
            <div className="adv-num">01</div>
            <div className="adv-title">Performance-First Engineering</div>
            <div className="adv-desc">We don&apos;t accept slow sites as inevitable. Performance budgets, Lighthouse CI gates, and Edge rendering are standard — not a &lsquo;premium add-on&rsquo;. Every deploy runs through automated perf checks.</div>
          </div>
          <div className="adv-card">
            <div className="adv-num">02</div>
            <div className="adv-title">CRO-Integrated From Day One</div>
            <div className="adv-desc">Unlike typical dev shops, we understand that a fast site is worth nothing if it doesn&apos;t convert. Our developers sit next to our CRO team — every component is built with testing and measurement in mind.</div>
          </div>
          <div className="adv-card">
            <div className="adv-num">03</div>
            <div className="adv-title">Modern Stack, Not Legacy</div>
            <div className="adv-desc">We build on Next.js, React Server Components, TypeScript, and modern headless platforms — not WordPress themes or drag-and-drop builders. Code you can maintain, audit, and hand to any developer five years from now.</div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="case-studies fade-up" id="case-studies">
        <div className="cs-header">
          <div>
            <div className="section-label">Recent Client Wins</div>
            <h2 className="section-headline">Real builds. Real conversions.</h2>
          </div>
          <Link href="/case-studies" className="btn-ghost">
            View all case studies
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
        <div className="cs-grid">
          <div className="cs-card">
            <div className="cs-img-placeholder"></div>
            <div className="cs-inner">
              <div className="cs-cat">D2C Skincare · Headless Commerce</div>
              <div className="cs-metric">+2×</div>
              <div className="cs-title">Conversion Rate on Headless Rebuild</div>
              <div className="cs-desc">Full headless Shopify rebuild on Next.js 14 with Hydrogen — lifted mobile PageSpeed from 52 to 96, doubled the mobile conversion rate, and reduced total bounce rate by 34%.</div>
              <Link href="/case-studies" className="cs-link">Read full case study <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
            </div>
          </div>
          <div className="cs-card">
            <div className="cs-img-placeholder" style={{ background: 'linear-gradient(135deg, rgba(26,58,92,0.2) 0%, rgba(232,67,24,0.1) 100%)' } as React.CSSProperties}></div>
            <div className="cs-inner">
              <div className="cs-cat">B2B SaaS · Landing Pages</div>
              <div className="cs-metric">+73%</div>
              <div className="cs-title">Trial Conversion on Rebuilt LP</div>
              <div className="cs-desc">Rebuilt 12 legacy landing pages as a componentised design system — ship velocity increased 4×, marketing team could test independently, and conversion on flagship pages rose 73%.</div>
              <Link href="/case-studies" className="cs-link">Read full case study <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section fade-up">
        <div className="faq-inner">
          <div className="faq-left">
            <div className="section-label">Common Questions</div>
            <h2 className="section-headline">Everything you need to know about working with us.</h2>
            <p className="faq-intro">Can&apos;t find what you&apos;re looking for? Reach out directly and we&apos;ll get back to you within one business day.</p>
            <Link href="/contact" className="btn-primary" style={{ display: 'inline-flex' } as React.CSSProperties}>
              Talk to us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="faq-list" id="faq-list">
            <div className="faq-item">
              <button className="faq-q">
                Do you build on WordPress?
                <span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></span>
              </button>
              <div className="faq-a">Only for content-heavy sites where the admin UX matters more than raw performance. For eCommerce and conversion-focused builds, we recommend Next.js with a headless backend — the performance and flexibility advantages are substantial at any serious scale.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Can you rebuild our existing site or do we need to start over?
                <span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></span>
              </button>
              <div className="faq-a">Both, depending on the state of the codebase. We can often migrate incrementally — one route at a time onto Next.js while keeping legacy pages working. Full rewrites are sometimes cleaner; we&apos;ll be honest about which approach fits.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                What&apos;s your typical build timeline?
                <span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></span>
              </button>
              <div className="faq-a">Landing pages: 1–2 weeks. Marketing sites: 3–5 weeks. Headless commerce stores: 6–10 weeks depending on feature scope and integrations. We break everything into 1-week sprints with live previews for visibility.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Do you handle hosting and deployment?
                <span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></span>
              </button>
              <div className="faq-a">Yes. We typically host on Vercel, Cloudflare Pages, or AWS depending on requirements. We set up CI/CD, monitoring, and logging — you get a runbook at handover, not a zip file and a prayer.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Can you work with our existing brand design system?
                <span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></span>
              </button>
              <div className="faq-a">Absolutely. We build against design systems in Figma and turn them into production-ready React component libraries. If you don&apos;t have a design system, we can build one as part of the engagement.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section fade-up" id="cta">
        <div className="cta-card">
          <div className="cta-tag">Free Growth Audit</div>
          <h2 className="cta-headline">Ready to build a site <br />that converts?</h2>
          <p className="cta-body">Book a 30-minute technical audit. We&apos;ll review your current stack, benchmark your Core Web Vitals against competitors, and show you the 3 biggest opportunities to improve performance and conversion.</p>
          <Link href="/contact" className="btn-cta">
            Talk to Us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <div className="cta-note">No obligation. Honest technical advice from engineers who care.</div>
        </div>
      </section>
    </>
  )
}

export default function DevelopmentPage() {
  return <DevPageContent />
}

const devCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  :root {
    --navy: #1A3A5C;
    --navy-dark: #0F2338;
    --navy-mid: #234872;
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

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: var(--font-body);
    color: var(--text-body);
    background: var(--cream);
    overflow-x: hidden;
  }

  /* ── BREADCRUMB ── */
  .breadcrumb {
    padding: 20px 5% 0;
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 0.8rem; color: var(--text-muted);
  }
  .breadcrumb a { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
  .breadcrumb a:hover { color: var(--orange); }
  .breadcrumb span { color: var(--text-muted); }
  .breadcrumb-sep { opacity: 0.4; }

  /* ── HERO ── */
  .hero {
    padding: 3rem 5% 6rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; top: -100px; right: -200px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(232,67,24,0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  .page-tag {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(232,67,24,0.08);
    border: 1px solid rgba(232,67,24,0.2);
    color: var(--orange);
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 0.35rem 0.9rem 0.35rem 0.6rem;
    border-radius: 100px; margin-bottom: 1.5rem;
  }
  .page-tag::before {
    content: ''; width: 6px; height: 6px;
    background: var(--orange); border-radius: 50%;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.5); }
  }

  .hero-headline {
    font-family: var(--font-display);
    font-size: clamp(2.6rem, 4.5vw, 3.8rem);
    font-weight: 800; line-height: 1.06;
    letter-spacing: -0.03em; color: var(--navy-dark);
    margin-bottom: 1.5rem;
  }
  .hero-headline .accent { color: var(--orange); font-style: italic; }

  .hero-body {
    font-size: 1.05rem; line-height: 1.8;
    color: var(--text-body); font-weight: 300;
    max-width: 480px; margin-bottom: 2.5rem;
  }

  .hero-actions { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }

  .btn-primary {
    background: var(--orange); color: var(--white);
    padding: 0.85rem 2rem; border-radius: 100px;
    font-family: var(--font-display); font-weight: 700; font-size: 0.95rem;
    text-decoration: none; letter-spacing: 0.01em;
    display: inline-flex; align-items: center; gap: 0.5rem;
    transition: all 0.25s;
    box-shadow: 0 8px 24px rgba(232,67,24,0.3);
  }
  .btn-primary:hover { background: var(--orange-light); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(232,67,24,0.4); }
  .btn-primary:hover svg { transform: translateX(3px); }
  .btn-primary svg { transition: transform 0.2s; }

  .btn-ghost {
    color: var(--navy); font-weight: 500; font-size: 0.95rem;
    text-decoration: none;
    display: inline-flex; align-items: center; gap: 0.4rem;
    border-bottom: 2px solid transparent; padding-bottom: 2px;
    transition: all 0.2s;
  }
  .btn-ghost:hover { color: var(--orange); border-color: var(--orange); }

  /* Hero right — visual panel */
  .hero-visual {
    display: flex; flex-direction: column; gap: 1rem;
  }
  .hero-stat-row {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
  }
  .hero-stat-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 18px; padding: 1.75rem;
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .hero-stat-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(26,58,92,0.08); }
  .hero-stat-card.dark {
    background: var(--navy-dark); border-color: transparent;
  }
  .hero-stat-card.accent-card {
    background: var(--orange); border-color: transparent;
  }
  .hsc-label {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;
  }
  .hero-stat-card.dark .hsc-label { color: rgba(255,255,255,0.45); }
  .hero-stat-card.accent-card .hsc-label { color: rgba(255,255,255,0.7); }
  .hsc-value {
    font-family: var(--font-display);
    font-size: 2.4rem; font-weight: 800;
    letter-spacing: -0.04em; line-height: 1;
    color: var(--orange);
  }
  .hero-stat-card.dark .hsc-value { color: var(--white); }
  .hero-stat-card.accent-card .hsc-value { color: var(--white); }
  .hsc-sub { font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem; line-height: 1.4; }
  .hero-stat-card.dark .hsc-sub { color: rgba(255,255,255,0.5); }
  .hero-stat-card.accent-card .hsc-sub { color: rgba(255,255,255,0.75); }

  .hero-wide-card {
    background: var(--navy-dark);
    border-radius: 18px; padding: 2rem;
    display: flex; align-items: center; justify-content: space-between; gap: 2rem;
  }
  .hwc-text .hwc-label {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 0.4rem;
  }
  .hwc-text .hwc-title {
    font-family: var(--font-display); font-size: 1.1rem; font-weight: 700;
    color: var(--white); line-height: 1.3;
  }
  .hwc-metrics { display: flex; gap: 1.5rem; }
  .hwc-metric { text-align: center; }
  .hwc-metric-val {
    font-family: var(--font-display); font-size: 1.6rem; font-weight: 800;
    color: var(--orange); letter-spacing: -0.03em; line-height: 1;
  }
  .hwc-metric-lbl {
    font-size: 0.65rem; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: rgba(255,255,255,0.4); margin-top: 0.2rem;
  }

  /* ── TICKER ── */
  .ticker-wrap {
    overflow: hidden; background: var(--navy-dark);
    padding: 0.9rem 0;
  }
  .ticker-track {
    display: flex; gap: 4rem;
    animation: ticker 30s linear infinite;
    width: max-content;
  }
  .ticker-item {
    font-family: var(--font-display); font-size: 0.75rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); white-space: nowrap;
    display: flex; align-items: center; gap: 1rem;
  }
  .ticker-item::after { content: '◆'; color: var(--orange); font-size: 0.45rem; }
  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  /* ── SECTION COMMONS ── */
  section { padding: 90px 5%; }
  .section-label {
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--orange); margin-bottom: 0.75rem;
  }
  .section-headline {
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 3vw, 2.6rem);
    font-weight: 800; line-height: 1.1;
    letter-spacing: -0.025em; color: var(--navy-dark);
  }

  /* ── OUTCOMES ── */
  .outcomes { background: var(--navy-dark); padding: 80px 5%; }
  .outcomes-top { margin-bottom: 3rem; }
  .outcomes-top .section-headline { color: var(--white); }
  .outcomes-top .section-label { color: rgba(232,67,24,0.85); }
  .outcomes-sub {
    font-size: 1rem; line-height: 1.75; color: rgba(255,255,255,0.55);
    font-weight: 300; max-width: 540px; margin-top: 1rem;
  }
  .outcomes-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
  }
  .outcome-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 18px; padding: 2rem;
    transition: background 0.25s, border-color 0.25s, transform 0.25s;
    position: relative; overflow: hidden;
  }
  .outcome-card::before {
    content: ''; position: absolute;
    bottom: 0; left: 0; right: 0; height: 2px;
    background: var(--orange); transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  .outcome-card:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,255,255,0.14);
    transform: translateY(-4px);
  }
  .outcome-card:hover::before { transform: scaleX(1); }
  .oc-icon {
    width: 46px; height: 46px;
    background: rgba(232,67,24,0.15);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.25rem; color: var(--orange);
  }
  .oc-title {
    font-family: var(--font-display); font-weight: 700; font-size: 1.05rem;
    color: var(--white); margin-bottom: 0.6rem;
  }
  .oc-desc { font-size: 0.875rem; line-height: 1.7; color: rgba(255,255,255,0.5); }

  /* ── STATS BAND ── */
  .stats-band { background: var(--white); padding: 0; }
  .stats-inner {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--border);
    border-radius: 20px; overflow: hidden; gap: 1px;
    background: var(--border); margin: 60px 5%;
  }
  .stat-item {
    background: var(--white); padding: 2.5rem 2rem; text-align: center;
    transition: background 0.2s;
  }
  .stat-item:hover { background: var(--navy-dark); }
  .stat-item:hover .si-val { color: var(--white); }
  .stat-item:hover .si-label { color: rgba(255,255,255,0.5); }
  .si-val {
    font-family: var(--font-display); font-size: 2.5rem; font-weight: 800;
    color: var(--orange); letter-spacing: -0.04em; line-height: 1;
    margin-bottom: 0.4rem; transition: color 0.2s;
  }
  .si-label {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--text-muted);
    transition: color 0.2s;
  }

  /* ── SERVICES DEEP DIVE ── */
  .services-detail { background: var(--cream); }
  .services-header {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 3.5rem; flex-wrap: wrap; gap: 1.5rem;
  }
  .services-deep-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;
  }
  .svc-card {
    background: var(--white); border-radius: 20px;
    border: 1px solid var(--border); padding: 2.5rem;
    transition: all 0.3s; position: relative; overflow: hidden;
  }
  .svc-card::after {
    content: ''; position: absolute;
    bottom: 0; left: 0; right: 0; height: 3px;
    background: var(--orange); transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  .svc-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(26,58,92,0.1); }
  .svc-card:hover::after { transform: scaleX(1); }
  .svc-card.featured {
    background: var(--navy-dark); border-color: transparent;
    grid-column: span 2;
    display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;
  }
  .svc-icon {
    width: 52px; height: 52px; border-radius: 14px;
    background: rgba(26,58,92,0.06);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.5rem; color: var(--navy);
    transition: background 0.25s, color 0.25s;
  }
  .svc-card:hover .svc-icon { background: rgba(232,67,24,0.1); color: var(--orange); }
  .svc-card.featured .svc-icon { background: rgba(232,67,24,0.2); color: var(--orange); }
  .svc-title {
    font-family: var(--font-display); font-weight: 700; font-size: 1.2rem;
    color: var(--navy-dark); margin-bottom: 0.75rem;
  }
  .svc-card.featured .svc-title { color: var(--white); }
  .svc-desc { font-size: 0.875rem; line-height: 1.75; color: var(--text-muted); margin-bottom: 1.5rem; }
  .svc-card.featured .svc-desc { color: rgba(255,255,255,0.55); }
  .svc-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .svc-tag {
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em;
    background: rgba(26,58,92,0.06); color: var(--navy);
    padding: 0.3rem 0.75rem; border-radius: 100px;
    transition: background 0.2s;
  }
  .svc-card:hover .svc-tag { background: rgba(232,67,24,0.08); color: var(--orange); }
  .svc-card.featured .svc-tag { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); }

  .featured-right { position: relative; }
  .featured-metric-stack { display: flex; flex-direction: column; gap: 1rem; }
  .fm-card {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px; padding: 1.25rem 1.5rem;
    display: flex; align-items: center; justify-content: space-between;
  }
  .fm-label { font-size: 0.8rem; color: rgba(255,255,255,0.55); }
  .fm-val {
    font-family: var(--font-display); font-size: 1.4rem; font-weight: 800;
    color: var(--orange); letter-spacing: -0.03em;
  }
  .fm-bar-wrap { margin-top: 0.5rem; }
  .fm-bar-track {
    height: 3px; background: rgba(255,255,255,0.08);
    border-radius: 100px; overflow: hidden;
  }
  .fm-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--orange), #FF6B47);
    border-radius: 100px;
    animation: fillBar 2s ease forwards;
  }
  @keyframes fillBar { from { width: 0%; } }

  /* ── ADVANTAGE ── */
  .advantage { background: var(--white); }
  .advantage-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem;
    margin-top: 3rem;
  }
  .adv-card {
    border: 1px solid var(--border); border-radius: 18px; padding: 2rem;
    transition: all 0.25s; position: relative;
  }
  .adv-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(26,58,92,0.08); border-color: rgba(232,67,24,0.2); }
  .adv-num {
    font-family: var(--font-display); font-size: 3.5rem; font-weight: 800;
    color: rgba(26,58,92,0.06); letter-spacing: -0.06em; line-height: 1;
    margin-bottom: 1rem; transition: color 0.25s;
  }
  .adv-card:hover .adv-num { color: rgba(232,67,24,0.1); }
  .adv-title {
    font-family: var(--font-display); font-weight: 700; font-size: 1.05rem;
    color: var(--navy-dark); margin-bottom: 0.6rem;
  }
  .adv-desc { font-size: 0.875rem; line-height: 1.7; color: var(--text-muted); }

  /* ── CASE STUDIES ── */
  .case-studies { background: var(--cream); }
  .cs-header {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 3rem; flex-wrap: wrap; gap: 1rem;
  }
  .cs-grid {
    display: grid; grid-template-columns: 1.4fr 1fr; gap: 1.5rem;
  }
  .cs-card {
    background: var(--white); border-radius: 20px;
    border: 1px solid var(--border); overflow: hidden;
    transition: all 0.3s;
  }
  .cs-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(26,58,92,0.1); }
  .cs-card:first-child { background: var(--navy-dark); border-color: transparent; }
  .cs-img {
    width: 100%; height: 200px; object-fit: cover;
    background: linear-gradient(135deg, #1A3A5C 0%, #E84318 100%);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; position: relative;
  }
  .cs-img-placeholder {
    width: 100%; height: 200px;
    background: linear-gradient(135deg, rgba(232,67,24,0.15) 0%, rgba(26,58,92,0.3) 100%);
    position: relative; overflow: hidden;
  }
  .cs-img-placeholder::after {
    content: ''; position: absolute; inset: 0;
    background: repeating-linear-gradient(
      45deg, transparent, transparent 20px,
      rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 40px
    );
  }
  .cs-inner { padding: 2rem; }
  .cs-cat {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--orange); margin-bottom: 0.6rem;
  }
  .cs-metric {
    font-family: var(--font-display); font-size: 3rem; font-weight: 800;
    color: var(--orange); letter-spacing: -0.04em; line-height: 1; margin-bottom: 0.4rem;
  }
  .cs-title {
    font-family: var(--font-display); font-size: 1.15rem; font-weight: 700;
    color: var(--navy-dark); margin-bottom: 0.6rem;
  }
  .cs-card:first-child .cs-title { color: var(--white); }
  .cs-desc { font-size: 0.85rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 1.25rem; }
  .cs-card:first-child .cs-desc { color: rgba(255,255,255,0.5); }
  .cs-link {
    font-size: 0.85rem; font-weight: 600; color: var(--orange);
    text-decoration: none;
    display: inline-flex; align-items: center; gap: 0.4rem;
    transition: gap 0.2s;
  }
  .cs-link:hover { gap: 0.7rem; }

  /* ── FAQ ── */
  .faq-section { background: var(--white); }
  .faq-inner {
    display: grid; grid-template-columns: 1fr 1.6fr; gap: 5rem; align-items: start;
  }
  .faq-left { position: sticky; top: 100px; }
  .faq-intro {
    font-size: 1rem; line-height: 1.8; color: var(--text-muted);
    font-weight: 300; margin: 1.25rem 0 2rem;
  }
  .faq-list { display: flex; flex-direction: column; gap: 0; }
  .faq-item {
    border-bottom: 1px solid var(--border);
    overflow: hidden;
  }
  .faq-item:first-child { border-top: 1px solid var(--border); }
  .faq-q {
    width: 100%; background: none; border: none; cursor: pointer;
    padding: 1.4rem 0;
    display: flex; justify-content: space-between; align-items: center;
    font-family: var(--font-display); font-weight: 600; font-size: 0.95rem;
    color: var(--navy-dark); text-align: left;
    transition: color 0.2s;
  }
  .faq-q:hover { color: var(--orange); }
  .faq-q.open { color: var(--orange); }
  .faq-icon {
    width: 28px; height: 28px; min-width: 28px;
    border: 1px solid var(--border); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.3s; color: var(--text-muted);
  }
  .faq-q.open .faq-icon {
    background: var(--orange); border-color: var(--orange); color: var(--white);
    transform: rotate(45deg);
  }
  .faq-a {
    max-height: 0; overflow: hidden;
    transition: max-height 0.4s ease, padding 0.3s ease;
    font-size: 0.9rem; line-height: 1.75; color: var(--text-muted); font-weight: 300;
  }
  .faq-a.open { max-height: 300px; padding-bottom: 1.25rem; }

  /* ── CTA ── */
  .cta-section { padding: 60px 5% 100px; background: var(--cream); }
  .cta-card {
    background: var(--orange); border-radius: 32px; padding: 5rem;
    text-align: center; position: relative; overflow: hidden;
  }
  .cta-card::before {
    content: ''; position: absolute; top: -100px; left: 50%;
    transform: translateX(-50%); width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  }
  .cta-tag {
    display: inline-block;
    background: rgba(255,255,255,0.15); color: var(--white);
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 0.4rem 1rem; border-radius: 100px; margin-bottom: 1.75rem;
  }
  .cta-headline {
    font-family: var(--font-display);
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 800; color: var(--white);
    letter-spacing: -0.03em; line-height: 1.1;
    margin-bottom: 1.25rem; position: relative;
  }
  .cta-body {
    font-size: 1rem; color: rgba(255,255,255,0.8);
    max-width: 500px; margin: 0 auto 2.5rem;
    line-height: 1.8; font-weight: 300; position: relative;
  }
  .btn-cta {
    background: var(--white); color: var(--orange);
    padding: 1rem 2.25rem; border-radius: 100px;
    font-family: var(--font-display); font-weight: 700; font-size: 1rem;
    text-decoration: none;
    display: inline-flex; align-items: center; gap: 0.5rem;
    transition: all 0.25s; position: relative;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  }
  .btn-cta:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(0,0,0,0.2); }
  .cta-note { font-size: 0.82rem; color: rgba(255,255,255,0.55); margin-top: 1.25rem; position: relative; }

  /* ── ANIMATIONS ── */
  .fade-up {
    opacity: 0; transform: translateY(28px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-up.visible { opacity: 1; transform: translateY(0); }

  /* ── RESPONSIVE ── */
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

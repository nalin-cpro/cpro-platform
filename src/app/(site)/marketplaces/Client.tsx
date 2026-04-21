'use client'
import { useEffect } from 'react'
import Link from 'next/link'

function MPPageContent() {
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
      <style dangerouslySetInnerHTML={{ __html: mpCSS }} />

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Services</span>
        <span className="breadcrumb-sep">›</span>
        <span>Marketplace Management</span>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="page-tag">Marketplace Management</div>
          <h1 className="hero-headline">
            Dominate Amazon &amp; Flipkart with<br />
            <span className="accent">data-led shelf strategy.</span>
          </h1>
          <p className="hero-body">
            Amazon, Flipkart, and D2C marketplace management — from account operations and catalogue optimisation to sponsored ads and brand stores. We help brands win the shelf war with data-driven decisions and precise execution.
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
              <div className="hsc-label">Avg ROAS</div>
              <div className="hsc-value">+3.8×</div>
              <div className="hsc-sub">Across sponsored ad campaigns</div>
            </div>
            <div className="hero-stat-card dark">
              <div className="hsc-label">Avg Launch Time</div>
              <div className="hsc-value">45d</div>
              <div className="hsc-sub">From onboarding to first scaled campaign</div>
            </div>
            <div className="hero-stat-card accent-card">
              <div className="hsc-label">Client Retention Rate</div>
              <div className="hsc-value">98%</div>
              <div className="hsc-sub">Partners who stay and scale with us</div>
            </div>
            <div className="hero-stat-card">
              <div className="hsc-label">Categories Managed</div>
              <div className="hsc-value">50+</div>
              <div className="hsc-sub">Across fashion, beauty, electronics &amp; more</div>
            </div>
          </div>
          <div className="hero-wide-card">
            <div className="hwc-text">
              <div className="hwc-label">Recent Win · Beauty Brand</div>
              <div className="hwc-title">Category leader in Amazon Beauty — 4.1× ROAS after full catalogue overhaul</div>
            </div>
            <div className="hwc-metrics">
              <div className="hwc-metric">
                <div className="hwc-metric-val">+4.1×</div>
                <div className="hwc-metric-lbl">Ad ROAS</div>
              </div>
              <div className="hwc-metric">
                <div className="hwc-metric-val">+180%</div>
                <div className="hwc-metric-lbl">Revenue YoY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          <div className="ticker-item">Amazon Ads</div>
          <div className="ticker-item">Flipkart Ads</div>
          <div className="ticker-item">Catalogue Optimisation</div>
          <div className="ticker-item">A+ Content</div>
          <div className="ticker-item">Account Management</div>
          <div className="ticker-item">Sponsored Products</div>
          <div className="ticker-item">Brand Store</div>
          <div className="ticker-item">Review Management</div>
          <div className="ticker-item">Amazon Ads</div>
          <div className="ticker-item">Flipkart Ads</div>
          <div className="ticker-item">Catalogue Optimisation</div>
          <div className="ticker-item">A+ Content</div>
          <div className="ticker-item">Account Management</div>
          <div className="ticker-item">Sponsored Products</div>
          <div className="ticker-item">Brand Store</div>
          <div className="ticker-item">Review Management</div>
        </div>
      </div>

      {/* OUTCOMES */}
      <div className="outcomes fade-up">
        <div className="outcomes-top">
          <div className="section-label">Our Approach</div>
          <h2 className="section-headline" style={{ color: 'var(--white)' } as React.CSSProperties}>Every marketplace, <br />fully managed.</h2>
          <p className="outcomes-sub">We don&apos;t just run ads on marketplaces — we manage the entire seller experience. Account health, catalogue quality, ad strategy, and brand protection all working together to compound growth.</p>
        </div>
        <div className="outcomes-grid">
          <div className="outcome-card">
            <div className="oc-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </div>
            <div className="oc-title">Listing Optimisation</div>
            <div className="oc-desc">A+ content, keyword-rich titles, optimised bullet points, and professional imagery that converts browsers into buyers on product detail pages.</div>
          </div>
          <div className="outcome-card">
            <div className="oc-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
            </div>
            <div className="oc-title">Sponsored Advertising</div>
            <div className="oc-desc">Sponsored Products, Sponsored Brands, Sponsored Display — managed with precise bid strategies and continuous creative testing for maximum ACOS efficiency.</div>
          </div>
          <div className="outcome-card">
            <div className="oc-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <div className="oc-title">Account Management</div>
            <div className="oc-desc">Brand registry, account health monitoring, catalogue compliance, FBA optimisation, and proactive issue resolution across all seller accounts.</div>
          </div>
        </div>
      </div>

      {/* STATS BAND */}
      <div className="stats-band">
        <div className="stats-inner">
          <div className="stat-item">
            <div className="si-val">+3.8×</div>
            <div className="si-label">Avg ROAS</div>
          </div>
          <div className="stat-item">
            <div className="si-val">60d</div>
            <div className="si-label">Time to Results</div>
          </div>
          <div className="stat-item">
            <div className="si-val">150+</div>
            <div className="si-label">Brands Managed</div>
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
            <h2 className="section-headline">Every marketplace lever, <br />fully managed.</h2>
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
              <div className="svc-title">Full Account Management</div>
              <div className="svc-desc">Complete ownership of your marketplace presence — from day-to-day account operations and inventory planning to strategic growth initiatives. One dedicated team, one monthly fee, full accountability for revenue outcomes.</div>
              <div className="svc-tags">
                <span className="svc-tag">Amazon Central</span>
                <span className="svc-tag">Flipkart Seller Hub</span>
                <span className="svc-tag">Inventory Planning</span>
                <span className="svc-tag">Brand Protection</span>
                <span className="svc-tag">Case Resolution</span>
              </div>
            </div>
            <div className="featured-right">
              <div className="featured-metric-stack">
                <div className="fm-card">
                  <span className="fm-label">Average ROAS Improvement</span>
                  <span className="fm-val">3.8×</span>
                </div>
                <div>
                  <div className="fm-card" style={{ marginBottom: '0.5rem' } as React.CSSProperties}>
                    <span className="fm-label">ACOS Reduction</span>
                    <span className="fm-val">−42%</span>
                  </div>
                  <div className="fm-bar-wrap">
                    <div className="fm-bar-track"><div className="fm-bar-fill" style={{ width: '62%' } as React.CSSProperties}></div></div>
                  </div>
                </div>
                <div className="fm-card">
                  <span className="fm-label">Conversion Rate</span>
                  <span className="fm-val">+68%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="svc-card">
            <div className="svc-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </div>
            <div className="svc-title">Advertising &amp; Sponsored Campaigns</div>
            <div className="svc-desc">Sponsored Products, Sponsored Brands, Sponsored Display, DSP — managed with category-specific bid strategies and ongoing creative optimisation for maximum ad efficiency.</div>
            <div className="svc-tags">
              <span className="svc-tag">Sponsored Products</span>
              <span className="svc-tag">Sponsored Brands</span>
              <span className="svc-tag">DSP Campaigns</span>
              <span className="svc-tag">Bid Automation</span>
            </div>
          </div>

          <div className="svc-card">
            <div className="svc-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <div className="svc-title">Catalogue &amp; Content Strategy</div>
            <div className="svc-desc">Product titles, bullets, descriptions, A+ content, brand stores — written for both algorithms and humans. SEO-optimised content that ranks organically and converts at the detail page.</div>
            <div className="svc-tags">
              <span className="svc-tag">A+ Content</span>
              <span className="svc-tag">Listing SEO</span>
              <span className="svc-tag">Brand Store</span>
              <span className="svc-tag">Enhanced Content</span>
            </div>
          </div>

          <div className="svc-card">
            <div className="svc-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
            </div>
            <div className="svc-title">Data Analytics &amp; Reporting</div>
            <div className="svc-desc">Real-time dashboards tracking ACOS, TACoS, organic rank, velocity, and inventory health. Fortnightly review calls with your category specialist to align on strategy.</div>
            <div className="svc-tags">
              <span className="svc-tag">Ad Console Data</span>
              <span className="svc-tag">Dashboard Reporting</span>
              <span className="svc-tag">Velocity Tracking</span>
              <span className="svc-tag">Monthly Reviews</span>
            </div>
          </div>

        </div>
      </section>

      {/* ADVANTAGE */}
      <section className="advantage fade-up">
        <div style={{ maxWidth: '600px' } as React.CSSProperties}>
          <div className="section-label">The ConversionPro Advantage</div>
          <h2 className="section-headline">Why marketplace brands <br />choose ConversionPro.</h2>
        </div>
        <div className="advantage-grid">
          <div className="adv-card">
            <div className="adv-num">01</div>
            <div className="adv-title">Category Expertise</div>
            <div className="adv-desc">Deep vertical expertise across fashion, beauty, electronics, home, and wellness. We know what works in each category — and more importantly, what doesn&apos;t.</div>
          </div>
          <div className="adv-card">
            <div className="adv-num">02</div>
            <div className="adv-title">Full Account Ownership</div>
            <div className="adv-desc">We operate as an extension of your brand team — managing daily account operations so you can focus on product, supply, and broader brand strategy.</div>
          </div>
          <div className="adv-card">
            <div className="adv-num">03</div>
            <div className="adv-title">Data-Led Bidding</div>
            <div className="adv-desc">Every bid is backed by conversion, velocity, and profitability data — not just ACOS benchmarks. We optimise for net contribution, not vanity ad metrics.</div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="case-studies fade-up" id="case-studies">
        <div className="cs-header">
          <div>
            <div className="section-label">Recent Client Wins</div>
            <h2 className="section-headline">Real brands. Real shelf wins.</h2>
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
              <div className="cs-cat">Beauty Brand · Amazon</div>
              <div className="cs-metric">+4.1×</div>
              <div className="cs-title">ROAS on Sponsored Products</div>
              <div className="cs-desc">A full catalogue overhaul combined with a category-specific ad strategy drove ROAS from 1.4× to 4.1× in 90 days — while organic rank also improved by ~50% across hero SKUs.</div>
              <Link href="/case-studies" className="cs-link">Read full case study <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
            </div>
          </div>
          <div className="cs-card">
            <div className="cs-img-placeholder" style={{ background: 'linear-gradient(135deg, rgba(26,58,92,0.2) 0%, rgba(232,67,24,0.1) 100%)' } as React.CSSProperties}></div>
            <div className="cs-inner">
              <div className="cs-cat">Electronics Brand · Flipkart</div>
              <div className="cs-metric">+180%</div>
              <div className="cs-title">Revenue Growth in Q1</div>
              <div className="cs-desc">End-to-end Flipkart management — including catalogue cleanup, ad strategy, and promotional planning — tripled revenue in one quarter and established category leadership.</div>
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
                How quickly can you take over an existing marketplace account?
                <span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></span>
              </button>
              <div className="faq-a">Typically 7–10 business days for account access, audit, and handover. We&apos;ll run a full diagnostic in the first week and have optimised campaigns live by end of week 2.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Do you work with both Amazon and Flipkart, or just one?
                <span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></span>
              </button>
              <div className="faq-a">We manage both, plus other platforms like Myntra, Ajio, and Meesho depending on category. Most of our clients sell on 2–3 marketplaces and we coordinate strategy across all of them.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                What&apos;s your minimum monthly marketplace ad spend?
                <span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></span>
              </button>
              <div className="faq-a">We typically work with brands spending ₹3L+ per month on marketplace ads. For smaller brands, we also offer a pure consulting engagement where we advise but don&apos;t manage operations.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Do you handle FBA / Flipkart Assured logistics too?
                <span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></span>
              </button>
              <div className="faq-a">We advise on fulfillment strategy but don&apos;t handle physical logistics. We&apos;ll help you plan inventory, manage SLAs, and recover suspended listings, but FBA shipments happen through your team.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                How do you handle brand protection and hijacker removal?
                <span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></span>
              </button>
              <div className="faq-a">We actively monitor listings for hijackers, counterfeit sellers, and brand violations. Our team files brand registry cases, escalates to Amazon legal, and coordinates with your IP counsel for complex issues.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section fade-up" id="cta">
        <div className="cta-card">
          <div className="cta-tag">Free Growth Audit</div>
          <h2 className="cta-headline">Ready to dominate<br />your category?</h2>
          <p className="cta-body">Book a 30-minute audit of your marketplace operations. We&apos;ll diagnose what&apos;s broken, identify revenue leaks, and show you the biggest wins available in the next 90 days.</p>
          <Link href="/contact" className="btn-cta">
            Talk to Us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <div className="cta-note">No obligation. Honest insights about your marketplace health.</div>
        </div>
      </section>
    </>
  )
}

export default function MarketplacesPage() {
  return <MPPageContent />
}

const mpCSS = `
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

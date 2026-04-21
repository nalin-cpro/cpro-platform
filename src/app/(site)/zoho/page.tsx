'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export const revalidate = 0

function ZohoPageContent() {
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
      <style dangerouslySetInnerHTML={{ __html: zohoCSS }} />

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/zoho">Services</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Zoho One &amp; CRM</span>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="page-tag">Zoho One &amp; CRM</div>
          <h1 className="hero-headline">
            Automate your business.<br />
            <span className="accent">Scale without adding headcount.</span>
          </h1>
          <p className="hero-body">
            Certified Zoho One implementation and CRM automation for growing B2B and D2C businesses. We design, configure, and integrate the entire Zoho suite so your team can focus on growth instead of spreadsheets.
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
              <div className="hsc-label">Avg Lead Cost Reduction</div>
              <div className="hsc-value">−40%</div>
              <div className="hsc-sub">Post-automation vs manual workflows</div>
            </div>
            <div className="hero-stat-card dark">
              <div className="hsc-label">Avg Go-Live Time</div>
              <div className="hsc-value">90d</div>
              <div className="hsc-sub">From kickoff to live production rollout</div>
            </div>
            <div className="hero-stat-card accent-card">
              <div className="hsc-label">Partner Retention</div>
              <div className="hsc-value">98%</div>
              <div className="hsc-sub">Clients who stay on ongoing support</div>
            </div>
            <div className="hero-stat-card">
              <div className="hsc-label">Zoho Implementations</div>
              <div className="hsc-value">50+</div>
              <div className="hsc-sub">Across SMBs and mid-market clients</div>
            </div>
          </div>
          <div className="hero-wide-card">
            <div className="hwc-text">
              <div className="hwc-label">Recent Win · Manufacturing Group</div>
              <div className="hwc-title">Zoho One rollout across 3 entities — lead cost down 40%, sales velocity up 2.2×</div>
            </div>
            <div className="hwc-metrics">
              <div className="hwc-metric">
                <div className="hwc-metric-val">−40%</div>
                <div className="hwc-metric-lbl">Lead Cost</div>
              </div>
              <div className="hwc-metric">
                <div className="hwc-metric-val">+2.2×</div>
                <div className="hwc-metric-lbl">Sales Velocity</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          <div className="ticker-item">Zoho CRM</div>
          <div className="ticker-item">Zoho One</div>
          <div className="ticker-item">Zoho Books</div>
          <div className="ticker-item">Zoho Campaigns</div>
          <div className="ticker-item">Workflow Automation</div>
          <div className="ticker-item">CRM Implementation</div>
          <div className="ticker-item">API Integrations</div>
          <div className="ticker-item">Custom Modules</div>
          <div className="ticker-item">Zoho CRM</div>
          <div className="ticker-item">Zoho One</div>
          <div className="ticker-item">Zoho Books</div>
          <div className="ticker-item">Zoho Campaigns</div>
          <div className="ticker-item">Workflow Automation</div>
          <div className="ticker-item">CRM Implementation</div>
          <div className="ticker-item">API Integrations</div>
          <div className="ticker-item">Custom Modules</div>
        </div>
      </div>

      {/* OUTCOMES */}
      <div className="outcomes fade-up">
        <div className="outcomes-top">
          <div className="section-label">Our Approach</div>
          <h2 className="section-headline" style={{ color: 'var(--white)' } as React.CSSProperties}>Workflows that run themselves.<br />Teams that focus on growth.</h2>
          <p className="outcomes-sub">We don&apos;t just install Zoho and leave. We design workflows around your actual business processes — then automate the repetitive work, integrate your tools, and build dashboards your team actually uses.</p>
        </div>
        <div className="outcomes-grid">
          <div className="outcome-card">
            <div className="oc-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </div>
            <div className="oc-title">CRM Implementation</div>
            <div className="oc-desc">Zoho CRM configured around your pipeline, qualification process, and sales stages — not a generic template. Includes custom modules, fields, layouts, and role-based access control.</div>
          </div>
          <div className="outcome-card">
            <div className="oc-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
            </div>
            <div className="oc-title">Process Automation</div>
            <div className="oc-desc">Blueprints, workflow rules, macros, and scheduled automations that eliminate repetitive data entry — freeing up your sales and ops teams for actual work that moves the needle.</div>
          </div>
          <div className="outcome-card">
            <div className="oc-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <div className="oc-title">System Integrations</div>
            <div className="oc-desc">Connect Zoho to your eCommerce store, payment gateway, marketing tools, WhatsApp, and any internal systems — through native connectors or custom APIs built by our Deluge developers.</div>
          </div>
        </div>
      </div>

      {/* STATS BAND */}
      <div className="stats-band">
        <div className="stats-inner">
          <div className="stat-item">
            <div className="si-val">−40%</div>
            <div className="si-label">Lead Cost</div>
          </div>
          <div className="stat-item">
            <div className="si-val">90d</div>
            <div className="si-label">Go-Live Time</div>
          </div>
          <div className="stat-item">
            <div className="si-val">50+</div>
            <div className="si-label">Implementations</div>
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
            <h2 className="section-headline">Every Zoho app,<br />configured for your workflow.</h2>
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
              <div className="svc-title">Zoho One Full Implementation</div>
              <div className="svc-desc">Complete Zoho One rollout — CRM, Desk, Books, Campaigns, Analytics, and more — all configured, integrated, and documented. One engagement, one accountable team, a fully operational Zoho stack at the end.</div>
              <div className="svc-tags">
                <span className="svc-tag">Zoho CRM</span>
                <span className="svc-tag">Zoho Desk</span>
                <span className="svc-tag">Zoho Books</span>
                <span className="svc-tag">Zoho Analytics</span>
                <span className="svc-tag">Zoho Campaigns</span>
              </div>
            </div>
            <div className="featured-right">
              <div className="featured-metric-stack">
                <div className="fm-card">
                  <span className="fm-label">Process Automation Coverage</span>
                  <span className="fm-val">80%+</span>
                </div>
                <div>
                  <div className="fm-card" style={{ marginBottom: '0.5rem' } as React.CSSProperties}>
                    <span className="fm-label">Lead-to-Close Cycle</span>
                    <span className="fm-val">−45%</span>
                  </div>
                  <div className="fm-bar-wrap">
                    <div className="fm-bar-track"><div className="fm-bar-fill" style={{ width: '62%' } as React.CSSProperties}></div></div>
                  </div>
                </div>
                <div className="fm-card">
                  <span className="fm-label">Team Productivity Gain</span>
                  <span className="fm-val">+60%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="svc-card">
            <div className="svc-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </div>
            <div className="svc-title">CRM Implementation &amp; Migration</div>
            <div className="svc-desc">Pipeline setup, custom modules, workflow rules, role-based layouts, and data migration from your existing CRM — HubSpot, Salesforce, Pipedrive, or spreadsheets.</div>
            <div className="svc-tags">
              <span className="svc-tag">Custom Modules</span>
              <span className="svc-tag">Data Migration</span>
              <span className="svc-tag">Workflow Rules</span>
              <span className="svc-tag">User Training</span>
            </div>
          </div>

          <div className="svc-card">
            <div className="svc-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <div className="svc-title">Automation &amp; Blueprints</div>
            <div className="svc-desc">Complex multi-stage approval workflows, automated email sequences, task escalations, and SLA enforcement — all running without manual intervention across your sales and service teams.</div>
            <div className="svc-tags">
              <span className="svc-tag">Blueprints</span>
              <span className="svc-tag">Scheduled Automations</span>
              <span className="svc-tag">SLA Rules</span>
              <span className="svc-tag">Notification Logic</span>
            </div>
          </div>

          <div className="svc-card">
            <div className="svc-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
            </div>
            <div className="svc-title">API Integrations &amp; Deluge</div>
            <div className="svc-desc">Custom integrations with your eCommerce platform, payment gateway, WhatsApp Business, Google Workspace, or any internal tools — built using Zoho Deluge and REST APIs by certified developers.</div>
            <div className="svc-tags">
              <span className="svc-tag">Deluge Scripts</span>
              <span className="svc-tag">REST APIs</span>
              <span className="svc-tag">Webhook Integrations</span>
              <span className="svc-tag">Custom Functions</span>
            </div>
          </div>

        </div>
      </section>

      {/* ADVANTAGE */}
      <section className="advantage fade-up">
        <div style={{ maxWidth: '600px' } as React.CSSProperties}>
          <div className="section-label">The ConversionPro Advantage</div>
          <h2 className="section-headline">Why growing companies<br />trust us with Zoho.</h2>
        </div>
        <div className="advantage-grid">
          <div className="adv-card">
            <div className="adv-num">01</div>
            <div className="adv-title">Certified Zoho Partner</div>
            <div className="adv-desc">We&apos;re an authorised Zoho implementation partner with certified specialists across CRM, Creator, Analytics, and Deluge. Direct access to Zoho&apos;s partner support when edge cases arise.</div>
          </div>
          <div className="adv-card">
            <div className="adv-num">02</div>
            <div className="adv-title">End-to-End Delivery</div>
            <div className="adv-desc">From initial discovery and process mapping through go-live and user training — we own the entire rollout. No handoffs, no finger-pointing, no half-finished implementations.</div>
          </div>
          <div className="adv-card">
            <div className="adv-num">03</div>
            <div className="adv-title">Ongoing Support &amp; Evolution</div>
            <div className="adv-desc">Post-launch, we stay on as your Zoho operations partner — making changes as your business evolves, troubleshooting issues, and extending your automation stack over time.</div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="case-studies fade-up" id="case-studies">
        <div className="cs-header">
          <div>
            <div className="section-label">Recent Client Wins</div>
            <h2 className="section-headline">Real implementations. Real ROI.</h2>
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
              <div className="cs-cat">Manufacturing Group · Zoho One</div>
              <div className="cs-metric">−40%</div>
              <div className="cs-title">Lead Acquisition Cost Cut</div>
              <div className="cs-desc">Zoho One rollout across 3 manufacturing entities streamlined lead capture, qualification, and handoff — while CRM automations reduced manual data entry by 70% and boosted sales team productivity.</div>
              <Link href="/case-studies" className="cs-link">Read full case study <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
            </div>
          </div>
          <div className="cs-card">
            <div className="cs-img-placeholder" style={{ background: 'linear-gradient(135deg, rgba(26,58,92,0.2) 0%, rgba(232,67,24,0.1) 100%)' } as React.CSSProperties}></div>
            <div className="cs-inner">
              <div className="cs-cat">D2C Brand · Zoho CRM</div>
              <div className="cs-metric">+2.2×</div>
              <div className="cs-title">Sales Velocity</div>
              <div className="cs-desc">Custom Zoho CRM implementation with WhatsApp, Shopify, and Razorpay integrations doubled the speed from lead to close — while a unified customer view eliminated the need for 3 separate spreadsheets.</div>
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
                Do I need Zoho One, or can I start with individual apps?
                <span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></span>
              </button>
              <div className="faq-a">Depends on your stage. Most growing businesses eventually land on Zoho One because the integration and pricing advantages are too significant to ignore. But we also do single-app rollouts — CRM-only is our most common starting point.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                How long does a full Zoho One implementation take?
                <span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></span>
              </button>
              <div className="faq-a">Typical timeline is 60–90 days for mid-sized businesses with one or two entities. Smaller CRM-only rollouts can go live in 3–4 weeks. Multi-entity or heavily customised implementations may run 4–5 months.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Can you migrate data from HubSpot, Salesforce, or our current CRM?
                <span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></span>
              </button>
              <div className="faq-a">Yes, regularly. We handle contact, deal, activity, and custom object migrations with full field mapping and duplicate dedup. We also preserve historical data, notes, and email threads where the source system allows export.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                Do you do Zoho training for our team?
                <span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></span>
              </button>
              <div className="faq-a">Yes. Every implementation includes role-based training — separate sessions for admins, sales reps, service agents, and executives. We also record the sessions and leave documentation behind.</div>
            </div>
            <div className="faq-item">
              <button className="faq-q">
                What happens after go-live? Do you stay on?
                <span className="faq-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg></span>
              </button>
              <div className="faq-a">Most clients stay on a monthly retainer for ongoing optimisation, new integrations, and workflow evolution. We also offer one-off support at an hourly rate for lighter-touch relationships.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section fade-up" id="cta">
        <div className="cta-card">
          <div className="cta-tag">Free Growth Audit</div>
          <h2 className="cta-headline">Ready to scale<br />operations with Zoho?</h2>
          <p className="cta-body">Book a 45-minute Zoho readiness call. We&apos;ll audit your current process, map the gaps, and scope what a Zoho rollout could look like for your business.</p>
          <Link href="/contact" className="btn-cta">
            Talk to Us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <div className="cta-note">No obligation. Honest advice about what Zoho can (and can&apos;t) do for you.</div>
        </div>
      </section>
    </>
  )
}

export default function ZohoPage() {
  return <ZohoPageContent />
}

const zohoCSS = `
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

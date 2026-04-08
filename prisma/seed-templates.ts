// Seeds one default published template per pageType.
// Each template uses inline styles + CSS variables so it works without Tailwind.
// Run with: npx tsx prisma/seed-templates.ts

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const BRAND   = '#EE4D34'
const BRAND_D = '#d63920'
const INK     = '#2B2B2B'
const INK_60  = '#727272'
const INK_BG  = '#F1F3F5'

const sharedCss = `
  .cp-tpl { font-family: Inter, system-ui, sans-serif; color: ${INK}; line-height: 1.6; }
  .cp-tpl h1, .cp-tpl h2, .cp-tpl h3 { font-family: Manrope, Inter, sans-serif; line-height: 1.15; margin: 0 0 .75rem; }
  .cp-tpl .container { max-width: 1100px; margin: 0 auto; padding: 0 1.25rem; }
  .cp-tpl .eyebrow { font-size: .75rem; font-weight: 700; color: ${BRAND}; text-transform: uppercase; letter-spacing: .15em; margin-bottom: .75rem; }
  .cp-tpl .btn { display: inline-flex; align-items: center; gap: .5rem; padding: .9rem 1.75rem; background: ${BRAND}; color: #fff; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; font-size: .85rem; border-radius: 999px; text-decoration: none; }
  .cp-tpl .btn:hover { background: ${BRAND_D}; }
  .cp-tpl .btn-outline { background: #fff; color: ${INK}; border: 2px solid ${INK_BG}; }
  .cp-tpl section { padding: 5rem 0; }
  .cp-tpl .hero { background: linear-gradient(135deg, ${INK_BG} 0%, #fff 50%, #C3DBF150 100%); }
  .cp-tpl .hero h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; max-width: 800px; }
  .cp-tpl .hero p { font-size: 1.25rem; color: ${INK_60}; max-width: 700px; margin-bottom: 2rem; }
  .cp-tpl .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
  .cp-tpl .card { background: #fff; border: 1px solid #ebebeb; border-radius: 1rem; padding: 1.75rem; }
  .cp-tpl .stat-bar { background: ${INK}; color: #fff; padding: 3rem 0; }
  .cp-tpl .stat-bar .grid-3 { gap: 2rem; text-align: center; }
  .cp-tpl .stat-bar .num { font-family: Manrope, sans-serif; font-size: 3rem; font-weight: 800; color: ${BRAND}; }
  .cp-tpl .stat-bar .lbl { font-size: .8rem; text-transform: uppercase; letter-spacing: .1em; color: #d6d6d6; margin-top: .5rem; }
  .cp-tpl .cta-banner { background: linear-gradient(135deg, ${BRAND} 0%, ${BRAND_D} 100%); color: #fff; text-align: center; padding: 4rem 0; }
  .cp-tpl .cta-banner h2 { font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; }
  .cp-tpl .cta-banner .btn { background: #fff; color: ${BRAND_D}; }
  .cp-tpl .faq-item { background: ${INK_BG}; border-radius: .75rem; padding: 1.25rem; margin-bottom: .75rem; }
  .cp-tpl .faq-item summary { font-weight: 700; cursor: pointer; }
  .cp-tpl .faq-item p { margin: .75rem 0 0; color: ${INK_60}; }
`

function wrap(body: string) {
  return `<div class="cp-tpl">${body}</div>`
}

const templates = [
  {
    name: 'Default home',
    pageType: 'home',
    layoutHtml: wrap(`
      <section class="hero"><div class="container">
        <p class="eyebrow">Welcome</p>
        <h1>UX-Led Conversion That Drives Revenue</h1>
        <p>Edit this template in the GrapesJS editor to customise your homepage.</p>
        <a href="/contact" class="btn">Get free audit</a>
      </div></section>
      <section><div class="container">
        <h2 style="text-align:center; font-size:2.25rem; font-weight:800; margin-bottom:2.5rem;">Our Services</h2>
        <div class="grid-3">
          <div class="card"><h3>Service one</h3><p>Description placeholder.</p></div>
          <div class="card"><h3>Service two</h3><p>Description placeholder.</p></div>
          <div class="card"><h3>Service three</h3><p>Description placeholder.</p></div>
        </div>
      </div></section>
      <section class="stat-bar"><div class="container"><div class="grid-3">
        <div><p class="num">200+</p><p class="lbl">Clients served</p></div>
        <div><p class="num">40%</p><p class="lbl">Avg conversion lift</p></div>
        <div><p class="num">8+</p><p class="lbl">Years experience</p></div>
      </div></div></section>
      <section class="cta-banner"><div class="container"><h2>Ready to grow your conversions?</h2><a href="/contact" class="btn">Get started</a></div></section>
    `),
  },
  {
    name: 'Default service',
    pageType: 'service',
    layoutHtml: wrap(`
      <section class="hero"><div class="container">
        <p class="eyebrow">Service</p>
        <h1>Service page heading</h1>
        <p>Hero subtitle describing the service and its outcome.</p>
        <a href="/contact" class="btn">Get free audit</a>
      </div></section>
      <section><div class="container">
        <h2 style="font-size:2rem; font-weight:800; margin-bottom:1rem;">What we do</h2>
        <p style="color:${INK_60}; max-width:700px;">Body content placeholder. Edit in the GrapesJS editor.</p>
      </div></section>
      <section style="background:${INK_BG};"><div class="container">
        <h2 style="text-align:center; font-size:2rem; font-weight:800; margin-bottom:2rem;">Frequently asked questions</h2>
        <details class="faq-item"><summary>Question one?</summary><p>Answer placeholder.</p></details>
        <details class="faq-item"><summary>Question two?</summary><p>Answer placeholder.</p></details>
      </div></section>
      <section class="cta-banner"><div class="container"><h2>Let's grow your revenue</h2><a href="/contact" class="btn">Talk to us</a></div></section>
    `),
  },
  {
    name: 'Default location',
    pageType: 'location',
    layoutHtml: wrap(`
      <section class="hero"><div class="container">
        <p class="eyebrow">Location service page</p>
        <h1>Service in [City]</h1>
        <p>Local hero subtitle. Edit in the GrapesJS editor.</p>
        <a href="/contact" class="btn">Get local audit</a>
      </div></section>
      <section><div class="container">
        <h2 style="text-align:center; font-size:2rem; font-weight:800; margin-bottom:2rem;">Why [City] chooses us</h2>
        <div class="grid-3">
          <div class="card"><h3>Local expertise</h3><p>Description placeholder.</p></div>
          <div class="card"><h3>Proven results</h3><p>Description placeholder.</p></div>
          <div class="card"><h3>Trusted partner</h3><p>Description placeholder.</p></div>
        </div>
      </div></section>
      <section class="cta-banner"><div class="container"><h2>Ready to grow in [City]?</h2><a href="/contact" class="btn">Get started</a></div></section>
    `),
  },
  {
    name: 'Default blog',
    pageType: 'blog',
    layoutHtml: wrap(`
      <section style="background:#fff; padding-top:4rem; padding-bottom:2rem;"><div class="container" style="max-width:760px;">
        <p class="eyebrow">Category</p>
        <h1 style="font-size:clamp(2rem,4vw,3rem); font-weight:800;">Blog post title</h1>
        <p style="color:${INK_60}; font-size:.9rem;">By Author Name • Published date</p>
      </div></section>
      <section style="padding-top:1rem;"><div class="container" style="max-width:760px;">
        <p>Article body content placeholder. Edit this template in the GrapesJS editor.</p>
        <p>Add multiple paragraphs, headings, images, and lists as needed for the blog post layout.</p>
      </div></section>
      <section class="cta-banner"><div class="container"><h2>Want results like this?</h2><a href="/contact" class="btn">Talk to us</a></div></section>
    `),
  },
  {
    name: 'Default case study',
    pageType: 'case-study',
    layoutHtml: wrap(`
      <section style="background:#fff; padding:4rem 0 2rem;"><div class="container" style="max-width:1000px;">
        <p class="eyebrow">Case study</p>
        <h1 style="font-size:clamp(2.25rem,4vw,3.5rem); font-weight:800;">Client success story</h1>
        <p style="color:${INK_60};"><strong>Industry:</strong> — &nbsp; <strong>Platform:</strong> —</p>
      </div></section>
      <section class="stat-bar"><div class="container"><div class="grid-3">
        <div class="card" style="background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.1); color:#fff;"><p class="num">+47%</p><p style="color:#d6d6d6;">Primary metric</p></div>
        <div class="card" style="background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.1); color:#fff;"><p class="num">+28%</p><p style="color:#d6d6d6;">Secondary metric</p></div>
        <div class="card" style="background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.1); color:#fff;"><p class="num">90 days</p><p style="color:#d6d6d6;">Time to result</p></div>
      </div></div></section>
      <section><div class="container" style="max-width:800px;">
        <h2 style="font-size:2rem; font-weight:800;">The challenge</h2>
        <p style="color:${INK_60};">Challenge description placeholder.</p>
        <h2 style="font-size:2rem; font-weight:800; margin-top:2.5rem;">Our approach</h2>
        <p style="color:${INK_60};">Approach description placeholder.</p>
      </div></section>
      <section style="background:${INK_BG};"><div class="container" style="max-width:760px; text-align:center;">
        <p style="font-family:Manrope,sans-serif; font-size:1.75rem; font-style:italic; color:${INK};">"Client quote placeholder — replace with the actual testimonial."</p>
        <p style="color:${INK_60}; margin-top:1rem;">— Quote author</p>
      </div></section>
      <section class="cta-banner"><div class="container"><h2>Want results like this?</h2><a href="/contact" class="btn">Book a strategy call</a></div></section>
    `),
  },
  {
    name: 'Default contact',
    pageType: 'contact',
    layoutHtml: wrap(`
      <section class="hero" style="text-align:center;"><div class="container">
        <p class="eyebrow">Get in touch</p>
        <h1>Let's talk</h1>
        <p style="margin-left:auto; margin-right:auto;">We typically respond within 4 working hours.</p>
      </div></section>
      <section style="background:${INK_BG};"><div class="container">
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:2.5rem;">
          <div>
            <h3 style="font-size:1.25rem; font-weight:700;">Email</h3>
            <p style="color:${INK_60};">hello@conversionprollp.com</p>
            <h3 style="font-size:1.25rem; font-weight:700; margin-top:1.5rem;">Phone</h3>
            <p style="color:${INK_60};">+91 98765 43210</p>
            <h3 style="font-size:1.25rem; font-weight:700; margin-top:1.5rem;">Office</h3>
            <p style="color:${INK_60};">Pune, Maharashtra, India</p>
          </div>
          <form class="card">
            <input type="text" placeholder="Name" style="width:100%; padding:.75rem 1rem; border:1px solid #ebebeb; border-radius:.5rem; margin-bottom:.75rem;" />
            <input type="email" placeholder="Email" style="width:100%; padding:.75rem 1rem; border:1px solid #ebebeb; border-radius:.5rem; margin-bottom:.75rem;" />
            <textarea placeholder="How can we help?" rows="5" style="width:100%; padding:.75rem 1rem; border:1px solid #ebebeb; border-radius:.5rem; margin-bottom:.75rem;"></textarea>
            <button type="submit" class="btn" style="width:100%;">Send message</button>
          </form>
        </div>
      </div></section>
    `),
  },
  {
    name: 'Default landing',
    pageType: 'landing',
    layoutHtml: wrap(`
      <section class="hero" style="text-align:center; padding:7rem 0;"><div class="container">
        <p class="eyebrow">Limited offer</p>
        <h1 style="margin-left:auto; margin-right:auto;">A bold landing page headline</h1>
        <p style="margin-left:auto; margin-right:auto;">Strong supporting copy that hammers the value proposition home.</p>
        <div style="display:flex; gap:1rem; justify-content:center; margin-top:2rem;">
          <a href="/contact" class="btn">Get started</a>
          <a href="#features" class="btn btn-outline">Learn more</a>
        </div>
      </div></section>
      <section id="features"><div class="container">
        <div class="grid-3">
          <div class="card"><h3>Benefit one</h3><p style="color:${INK_60};">Description placeholder.</p></div>
          <div class="card"><h3>Benefit two</h3><p style="color:${INK_60};">Description placeholder.</p></div>
          <div class="card"><h3>Benefit three</h3><p style="color:${INK_60};">Description placeholder.</p></div>
        </div>
      </div></section>
      <section class="cta-banner"><div class="container"><h2>Ready to convert?</h2><a href="/contact" class="btn">Claim your spot</a></div></section>
    `),
  },
]

async function main() {
  for (const tpl of templates) {
    // Skip if a template with this name already exists (idempotent)
    const existing = await prisma.pageTemplate.findFirst({ where: { name: tpl.name } })
    if (existing) {
      console.log(`  ↺ skipping "${tpl.name}" (already exists, id=${existing.id})`)
      continue
    }
    const created = await prisma.pageTemplate.create({
      data: { ...tpl, layoutCss: sharedCss, status: 'published' },
    })
    console.log(`  ✓ created "${created.name}" (${created.pageType}) — id=${created.id}`)
  }
  console.log('Done.')
}

main().catch(console.error).finally(() => prisma.$disconnect())

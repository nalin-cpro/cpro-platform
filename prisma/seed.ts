/**
 * prisma/seed.ts — single idempotent seed script for the entire platform.
 *
 * Seeds: locations, services, admin user, case study, parent service pages,
 * and default PageTemplates.
 *
 * Safe to re-run on any environment (dev, staging, prod) — uses upsert
 * everywhere, so it only inserts missing records and never overwrites
 * content that has been edited in the admin.
 *
 * Run:
 *   npx prisma db seed          (via package.json "prisma.seed")
 *   npx tsx prisma/seed.ts      (directly)
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import * as fs from 'fs'
const prisma = new PrismaClient()

// ═══════════════════════════════════════════════════════════════════════════
// helpers
// ═══════════════════════════════════════════════════════════════════════════
let created = 0
let skipped = 0

function log(label: string, action: string) {
  if (action === 'created') created++
  else skipped++
  console.log(`  ${action === 'created' ? '✓' : '↺'} ${label}`)
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. LOCATIONS
// ═══════════════════════════════════════════════════════════════════════════
async function seedLocations() {
  console.log('\n── Locations ──')
  const locations = [
    { city: 'Pune',      state: 'Maharashtra', slug: 'pune',      lat: 18.5204, lng: 73.8567 },
    { city: 'Mumbai',    state: 'Maharashtra', slug: 'mumbai',    lat: 19.0760, lng: 72.8777 },
    { city: 'Bangalore', state: 'Karnataka',   slug: 'bangalore', lat: 12.9716, lng: 77.5946 },
    { city: 'Delhi',     state: 'Delhi',       slug: 'delhi',     lat: 28.7041, lng: 77.1025 },
    { city: 'Hyderabad', state: 'Telangana',   slug: 'hyderabad', lat: 17.3850, lng: 78.4867 },
    { city: 'Chennai',   state: 'Tamil Nadu',  slug: 'chennai',   lat: 13.0827, lng: 80.2707 },
  ]
  for (const loc of locations) {
    const existing = await prisma.location.findUnique({ where: { slug: loc.slug } })
    if (existing) { log(loc.city, 'exists'); continue }
    await prisma.location.create({ data: loc })
    log(loc.city, 'created')
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. SERVICES (44)
// ═══════════════════════════════════════════════════════════════════════════
async function seedServices() {
  console.log('\n── Services ──')
  const services = [
    // Digital Marketing (9)
    { name: 'Digital Marketing',            slug: 'digital-marketing',                  cluster: 'digital-marketing', parentSlug: null,               sortOrder: 1 },
    { name: 'SEO',                          slug: 'digital-marketing/seo',               cluster: 'digital-marketing', parentSlug: 'digital-marketing', sortOrder: 2 },
    { name: 'Google Ads / PPC',             slug: 'digital-marketing/ppc',               cluster: 'digital-marketing', parentSlug: 'digital-marketing', sortOrder: 3 },
    { name: 'Meta Ads',                     slug: 'digital-marketing/meta-ads',          cluster: 'digital-marketing', parentSlug: 'digital-marketing', sortOrder: 4 },
    { name: 'Email Marketing',              slug: 'digital-marketing/email-marketing',   cluster: 'digital-marketing', parentSlug: 'digital-marketing', sortOrder: 5 },
    { name: 'Social Media Management',      slug: 'digital-marketing/social-media',      cluster: 'digital-marketing', parentSlug: 'digital-marketing', sortOrder: 6 },
    { name: 'Ad Creatives — Static',        slug: 'digital-marketing/ad-creatives',      cluster: 'digital-marketing', parentSlug: 'digital-marketing', sortOrder: 7 },
    { name: 'Ad Creatives — Video',         slug: 'digital-marketing/video-ads',         cluster: 'digital-marketing', parentSlug: 'digital-marketing', sortOrder: 8 },
    { name: 'Content Marketing',            slug: 'digital-marketing/content-marketing', cluster: 'digital-marketing', parentSlug: 'digital-marketing', sortOrder: 9 },
    // CRO (7)
    { name: 'Conversion Rate Optimisation', slug: 'cro',                cluster: 'cro', parentSlug: null,  sortOrder: 1 },
    { name: 'eCommerce CRO',               slug: 'cro/ecommerce',      cluster: 'cro', parentSlug: 'cro', sortOrder: 2 },
    { name: 'Shopify CRO',                 slug: 'cro/shopify',        cluster: 'cro', parentSlug: 'cro', sortOrder: 3 },
    { name: 'WooCommerce CRO',             slug: 'cro/woocommerce',    cluster: 'cro', parentSlug: 'cro', sortOrder: 4 },
    { name: 'Landing Page Optimisation',    slug: 'cro/landing-pages',  cluster: 'cro', parentSlug: 'cro', sortOrder: 5 },
    { name: 'A/B Testing',                 slug: 'cro/ab-testing',     cluster: 'cro', parentSlug: 'cro', sortOrder: 6 },
    { name: 'Checkout Optimisation',        slug: 'cro/checkout',       cluster: 'cro', parentSlug: 'cro', sortOrder: 7 },
    // Marketplaces (8)
    { name: 'Marketplace Management',       slug: 'marketplaces',                         cluster: 'marketplaces', parentSlug: null,           sortOrder: 1 },
    { name: 'Account Management',           slug: 'marketplaces/account-management',      cluster: 'marketplaces', parentSlug: 'marketplaces', sortOrder: 2 },
    { name: 'Listing Optimisation',         slug: 'marketplaces/listing-optimisation',    cluster: 'marketplaces', parentSlug: 'marketplaces', sortOrder: 3 },
    { name: 'Catalogue Management',         slug: 'marketplaces/catalogue-management',    cluster: 'marketplaces', parentSlug: 'marketplaces', sortOrder: 4 },
    { name: 'Marketplace Ads',              slug: 'marketplaces/sponsored-ads',           cluster: 'marketplaces', parentSlug: 'marketplaces', sortOrder: 5 },
    { name: 'Amazon Seller Management',     slug: 'marketplaces/amazon',                  cluster: 'marketplaces', parentSlug: 'marketplaces', sortOrder: 6 },
    { name: 'Flipkart Seller Management',   slug: 'marketplaces/flipkart',                cluster: 'marketplaces', parentSlug: 'marketplaces', sortOrder: 7 },
    { name: 'New Seller Launch',            slug: 'marketplaces/new-seller-launch',       cluster: 'marketplaces', parentSlug: 'marketplaces', sortOrder: 8 },
    // Development (10)
    { name: 'Web Development',              slug: 'development',                    cluster: 'development', parentSlug: null,          sortOrder: 1 },
    { name: 'WordPress Development',        slug: 'development/wordpress',          cluster: 'development', parentSlug: 'development', sortOrder: 2 },
    { name: 'Shopify Development',          slug: 'development/shopify',            cluster: 'development', parentSlug: 'development', sortOrder: 3 },
    { name: 'WooCommerce Development',      slug: 'development/woocommerce',        cluster: 'development', parentSlug: 'development', sortOrder: 4 },
    { name: 'Next.js / Headless Sites',     slug: 'development/nextjs',             cluster: 'development', parentSlug: 'development', sortOrder: 5 },
    { name: 'Landing Page Development',     slug: 'development/landing-pages',      cluster: 'development', parentSlug: 'development', sortOrder: 6 },
    { name: 'Web App Development',          slug: 'development/web-apps',           cluster: 'development', parentSlug: 'development', sortOrder: 7 },
    { name: 'API Integrations',             slug: 'development/api-integrations',   cluster: 'development', parentSlug: 'development', sortOrder: 8 },
    { name: 'Speed Optimisation',           slug: 'development/speed-optimisation', cluster: 'development', parentSlug: 'development', sortOrder: 9 },
    { name: 'Website Migration',            slug: 'development/migrations',         cluster: 'development', parentSlug: 'development', sortOrder: 10 },
    // Zoho (10)
    { name: 'Zoho Services',                slug: 'zoho',                       cluster: 'zoho', parentSlug: null,   sortOrder: 1 },
    { name: 'Zoho One Implementation',      slug: 'zoho/zoho-one',              cluster: 'zoho', parentSlug: 'zoho', sortOrder: 2 },
    { name: 'Zoho CRM',                     slug: 'zoho/crm',                   cluster: 'zoho', parentSlug: 'zoho', sortOrder: 3 },
    { name: 'Zoho Marketing Automation',    slug: 'zoho/marketing-automation',  cluster: 'zoho', parentSlug: 'zoho', sortOrder: 4 },
    { name: 'Zoho Campaigns',               slug: 'zoho/campaigns',             cluster: 'zoho', parentSlug: 'zoho', sortOrder: 5 },
    { name: 'Zoho Desk',                    slug: 'zoho/desk',                  cluster: 'zoho', parentSlug: 'zoho', sortOrder: 6 },
    { name: 'Zoho Books',                   slug: 'zoho/books',                 cluster: 'zoho', parentSlug: 'zoho', sortOrder: 7 },
    { name: 'Zoho Analytics',               slug: 'zoho/analytics',             cluster: 'zoho', parentSlug: 'zoho', sortOrder: 8 },
    { name: 'Zoho Creator',                 slug: 'zoho/creator',               cluster: 'zoho', parentSlug: 'zoho', sortOrder: 9 },
    { name: 'Zoho Integrations',            slug: 'zoho/integrations',          cluster: 'zoho', parentSlug: 'zoho', sortOrder: 10 },
  ]
  for (const svc of services) {
    const existing = await prisma.service.findUnique({ where: { slug: svc.slug } })
    if (existing) { log(svc.slug, 'exists'); continue }
    await prisma.service.create({ data: svc })
    log(svc.slug, 'created')
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. ADMIN USER
// ═══════════════════════════════════════════════════════════════════════════
async function seedAdmin() {
  console.log('\n── Admin user ──')
  const email = process.env.ADMIN_EMAIL || 'admin@conversionprollp.com'
  const existing = await prisma.adminUser.findUnique({ where: { email } })
  if (existing) { log(email, 'exists'); return }
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'cpro_admin_2024', 10)
  await prisma.adminUser.create({ data: { email, password: hashedPassword, name: 'ConversionPro Admin', role: 'super-admin' } })
  log(email, 'created')
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. CASE STUDY
// ═══════════════════════════════════════════════════════════════════════════
async function seedCaseStudy() {
  console.log('\n── Case studies ──')
  const slug = 'fulfillment-excellence-d2c-footwear'
  const existing = await prisma.caseStudy.findUnique({ where: { slug } })
  if (existing) { log(slug, 'exists'); return }

  const croService = await prisma.service.findUnique({ where: { slug: 'cro/ecommerce' } })
  await prisma.caseStudy.create({
    data: {
      slug,
      status: 'published',
      clientName: 'D2C Footwear Brand',
      clientAlias: 'Emerging Leather Footwear Brand',
      industry: 'D2C / eCommerce',
      platform: 'Custom ERP + eCommerce',
      city: 'Pan-India',
      engagementDuration: 'Ongoing',
      year: 2024,
      serviceId: croService?.id,
      primaryMetric: 'Order-to-dispatch speed',
      primaryDelta: '30–50% faster',
      secondaryMetric: 'RTO rate',
      secondaryDelta: '15–20% reduction from 40% baseline',
      thirdMetric: 'Customer satisfaction',
      thirdDelta: '20–30% higher',
      timeToResult: '90 days',
      challenge: 'An emerging leather footwear brand expanding from offline retail to D2C eCommerce faced critical bottlenecks: slow order processing, a 40% RTO rate, delivery delays, and zero customer visibility. Centralised fulfillment from one warehouse compounded delays across all regions.',
      approach: JSON.stringify([
        'Implemented order-to-dispatch automation connecting ERP, website and courier systems',
        'Designed multi-node regional warehousing strategy to cut last-mile delivery time',
        'Built RTO reduction workflow: COD confirmation, address validation, proactive delivery communication',
        'Set up real-time order tracking and SMS/WhatsApp customer notifications',
        'Established courier performance benchmarking with dynamic allocation rules',
      ]),
      keyInsight: 'The 40% RTO was driven by unvalidated COD orders and poor address data — not product issues. Fixing the pre-dispatch confirmation flow reduced RTO immediately, before any warehouse changes were needed.',
      clientQuote: 'The operational transformation ConversionPro delivered in 90 days would have taken our internal team over a year to figure out.',
      clientQuoteAuthor: 'Founder, D2C Footwear Brand',
      title: 'Driving Fulfillment Excellence for a D2C Footwear Brand | ConversionPro',
      metaDesc: 'How ConversionPro reduced RTO by 15–20% and achieved 30–50% faster deliveries for a D2C leather footwear brand expanding online.',
      primaryKw: 'D2C ecommerce fulfillment optimization India',
      featuredHome: true,
      featuredService: true,
    },
  })
  log(slug, 'created')
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. PARENT SERVICE PAGES (the 5 nav-linked routes)
// ═══════════════════════════════════════════════════════════════════════════
async function seedServicePages() {
  console.log('\n── Service pages ──')

  const pages = [
    {
      slug: 'digital-marketing',
      title: 'Digital Marketing Services India | ConversionPro',
      h1: 'Digital Marketing Services',
      metaDesc: 'Full-funnel digital marketing — SEO, PPC, social media, content and email marketing for Indian brands.',
      bodyJson: {
        hero_subtitle: 'SEO, PPC, Meta Ads, content marketing and email automation — we build compounding growth for eCommerce brands across India.',
        features: [
          { title: 'SEO & Organic Growth', desc: 'Technical SEO, content strategy, and link building that drives sustainable organic traffic.' },
          { title: 'Paid Ads (PPC + Meta)', desc: 'Google Ads, Meta Ads, and marketplace ads managed for maximum ROAS.' },
          { title: 'Email & Lifecycle', desc: 'Automated flows, segmentation, and campaigns that drive repeat revenue.' },
        ],
        faq: [
          { q: 'How long before SEO shows results?', a: 'Most clients see meaningful organic traffic growth in 3-6 months. Quick wins from technical fixes and content often come sooner.' },
          { q: 'Do you manage Meta and Google Ads together?', a: 'Yes. We run cross-platform campaigns with unified tracking so you see the full picture.' },
        ],
      },
    },
    {
      slug: 'cro',
      title: 'Conversion Rate Optimization India | ConversionPro',
      h1: 'Conversion Rate Optimization',
      metaDesc: 'Data-driven CRO for eCommerce — heatmaps, A/B testing, funnel analysis and checkout optimization.',
      bodyJson: {
        hero_subtitle: 'We use heatmaps, session recordings, funnel data and A/B testing to find exactly where your revenue is leaking — then fix it.',
        features: [
          { title: 'Funnel Analysis', desc: 'We map every step of your conversion funnel and identify the biggest drop-off points.' },
          { title: 'A/B Testing', desc: 'Rigorous testing of every change to prove uplift before scaling.' },
          { title: 'UX Research', desc: 'Heatmaps, session recordings and user interviews reveal what analytics can\'t.' },
        ],
        faq: [
          { q: 'How much conversion lift can I expect?', a: 'Most clients see 20-60% improvement in primary conversion metrics within 90 days.' },
          { q: 'Do you work with Shopify and WooCommerce?', a: 'Yes. We have deep experience with both platforms, plus custom-built eCommerce.' },
        ],
      },
    },
    {
      slug: 'marketplaces',
      title: 'Marketplace Management India | ConversionPro',
      h1: 'Marketplace Management',
      metaDesc: 'Amazon, Flipkart and D2C marketplace management — listings, ads, catalogue and seller operations.',
      bodyJson: {
        hero_subtitle: 'End-to-end Amazon and Flipkart management — account setup, listing optimization, sponsored ads, catalogue management and seller operations.',
        features: [
          { title: 'Listing Optimization', desc: 'SEO-driven titles, bullets, A+ content and backend keywords that rank.' },
          { title: 'Sponsored Ads', desc: 'Campaign structure, bid management and ACOS optimization across platforms.' },
          { title: 'Seller Operations', desc: 'Inventory planning, FBA/Flipkart Assured, returns management and compliance.' },
        ],
        faq: [
          { q: 'Do you manage both Amazon and Flipkart?', a: 'Yes. We manage seller accounts on Amazon India, Flipkart, Myntra and other Indian marketplaces.' },
          { q: 'Can you help launch a new seller account?', a: 'Absolutely. Our new seller launch program covers registration, brand registry, catalogue setup and first ad campaigns.' },
        ],
      },
    },
    {
      slug: 'zoho',
      title: 'Zoho Consulting & Implementation India | ConversionPro',
      h1: 'Zoho Services',
      metaDesc: 'Certified Zoho One partner — CRM, marketing automation, commerce, analytics and custom integrations.',
      bodyJson: {
        hero_subtitle: 'We are a certified Zoho One implementation partner. CRM, marketing automation, commerce, analytics, Desk, Books — configured and integrated for your business.',
        features: [
          { title: 'Zoho CRM', desc: 'Pipeline setup, workflow automation, custom modules and third-party integrations.' },
          { title: 'Zoho Marketing', desc: 'Marketing Automation, Campaigns, Social — connected to your CRM for closed-loop reporting.' },
          { title: 'Zoho Integrations', desc: 'API integrations with your eCommerce platform, payment gateway, logistics and accounting tools.' },
        ],
        faq: [
          { q: 'Are you an official Zoho partner?', a: 'Yes. ConversionPro is a certified Zoho One implementation partner.' },
          { q: 'Can you migrate from HubSpot or Salesforce?', a: 'Yes. We handle data migration, field mapping, workflow recreation and user training.' },
        ],
      },
    },
    {
      slug: 'development',
      title: 'Web Development India | ConversionPro',
      h1: 'Web Development',
      metaDesc: 'Conversion-focused web development — Next.js, Shopify, WordPress, landing pages and API integrations.',
      bodyJson: {
        hero_subtitle: 'We build fast, conversion-optimized websites on Next.js, Shopify, WordPress and WooCommerce. Every project includes performance benchmarking and CRO best practices.',
        features: [
          { title: 'Headless / Next.js', desc: 'Server-rendered React apps with headless CMS — fast, SEO-friendly, scalable.' },
          { title: 'Shopify & WooCommerce', desc: 'Theme customization, app integrations, checkout optimization and migration.' },
          { title: 'Landing Pages', desc: 'High-converting campaign landing pages with A/B testing built in.' },
        ],
        faq: [
          { q: 'Which platforms do you build on?', a: 'Next.js, Shopify, WordPress/WooCommerce, and custom Node.js web apps.' },
          { q: 'Do you handle hosting and deployment?', a: 'Yes. We set up CI/CD, manage servers, and handle SSL, DNS and monitoring.' },
        ],
      },
    },
  ]

  for (const p of pages) {
    const existing = await prisma.page.findUnique({ where: { slug: p.slug } })
    if (existing) { log(p.slug, 'exists'); continue }
    const service = await prisma.service.findUnique({ where: { slug: p.slug } })
    await prisma.page.create({
      data: {
        slug: p.slug,
        pageType: 'service',
        status: 'published',
        title: p.title,
        h1: p.h1,
        metaDesc: p.metaDesc,
        bodyJson: p.bodyJson,
        serviceId: service?.id,
        aiGenerated: false,
      },
    })
    log(p.slug, 'created')
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 6. DEFAULT PAGE TEMPLATES (7 — draft by default, opt-in via admin)
// ═══════════════════════════════════════════════════════════════════════════
async function seedTemplates() {
  console.log('\n── Page templates ──')

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
    .cp-tpl section { padding: 5rem 0; }
    .cp-tpl .hero { background: linear-gradient(135deg, ${INK_BG} 0%, #fff 50%, #C3DBF150 100%); }
    .cp-tpl .hero h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; max-width: 800px; }
    .cp-tpl .hero p { font-size: 1.25rem; color: ${INK_60}; max-width: 700px; margin-bottom: 2rem; }
    .cp-tpl .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .cp-tpl .card { background: #fff; border: 1px solid #ebebeb; border-radius: 1rem; padding: 1.75rem; }
    .cp-tpl .stat-bar { background: ${INK}; color: #fff; padding: 3rem 0; }
    .cp-tpl .stat-bar .num { font-size: 3rem; font-weight: 800; color: ${BRAND}; }
    .cp-tpl .stat-bar .lbl { font-size: .8rem; text-transform: uppercase; letter-spacing: .1em; color: #d6d6d6; margin-top: .5rem; }
    .cp-tpl .cta-banner { background: linear-gradient(135deg, ${BRAND} 0%, ${BRAND_D} 100%); color: #fff; text-align: center; padding: 4rem 0; }
    .cp-tpl .cta-banner h2 { font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; }
    .cp-tpl .cta-banner .btn { background: #fff; color: ${BRAND_D}; }
  `

  const wrap = (body: string) => `<div class="cp-tpl">${body}</div>`

  const templates = [
    { name: 'Default home',       pageType: 'home',       html: wrap('<section class="hero"><div class="container"><p class="eyebrow">Welcome</p><h1>UX-Led Conversion That Drives Revenue</h1><p>Edit this template in the GrapesJS editor.</p><a href="/contact" class="btn">Get free audit</a></div></section><section class="stat-bar"><div class="container"><div class="grid-3" style="text-align:center;"><div><p class="num">200+</p><p class="lbl">Clients</p></div><div><p class="num">40%</p><p class="lbl">Avg lift</p></div><div><p class="num">8+</p><p class="lbl">Years</p></div></div></div></section><section class="cta-banner"><div class="container"><h2>Ready to grow?</h2><a href="/contact" class="btn">Get started</a></div></section>') },
    { name: 'Default service',    pageType: 'service',    html: wrap('<section class="hero"><div class="container"><p class="eyebrow">Service</p><h1>Service page heading</h1><p>Hero subtitle placeholder.</p><a href="/contact" class="btn">Get free audit</a></div></section><section class="cta-banner"><div class="container"><h2>Let\'s grow your revenue</h2><a href="/contact" class="btn">Talk to us</a></div></section>') },
    { name: 'Default location',   pageType: 'location',   html: wrap('<section class="hero"><div class="container"><p class="eyebrow">Location</p><h1>Service in [City]</h1><p>Local hero subtitle.</p><a href="/contact" class="btn">Get local audit</a></div></section><section class="cta-banner"><div class="container"><h2>Ready to grow in [City]?</h2><a href="/contact" class="btn">Get started</a></div></section>') },
    { name: 'Default blog',       pageType: 'blog',       html: wrap('<section style="padding-top:4rem;"><div class="container" style="max-width:760px;"><p class="eyebrow">Category</p><h1>Blog post title</h1></div></section><section><div class="container" style="max-width:760px;"><p>Article body placeholder.</p></div></section><section class="cta-banner"><div class="container"><h2>Want results like this?</h2><a href="/contact" class="btn">Talk to us</a></div></section>') },
    { name: 'Default case study', pageType: 'case-study', html: wrap('<section class="hero"><div class="container"><p class="eyebrow">Case study</p><h1>Client success story</h1></div></section><section class="stat-bar"><div class="container"><div class="grid-3" style="text-align:center;"><div><p class="num">+47%</p><p class="lbl">Primary metric</p></div><div><p class="num">90d</p><p class="lbl">Time to result</p></div></div></div></section><section class="cta-banner"><div class="container"><h2>Want results like this?</h2><a href="/contact" class="btn">Book a call</a></div></section>') },
    { name: 'Default contact',    pageType: 'contact',    html: wrap('<section class="hero" style="text-align:center;"><div class="container"><p class="eyebrow">Get in touch</p><h1>Let\'s talk</h1><p style="margin:0 auto;">We respond within 4 working hours.</p></div></section>') },
    { name: 'Default landing',    pageType: 'landing',    html: wrap('<section class="hero" style="text-align:center;padding:7rem 0;"><div class="container"><p class="eyebrow">Limited offer</p><h1 style="margin:0 auto;">Bold landing page headline</h1><p style="margin:0 auto;">Supporting value proposition copy.</p><a href="/contact" class="btn">Get started</a></div></section><section class="cta-banner"><div class="container"><h2>Ready to convert?</h2><a href="/contact" class="btn">Claim your spot</a></div></section>') },
  ]

  for (const t of templates) {
    const existing = await prisma.pageTemplate.findFirst({ where: { name: t.name } })
    if (existing) { log(t.name, 'exists'); continue }
    await prisma.pageTemplate.create({
      data: { name: t.name, pageType: t.pageType, layoutHtml: t.html, layoutCss: sharedCss, status: 'draft' },
    })
    log(t.name, 'created')
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 7. PUBLIC/UPLOADS DIRECTORY
// ═══════════════════════════════════════════════════════════════════════════
function ensureUploadsDir() {
  fs.mkdirSync('public/uploads', { recursive: true })
  const gitkeep = 'public/uploads/.gitkeep'
  if (!fs.existsSync(gitkeep)) fs.writeFileSync(gitkeep, '')
}

// ═══════════════════════════════════════════════════════════════════════════
// RUN ALL
// ═══════════════════════════════════════════════════════════════════════════
async function main() {
  console.log('╔═══════════════════════════════════════╗')
  console.log('║   ConversionPro — Database seed       ║')
  console.log('╚═══════════════════════════════════════╝')

  await seedLocations()
  await seedServices()
  await seedAdmin()
  await seedCaseStudy()
  await seedServicePages()
  await seedTemplates()
  ensureUploadsDir()

  console.log(`\n✓ Seed complete — ${created} created, ${skipped} already existed.\n`)
}

main().catch(console.error).finally(() => prisma.$disconnect())

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

async function main() {
  const locations = [
    { city: 'Pune',      state: 'Maharashtra', slug: 'pune',      lat: 18.5204, lng: 73.8567 },
    { city: 'Mumbai',    state: 'Maharashtra', slug: 'mumbai',    lat: 19.0760, lng: 72.8777 },
    { city: 'Bangalore', state: 'Karnataka',   slug: 'bangalore', lat: 12.9716, lng: 77.5946 },
    { city: 'Delhi',     state: 'Delhi',       slug: 'delhi',     lat: 28.7041, lng: 77.1025 },
    { city: 'Hyderabad', state: 'Telangana',   slug: 'hyderabad', lat: 17.3850, lng: 78.4867 },
    { city: 'Chennai',   state: 'Tamil Nadu',  slug: 'chennai',   lat: 13.0827, lng: 80.2707 },
  ]
  for (const loc of locations) {
    await prisma.location.upsert({ where: { slug: loc.slug }, update: {}, create: loc })
  }

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
    { name: 'Conversion Rate Optimisation', slug: 'cro',                                 cluster: 'cro', parentSlug: null,  sortOrder: 1 },
    { name: 'eCommerce CRO',               slug: 'cro/ecommerce',                        cluster: 'cro', parentSlug: 'cro', sortOrder: 2 },
    { name: 'Shopify CRO',                 slug: 'cro/shopify',                          cluster: 'cro', parentSlug: 'cro', sortOrder: 3 },
    { name: 'WooCommerce CRO',             slug: 'cro/woocommerce',                      cluster: 'cro', parentSlug: 'cro', sortOrder: 4 },
    { name: 'Landing Page Optimisation',   slug: 'cro/landing-pages',                    cluster: 'cro', parentSlug: 'cro', sortOrder: 5 },
    { name: 'A/B Testing',                 slug: 'cro/ab-testing',                       cluster: 'cro', parentSlug: 'cro', sortOrder: 6 },
    { name: 'Checkout Optimisation',       slug: 'cro/checkout',                         cluster: 'cro', parentSlug: 'cro', sortOrder: 7 },
    // Marketplaces (8)
    { name: 'Marketplace Management',      slug: 'marketplaces',                         cluster: 'marketplaces', parentSlug: null,              sortOrder: 1 },
    { name: 'Account Management',          slug: 'marketplaces/account-management',      cluster: 'marketplaces', parentSlug: 'marketplaces',    sortOrder: 2 },
    { name: 'Listing Optimisation',        slug: 'marketplaces/listing-optimisation',    cluster: 'marketplaces', parentSlug: 'marketplaces',    sortOrder: 3 },
    { name: 'Catalogue Management',        slug: 'marketplaces/catalogue-management',    cluster: 'marketplaces', parentSlug: 'marketplaces',    sortOrder: 4 },
    { name: 'Marketplace Ads',             slug: 'marketplaces/sponsored-ads',           cluster: 'marketplaces', parentSlug: 'marketplaces',    sortOrder: 5 },
    { name: 'Amazon Seller Management',    slug: 'marketplaces/amazon',                  cluster: 'marketplaces', parentSlug: 'marketplaces',    sortOrder: 6 },
    { name: 'Flipkart Seller Management',  slug: 'marketplaces/flipkart',                cluster: 'marketplaces', parentSlug: 'marketplaces',    sortOrder: 7 },
    { name: 'New Seller Launch',           slug: 'marketplaces/new-seller-launch',       cluster: 'marketplaces', parentSlug: 'marketplaces',    sortOrder: 8 },
    // Development (10)
    { name: 'Web Development',             slug: 'development',                          cluster: 'development', parentSlug: null,              sortOrder: 1 },
    { name: 'WordPress Development',       slug: 'development/wordpress',                cluster: 'development', parentSlug: 'development',     sortOrder: 2 },
    { name: 'Shopify Development',         slug: 'development/shopify',                  cluster: 'development', parentSlug: 'development',     sortOrder: 3 },
    { name: 'WooCommerce Development',     slug: 'development/woocommerce',              cluster: 'development', parentSlug: 'development',     sortOrder: 4 },
    { name: 'Next.js / Headless Sites',    slug: 'development/nextjs',                   cluster: 'development', parentSlug: 'development',     sortOrder: 5 },
    { name: 'Landing Page Development',    slug: 'development/landing-pages',            cluster: 'development', parentSlug: 'development',     sortOrder: 6 },
    { name: 'Web App Development',         slug: 'development/web-apps',                 cluster: 'development', parentSlug: 'development',     sortOrder: 7 },
    { name: 'API Integrations',            slug: 'development/api-integrations',         cluster: 'development', parentSlug: 'development',     sortOrder: 8 },
    { name: 'Speed Optimisation',          slug: 'development/speed-optimisation',       cluster: 'development', parentSlug: 'development',     sortOrder: 9 },
    { name: 'Website Migration',           slug: 'development/migrations',               cluster: 'development', parentSlug: 'development',     sortOrder: 10 },
    // Zoho (10)
    { name: 'Zoho Services',               slug: 'zoho',                                 cluster: 'zoho', parentSlug: null,   sortOrder: 1 },
    { name: 'Zoho One Implementation',     slug: 'zoho/zoho-one',                        cluster: 'zoho', parentSlug: 'zoho', sortOrder: 2 },
    { name: 'Zoho CRM',                    slug: 'zoho/crm',                             cluster: 'zoho', parentSlug: 'zoho', sortOrder: 3 },
    { name: 'Zoho Marketing Automation',   slug: 'zoho/marketing-automation',            cluster: 'zoho', parentSlug: 'zoho', sortOrder: 4 },
    { name: 'Zoho Campaigns',              slug: 'zoho/campaigns',                       cluster: 'zoho', parentSlug: 'zoho', sortOrder: 5 },
    { name: 'Zoho Desk',                   slug: 'zoho/desk',                            cluster: 'zoho', parentSlug: 'zoho', sortOrder: 6 },
    { name: 'Zoho Books',                  slug: 'zoho/books',                           cluster: 'zoho', parentSlug: 'zoho', sortOrder: 7 },
    { name: 'Zoho Analytics',              slug: 'zoho/analytics',                       cluster: 'zoho', parentSlug: 'zoho', sortOrder: 8 },
    { name: 'Zoho Creator',                slug: 'zoho/creator',                         cluster: 'zoho', parentSlug: 'zoho', sortOrder: 9 },
    { name: 'Zoho Integrations',           slug: 'zoho/integrations',                    cluster: 'zoho', parentSlug: 'zoho', sortOrder: 10 },
  ]
  for (const svc of services) {
    await prisma.service.upsert({ where: { slug: svc.slug }, update: {}, create: svc })
  }

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'cpro_admin_2024', 10)
  await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@conversionprollp.com' },
    update: {},
    create: { email: process.env.ADMIN_EMAIL || 'admin@conversionprollp.com', password: hashedPassword, name: 'ConversionPro Admin', role: 'super-admin' },
  })

  const croService = await prisma.service.findUnique({ where: { slug: 'cro/ecommerce' } })
  await prisma.caseStudy.upsert({
    where: { slug: 'fulfillment-excellence-d2c-footwear' },
    update: {},
    create: {
      slug: 'fulfillment-excellence-d2c-footwear',
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

  const fs = require('fs')
  fs.mkdirSync('public/uploads', { recursive: true })
  if (!fs.existsSync('public/uploads/.gitkeep')) fs.writeFileSync('public/uploads/.gitkeep', '')

  console.log('Seed complete — 6 locations, 44 services, 1 admin, 1 case study')
}

main().catch(console.error).finally(() => prisma.$disconnect())

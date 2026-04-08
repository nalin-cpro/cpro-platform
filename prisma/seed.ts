import { PrismaClient } from '@prisma/client'
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
    { name: 'Conversion Rate Optimization', slug: 'conversion-rate-optimization',            cluster: 'cro',               parentSlug: null },
    { name: 'eCommerce CRO',                slug: 'conversion-rate-optimization/ecommerce',   cluster: 'cro',               parentSlug: 'conversion-rate-optimization' },
    { name: 'Shopify CRO',                  slug: 'conversion-rate-optimization/shopify',      cluster: 'cro',               parentSlug: 'conversion-rate-optimization' },
    { name: 'WooCommerce CRO',              slug: 'conversion-rate-optimization/woocommerce',  cluster: 'cro',               parentSlug: 'conversion-rate-optimization' },
    { name: 'Landing Page Optimization',    slug: 'conversion-rate-optimization/landing-page', cluster: 'cro',               parentSlug: 'conversion-rate-optimization' },
    { name: 'A/B Testing',                  slug: 'conversion-rate-optimization/ab-testing',   cluster: 'cro',               parentSlug: 'conversion-rate-optimization' },
    { name: 'Zoho Services',                slug: 'zoho-services',                            cluster: 'zoho',              parentSlug: null },
    { name: 'Zoho CRM Implementation',      slug: 'zoho-services/zoho-crm-implementation',     cluster: 'zoho',              parentSlug: 'zoho-services' },
    { name: 'Zoho One Consulting',          slug: 'zoho-services/zoho-one-consulting',         cluster: 'zoho',              parentSlug: 'zoho-services' },
    { name: 'Zoho Marketing Automation',    slug: 'zoho-services/zoho-marketing-automation',   cluster: 'zoho',              parentSlug: 'zoho-services' },
    { name: 'Zoho Commerce',                slug: 'zoho-services/zoho-commerce',               cluster: 'zoho',              parentSlug: 'zoho-services' },
    { name: 'Zoho Integrations',            slug: 'zoho-services/zoho-integrations',           cluster: 'zoho',              parentSlug: 'zoho-services' },
    { name: 'Digital Marketing',            slug: 'digital-marketing',                        cluster: 'digital-marketing', parentSlug: null },
    { name: 'SEO Services',                 slug: 'digital-marketing/seo',                     cluster: 'digital-marketing', parentSlug: 'digital-marketing' },
    { name: 'Google Ads / PPC',             slug: 'digital-marketing/ppc-google-ads',          cluster: 'digital-marketing', parentSlug: 'digital-marketing' },
    { name: 'Social Media Marketing',       slug: 'digital-marketing/social-media-marketing',  cluster: 'digital-marketing', parentSlug: 'digital-marketing' },
    { name: 'Content Marketing',            slug: 'digital-marketing/content-marketing',       cluster: 'digital-marketing', parentSlug: 'digital-marketing' },
    { name: 'Email Marketing',              slug: 'digital-marketing/email-marketing',         cluster: 'digital-marketing', parentSlug: 'digital-marketing' },
    { name: 'eCommerce Marketing',          slug: 'digital-marketing/ecommerce-marketing',     cluster: 'digital-marketing', parentSlug: 'digital-marketing' },
  ]
  for (const svc of services) {
    await prisma.service.upsert({ where: { slug: svc.slug }, update: {}, create: svc })
  }
  console.log('Seed complete — 6 locations, 19 services inserted.')
}

main().catch(console.error).finally(() => prisma.$disconnect())

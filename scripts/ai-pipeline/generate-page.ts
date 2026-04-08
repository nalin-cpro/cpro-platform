import Anthropic from '@anthropic-ai/sdk'
import { PrismaClient } from '@prisma/client'

const prisma    = new PrismaClient()
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const REV_SECRET = process.env.REVALIDATION_SECRET || ''

function locationPrompt(service: string, city: string, state: string, kw: string) {
  return `You are an expert SEO content writer for ConversionPro LLP — a data-driven CRO, Zoho, and digital marketing agency in Pune, India. Write a location service page.

Service: ${service} | City: ${city}, ${state}, India | Primary keyword: "${kw}"

Positioning: technical, analytical, conversion-focused. NOT a generic agency.

Return ONLY valid JSON, no markdown, no preamble:
{
  "title": "50-60 chars including keyword and city",
  "meta_desc": "140-155 chars, action-oriented, includes keyword",
  "h1": "natural keyword inclusion",
  "hero_subtitle": "2 sentences, problem-aware, outcome-focused",
  "sections": [{"heading": "string","body": "100-150 words"}],
  "faq": [{"q": "string","a": "50-80 words"}],
  "cta_text": "one compelling sentence"
}
Include exactly 4 sections and 5 FAQs. Reference ${city} business landscape naturally.`
}

async function revalidate(slug: string) {
  try {
    await fetch(`${SITE_URL}/api/revalidate?secret=${REV_SECRET}&path=/${slug}`, { method: 'POST' })
  } catch { /* dev env may not need revalidation */ }
}

async function generateLocationPage(citySlug: string, serviceSlug: string) {
  console.log(`\nGenerating: /${serviceSlug}/${citySlug}`)
  const location = await prisma.location.findUnique({ where: { slug: citySlug } })
  const service  = await prisma.service.findUnique({ where: { slug: serviceSlug } })
  if (!location || !service) { console.error('Not found in DB'); process.exit(1) }

  const primaryKw = `${service.name} ${location.city}`
  const slug      = `${serviceSlug}/${citySlug}`
  const prompt    = locationPrompt(service.name, location.city, location.state, primaryKw)

  console.log('  Calling Claude API...')
  const msg  = await anthropic.messages.create({ model: 'claude-sonnet-4-20250514', max_tokens: 2000, messages: [{ role: 'user', content: prompt }] })
  const raw  = (msg.content[0] as { type: string; text: string }).text
  const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim())

  console.log('  Writing to DB...')
  const page = await prisma.page.upsert({
    where: { slug },
    update:  { title: parsed.title, metaDesc: parsed.meta_desc, h1: parsed.h1, primaryKw, bodyJson: parsed, aiGenerated: true, status: 'published' },
    create: { slug, pageType: 'location', status: 'published', title: parsed.title, metaDesc: parsed.meta_desc, h1: parsed.h1, primaryKw, bodyJson: parsed, aiGenerated: true, serviceId: service.id, locationId: location.id },
  })

  await revalidate(slug)
  console.log(`  Done — page ID ${page.id} live at /${slug}`)
}

async function generateAll() {
  const services  = await prisma.service.findMany({ where: { parentSlug: null } })
  const locations = await prisma.location.findMany({ where: { active: true } })
  for (const svc of services) {
    for (const loc of locations) {
      await generateLocationPage(loc.slug, svc.slug)
      await new Promise(r => setTimeout(r, 1000))
    }
  }
}

const args = process.argv.slice(2)
if (args[0] === '--city' && args[2] === '--service') {
  generateLocationPage(args[1], args[3]).catch(console.error).finally(() => prisma.$disconnect())
} else if (args[0] === '--all') {
  generateAll().catch(console.error).finally(() => prisma.$disconnect())
} else {
  console.log('Usage:')
  console.log('  tsx scripts/ai-pipeline/generate-page.ts --city pune --service conversion-rate-optimization')
  console.log('  tsx scripts/ai-pipeline/generate-page.ts --all')
  prisma.$disconnect()
}

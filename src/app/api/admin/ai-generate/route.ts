import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function GET() {
  const services  = await prisma.service.findMany({ where: { parentSlug: null }, orderBy: { sortOrder: 'asc' } })
  const cities    = await prisma.location.findMany({ where: { active: true } })
  return NextResponse.json({
    services: services.map(s => ({ slug: s.slug, name: s.name })),
    cities:   cities.map(c => ({ slug: c.slug, name: c.city })),
  })
}

export async function POST(request: NextRequest) {
  const { service: serviceSlug, city: citySlug } = await request.json()
  const service  = await prisma.service.findUnique({ where: { slug: serviceSlug } })
  const location = await prisma.location.findUnique({ where: { slug: citySlug } })
  if (!service || !location) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const primaryKw = `${service.name} ${location.city}`
  const slug      = `${serviceSlug}/${citySlug}`
  const prompt = `You are an expert SEO content writer for ConversionPro LLP. Write a location service page.
Service: ${service.name} | City: ${location.city}, ${location.state}, India | Primary keyword: "${primaryKw}"
Return ONLY valid JSON, no markdown:
{
  "title": "50-60 chars including keyword and city",
  "meta_desc": "140-155 chars, action-oriented, includes keyword",
  "h1": "natural keyword inclusion",
  "hero_subtitle": "2 sentences, problem-aware, outcome-focused",
  "sections": [{"heading": "string","body": "100-150 words"}],
  "faq": [{"q": "string","a": "50-80 words"}],
  "cta_text": "one compelling sentence"
}
Include exactly 4 sections and 5 FAQs. Reference ${location.city} business landscape naturally.`

  try {
    const msg  = await client.messages.create({ model: 'claude-sonnet-4-5', max_tokens: 2000, messages: [{ role: 'user', content: prompt }] })
    const raw  = (msg.content[0] as { type: string; text: string }).text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(raw)

    const page = await prisma.page.upsert({
      where: { slug },
      update:  { title: parsed.title, metaDesc: parsed.meta_desc, h1: parsed.h1, primaryKw, bodyJson: parsed, aiGenerated: true, status: 'published' },
      create: { slug, pageType: 'location', status: 'published', title: parsed.title, metaDesc: parsed.meta_desc, h1: parsed.h1, primaryKw, bodyJson: parsed, aiGenerated: true, serviceId: service.id, locationId: location.id },
    })
    return NextResponse.json(page)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

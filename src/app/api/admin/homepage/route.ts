import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'

export async function GET() {
  const page = await prisma.page.findUnique({ where: { slug: '/' } })
  return NextResponse.json({
    html: page?.layoutHtml || '',
    enabled: page?.useLayout || false
  })
}

export async function POST(request: NextRequest) {
  const { html, enabled } = await request.json()
  await prisma.page.upsert({
    where: { slug: '/' },
    update: {
      layoutHtml: html,
      layoutCss: '',
      useLayout: enabled,
      status: 'published'
    },
    create: {
      slug: '/',
      title: 'Homepage',
      status: 'published',
      pageType: 'home',
      layoutHtml: html,
      layoutCss: '',
      useLayout: enabled,
    }
  })
  revalidatePath('/')
  return NextResponse.json({ success: true })
}

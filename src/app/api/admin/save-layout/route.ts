import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  const { id, type, html, css, json } = await request.json()
  if (!id || !type) return NextResponse.json({ error: 'Missing id or type' }, { status: 400 })
  const data = { layoutHtml: html, layoutCss: css, layoutJson: json, useLayout: true }
  if (type === 'page')       await prisma.page.update({ where: { id }, data })
  if (type === 'blog')       await prisma.blogPost.update({ where: { id }, data })
  if (type === 'case-study') await prisma.caseStudy.update({ where: { id }, data })
  return NextResponse.json({ success: true })
}

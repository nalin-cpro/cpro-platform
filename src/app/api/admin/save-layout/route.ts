import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  const { id, type, html, css, json } = await request.json()
  if (!id || !type) return NextResponse.json({ error: 'Missing id or type' }, { status: 400 })

  const data = { layoutHtml: html, layoutCss: css, layoutJson: json, useLayout: true }

  if (type === 'page') {
    const page = await prisma.page.update({ where: { id }, data })
    // Revalidate the page so ISR cache is busted immediately
    const path = page.slug === '/' ? '/' : `/${page.slug}`
    revalidatePath(path)
  }

  if (type === 'blog') {
    const post = await prisma.blogPost.update({ where: { id }, data })
    revalidatePath(`/blog/${post.slug}`)
  }

  if (type === 'case-study') {
    const cs = await prisma.caseStudy.update({ where: { id }, data })
    revalidatePath(`/case-studies/${cs.slug}`)
  }

  // Templates don't have a useLayout field — only the three layout columns
  if (type === 'template') {
    await prisma.pageTemplate.update({
      where: { id },
      data: { layoutHtml: html, layoutCss: css, layoutJson: json },
    })
    // Can't revalidate specific pages — revalidate everything
    revalidatePath('/', 'layout')
  }

  return NextResponse.json({ success: true })
}

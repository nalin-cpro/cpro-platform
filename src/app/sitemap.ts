import { prisma } from '@/lib/db'
import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await prisma.page.findMany({
    where: { status: 'published' },
    select: { slug: true, pageType: true, updatedAt: true },
  })
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true },
  })
  const priority: Record<string, number> = { home: 1.0, service: 0.9, location: 0.8, industry: 0.7, blog: 0.6 }
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    ...pages.map(p => ({ url: `${SITE_URL}/${p.slug}`, lastModified: p.updatedAt, changeFrequency: 'weekly' as const, priority: priority[p.pageType] || 0.5 })),
    ...posts.map(p => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}

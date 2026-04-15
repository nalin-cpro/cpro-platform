import { prisma } from '@/lib/db'
import MediaLibrary from './MediaLibrary'

type Source = 'upload' | 'page' | 'blog' | 'case-study'

interface UnifiedImage {
  url: string
  name: string
  source: Source
  sourceTitle: string
  mediaId?: number // only for uploaded files (enables delete)
}

const IMG_RE = /\.(jpe?g|png|gif|webp|svg|avif)$/i

/** Recursively extract image URLs from any JSON value */
function extractImageUrls(val: unknown, acc: string[] = []): string[] {
  if (typeof val === 'string') {
    if (IMG_RE.test(val) || val.startsWith('/uploads/') || val.startsWith('http')) {
      if (IMG_RE.test(val) || val.startsWith('/uploads/')) acc.push(val)
    }
  } else if (Array.isArray(val)) {
    for (const item of val) extractImageUrls(item, acc)
  } else if (val && typeof val === 'object') {
    for (const v of Object.values(val)) extractImageUrls(v, acc)
  }
  return acc
}

export default async function AdminMediaPage() {
  const [mediaFiles, pages, blogPosts, caseStudies] = await Promise.all([
    prisma.media.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.page.findMany({ select: { id: true, title: true, slug: true, bodyJson: true, ogImage: true } }),
    prisma.blogPost.findMany({ select: { id: true, title: true, featuredImage: true } }),
    prisma.caseStudy.findMany({ select: { id: true, title: true, featuredImage: true } }),
  ])

  const images: UnifiedImage[] = []
  const seen = new Set<string>()

  function add(url: string, name: string, source: Source, sourceTitle: string, mediaId?: number) {
    if (!url || seen.has(url)) return
    seen.add(url)
    images.push({ url, name, source, sourceTitle, mediaId })
  }

  // 1. Uploaded media files
  for (const m of mediaFiles) {
    add(m.url, m.originalName, 'upload', 'Media uploads', m.id)
  }

  // 2. Pages — ogImage + images inside bodyJson
  for (const p of pages) {
    if (p.ogImage) add(p.ogImage, 'OG image', 'page', p.title)
    for (const url of extractImageUrls(p.bodyJson)) {
      add(url, url.split('/').pop() || 'image', 'page', p.title)
    }
  }

  // 3. Blog posts — featuredImage
  for (const b of blogPosts) {
    if (b.featuredImage) add(b.featuredImage, 'Featured image', 'blog', b.title)
  }

  // 4. Case studies — featuredImage
  for (const cs of caseStudies) {
    if (cs.featuredImage) add(cs.featuredImage, 'Featured image', 'case-study', cs.title || 'Case study')
  }

  return <MediaLibrary images={JSON.parse(JSON.stringify(images))} />
}

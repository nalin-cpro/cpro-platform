import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { buildMetadata } from '@/lib/seo'
import { BlogTemplate } from '@/components/templates/BlogTemplate'
import { Metadata } from 'next'

export const revalidate = 86400

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } })
  if (!post) return {}
  return buildMetadata({ title: post.title, description: post.metaDesc || '', slug: `blog/${post.slug}` })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } })
  if (!post || post.status !== 'published') notFound()

  if (post.useLayout && post.layoutHtml) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: post.layoutCss || '' }} />
        <div dangerouslySetInnerHTML={{ __html: post.layoutHtml }} />
      </>
    )
  }
  return <BlogTemplate post={post} />
}

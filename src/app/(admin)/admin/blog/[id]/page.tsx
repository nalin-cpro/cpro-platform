import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import BlogEditor from './BlogEditor'

export default async function EditBlogPost({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  if (isNaN(id)) notFound()
  const post = await prisma.blogPost.findUnique({ where: { id } })
  if (!post) notFound()
  return <BlogEditor post={JSON.parse(JSON.stringify(post))} />
}

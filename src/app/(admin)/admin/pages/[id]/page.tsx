import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import PageEditor from './PageEditor'

export default async function EditPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  if (isNaN(id)) notFound()
  const page = await prisma.page.findUnique({ where: { id }, include: { service: true, location: true } })
  if (!page) notFound()
  return <PageEditor page={JSON.parse(JSON.stringify(page))} />
}

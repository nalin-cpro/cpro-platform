import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import TemplateEditor from './TemplateEditor'

export default async function EditTemplate({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  if (isNaN(id)) notFound()
  const template = await prisma.pageTemplate.findUnique({ where: { id } })
  if (!template) notFound()
  return <TemplateEditor template={JSON.parse(JSON.stringify(template))} />
}

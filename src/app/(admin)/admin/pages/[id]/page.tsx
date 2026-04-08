import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { getAssignedTemplate, listPublishedTemplatesForType } from '@/lib/layout-resolver'
import PageEditor from './PageEditor'

export default async function EditPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  if (isNaN(id)) notFound()
  const page = await prisma.page.findUnique({ where: { id }, include: { service: true, location: true } })
  if (!page) notFound()
  const [assignedTemplate, availableTemplates] = await Promise.all([
    getAssignedTemplate(page.templateId),
    listPublishedTemplatesForType(page.pageType),
  ])
  return (
    <PageEditor
      page={JSON.parse(JSON.stringify(page))}
      assignedTemplate={assignedTemplate ? JSON.parse(JSON.stringify(assignedTemplate)) : null}
      availableTemplates={JSON.parse(JSON.stringify(availableTemplates))}
    />
  )
}

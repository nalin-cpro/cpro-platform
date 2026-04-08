import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import CaseStudyEditor from './CaseStudyEditor'

export default async function EditCaseStudy({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  if (isNaN(id)) notFound()
  const cs = await prisma.caseStudy.findUnique({ where: { id } })
  if (!cs) notFound()
  return <CaseStudyEditor cs={JSON.parse(JSON.stringify(cs))} />
}

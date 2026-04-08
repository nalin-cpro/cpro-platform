import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const body = await request.json()
  delete body.id
  delete body.service
  delete body.createdAt
  delete body.updatedAt
  const updated = await prisma.caseStudy.update({ where: { id }, data: body })
  return NextResponse.json(updated)
}

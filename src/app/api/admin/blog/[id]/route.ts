import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const body = await request.json()
  // Strip fields the client may echo back that aren't writable
  delete body.id
  delete body.createdAt
  delete body.updatedAt
  const updated = await prisma.blogPost.update({ where: { id }, data: body })
  return NextResponse.json(updated)
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const items = await prisma.pageTemplate.findMany({ orderBy: { updatedAt: 'desc' } })
  return NextResponse.json(items)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const created = await prisma.pageTemplate.create({ data: body })
  return NextResponse.json(created)
}

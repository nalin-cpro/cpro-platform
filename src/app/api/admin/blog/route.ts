import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const post = await prisma.blogPost.create({ data: body })
  return NextResponse.json(post)
}

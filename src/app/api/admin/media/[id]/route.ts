import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import path from 'path'
import { prisma } from '@/lib/db'

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const media = await prisma.media.findUnique({ where: { id } })
  if (!media) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  try { await unlink(path.join(process.cwd(), 'public', 'uploads', media.filename)) } catch { /* file may already be gone */ }
  await prisma.media.delete({ where: { id } })
  return NextResponse.json({ success: true })
}

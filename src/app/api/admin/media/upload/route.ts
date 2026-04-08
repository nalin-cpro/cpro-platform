import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const bytes    = await file.arrayBuffer()
  const ext      = path.extname(file.name)
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
  const dir      = path.join(process.cwd(), 'public', 'uploads')

  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, filename), Buffer.from(bytes))

  const media = await prisma.media.create({
    data: { filename, originalName: file.name, mimeType: file.type, size: file.size, url: `/uploads/${filename}` },
  })
  return NextResponse.json(media)
}

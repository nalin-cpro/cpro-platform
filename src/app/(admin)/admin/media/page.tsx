'use client'
import { useEffect, useState } from 'react'
import { Upload, Copy, Trash2 } from 'lucide-react'

interface MediaItem { id: number; url: string; originalName: string; mimeType: string; size: number }

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [uploading, setUploading] = useState(false)

  async function load() {
    const res = await fetch('/api/admin/media')
    if (res.ok) setItems(await res.json())
  }
  useEffect(() => { load() }, [])

  async function upload(file: File) {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/media/upload', { method: 'POST', body: fd })
    if (res.ok) await load()
    setUploading(false)
  }

  async function remove(id: number) {
    if (!confirm('Delete this file?')) return
    await fetch(`/api/admin/media/${id}`, { method: 'DELETE' })
    await load()
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-extrabold text-ink-900">Media library</h1>
        <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full uppercase tracking-wide text-sm cursor-pointer">
          <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload'}
          <input type="file" accept="image/*" hidden onChange={e => e.target.files?.[0] && upload(e.target.files[0])} />
        </label>
      </div>
      {items.length === 0 ? (
        <p className="text-center text-ink-500 py-16">No media yet — upload your first file.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(m => (
            <div key={m.id} className="bg-white border border-ink-200 rounded-2xl overflow-hidden">
              {m.mimeType.startsWith('image/') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt={m.originalName} className="w-full aspect-square object-cover" />
              ) : (
                <div className="w-full aspect-square bg-ink-100 flex items-center justify-center text-ink-500 text-sm">{m.mimeType}</div>
              )}
              <div className="p-3">
                <p className="text-xs text-ink-700 font-semibold truncate">{m.originalName}</p>
                <p className="text-[10px] text-ink-500 mt-0.5">{(m.size / 1024).toFixed(1)} KB</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => navigator.clipboard.writeText(m.url)} className="flex-1 text-[10px] bg-ink-100 hover:bg-brand-50 text-ink-700 rounded px-2 py-1.5 font-bold uppercase flex items-center justify-center gap-1"><Copy className="w-3 h-3" /> Copy</button>
                  <button onClick={() => remove(m.id)} className="text-[10px] bg-ink-100 hover:bg-red-50 text-ink-700 hover:text-red-600 rounded px-2 py-1.5"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

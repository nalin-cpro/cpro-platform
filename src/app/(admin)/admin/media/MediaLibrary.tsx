'use client'
import { useState } from 'react'
import { Upload, Copy, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Source = 'upload' | 'page' | 'blog' | 'case-study'

interface UnifiedImage {
  url: string
  name: string
  source: Source
  sourceTitle: string
  mediaId?: number
}

const FILTERS: { label: string; value: Source | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Uploads', value: 'upload' },
  { label: 'Pages', value: 'page' },
  { label: 'Blog', value: 'blog' },
  { label: 'Case Studies', value: 'case-study' },
]

const BADGE_COLORS: Record<Source, string> = {
  upload: 'bg-blue-50 text-blue-700',
  page: 'bg-green-50 text-green-700',
  blog: 'bg-purple-50 text-purple-700',
  'case-study': 'bg-orange-50 text-orange-700',
}

const BADGE_LABELS: Record<Source, string> = {
  upload: 'UPLOAD',
  page: 'PAGE',
  blog: 'BLOG',
  'case-study': 'CASE STUDY',
}

export default function MediaLibrary({ images }: { images: UnifiedImage[] }) {
  const [filter, setFilter] = useState<Source | 'all'>('all')
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const router = useRouter()

  const filtered = filter === 'all' ? images : images.filter(i => i.source === filter)

  async function upload(file: File) {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/media/upload', { method: 'POST', body: fd })
    if (res.ok) router.refresh()
    setUploading(false)
  }

  async function remove(mediaId: number) {
    if (!confirm('Delete this uploaded file?')) return
    await fetch(`/api/admin/media/${mediaId}`, { method: 'DELETE' })
    router.refresh()
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="font-headline text-3xl font-extrabold text-ink-900">Media library</h1>
          <p className="text-sm text-ink-500 mt-1">{images.length} images across all sources</p>
        </div>
        <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full uppercase tracking-wide text-sm cursor-pointer">
          <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload'}
          <input type="file" accept="image/*" hidden onChange={e => e.target.files?.[0] && upload(e.target.files[0])} />
        </label>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map(f => {
          const count = f.value === 'all' ? images.length : images.filter(i => i.source === f.value).length
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                filter === f.value
                  ? 'bg-ink-900 text-white'
                  : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
              }`}
            >
              {f.label} <span className="opacity-60 ml-1">{count}</span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-ink-500 py-16">
          {filter === 'all' ? 'No images found. Upload your first file or add images to pages.' : `No ${BADGE_LABELS[filter as Source] || filter} images found.`}
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <div key={`${img.url}-${i}`} className="bg-white border border-ink-200 rounded-2xl overflow-hidden group relative">
              {/* Image */}
              <div className="aspect-square bg-ink-100 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-full object-cover"
                  onError={e => {
                    (e.target as HTMLImageElement).style.display = 'none'
                    ;(e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-ink-400 text-xs p-4 text-center">${img.url}</div>`
                  }}
                />
                {/* Hover overlay with copy button */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => copyUrl(img.url)}
                    className="bg-white text-ink-900 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-ink-100 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    {copied === img.url ? 'Copied!' : 'Copy URL'}
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${BADGE_COLORS[img.source]}`}>
                    {BADGE_LABELS[img.source]}
                  </span>
                </div>
                <p className="text-xs text-ink-700 font-semibold truncate" title={img.name}>{img.name}</p>
                <p className="text-[10px] text-ink-500 truncate" title={img.sourceTitle}>{img.sourceTitle}</p>
                {img.mediaId && (
                  <button
                    onClick={() => remove(img.mediaId!)}
                    className="mt-2 text-[10px] bg-ink-100 hover:bg-red-50 text-ink-600 hover:text-red-600 rounded px-2 py-1 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BlogEditor({ post: initial }: { post: any }) {
  const [post, setPost] = useState(initial)
  const [saving, setSaving] = useState(false)

  async function save(extra: Record<string, unknown> = {}) {
    setSaving(true)
    const res = await fetch(`/api/admin/blog/${post.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...post, ...extra }) })
    if (res.ok) setPost(await res.json())
    setSaving(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <Link href="/admin/blog" className="text-sm text-ink-500 hover:text-brand-500 inline-flex items-center gap-1 mb-4"><ArrowLeft className="w-3 h-3" /> Back to blog</Link>
      <h1 className="font-heading text-2xl font-extrabold text-ink-900 mb-6">{post.title}</h1>
      <div className="space-y-4">
        <input value={post.title} onChange={e => setPost({ ...post, title: e.target.value })} placeholder="Title" className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
        <input value={post.metaDesc || ''} onChange={e => setPost({ ...post, metaDesc: e.target.value })} placeholder="Meta description" className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
        <input value={post.category || ''} onChange={e => setPost({ ...post, category: e.target.value })} placeholder="Category" className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
        <textarea value={post.bodyMd || ''} onChange={e => setPost({ ...post, bodyMd: e.target.value })} placeholder="Body (Markdown)" rows={20} className="w-full px-4 py-3 border border-ink-200 rounded-lg font-mono text-sm" />
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={() => save()} className="px-5 py-2.5 border border-ink-200 hover:border-brand-500 text-ink-700 font-bold rounded-full text-sm">Save draft</button>
        <button onClick={() => save({ status: post.status === 'published' ? 'draft' : 'published', publishedAt: post.status === 'published' ? null : new Date() })} className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full text-sm uppercase tracking-wide">{post.status === 'published' ? 'Unpublish' : 'Publish'}</button>
        <span className="text-xs text-ink-500 self-center">{saving ? 'Saving...' : ''}</span>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { CTABanner } from '@/components/sections/Sections'

export function BlogTemplate({ post }: { post: { title: string; bodyMd?: string | null; category?: string | null; tags?: string[]; authorName?: string | null; publishedAt?: Date | null; featuredImage?: string | null } }) {
  return (
    <>
      <section className="bg-white border-b border-ink-100 py-16">
        <div className="max-w-3xl mx-auto px-4">
          {post.category && <p className="text-sm font-bold text-brand-500 uppercase tracking-widest mb-4">{post.category}</p>}
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-ink-900 leading-tight mb-6">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-ink-600">
            {post.authorName && <span>By <strong className="text-ink-800">{post.authorName}</strong></span>}
            {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
          </div>
        </div>
      </section>
      {post.featuredImage && (
        <div className="max-w-4xl mx-auto px-4 -mt-8 mb-8">
          <img src={post.featuredImage} alt={post.title} className="rounded-2xl w-full" />
        </div>
      )}
      <article className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 prose prose-lg prose-headings:font-heading prose-headings:text-ink-900 prose-p:text-ink-700">
          {post.bodyMd ? (
            <div className="whitespace-pre-wrap text-ink-700 leading-relaxed">{post.bodyMd}</div>
          ) : (
            <p className="text-ink-500 italic">No content yet.</p>
          )}
        </div>
      </article>
      {post.tags && post.tags.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 pb-12">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(t => (
              <Link key={t} href={`/blog/tag/${t}`} className="text-xs px-3 py-1.5 bg-ink-100 hover:bg-brand-50 rounded-full text-ink-700 hover:text-brand-600">#{t}</Link>
            ))}
          </div>
        </div>
      )}
      <CTABanner heading="Want results like this for your business?" />
    </>
  )
}

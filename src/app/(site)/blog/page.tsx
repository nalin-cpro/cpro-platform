import Link from 'next/link'
import { prisma } from '@/lib/db'

export const revalidate = 0

export default async function BlogIndex() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
    select: { slug: true, title: true, excerpt: true, category: true, publishedAt: true, featuredImage: true },
  })

  return (
    <>
      <section className="page-title-hero">
        <div className="container-site" style={{ textAlign: 'center' }}>
          <span className="section-label">INSIGHTS</span>
          <h1>Blog</h1>
          <p style={{ fontSize: 18, color: 'var(--color-body)', marginTop: 16 }}>
            CRO tips, Zoho guides, marketplace strategies, and digital marketing insights.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container-site">
          {posts.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-body)', fontSize: 17 }}>
              No posts published yet. Check back soon.
            </p>
          ) : (
            <div className="grid-3">
              {posts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="blog-card" style={{ border: '1px solid var(--color-border)' }}>
                    <div style={{
                      aspectRatio: '16/9',
                      background: post.featuredImage ? `url(${post.featuredImage}) center/cover` : 'var(--color-surface)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: 20,
                    }}>
                      {post.category && (
                        <span className="chip" style={{ background: '#fff', fontSize: 11 }}>{post.category}</span>
                      )}
                    </div>
                    <div style={{ padding: 28 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{post.title}</h3>
                      {post.excerpt && (
                        <p style={{ fontSize: 14, color: 'var(--color-body)', lineHeight: 1.6 }}>{post.excerpt}</p>
                      )}
                      {post.publishedAt && (
                        <p style={{ fontSize: 12, color: 'var(--color-border)', marginTop: 12 }}>
                          {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

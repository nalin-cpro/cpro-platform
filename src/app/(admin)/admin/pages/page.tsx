import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function AdminPagesIndex() {
  const pages = await prisma.page.findMany({ orderBy: { updatedAt: 'desc' }, include: { service: true, location: true } })
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Pages</h1>
        <span className="text-sm text-gray-500">{pages.length} total</span>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Slug','Type','Status','Source','Updated',''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-gray-600 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pages.map(page => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-700">/{page.slug}</td>
                <td className="px-4 py-3"><span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{page.pageType}</span></td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded ${page.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>{page.status}</span></td>
                <td className="px-4 py-3 text-xs text-gray-500">{page.aiGenerated ? 'AI' : 'Manual'}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{new Date(page.updatedAt).toLocaleDateString('en-IN')}</td>
                <td className="px-4 py-3"><Link href={`/admin/pages/${page.id}`} className="text-xs text-blue-600 hover:text-blue-800">Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

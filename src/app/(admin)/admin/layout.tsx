import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { LayoutDashboard, Home, FileText, Newspaper, Briefcase, Image, Sparkles, Settings, LogOut, Layers } from 'lucide-react'

const nav = [
  { label: 'Dashboard',    href: '/admin',              icon: LayoutDashboard },
  { label: 'Homepage',     href: '/admin/homepage',     icon: Home },
  { label: 'Pages',        href: '/admin/pages',        icon: FileText },
  { label: 'Templates',    href: '/admin/templates',    icon: Layers },
  { label: 'Blog',         href: '/admin/blog',         icon: Newspaper },
  { label: 'Case Studies', href: '/admin/case-studies', icon: Briefcase },
  { label: 'Media',        href: '/admin/media',        icon: Image },
  { label: 'AI Generate',  href: '/admin/ai-generate',  icon: Sparkles },
  { label: 'Settings',     href: '/admin/settings',     icon: Settings },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-ink-100 flex">
      <aside className="w-64 bg-white border-r border-ink-200 flex flex-col">
        <div className="p-5 border-b border-ink-200">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <div>
              <p className="font-bold text-ink-900 text-sm">ConversionPro</p>
              <p className="text-xs text-ink-500">Admin</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map(item => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-ink-700 hover:text-brand-500 hover:bg-ink-100 rounded-lg transition">
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-ink-200">
          {session?.user && (
            <div className="px-3 pb-3">
              <p className="text-xs text-ink-500">Signed in as</p>
              <p className="text-sm font-semibold text-ink-800 truncate">{session.user.email}</p>
            </div>
          )}
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-3 py-2 text-sm text-ink-600 hover:text-brand-500 hover:bg-ink-100 rounded-lg">
            <LogOut className="w-4 h-4" />
            Sign out
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

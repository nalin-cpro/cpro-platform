'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.error) setError('Invalid email or password')
    else router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-ink-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold">CP</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-ink-900">ConversionPro Admin</h1>
          <p className="text-ink-500 text-sm mt-2">Sign in to your dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-brand-500" />
          <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-brand-500" />
          {error && <p className="text-sm text-brand-600">{error}</p>}
          <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full uppercase tracking-wide text-sm transition disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

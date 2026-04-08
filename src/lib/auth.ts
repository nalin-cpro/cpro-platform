import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './db'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null
        const user = await prisma.adminUser.findUnique({ where: { email: credentials.email } })
        if (!user || !user.active) return null
        const valid = await bcrypt.compare(credentials.password, user.password)
        if (!valid) return null
        return { id: String(user.id), email: user.email, name: user.name || user.email, role: user.role }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages:   { signIn: '/admin/login' },
  callbacks: {
    async jwt({ token, user }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (user) token.role = (user as any).role
      return token
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (session.user) (session.user as any).role = token.role
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

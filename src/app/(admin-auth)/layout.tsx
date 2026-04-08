// Bare layout for /admin/login — no sidebar, no auth guard.
export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

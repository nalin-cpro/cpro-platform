import { PageWrapper } from '@/components/layout/PageWrapper'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <PageWrapper>{children}</PageWrapper>
}

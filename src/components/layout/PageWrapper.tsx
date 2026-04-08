import Header from './Header'
import Footer from './Footer'

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 80, minHeight: '60vh' }}>{children}</main>
      <Footer />
    </>
  )
}

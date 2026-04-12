import Header from './Header'
import Footer from './Footer'

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-20 pb-16 md:pb-0 min-h-[60vh]">{children}</main>
      <Footer />
    </>
  )
}

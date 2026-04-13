import type { Metadata } from "next";
import { Inter, Rubik, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getSiteConfig } from "@/lib/site-config";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik", display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return {
    title: config.seo.defaultTitle,
    description: config.seo.defaultDescription,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || `https://${config.domain}`),
    icons: { icon: config.brand.faviconPath },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const config = await getSiteConfig();
  const brandCss = `
    :root {
      --brand-primary: ${config.brand.primaryColor};
      --brand-secondary: ${config.brand.secondaryColor};
      --brand-accent: ${config.brand.accentColor};
    }
  `;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{ __html: brandCss }} />
      </head>
      <body className={`${inter.variable} ${rubik.variable} ${jakarta.variable}`}>
        {children}
      </body>
    </html>
  );
}

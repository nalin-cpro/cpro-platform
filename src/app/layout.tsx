import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { getSiteConfig } from "@/lib/site-config";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

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
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: brandCss }} />
      </head>
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased bg-white text-ink-800`}>
        {children}
      </body>
    </html>
  );
}

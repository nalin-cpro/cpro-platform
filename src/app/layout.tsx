import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getSiteConfig } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-jakarta",
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
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: brandCss }} />
      </head>
      <body className={`${inter.variable} ${jakarta.variable}`}>
        {children}
      </body>
    </html>
  );
}

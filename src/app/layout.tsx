import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { PageWrapper } from "@/components/layout/PageWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "ConversionPro LLP — CRO, Zoho & Digital Marketing Agency Pune",
  description: "India's leading conversion rate optimization agency. CRO, Zoho consulting, and digital marketing services in Pune, Mumbai, Bangalore, Delhi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased bg-white text-ink-800`}>
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}

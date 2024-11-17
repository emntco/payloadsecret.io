import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "payloadsecret.io - Generate Secure Payload Secrets",
  description: "Generate secure 32-byte random secrets for your Payload instance.",
  metadataBase: new URL('https://payloadsecret.io'),
  authors: [{ name: 'emnt.co' }],
  openGraph: {
    title: 'payloadsecret.io - Generate Secure Payload Secrets',
    description: 'Generate secure 32-byte random secrets for your Payload instance.',
    url: 'https://payloadsecret.io',
    siteName: 'payloadsecret.io',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'payloadsecret.io - Generate Secure Payload Secrets',
    description: 'Generate secure 32-byte random secrets for your Payload instance.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

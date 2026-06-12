import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Syne } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const display = Syne({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'DALE PERSYS — RKT, Turreo y Remixes Bolicheros',
  description:
    'DALE PERSYS — DJ y productor de RKT de Argentina. Sets bolicheros, remixes exclusivos y colaboraciones con la movida urbana. Puro perreo, pura pista.',
  generator: 'v0.app',
  openGraph: {
    title: 'DALE PERSYS — RKT, Turreo y Remixes Bolicheros',
    description:
      'DJ y productor de RKT de Argentina. Sets bolicheros, remixes exclusivos y la energía de la pista al límite.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

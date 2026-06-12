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

const BASE_URL = 'https://dalepersys.com'
const TITLE = 'DALE PERSYS — RKT, Turreo y Remixes Bolicheros'
const DESCRIPTION =
  'DALE PERSYS — DJ y productor de RKT de Argentina. Sets bolicheros, remixes exclusivos y colaboraciones con la movida urbana. Puro perreo, pura pista.'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Dale Persys',
    'DJ RKT',
    'RKT',
    'turreo',
    'remixes bolicheros',
    'DJ Argentina',
    'DJ boliche',
    'música urbana argentina',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description:
      'DJ y productor de RKT de Argentina. Sets bolicheros, remixes exclusivos y la energía de la pista al límite.',
    type: 'website',
    url: '/',
    siteName: 'Dale Persys',
    locale: 'es_AR',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Dale Persys — DJ de RKT en vivo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'Dale Persys',
  description: DESCRIPTION,
  url: BASE_URL,
  image: `${BASE_URL}/og.jpg`,
  genre: ['RKT', 'Turreo', 'Música urbana'],
  email: 'booking@dalepersys.com',
  sameAs: [
    'https://open.spotify.com/artist/1ovNq4y5Rd0pp4PKdxdc2y',
    'https://instagram.com/dale.persys',
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

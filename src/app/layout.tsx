import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Metadata } from 'next'
import { CartAndWishlistProvider } from './context/CartAndWishlistContextProvider'
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: {
    default: 'Exclusive',
    template: '%s - Exclusive'
  },
  description: 'Exclusive Store',
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-poppins',
  display: 'swap',
  fallback: ['sans-serif', 'system-ui', 'arial']
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-inter',
  display: 'optional',
  fallback: ['sans-serif', 'system-ui', 'arial']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} font-poppins overflow-x-hidden`}>
      <body className='overflow-x-hidden'>
        <CartAndWishlistProvider>
          <Header />
          {children}
          <Footer />
        </CartAndWishlistProvider>
        <Analytics />
      </body>
    </html>
  )
}

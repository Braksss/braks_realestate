import './globals.css'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = { title: 'Market Pulse', description: 'Votre expert immobilier sur la Costa Brava' }

export default function RootLayout({ children }) {
  return (
    <html lang='fr'>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
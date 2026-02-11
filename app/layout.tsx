import type { Metadata } from 'next'
import { Montserrat, Roboto } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-roboto' })

export const metadata: Metadata = {
  title: 'REMAEP | Registro Nacional de Auxiliares',
  description: 'Registro de Matriculados Auxiliares de la Salud y Emergencias Prehospitalarias.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} ${roboto.variable} font-roboto`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

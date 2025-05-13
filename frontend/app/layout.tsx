import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import BackgroundPortals from '@/components/background-portals'
import { Providers } from '@/components/providers/provider'

export const metadata: Metadata = {
  title: 'Rick and Morty Portal',
  description:
    'Explore o multiverso de Rick and Morty e descubra todos os personagens',
  openGraph: {
    title: 'Rick and Morty Portal',
    description:
      'Explore o multiverso de Rick and Morty e descubra todos os personagens',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <BackgroundPortals />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

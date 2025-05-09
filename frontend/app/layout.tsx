import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BackgroundPortals from "@/components/background-portals"
import { SWRProvider } from "@/components/swr-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rick and Morty Portal",
  description: "Explore o multiverso de Rick and Morty e descubra todos os personagens",
  openGraph: {
    title: "Rick and Morty Portal",
    description: "Explore o multiverso de Rick and Morty e descubra todos os personagens",
    images: ["/og-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SWRProvider>
            <div className="relative flex min-h-screen flex-col">
              <BackgroundPortals />
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

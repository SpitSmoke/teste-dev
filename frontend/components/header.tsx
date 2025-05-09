"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { motion, AnimatePresence } from "framer-motion"

import RickMorty from '@/public/rickMorty.jpeg'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // impedir scroll quando o menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 overflow-hidden rounded-full portal-glow">
            <Image src={RickMorty} alt="Rick and Morty Portal" width={40} height={40} className="object-cover" />
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">Rick and Morty</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Personagens
          </Link>
          <Link
            href="/pickle"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/pickle" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Pickle Rick
          </Link>
          <ModeToggle />
        </nav>

        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="container py-4 flex flex-col space-y-4">
              <Link
                href="/"
                className={`px-4 py-2 rounded-md text-sm font-medium ${pathname === "/" ? "bg-muted" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Personagens
              </Link>
              <Link
                href="/pickle"
                className={`px-4 py-2 rounded-md text-sm font-medium ${pathname === "/pickle" ? "bg-muted" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Pickle Rick
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

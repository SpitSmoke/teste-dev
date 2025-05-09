import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Rick and Morty Portal. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Personagens
          </Link>
          <Link href="/pickle" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Pickle Rick
          </Link>
        </div>
      </div>
    </footer>
  )
}

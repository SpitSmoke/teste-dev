import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Dimensão não encontrada</h2>
      <p className="text-lg mb-8 max-w-md">
        Parece que você viajou para uma dimensão que não existe no nosso multiverso.
      </p>
      <Link href="/">
        <Button>Voltar ao Portal Principal</Button>
      </Link>
    </div>
  )
}

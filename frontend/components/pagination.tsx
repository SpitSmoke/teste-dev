"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function PaginationComponent({ currentPage, totalPages, hasNextPage, hasPrevPage }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Função para navegar para uma página específica
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`/?${params.toString()}`)

    // Scroll para o topo da página
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Determinar quais páginas mostrar
  const getPageNumbers = () => {
    const pages = []

    // Sempre mostrar a primeira página
    pages.push(1)

    // Adicionar páginas ao redor da página atual
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }

    // Sempre mostrar a última página se houver mais de uma
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    // Remover duplicatas e ordenar
    return [...new Set(pages)].sort((a, b) => a - b)
  }

  const pageNumbers = getPageNumbers()

  if (totalPages <= 1) {
    return null
  }

  return (
    <Pagination className="my-8">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(currentPage - 1)}
            disabled={!hasPrevPage}
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>

        {pageNumbers.map((page, index) => {
          // Verificar se precisamos adicionar elipses
          const needsEllipsisBefore = index > 0 && pageNumbers[index - 1] !== page - 1
          const needsEllipsisAfter = index < pageNumbers.length - 1 && pageNumbers[index + 1] !== page + 1

          return (
            <div key={page} className="flex items-center">
              {needsEllipsisBefore && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink isActive={page === currentPage} onClick={() => goToPage(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>

              {needsEllipsisAfter && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </div>
          )
        })}

        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(currentPage + 1)}
            disabled={!hasNextPage}
            aria-label="Próxima página"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

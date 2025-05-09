"use client"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"
import { motion, AnimatePresence } from "framer-motion"
import CharacterCard from "@/components/character-card"
import Pagination from "@/components/pagination"
import PortalLoader from "@/components/portal-loader"
import type { CharactersResponse } from "@/app/api/characters/route"

import axios from "axios"

// Modificar a linha do fetcher:
const fetcher = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

export default function CharacterList() {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") || "1"
  const name = searchParams.get("name") || ""
  const status = searchParams.get("status") || ""
  const species = searchParams.get("species") || ""
  const gender = searchParams.get("gender") || ""

  // Construir URL para a API
  const apiUrl = `/api/characters?page=${page}${name ? `&name=${name}` : ""}${status ? `&status=${status}` : ""}${species ? `&species=${species}` : ""}${gender ? `&gender=${gender}` : ""}`

  const { data, error, isLoading } = useSWR<CharactersResponse>(apiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  if (isLoading) return <PortalLoader />

  if (error) return <div className="text-center py-10">Erro ao carregar personagens</div>

  if (!data || data.results.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">Nenhum personagem encontrado</h3>
        <p>Tente ajustar os filtros para encontrar o que procura.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
        <AnimatePresence>
          {data.results.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <CharacterCard character={character} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Pagination
        currentPage={Number.parseInt(page)}
        totalPages={data.info.pages}
        hasNextPage={!!data.info.next}
        hasPrevPage={!!data.info.prev}
      />
    </div>
  )
}

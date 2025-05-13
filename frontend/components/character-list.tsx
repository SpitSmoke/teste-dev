'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '@/lib/axios'                 
import CharacterCard from '@/components/character-card'
import Pagination from '@/components/pagination'
import PortalLoader from '@/components/portal-loader'


export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: { name: string; url: string }
  location: { name: string; url: string }
  image: string
  episode?: string[]
}

export interface CharactersResponse {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: Character[]
}


async function fetchCharacters(params: {
  page: string
  name: string
  status: string
  species: string
  gender: string
}): Promise<CharactersResponse> {
  const { page, name, status, species, gender } = params

  
  const { data } = await api.get('/characters', {
    params: { page, name, status, species, gender },
  })

 
  const formatted: CharactersResponse = {
    info: {
      count: data.total,
      pages: data.last_page,
      next: data.next_page_url,
      prev: data.prev_page_url,
    },
    results: data.data.map((c: Character) => ({
      ...c,
      episode: c.episode ?? [],
    })),
  }

  return formatted
}


export default function CharacterList() {
  const searchParams = useSearchParams()
  const page    = searchParams.get('page')    ?? '1'
  const name    = searchParams.get('name')    ?? ''
  const status  = searchParams.get('status')  ?? ''
  const species = searchParams.get('species') ?? ''
  const gender  = searchParams.get('gender')  ?? ''

  const {
    data,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['characters', page, name, status, species, gender],
    queryFn: () =>
      fetchCharacters({ page, name, status, species, gender }),
  
    placeholderData: (prev) => prev,
  
    refetchOnWindowFocus: false,
  })


  
  if (isPending) return <PortalLoader />
  if (isError)   return (
    <div className="text-center py-10">
      Erro ao carregar personagens
    </div>
  )
  if (!data || data.results.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">
          Nenhum personagem encontrado
        </h3>
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
        currentPage={Number(page)}
        totalPages={data.info.pages}
        hasNextPage={!!data.info.next}
        hasPrevPage={!!data.info.prev}
      />
    </div>
  )
}
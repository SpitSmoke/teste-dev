'use client'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'

interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
}

interface EpisodeListProps {
  episodeUrls: string[]
}

function extractEpisodeIds(urls: string[]): number[] {
  return urls
    .map((url) => {
      const parts = url.split('/')
      return Number(parts[parts.length - 1])
    })
    .filter(Boolean)
}

export default function EpisodeList({ episodeUrls }: EpisodeListProps) {
  const ids = extractEpisodeIds(episodeUrls)

  const { data: episodes, isLoading, isError } = useQuery<Episode[]>({
    queryKey: ['episodes', ids],
    queryFn: async () => {
      const response = await api.get(`/episodes/${ids.join(',')}`)
      return response.data
    },
    enabled: ids.length > 0,
  })

  if (isLoading) return <p>Carregando episódios...</p>
  if (isError || !episodes) return <p>Erro ao carregar episódios</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {episodes.map((ep) => (
        <div key={ep.id}>
          <h3 className="font-bold">{ep.name}</h3>
          <p>{ep.episode}</p>
          <p>{ep.air_date}</p>
        </div>
      ))}
    </div>
  )
}
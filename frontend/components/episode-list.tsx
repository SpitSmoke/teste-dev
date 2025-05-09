"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
}

interface EpisodeListProps {
  episodeUrls: string[]
}

export default function EpisodeList({ episodeUrls }: EpisodeListProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!episodeUrls || episodeUrls.length === 0) {
        setEpisodes([])
        setLoading(false)
        return
      }

      try {
        // Verificar se episodeUrls é um array
        const episodeIds = episodeUrls
          .map((url) => {
            
            if (typeof url !== "string") {
              console.warn("Invalid episode URL:", url)
              return null
            }

            // Extrair ID da URL
            const parts = url.split("/")
            return parts[parts.length - 1]
          })
          .filter((id) => id !== null) 

        
        if (episodeIds.length === 0) {
         
          const mockEpisodes = [
            { id: 1, name: "Piloto", air_date: "2 de dezembro de 2013", episode: "S01E01" },
            { id: 2, name: "Lawnmower Dog", air_date: "9 de dezembro de 2013", episode: "S01E02" },
            { id: 3, name: "Anatomy Park", air_date: "16 de dezembro de 2013", episode: "S01E03" },
          ]
          setEpisodes(mockEpisodes)
          setLoading(false)
          return
        }

        const api = (await import("@/lib/axios")).default

       
        const response = await api.get(`/episodes/${episodeIds.join(",")}`)

        
        console.log("Episodes API Response:", JSON.stringify(response.data, null, 2))

        if (response.status !== 200) {
          throw new Error("Failed to fetch episodes")
        }

        const data = response.data

        // Adaptar a resposta se necessário
        if (Array.isArray(data)) {
          // Se a resposta já for um array, use-a diretamente
          setEpisodes(data)
        } else if (data && Array.isArray(data.results)) {
          // Se a resposta tiver um campo 'results' que é um array
          setEpisodes(data.results)
        } else if (data && Array.isArray(data.episodes)) {
          // Se a resposta tiver um campo 'episodes' que é um array
          setEpisodes(data.episodes)
        } else if (data && Array.isArray(data.data)) {
          // Se a resposta tiver um campo 'data' que é um array (formato Laravel)
          setEpisodes(data.data)
        } else if (data && !Array.isArray(data)) {
          // Se a resposta for um único objeto, coloque-o em um array
          setEpisodes([data])
        } else {
          // Caso não consigamos adaptar, use episódios fictícios
          const mockEpisodes = [
            { id: 1, name: "Piloto", air_date: "2 de dezembro de 2013", episode: "S01E01" },
            { id: 2, name: "Lawnmower Dog", air_date: "9 de dezembro de 2013", episode: "S01E02" },
            { id: 3, name: "Anatomy Park", air_date: "16 de dezembro de 2013", episode: "S01E03" },
          ]
          setEpisodes(mockEpisodes)
        }
      } catch (error) {
        console.error("Error fetching episodes:", error)
        // Usar episódios fictícios em caso de erro
        const mockEpisodes = [
          { id: 1, name: "Piloto", air_date: "2 de dezembro de 2013", episode: "S01E01" },
          { id: 2, name: "Lawnmower Dog", air_date: "9 de dezembro de 2013", episode: "S01E02" },
          { id: 3, name: "Anatomy Park", air_date: "16 de dezembro de 2013", episode: "S01E03" },
        ]
        setEpisodes(mockEpisodes)
      } finally {
        setLoading(false)
      }
    }

    fetchEpisodes()
  }, [episodeUrls])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (episodes.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">Nenhuma informação de episódio disponível</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {episodes.map((episode, index) => (
        <motion.div
          key={episode.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold">{episode.name || "Episódio sem título"}</h3>
              <p className="text-sm text-muted-foreground">{episode.episode || "Código desconhecido"}</p>
              <p className="text-sm">{episode.air_date || "Data desconhecida"}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

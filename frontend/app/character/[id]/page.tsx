import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import EpisodeList from "@/components/episode-list"
import CharacterStatusBadge from "@/components/character-status-badge"
import PortalLoader from "@/components/portal-loader"
import { Suspense } from "react"

// Verificar se a URL da imagem é válida
const isValidImageUrl = (url: string | undefined): boolean => {
  if (!url) return false

  // Verificar se a URL começa com http:// ou https://
  return url.startsWith("http://") || url.startsWith("https://")
}

// Gerar metadados dinâmicos
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const character = await getCharacter(params.id)

  if (!character) {
    return {
      title: "Personagem não encontrado | Rick and Morty Portal",
    }
  }

  // Usar uma imagem válida para o OpenGraph ou um placeholder
  const ogImage = isValidImageUrl(character.image)
    ? character.image
    : "https://rickandmortyapi.com/api/character/avatar/1.jpeg" // Imagem padrão

  return {
    title: `${character.name} | Rick and Morty Portal`,
    description: `Conheça ${character.name}, um ${character.species} de Rick and Morty com status ${character.status}`,
    openGraph: {
      title: `${character.name} | Rick and Morty Portal`,
      description: `Conheça ${character.name}, um ${character.species} de Rick and Morty com status ${character.status}`,
      images: [ogImage],
    },
  }
}

// Função para buscar dados do personagem
async function getCharacter(id: string) {
  try {
    const api = (await import("@/lib/axios")).default
    const res = await api.get(`/characters/${id}`)

    // Log da resposta para debug
    console.log("Character API Response:", JSON.stringify(res.data, null, 2))

    // Adaptar a resposta se necessário
    const data = res.data

    // Se a resposta já estiver no formato esperado, retorne-a diretamente
    if (data && data.id && data.name) {
      // Adicionar campo episode se não existir
      return {
        ...data,
        episode: data.episode || [],
      }
    }

    // Se a resposta estiver em um formato diferente (por exemplo, { character: {...} })
    if (data && data.character) {
      return {
        ...data.character,
        episode: data.character.episode || [],
      }
    }

    // Se a resposta for um array com um único item
    if (Array.isArray(data) && data.length === 1) {
      return {
        ...data[0],
        episode: data[0].episode || [],
      }
    }

    // Se não conseguirmos adaptar, retorne null
    if (!data || (typeof data === "object" && Object.keys(data).length === 0)) {
      return null
    }

    return {
      ...data,
      episode: data.episode || [],
    }
  } catch (error: any) {
    console.error("Error fetching character:", error)
    if (error.response?.status === 404) return null
    throw new Error(`Failed to fetch character: ${error.response?.status || "unknown error"}`)
  }
}

export default async function CharacterPage({ params }: { params: { id: string } }) {
  const character = await getCharacter(params.id)

  if (!character) {
    notFound()
  }

  // Garantir que character.episode seja sempre um array
  const episodes = Array.isArray(character.episode) ? character.episode : character.episode ? [character.episode] : []

  // Determinar a URL da imagem a ser usada
  const imageUrl = isValidImageUrl(character.image) ? character.image : "/placeholder.png"

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-block mb-6">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar para a lista
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <div className="rounded-lg overflow-hidden border-4 border-primary/50 portal-glow">
            <Image
              src={imageUrl || "/placeholder.png"}
              alt={character.name}
              width={300}
              height={300}
              className="w-full object-cover"
              priority
              unoptimized={!isValidImageUrl(character.image)} // Desativar otimização para placeholders
            />
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold mb-2">{character.name}</h1>

            <div className="flex flex-wrap gap-2 mb-4">
              <CharacterStatusBadge status={character.status} />
              <Badge variant="outline">{character.species}</Badge>
              <Badge variant="outline">{character.gender}</Badge>
              {character.type && <Badge variant="outline">{character.type}</Badge>}
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Origem</p>
                  <p className="font-medium">{character.origin?.name || "Desconhecida"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Localização atual</p>
                  <p className="font-medium">{character.location?.name || "Desconhecida"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Aparece em</p>
                  <p className="font-medium">{episodes.length} episódios</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Episódios</h2>
        <Suspense fallback={<PortalLoader />}>
          <EpisodeList episodeUrls={episodes} />
        </Suspense>
      </div>
    </main>
  )
}

// Gerar páginas estáticas para os primeiros 20 personagens (para melhor performance)
export async function generateStaticParams() {
  try {
    const api = (await import("@/lib/axios")).default
    const res = await api.get("/characters", { params: { page: 1 } })
    const data = res.data

    // Adaptar a resposta se necessário
    let characters = []

    if (data && data.data && Array.isArray(data.data)) {
      // Se a resposta tiver a estrutura do Laravel
      characters = data.data
    } else if (Array.isArray(data)) {
      characters = data
    } else if (data && Array.isArray(data.results)) {
      characters = data.results
    } else if (data && Array.isArray(data.characters)) {
      characters = data.characters
    } else {
      return []
    }

    return characters.map((character: any) => ({
      id: character.id.toString(),
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

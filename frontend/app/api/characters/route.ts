import { type NextRequest, NextResponse } from 'next/server'
import api from '@/lib/axios'

// Tipos para os personagens
export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode?: string[]
  created_at?: string
  updated_at?: string
}

// Interface para a resposta da API do Laravel
export interface LaravelPaginatedResponse {
  current_page: number
  data: Character[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

// Interface para a resposta formatada para o frontend
export interface CharactersResponse {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: Character[]
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page') || '1'
  const name = searchParams.get('name') || ''
  const status = searchParams.get('status') || ''
  const species = searchParams.get('species') || ''
  const gender = searchParams.get('gender') || ''

  try {
    // Usar o Axios para fazer a requisição à sua API backend
    const response = await api.get('/api/characters', {
      params: {
        page,
        name,
        status,
        species,
        gender,
      },
    })

    // debug
    console.log(
      'API Response Structure:',
      JSON.stringify(response.data, null, 2)
    )

    // Verificar se a resposta tem a estrutura do Laravel Importante
    const data = response.data as LaravelPaginatedResponse

    if (data && data.data && Array.isArray(data.data)) {
      const formattedResponse: CharactersResponse = {
        info: {
          count: data.total,
          pages: data.last_page,
          next: data.next_page_url,
          prev: data.prev_page_url,
        },
        results: data.data.map((character) => ({
          ...character,
          // Adicionar campo episode se não existir
          episode: character.episode || [],
        })),
      }

      return NextResponse.json(formattedResponse)
    }

    // Se a resposta não tiver a estrutura esperada, retornar uma estrutura vazia válida
    return NextResponse.json({
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    })
  } catch (error: any) {
    console.error('Error fetching characters:', error)

    // Se não encontrar resultados, retornar uma lista vazia com estrutura correta
    if (error.response?.status === 404) {
      return NextResponse.json({
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      })
    }

    // Para qualquer outro erro, retornar uma resposta de erro com estrutura válida
    return NextResponse.json(
      {
        error: 'Failed to fetch characters',
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      },
      { status: error.response?.status || 500 }
    )
  }
}

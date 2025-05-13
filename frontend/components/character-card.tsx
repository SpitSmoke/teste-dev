'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import CharacterStatusBadge from '@/components/character-status-badge'
import { Character } from './character-list'


interface CharacterCardProps {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const [imageError, setImageError] = useState(false)

  
  const isValidImageUrl = (url: string | undefined): boolean => {
    if (!url) return false

    
    return url.startsWith('http://') || url.startsWith('https://')
  }

  
  const imageUrl =
    isValidImageUrl(character.image) && !imageError
      ? character.image
      : '/placeholder.png'

  return (
    <Link href={`/character/${character.id}`} className="block h-full">
      <Card className="overflow-hidden h-full character-card">
        <div className="relative">
          <div className="aspect-square w-full">
            <Image
              src={imageUrl || '/placeholder.png'}
              alt={character.name}
              width={300}
              height={300}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              unoptimized={!isValidImageUrl(character.image)}
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 character-eyes" aria-hidden="true">
            {/* Esta div é usada para o efeito de glow nos olhos no hover */}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg truncate">{character.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <CharacterStatusBadge status={character.status} />
            <span className="text-sm text-muted-foreground">
              {character.species}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

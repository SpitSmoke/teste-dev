"use client"

import { useState, useEffect, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"

export default function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  
  const [name, setName] = useState(searchParams.get("name") || "")
  const [status, setStatus] = useState(searchParams.get("status") || "")
  const [species, setSpecies] = useState(searchParams.get("species") || "")
  const [gender, setGender] = useState(searchParams.get("gender") || "")
  const [isOpen, setIsOpen] = useState(false)

  
  const updateFilters = () => {
    startTransition(() => {
      const params = new URLSearchParams()
      if (name) params.set("name", name)
      if (status) params.set("status", status)
      if (species) params.set("species", species)
      if (gender) params.set("gender", gender)
      params.set("page", "1") 

      router.push(`/?${params.toString()}`)
      setIsOpen(false)
    })
  }

  
  const clearFilters = () => {
    setName("")
    setStatus("")
    setSpecies("")
    setGender("")

    startTransition(() => {
      router.push("/")
      setIsOpen(false)
    })
  }

  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchParams.get("name") !== name) {
        updateFilters()
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [name])

  return (
    <div className="my-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar personagem..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10"
            aria-label="Buscar personagem por nome"
          />
          {name && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
              onClick={() => setName("")}
              aria-label="Limpar busca"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
              {(status || species || gender) && <span className="ml-1 rounded-full bg-primary w-2 h-2" />}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>Filtre os personagens por status, espécie e gênero.</SheetDescription>
            </SheetHeader>

            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Qualquer status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Qualquer status</SelectItem>
                    <SelectItem value="alive">Vivo</SelectItem>
                    <SelectItem value="dead">Morto</SelectItem>
                    <SelectItem value="unknown">Desconhecido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="species">Espécie</Label>
                <Select value={species} onValueChange={setSpecies}>
                  <SelectTrigger id="species">
                    <SelectValue placeholder="Qualquer espécie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Qualquer espécie</SelectItem>
                    <SelectItem value="human">Humano</SelectItem>
                    <SelectItem value="alien">Alienígena</SelectItem>
                    <SelectItem value="humanoid">Humanóide</SelectItem>
                    <SelectItem value="robot">Robô</SelectItem>
                    <SelectItem value="animal">Animal</SelectItem>
                    <SelectItem value="mythological">Mitológico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gênero</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Qualquer gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Qualquer gênero</SelectItem>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Feminino</SelectItem>
                    <SelectItem value="genderless">Sem gênero</SelectItem>
                    <SelectItem value="unknown">Desconhecido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <SheetFooter className="sm:justify-between gap-3">
              <Button variant="outline" onClick={clearFilters}>
                Limpar filtros
              </Button>
              <Button onClick={updateFilters} disabled={isPending}>
                {isPending ? "Aplicando..." : "Aplicar filtros"}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <AnimatePresence>
        {(status || species || gender) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2"
          >
            {status && <Badge label="Status" value={status} onClear={() => setStatus("")} />}
            {species && <Badge label="Espécie" value={species} onClear={() => setSpecies("")} />}
            {gender && <Badge label="Gênero" value={gender} onClear={() => setGender("")} />}

            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={clearFilters}>
              Limpar todos
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Badge({ label, value, onClear }: { label: string; value: string; onClear: () => void }) {
  return (
    <div className="flex items-center gap-1 bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs">
      <span className="font-medium">{label}:</span>
      <span className="capitalize">{value}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-4 w-4 ml-1 rounded-full"
        onClick={onClear}
        aria-label={`Remover filtro ${label}`}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}

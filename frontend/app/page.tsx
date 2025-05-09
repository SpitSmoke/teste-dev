import { Suspense } from "react"
import CharacterList from "@/components/character-list"
import FilterBar from "@/components/filter-bar"
import PageTitle from "@/components/page-title"
import PortalLoader from "@/components/portal-loader"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <PageTitle title="Rick and Morty Portal" subtitle="Explore o multiverso e descubra todos os personagens" />

      <FilterBar />

      <Suspense fallback={<PortalLoader />}>
        <CharacterList />
      </Suspense>
    </main>
  )
}

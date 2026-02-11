import { Header } from "@/components/dashboard/header"
import { HeroSection } from "@/components/dashboard/hero-section"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { MatchHistory } from "@/components/dashboard/match-history"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="flex flex-col gap-8">
          <HeroSection />
          <StatsGrid />
          <MatchHistory />
        </div>
      </main>
    </div>
  )
}

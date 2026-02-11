"use client"

import { Header } from "@/components/dashboard/header"
import { HeroSection } from "@/components/dashboard/hero-section"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { MatchHistory } from "@/components/dashboard/match-history"
import { MatchDetail } from "@/components/dashboard/match-detail"
import { Leaderboard } from "@/components/dashboard/leaderboard"
import { SettingsPage } from "@/components/dashboard/settings-page"
import { AppProvider, useApp } from "@/lib/app-context"

function DashboardView() {
  const { selectedMatch, animationKey } = useApp()

  if (selectedMatch) {
    return <MatchDetail />
  }

  return (
    <div key={`dashboard-${animationKey}`} className="flex flex-col gap-8 animate-page-in">
      <HeroSection />
      <StatsGrid />
      <MatchHistory />
    </div>
  )
}

function PageContent() {
  const { currentPage, animationKey } = useApp()

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {currentPage === "dashboard" && <DashboardView />}
      {currentPage === "leaderboard" && (
        <div key={`leaderboard-${animationKey}`}>
          <Leaderboard />
        </div>
      )}
      {currentPage === "settings" && (
        <div key={`settings-${animationKey}`}>
          <SettingsPage />
        </div>
      )}
    </main>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <PageContent />
      </div>
    </AppProvider>
  )
}

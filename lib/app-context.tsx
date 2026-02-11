"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

export type PageView = "dashboard" | "leaderboard" | "settings"

export interface MatchData {
  id: number
  date: string
  result: "Win" | "Loss"
  map: string
  mapImage: string
  eloChange: number
  duration: string
  teamA: TeamPlayer[]
  teamB: TeamPlayer[]
}

export interface TeamPlayer {
  name: string
  avatar: string
  kills: number
  deaths: number
  assists: number
  elo: number
}

export interface PlayerProfile {
  username: string
  avatar: string
  frame: "none" | "bronze" | "silver" | "gold" | "neon"
  robloxId: string
}

interface AppContextType {
  currentPage: PageView
  setCurrentPage: (page: PageView) => void
  selectedMatch: MatchData | null
  setSelectedMatch: (match: MatchData | null) => void
  profile: PlayerProfile
  setProfile: (profile: PlayerProfile) => void
  animationKey: number
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPageRaw] = useState<PageView>("dashboard")
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null)
  const [profile, setProfile] = useState<PlayerProfile>({
    username: "Player_1",
    avatar: "/avatar.jpg",
    frame: "gold",
    robloxId: "123456789",
  })
  const [animationKey, setAnimationKey] = useState(0)

  const setCurrentPage = useCallback((page: PageView) => {
    setSelectedMatch(null)
    setCurrentPageRaw(page)
    setAnimationKey((k) => k + 1)
  }, [])

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedMatch,
        setSelectedMatch,
        profile,
        setProfile,
        animationKey,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within AppProvider")
  return context
}

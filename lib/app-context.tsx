"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import { getRobloxAvatar } from "@/lib/roblox-avatar"

export type PageView = "dashboard" | "leaderboard" | "settings" | "profile"

export interface MatchData {
  id: number
  date: string
  result: "Win" | "Loss"
  map: string
  mapImage: string
  eloChange: number
  duration: string
  score: string
  teamCT: TeamPlayer[]
  teamT: TeamPlayer[]
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
  robloxUsername: string
  bloxlinkVerified: boolean
}

/** Public data for any player (leaderboard, match rosters, profiles) */
export interface PublicPlayer {
  name: string
  avatar: string
  robloxId: string
  elo: number
  wins: number
  losses: number
  winRate: number
  headshotAccuracy: number
  bio: string
  rank: number
  frame: PlayerProfile["frame"]
}

interface AppContextType {
  isAuthenticated: boolean
  login: (username: string, robloxUsername: string, robloxId: string) => void
  logout: () => void
  currentPage: PageView
  setCurrentPage: (page: PageView) => void
  selectedMatch: MatchData | null
  setSelectedMatch: (match: MatchData | null) => void
  profile: PlayerProfile
  setProfile: (profile: PlayerProfile) => void
  animationKey: number
  /** The player whose public profile is being viewed (null = own) */
  viewingPlayer: PublicPlayer | null
  setViewingPlayer: (player: PublicPlayer | null) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentPage, setCurrentPageRaw] = useState<PageView>("dashboard")
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null)
  const [viewingPlayer, setViewingPlayerRaw] = useState<PublicPlayer | null>(null)
  const [profile, setProfile] = useState<PlayerProfile>({
    username: "Player_1",
    avatar: "/avatar.jpg",
    frame: "gold",
    robloxId: "",
    robloxUsername: "",
    bloxlinkVerified: false,
  })
  const [animationKey, setAnimationKey] = useState(0)

  const login = useCallback((username: string, robloxUsername: string, robloxId: string) => {
    setProfile((prev) => ({
      ...prev,
      username: username || prev.username,
      robloxUsername,
      robloxId,
      bloxlinkVerified: true,
      avatar: getRobloxAvatar(robloxId),
    }))
    setIsAuthenticated(true)
    setAnimationKey((k) => k + 1)
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setCurrentPageRaw("dashboard")
    setSelectedMatch(null)
    setViewingPlayerRaw(null)
    setAnimationKey((k) => k + 1)
  }, [])

  const setCurrentPage = useCallback((page: PageView) => {
    setSelectedMatch(null)
    if (page !== "profile") setViewingPlayerRaw(null)
    setCurrentPageRaw(page)
    setAnimationKey((k) => k + 1)
  }, [])

  const setViewingPlayer = useCallback((player: PublicPlayer | null) => {
    setViewingPlayerRaw(player)
    if (player) {
      setCurrentPageRaw("profile")
      setSelectedMatch(null)
      setAnimationKey((k) => k + 1)
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        currentPage,
        setCurrentPage,
        selectedMatch,
        setSelectedMatch,
        profile,
        setProfile,
        animationKey,
        viewingPlayer,
        setViewingPlayer,
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

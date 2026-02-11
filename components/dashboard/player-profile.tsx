"use client"

import React from "react"

import {
  ArrowLeft,
  Trophy,
  Target,
  TrendingUp,
  Crown,
  Shield,
  Crosshair,
  Percent,
  Swords,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/app-context"
import type { PublicPlayer } from "@/lib/app-context"
import { cn } from "@/lib/utils"

const FRAME_STYLES: Record<string, { border: string; glow: string }> = {
  none: { border: "border-primary/30", glow: "" },
  bronze: {
    border: "border-[hsl(30,60%,50%)]",
    glow: "bg-[hsl(30,60%,50%)]/20",
  },
  silver: {
    border: "border-[hsl(215,20%,65%)]",
    glow: "bg-[hsl(215,20%,65%)]/20",
  },
  gold: {
    border: "border-[hsl(45,93%,58%)]",
    glow: "bg-[hsl(45,93%,58%)]/20",
  },
  neon: { border: "border-primary", glow: "bg-primary/20" },
}

interface StatBlockProps {
  label: string
  value: string
  icon: React.ReactNode
  color?: string
}

function StatBlock({ label, value, icon, color }: StatBlockProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-secondary/30 p-5">
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg",
          color || "bg-primary/10 text-primary",
        )}
      >
        {icon}
      </div>
      <span className="text-2xl font-bold font-mono text-foreground">
        {value}
      </span>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

export function PlayerProfileView() {
  const { viewingPlayer, setViewingPlayer, setCurrentPage } = useApp()

  if (!viewingPlayer) return null

  const player: PublicPlayer = viewingPlayer
  const isChampion = player.rank === 1
  const frameStyle = FRAME_STYLES[player.frame] ?? FRAME_STYLES.none

  function handleBack() {
    setViewingPlayer(null)
    setCurrentPage("leaderboard")
  }

  return (
    <div className="flex flex-col gap-6 animate-slide-in-right">
      {/* Back button */}
      <Button
        variant="ghost"
        className="w-fit gap-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
        onClick={handleBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Leaderboard
      </Button>

      {/* Profile hero card */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border bg-card",
          isChampion
            ? "border-[hsl(45,93%,58%)]/40 glow-gold"
            : "border-border",
        )}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(160_84%_44%_/_0.04),_transparent_60%)]" />

        {isChampion && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_hsl(45_93%_58%_/_0.06),_transparent_50%)]" />
        )}

        <div className="relative flex flex-col items-center gap-6 p-8 sm:flex-row sm:gap-8">
          {/* Large avatar */}
          <div className="relative">
            <div
              className={cn(
                "absolute -inset-2 rounded-full blur-lg",
                isChampion
                  ? "bg-[hsl(45,93%,58%)]/25"
                  : frameStyle.glow || "bg-primary/15",
              )}
            />
            <Avatar
              className={cn(
                "relative h-32 w-32 border-[3px] md:h-36 md:w-36",
                isChampion
                  ? "border-[hsl(45,93%,58%)]"
                  : frameStyle.border,
              )}
            >
              <AvatarImage
                src={player.avatar || "/placeholder.svg"}
                alt={`${player.name} avatar`}
                className="object-cover"
              />
              <AvatarFallback className="bg-secondary text-3xl text-muted-foreground">
                {player.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            {/* Rank indicator */}
            <span
              className={cn(
                "absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold",
                player.rank <= 3
                  ? "border-[hsl(45,93%,58%)]/50 bg-[hsl(45,93%,58%)]/20 text-[hsl(45,93%,58%)]"
                  : "border-border bg-secondary text-foreground",
              )}
            >
              {player.rank}
            </span>
          </div>

          {/* Player info */}
          <div className="flex flex-1 flex-col items-center gap-3 sm:items-start">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                {player.name}
              </h1>
              {isChampion && (
                <Badge className="border-[hsl(45,93%,58%)]/30 bg-[hsl(45,93%,58%)]/15 text-[hsl(45,93%,58%)] champion-glow animate-pulse-glow">
                  <Crown className="mr-1 h-3 w-3" />
                  Peekit Champion
                </Badge>
              )}
              {player.rank === 2 && (
                <Badge className="border-[hsl(215,20%,65%)]/30 bg-[hsl(215,20%,65%)]/15 text-[hsl(215,20%,65%)]">
                  2nd Place
                </Badge>
              )}
              {player.rank === 3 && (
                <Badge className="border-[hsl(30,60%,50%)]/30 bg-[hsl(30,60%,50%)]/15 text-[hsl(30,60%,50%)]">
                  3rd Place
                </Badge>
              )}
            </div>

            {/* Bio */}
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
              {player.bio}
            </p>

            {/* CT / T decorative badge row */}
            <div className="mt-1 flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-[hsl(199,89%,48%)]/20 bg-[hsl(199,89%,48%)]/5 px-2.5 py-0.5">
                <Shield className="h-3 w-3 text-[hsl(199,89%,48%)]" />
                <span className="text-[10px] font-semibold text-[hsl(199,89%,48%)]">
                  CT
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-[hsl(45,93%,58%)]/20 bg-[hsl(45,93%,58%)]/5 px-2.5 py-0.5">
                <Crosshair className="h-3 w-3 text-[hsl(45,93%,58%)]" />
                <span className="text-[10px] font-semibold text-[hsl(45,93%,58%)]">
                  T
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                Rank #{player.rank}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatBlock
          label="Elo Rating"
          value={player.elo.toLocaleString()}
          icon={<Target className="h-5 w-5" />}
          color="bg-primary/10 text-primary"
        />
        <StatBlock
          label="Matches Won"
          value={String(player.wins)}
          icon={<Trophy className="h-5 w-5" />}
          color="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
        />
        <StatBlock
          label="Win Rate"
          value={`${player.winRate}%`}
          icon={<TrendingUp className="h-5 w-5" />}
          color="bg-[hsl(199,89%,48%)]/10 text-[hsl(199,89%,48%)]"
        />
        <StatBlock
          label="Headshot Accuracy"
          value={`${player.headshotAccuracy}%`}
          icon={<Percent className="h-5 w-5" />}
          color="bg-[hsl(45,93%,58%)]/10 text-[hsl(45,93%,58%)]"
        />
      </div>

      {/* W/L breakdown */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Swords className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            Match Breakdown
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          {/* W/L bar */}
          <div className="flex items-center gap-3 text-sm">
            <span className="w-16 font-medium text-[hsl(var(--success))]">
              {player.wins}W
            </span>
            <div className="flex h-3 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="rounded-full bg-[hsl(var(--success))] transition-all"
                style={{ width: `${player.winRate}%` }}
              />
            </div>
            <span className="w-16 text-right font-medium text-destructive">
              {player.losses}L
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Total: {player.wins + player.losses} matches</span>
            <span>Win Rate: {player.winRate}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

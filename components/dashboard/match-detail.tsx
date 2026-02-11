"use client"

import {
  ArrowLeft,
  Shield,
  Crosshair,
  Clock,
  Calendar,
  Target,
  Skull,
  HandHelping,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useApp } from "@/lib/app-context"
import type { TeamPlayer } from "@/lib/app-context"
import { findPlayer } from "@/lib/player-data"
import { cn } from "@/lib/utils"
import Image from "next/image"

function TeamRoster({
  players,
  side,
  isWinner,
  onPlayerClick,
}: {
  players: TeamPlayer[]
  side: "CT" | "T"
  isWinner: boolean
  onPlayerClick: (name: string) => void
}) {
  const totalKills = players.reduce((sum, p) => sum + p.kills, 0)
  const totalDeaths = players.reduce((sum, p) => sum + p.deaths, 0)

  const isCT = side === "CT"
  const sideLabel = isCT ? "Counter-Terrorists" : "Terrorists"
  const sideColor = isCT
    ? "text-[hsl(199,89%,48%)]"
    : "text-[hsl(45,93%,58%)]"
  const sideBorderColor = isCT
    ? "border-[hsl(199,89%,48%)]/20"
    : "border-[hsl(45,93%,58%)]/20"
  const SideIcon = isCT ? Shield : Crosshair

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-card",
        sideBorderColor,
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <SideIcon className={cn("h-4 w-4", sideColor)} />
          <span className={cn("text-sm font-semibold", sideColor)}>
            {sideLabel}
          </span>
          {isWinner && (
            <Badge className="border-transparent bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]">
              Winner
            </Badge>
          )}
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {totalKills}K / {totalDeaths}D
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Player</TableHead>
            <TableHead className="text-center text-muted-foreground">
              <Target className="mx-auto h-3.5 w-3.5" />
              <span className="sr-only">Kills</span>
            </TableHead>
            <TableHead className="text-center text-muted-foreground">
              <Skull className="mx-auto h-3.5 w-3.5" />
              <span className="sr-only">Deaths</span>
            </TableHead>
            <TableHead className="text-center text-muted-foreground">
              <HandHelping className="mx-auto h-3.5 w-3.5" />
              <span className="sr-only">Assists</span>
            </TableHead>
            <TableHead className="text-right text-muted-foreground">
              Elo
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow
              key={player.name}
              className="cursor-pointer border-border transition-colors hover:bg-secondary/30"
              onClick={() => onPlayerClick(player.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onPlayerClick(player.name)
                }
              }}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7 border border-border">
                    <AvatarImage
                      src={player.avatar || "/placeholder.svg"}
                      alt={player.name}
                    />
                    <AvatarFallback className="bg-secondary text-xs text-muted-foreground">
                      {player.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground hover:underline">
                    {player.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center font-mono text-sm text-[hsl(var(--success))]">
                {player.kills}
              </TableCell>
              <TableCell className="text-center font-mono text-sm text-destructive">
                {player.deaths}
              </TableCell>
              <TableCell className="text-center font-mono text-sm text-muted-foreground">
                {player.assists}
              </TableCell>
              <TableCell className="text-right font-mono text-sm text-foreground">
                {player.elo.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function MatchDetail() {
  const { selectedMatch, setSelectedMatch, setViewingPlayer } = useApp()

  if (!selectedMatch) return null

  const isWin = selectedMatch.result === "Win"

  function handlePlayerClick(name: string) {
    const player = findPlayer(name)
    if (player) {
      setSelectedMatch(null)
      setViewingPlayer(player)
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-slide-in-right">
      {/* Back button */}
      <Button
        variant="ghost"
        className="w-fit gap-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
        onClick={() => setSelectedMatch(null)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Match History
      </Button>

      {/* Match overview card */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-card">
        {/* Map background image */}
        <div className="relative h-48 w-full overflow-hidden sm:h-56">
          <Image
            src={selectedMatch.mapImage || "/placeholder.svg"}
            alt={`${selectedMatch.map} map`}
            fill
            className="object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
          {/* Result overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <Badge
              className={`px-4 py-1 text-lg ${
                isWin
                  ? "border-transparent bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]"
                  : "border-transparent bg-destructive/20 text-destructive"
              }`}
            >
              {selectedMatch.result}
            </Badge>
            <h2 className="text-2xl font-bold text-foreground text-balance">
              {selectedMatch.map}
            </h2>
            {/* Score */}
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[hsl(199,89%,48%)]" />
                <span className="font-bold text-[hsl(199,89%,48%)]">CT</span>
              </span>
              <span className="font-mono text-lg font-bold text-foreground">
                {selectedMatch.score}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="font-bold text-[hsl(45,93%,58%)]">T</span>
                <Crosshair className="h-3.5 w-3.5 text-[hsl(45,93%,58%)]" />
              </span>
            </div>
          </div>
        </div>

        {/* Match stats bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 border-t border-border px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {selectedMatch.date}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {selectedMatch.duration}
          </div>
          <div
            className={`flex items-center gap-1 font-mono text-sm font-semibold ${
              selectedMatch.eloChange > 0
                ? "text-[hsl(var(--success))]"
                : "text-destructive"
            }`}
          >
            Elo: {selectedMatch.eloChange > 0 ? "+" : ""}
            {selectedMatch.eloChange}
          </div>
        </div>
      </div>

      {/* Team rosters */}
      <div className="grid gap-4 lg:grid-cols-2">
        <TeamRoster
          players={selectedMatch.teamCT}
          side="CT"
          isWinner={isWin}
          onPlayerClick={handlePlayerClick}
        />
        <TeamRoster
          players={selectedMatch.teamT}
          side="T"
          isWinner={!isWin}
          onPlayerClick={handlePlayerClick}
        />
      </div>
    </div>
  )
}

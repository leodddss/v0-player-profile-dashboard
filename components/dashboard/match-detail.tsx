"use client"

import {
  ArrowLeft,
  Swords,
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
import Image from "next/image"

function TeamRoster({
  players,
  label,
  isWinner,
}: {
  players: TeamPlayer[]
  label: string
  isWinner: boolean
}) {
  const totalKills = players.reduce((sum, p) => sum + p.kills, 0)
  const totalDeaths = players.reduce((sum, p) => sum + p.deaths, 0)

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Swords className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">{label}</span>
          {isWinner && (
            <Badge className="border-transparent bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]">
              Winner
            </Badge>
          )}
        </div>
        <span className="text-xs text-muted-foreground font-mono">
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
              className="border-border transition-colors hover:bg-secondary/30"
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7 border border-border">
                    <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                    <AvatarFallback className="bg-secondary text-xs text-muted-foreground">
                      {player.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">
                    {player.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center text-sm font-mono text-[hsl(var(--success))]">
                {player.kills}
              </TableCell>
              <TableCell className="text-center text-sm font-mono text-destructive">
                {player.deaths}
              </TableCell>
              <TableCell className="text-center text-sm font-mono text-muted-foreground">
                {player.assists}
              </TableCell>
              <TableCell className="text-right text-sm font-mono text-foreground">
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
  const { selectedMatch, setSelectedMatch } = useApp()

  if (!selectedMatch) return null

  const isWin = selectedMatch.result === "Win"

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
              className={`text-lg px-4 py-1 ${
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
            className={`flex items-center gap-1 text-sm font-semibold font-mono ${
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
          players={selectedMatch.teamA}
          label="Team Alpha"
          isWinner={isWin}
        />
        <TeamRoster
          players={selectedMatch.teamB}
          label="Team Bravo"
          isWinner={!isWin}
        />
      </div>
    </div>
  )
}

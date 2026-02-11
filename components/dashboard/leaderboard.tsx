"use client"

import { Crown, Medal, Trophy } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useApp } from "@/lib/app-context"
import type { PublicPlayer } from "@/lib/app-context"
import { allPlayers } from "@/lib/player-data"
import { cn } from "@/lib/utils"

function getRankBadge(rank: number) {
  if (rank === 1) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(45,93%,58%)]/20 glow-gold">
        <Crown className="h-4 w-4 text-[hsl(45,93%,58%)]" />
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(215,20%,65%)]/20 glow-silver">
        <Medal className="h-4 w-4 text-[hsl(215,20%,65%)]" />
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(30,60%,50%)]/20 glow-bronze">
        <Medal className="h-4 w-4 text-[hsl(30,60%,50%)]" />
      </div>
    )
  }
  return (
    <span className="flex h-8 w-8 items-center justify-center font-mono text-sm text-muted-foreground">
      {rank}
    </span>
  )
}

function TopPlayerCard({ player, onOpen }: { player: PublicPlayer; onOpen: () => void }) {
  const isChampion = player.rank === 1
  const borderColors: Record<number, string> = {
    1: "border-[hsl(45,93%,58%)]/50",
    2: "border-[hsl(215,20%,65%)]/40",
    3: "border-[hsl(30,60%,50%)]/40",
  }
  const glowClasses: Record<number, string> = {
    1: "glow-gold",
    2: "glow-silver",
    3: "glow-bronze",
  }
  const rankLabels: Record<number, string> = {
    1: "1st",
    2: "2nd",
    3: "3rd",
  }
  const rankColors: Record<number, string> = {
    1: "text-[hsl(45,93%,58%)]",
    2: "text-[hsl(215,20%,65%)]",
    3: "text-[hsl(30,60%,50%)]",
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "relative flex flex-col items-center gap-4 rounded-xl border bg-card p-6 text-left transition-all hover:brightness-110",
        borderColors[player.rank],
        glowClasses[player.rank],
        isChampion && "animate-pulse-glow",
      )}
    >
      {isChampion && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="border-[hsl(45,93%,58%)]/30 bg-[hsl(45,93%,58%)]/15 text-[hsl(45,93%,58%)] champion-glow">
            <Crown className="mr-1 h-3 w-3" />
            Peekit Champion
          </Badge>
        </div>
      )}

      <div className="relative mt-2">
        <Avatar className={cn("h-16 w-16 border-2", borderColors[player.rank])}>
          <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
          <AvatarFallback className="bg-secondary text-muted-foreground">
            {player.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <span
          className={cn(
            "absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold",
            player.rank === 1 &&
              "border-[hsl(45,93%,58%)]/50 bg-[hsl(45,93%,58%)]/20 text-[hsl(45,93%,58%)]",
            player.rank === 2 &&
              "border-[hsl(215,20%,65%)]/50 bg-[hsl(215,20%,65%)]/20 text-[hsl(215,20%,65%)]",
            player.rank === 3 &&
              "border-[hsl(30,60%,50%)]/50 bg-[hsl(30,60%,50%)]/20 text-[hsl(30,60%,50%)]",
          )}
        >
          {player.rank}
        </span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-bold text-foreground">{player.name}</span>
        <span className={cn("text-xs font-semibold", rankColors[player.rank])}>
          {rankLabels[player.rank]}
        </span>
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <span className="text-2xl font-bold font-mono text-foreground">
          {player.elo.toLocaleString()}
        </span>
        <span className="text-xs text-muted-foreground">Elo Rating</span>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>
          <span className="font-semibold text-[hsl(var(--success))]">
            {player.wins}
          </span>{" "}
          W
        </span>
        <span>
          <span className="font-semibold text-destructive">{player.losses}</span>{" "}
          L
        </span>
        <span className="font-semibold text-foreground">{player.winRate}%</span>
      </div>
    </button>
  )
}

export function Leaderboard() {
  const { setViewingPlayer, profile } = useApp()

  const top3 = allPlayers.slice(0, 3)
  const rest = allPlayers.slice(3)

  function openPlayer(player: PublicPlayer) {
    setViewingPlayer(player)
  }

  return (
    <div className="flex flex-col gap-8 animate-page-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(45,93%,58%)]/10">
          <Trophy className="h-5 w-5 text-[hsl(45,93%,58%)]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Top Players</h1>
          <p className="text-sm text-muted-foreground">
            Global leaderboard rankings by Elo
          </p>
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="order-2 sm:order-1">
          <TopPlayerCard player={top3[1]} onOpen={() => openPlayer(top3[1])} />
        </div>
        <div className="order-1 sm:order-2">
          <TopPlayerCard player={top3[0]} onOpen={() => openPlayer(top3[0])} />
        </div>
        <div className="order-3">
          <TopPlayerCard player={top3[2]} onOpen={() => openPlayer(top3[2])} />
        </div>
      </div>

      {/* Rest of leaderboard */}
      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-16 text-muted-foreground">Rank</TableHead>
              <TableHead className="text-muted-foreground">Player</TableHead>
              <TableHead className="text-right text-muted-foreground">
                Elo
              </TableHead>
              <TableHead className="hidden text-right text-muted-foreground sm:table-cell">
                W / L
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                Win Rate
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rest.map((player) => {
              const isYou = player.name === profile.username
              return (
                <TableRow
                  key={player.rank}
                  className={cn(
                    "cursor-pointer border-border transition-colors hover:bg-secondary/50",
                    isYou && "bg-primary/5",
                  )}
                  onClick={() => openPlayer(player)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      openPlayer(player)
                    }
                  }}
                >
                  <TableCell>{getRankBadge(player.rank)}</TableCell>
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
                      <span
                        className={cn(
                          "text-sm font-medium hover:underline",
                          isYou ? "text-primary" : "text-foreground",
                        )}
                      >
                        {player.name}
                        {isYou && (
                          <span className="ml-1.5 text-xs text-muted-foreground">
                            (You)
                          </span>
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-bold text-foreground">
                    {player.elo.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden text-right font-mono text-sm text-muted-foreground sm:table-cell">
                    {player.wins} / {player.losses}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-semibold text-foreground">
                    {player.winRate}%
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

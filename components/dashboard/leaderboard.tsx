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
import { cn } from "@/lib/utils"

interface LeaderboardPlayer {
  rank: number
  name: string
  avatar: string
  elo: number
  wins: number
  losses: number
  winRate: number
}

const leaderboardData: LeaderboardPlayer[] = [
  { rank: 1, name: "OmegaPrime", avatar: "/avatars/avatar-5.jpg", elo: 2150, wins: 487, losses: 113, winRate: 81.2 },
  { rank: 2, name: "PhantomX", avatar: "/avatars/avatar-4.jpg", elo: 1980, wins: 412, losses: 138, winRate: 74.9 },
  { rank: 3, name: "StormBreak", avatar: "/avatars/avatar-3.jpg", elo: 1870, wins: 365, losses: 145, winRate: 71.6 },
  { rank: 4, name: "Player_1", avatar: "/avatar.jpg", elo: 1450, wins: 218, losses: 124, winRate: 63.7 },
  { rank: 5, name: "xNova", avatar: "/avatars/avatar-1.jpg", elo: 1380, wins: 195, losses: 130, winRate: 60.0 },
  { rank: 6, name: "ByteStorm", avatar: "/avatars/avatar-2.jpg", elo: 1420, wins: 210, losses: 140, winRate: 60.0 },
  { rank: 7, name: "DarkSpectre", avatar: "/avatars/avatar-6.jpg", elo: 1400, wins: 200, losses: 150, winRate: 57.1 },
  { rank: 8, name: "NeonBlade", avatar: "/avatars/avatar-6.jpg", elo: 1350, wins: 180, losses: 160, winRate: 52.9 },
  { rank: 9, name: "VortexKing", avatar: "/avatars/avatar-1.jpg", elo: 1390, wins: 190, losses: 160, winRate: 54.3 },
  { rank: 10, name: "ZeroGrav", avatar: "/avatars/avatar-3.jpg", elo: 1310, wins: 170, losses: 175, winRate: 49.3 },
  { rank: 11, name: "BlazeFury", avatar: "/avatars/avatar-5.jpg", elo: 1360, wins: 185, losses: 165, winRate: 52.9 },
  { rank: 12, name: "IronClad", avatar: "/avatars/avatar-2.jpg", elo: 1300, wins: 160, losses: 180, winRate: 47.1 },
  { rank: 13, name: "CrashCode", avatar: "/avatars/avatar-4.jpg", elo: 1340, wins: 175, losses: 175, winRate: 50.0 },
  { rank: 14, name: "SkyRaider", avatar: "/avatars/avatar-1.jpg", elo: 1280, wins: 150, losses: 190, winRate: 44.1 },
  { rank: 15, name: "GhostRunner", avatar: "/avatars/avatar-6.jpg", elo: 1260, wins: 140, losses: 200, winRate: 41.2 },
]

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
    <span className="flex h-8 w-8 items-center justify-center text-sm font-mono text-muted-foreground">
      {rank}
    </span>
  )
}

function TopPlayerCard({ player }: { player: LeaderboardPlayer }) {
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
    <div
      className={cn(
        "relative flex flex-col items-center gap-4 rounded-xl border bg-card p-6 transition-all",
        borderColors[player.rank],
        glowClasses[player.rank],
        isChampion && "animate-pulse-glow"
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
        <Avatar
          className={cn(
            "h-16 w-16 border-2",
            borderColors[player.rank]
          )}
        >
          <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
          <AvatarFallback className="bg-secondary text-muted-foreground">
            {player.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <span
          className={cn(
            "absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold",
            player.rank === 1 && "border-[hsl(45,93%,58%)]/50 bg-[hsl(45,93%,58%)]/20 text-[hsl(45,93%,58%)]",
            player.rank === 2 && "border-[hsl(215,20%,65%)]/50 bg-[hsl(215,20%,65%)]/20 text-[hsl(215,20%,65%)]",
            player.rank === 3 && "border-[hsl(30,60%,50%)]/50 bg-[hsl(30,60%,50%)]/20 text-[hsl(30,60%,50%)]"
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
          <span className="font-semibold text-[hsl(var(--success))]">{player.wins}</span> W
        </span>
        <span>
          <span className="font-semibold text-destructive">{player.losses}</span> L
        </span>
        <span className="font-semibold text-foreground">{player.winRate}%</span>
      </div>
    </div>
  )
}

export function Leaderboard() {
  const top3 = leaderboardData.slice(0, 3)
  const rest = leaderboardData.slice(3)

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
        {/* Display 2nd, 1st, 3rd order on desktop for podium effect */}
        <div className="order-2 sm:order-1">
          <TopPlayerCard player={top3[1]} />
        </div>
        <div className="order-1 sm:order-2">
          <TopPlayerCard player={top3[0]} />
        </div>
        <div className="order-3">
          <TopPlayerCard player={top3[2]} />
        </div>
      </div>

      {/* Rest of leaderboard */}
      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-16 text-muted-foreground">Rank</TableHead>
              <TableHead className="text-muted-foreground">Player</TableHead>
              <TableHead className="text-right text-muted-foreground">Elo</TableHead>
              <TableHead className="hidden text-right text-muted-foreground sm:table-cell">
                W / L
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                Win Rate
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rest.map((player) => (
              <TableRow
                key={player.rank}
                className={cn(
                  "border-border transition-colors hover:bg-secondary/50",
                  player.name === "Player_1" && "bg-primary/5"
                )}
              >
                <TableCell>{getRankBadge(player.rank)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7 border border-border">
                      <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                      <AvatarFallback className="bg-secondary text-xs text-muted-foreground">
                        {player.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        player.name === "Player_1"
                          ? "text-primary"
                          : "text-foreground"
                      )}
                    >
                      {player.name}
                      {player.name === "Player_1" && (
                        <span className="ml-1.5 text-xs text-muted-foreground">
                          (You)
                        </span>
                      )}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-sm font-bold font-mono text-foreground">
                  {player.elo.toLocaleString()}
                </TableCell>
                <TableCell className="hidden text-right text-sm font-mono text-muted-foreground sm:table-cell">
                  {player.wins} / {player.losses}
                </TableCell>
                <TableCell className="text-right text-sm font-semibold font-mono text-foreground">
                  {player.winRate}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

import { Shield, Trophy, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const RANK = 7
const RANK_TITLE = "Diamond"

function RankBadge({ rank }: { rank: number }) {
  return (
    <div className="relative flex flex-col items-center gap-2">
      {/* Glow ring behind the badge */}
      <div className="absolute -inset-3 rounded-full bg-[hsl(45,93%,58%)]/10 blur-xl animate-pulse-glow" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[hsl(45,93%,58%)]/50 bg-secondary glow-rank">
        <Shield className="h-9 w-9 text-[hsl(45,93%,58%)]" />
        <span className="absolute -bottom-1 flex h-6 min-w-6 items-center justify-center rounded-full border border-[hsl(45,93%,58%)]/50 bg-card px-1.5 text-xs font-bold text-[hsl(45,93%,58%)]">
          {rank}
        </span>
      </div>
      <span className="text-sm font-semibold text-[hsl(45,93%,58%)]">
        {RANK_TITLE}
      </span>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-xl border border-border bg-card p-6 md:p-8">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(160_84%_44%_/_0.04),_transparent_60%)]" />

      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
        {/* Avatar */}
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-primary/20 blur-md" />
          <Avatar className="relative h-28 w-28 border-2 border-primary/30 md:h-32 md:w-32">
            <AvatarImage
              src="/avatar.jpg"
              alt="Player_1 avatar"
              className="object-cover"
            />
            <AvatarFallback className="bg-secondary text-2xl text-muted-foreground">
              P1
            </AvatarFallback>
          </Avatar>
          {/* Online indicator */}
          <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-card bg-[hsl(var(--success))]" />
        </div>

        {/* Player Info */}
        <div className="flex flex-1 flex-col items-center gap-3 sm:items-start">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
              Player_1
            </h1>
            <Badge className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/15">
              <Trophy className="mr-1 h-3 w-3" />
              Pro
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-primary" />
              Top 5%
            </span>
            <span className="h-4 w-px bg-border" />
            <span>342 Matches</span>
            <span className="h-4 w-px bg-border" />
            <span>Member since Jan 2025</span>
          </div>
        </div>

        {/* Rank Badge */}
        <RankBadge rank={RANK} />
      </div>
    </section>
  )
}

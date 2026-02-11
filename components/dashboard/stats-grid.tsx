import React from "react"
import { TrendingUp, Trophy, Target } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendUp,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
      {/* Hover glow */}
      <div className="absolute inset-0 bg-primary/[0.02] opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-muted-foreground">
            {title}
          </span>
          <span className="text-3xl font-bold tracking-tight text-foreground font-mono">
            {value}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{subtitle}</span>
            {trend && (
              <span
                className={`flex items-center gap-0.5 text-xs font-medium ${
                  trendUp ? "text-[hsl(var(--success))]" : "text-destructive"
                }`}
              >
                <TrendingUp
                  className={`h-3 w-3 ${!trendUp ? "rotate-180" : ""}`}
                />
                {trend}
              </span>
            )}
          </div>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </div>
  )
}

export function StatsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        title="Current Elo"
        value="1,450"
        subtitle="Rank #1,247"
        icon={<Target className="h-5 w-5" />}
        trend="+75"
        trendUp
      />
      <StatCard
        title="Matches Won"
        value="218"
        subtitle="Out of 342 played"
        icon={<Trophy className="h-5 w-5" />}
        trend="+12 this week"
        trendUp
      />
      <StatCard
        title="Win Rate"
        value="63.7%"
        subtitle="Last 30 days"
        icon={<TrendingUp className="h-5 w-5" />}
        trend="+2.1%"
        trendUp
      />
    </div>
  )
}

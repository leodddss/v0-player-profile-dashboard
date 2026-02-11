"use client"

import { History } from "lucide-react"
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
import { matches } from "@/lib/match-data"

export function MatchHistory() {
  const { setSelectedMatch } = useApp()

  return (
    <section className="rounded-xl border border-border bg-card">
      {/* Section header */}
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <History className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Match History</h2>
        <Badge
          variant="secondary"
          className="ml-auto bg-secondary text-muted-foreground"
        >
          Last 8 matches
        </Badge>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Date</TableHead>
            <TableHead className="text-muted-foreground">Result</TableHead>
            <TableHead className="text-muted-foreground">Map</TableHead>
            <TableHead className="hidden text-muted-foreground sm:table-cell">
              Duration
            </TableHead>
            <TableHead className="text-right text-muted-foreground">
              Elo Change
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match) => (
            <TableRow
              key={match.id}
              className="cursor-pointer border-border transition-colors hover:bg-secondary/50"
              onClick={() => setSelectedMatch(match)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setSelectedMatch(match)
                }
              }}
            >
              <TableCell className="text-sm text-muted-foreground">
                {match.date}
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    match.result === "Win"
                      ? "border-transparent bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/15"
                      : "border-transparent bg-destructive/10 text-destructive hover:bg-destructive/15"
                  }
                >
                  {match.result}
                </Badge>
              </TableCell>
              <TableCell className="text-sm font-medium text-foreground">
                {match.map}
              </TableCell>
              <TableCell className="hidden text-sm text-muted-foreground font-mono sm:table-cell">
                {match.duration}
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={`text-sm font-semibold font-mono ${
                    match.eloChange > 0
                      ? "text-[hsl(var(--success))]"
                      : "text-destructive"
                  }`}
                >
                  {match.eloChange > 0 ? "+" : ""}
                  {match.eloChange}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

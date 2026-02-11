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

interface Match {
  id: number
  date: string
  result: "Win" | "Loss"
  map: string
  eloChange: number
  duration: string
}

const matches: Match[] = [
  {
    id: 1,
    date: "Feb 11, 2026",
    result: "Win",
    map: "Arsenal Ruins",
    eloChange: 25,
    duration: "14:32",
  },
  {
    id: 2,
    date: "Feb 11, 2026",
    result: "Win",
    map: "Neon District",
    eloChange: 22,
    duration: "18:05",
  },
  {
    id: 3,
    date: "Feb 10, 2026",
    result: "Loss",
    map: "Sky Fortress",
    eloChange: -25,
    duration: "12:47",
  },
  {
    id: 4,
    date: "Feb 10, 2026",
    result: "Win",
    map: "Arsenal Ruins",
    eloChange: 28,
    duration: "16:21",
  },
  {
    id: 5,
    date: "Feb 9, 2026",
    result: "Loss",
    map: "Cyber Grid",
    eloChange: -19,
    duration: "20:10",
  },
  {
    id: 6,
    date: "Feb 9, 2026",
    result: "Win",
    map: "Neon District",
    eloChange: 25,
    duration: "15:43",
  },
  {
    id: 7,
    date: "Feb 8, 2026",
    result: "Win",
    map: "Sky Fortress",
    eloChange: 30,
    duration: "11:55",
  },
  {
    id: 8,
    date: "Feb 8, 2026",
    result: "Loss",
    map: "Cyber Grid",
    eloChange: -25,
    duration: "22:08",
  },
]

export function MatchHistory() {
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
            <TableHead className="text-muted-foreground">Duration</TableHead>
            <TableHead className="text-right text-muted-foreground">
              Elo Change
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match) => (
            <TableRow
              key={match.id}
              className="border-border transition-colors hover:bg-secondary/50"
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
              <TableCell className="text-sm text-muted-foreground font-mono">
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

"use client"

import React from "react"

import {
  Gamepad2,
  LogOut,
  Settings,
  User,
  ChevronDown,
  LayoutDashboard,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useApp } from "@/lib/app-context"
import type { PageView } from "@/lib/app-context"
import { cn } from "@/lib/utils"

const NAV_ITEMS: { label: string; value: PageView; icon: React.ReactNode }[] = [
  {
    label: "Dashboard",
    value: "dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    label: "Leaderboard",
    value: "leaderboard",
    icon: <Trophy className="h-4 w-4" />,
  },
  {
    label: "Settings",
    value: "settings",
    icon: <Settings className="h-4 w-4" />,
  },
]

export function Header() {
  const { currentPage, setCurrentPage, profile, logout } = useApp()

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage("dashboard")}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 glow-primary-sm">
              <Gamepad2 className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Peek<span className="text-primary">it</span>
            </span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setCurrentPage(item.value)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                currentPage === item.value
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button
            className="bg-primary font-semibold text-primary-foreground hover:bg-primary/90 glow-primary-sm"
            onClick={() => setCurrentPage("dashboard")}
          >
            <Gamepad2 className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Play</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-2 hover:bg-secondary"
              >
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt="Player avatar" />
                  <AvatarFallback className="bg-secondary text-muted-foreground">
                    P1
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium text-foreground sm:inline-block">
                  {profile.username}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 border-border bg-card"
            >
              <DropdownMenuLabel className="text-foreground">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                className="cursor-pointer text-foreground focus:bg-secondary focus:text-foreground"
                onClick={() => setCurrentPage("dashboard")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-foreground focus:bg-secondary focus:text-foreground"
                onClick={() => setCurrentPage("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto border-t border-border/50 px-4 py-1.5 md:hidden">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setCurrentPage(item.value)}
            className={cn(
              "flex flex-shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              currentPage === item.value
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            )}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </header>
  )
}

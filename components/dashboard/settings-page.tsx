"use client"

import React, { useState, useCallback } from "react"
import {
  Settings,
  Palette,
  Link2,
  Check,
  Pencil,
  RefreshCw,
  CheckCircle2,
  Loader2,
  User,
  ExternalLink,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useApp } from "@/lib/app-context"
import type { PlayerProfile } from "@/lib/app-context"
import { cn } from "@/lib/utils"

const FRAME_OPTIONS: {
  id: PlayerProfile["frame"]
  label: string
  borderClass: string
  glowClass: string
  color: string
}[] = [
  {
    id: "none",
    label: "None",
    borderClass: "border-border",
    glowClass: "",
    color: "text-muted-foreground",
  },
  {
    id: "bronze",
    label: "Bronze",
    borderClass: "border-[hsl(30,60%,50%)]",
    glowClass: "glow-bronze",
    color: "text-[hsl(30,60%,50%)]",
  },
  {
    id: "silver",
    label: "Silver",
    borderClass: "border-[hsl(215,20%,65%)]",
    glowClass: "glow-silver",
    color: "text-[hsl(215,20%,65%)]",
  },
  {
    id: "gold",
    label: "Gold",
    borderClass: "border-[hsl(45,93%,58%)]",
    glowClass: "glow-gold",
    color: "text-[hsl(45,93%,58%)]",
  },
  {
    id: "neon",
    label: "Neon",
    borderClass: "border-primary",
    glowClass: "glow-neon",
    color: "text-primary",
  },
]

function SectionCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

export function SettingsPage() {
  const { profile, setProfile } = useApp()
  const [editingName, setEditingName] = useState(false)
  const [draftName, setDraftName] = useState(profile.username)
  const [draftRobloxId, setDraftRobloxId] = useState(profile.robloxId)
  const [saved, setSaved] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [relinking, setRelinking] = useState(false)
  const [relinkId, setRelinkId] = useState("")

  function saveName() {
    if (draftName.trim()) {
      setProfile({ ...profile, username: draftName.trim() })
      setEditingName(false)
      flashSaved()
    }
  }

  function flashSaved() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  /** Re-sync the Roblox avatar from the linked ID */
  const syncAvatar = useCallback(() => {
    setSyncing(true)
    // Simulate a brief network request
    setTimeout(() => {
      const newUrl = `https://www.roblox.com/headshot-thumbnail/image?userId=${profile.robloxId}&width=420&height=420&format=png&t=${Date.now()}`
      setProfile({ ...profile, avatar: newUrl })
      setSyncing(false)
      flashSaved()
    }, 1200)
  }, [profile, setProfile])

  /** Re-link to a different Roblox account */
  const handleRelink = useCallback(() => {
    if (!relinkId.trim()) return
    setRelinking(true)
    setTimeout(() => {
      const newUrl = `https://www.roblox.com/headshot-thumbnail/image?userId=${relinkId.trim()}&width=420&height=420&format=png`
      setProfile({
        ...profile,
        robloxId: relinkId.trim(),
        robloxUsername: `User_${relinkId.trim().slice(0, 5)}`,
        avatar: newUrl,
        bloxlinkVerified: true,
      })
      setDraftRobloxId(relinkId.trim())
      setRelinking(false)
      setRelinkId("")
      flashSaved()
    }, 2000)
  }, [relinkId, profile, setProfile])

  const activeFrame =
    FRAME_OPTIONS.find((f) => f.id === profile.frame) ?? FRAME_OPTIONS[0]

  return (
    <div className="flex flex-col gap-6 animate-page-in">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Settings className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Customize your profile and account
          </p>
        </div>
        {saved && (
          <Badge className="ml-auto border-[hsl(var(--success))]/20 bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] animate-fade-in">
            <Check className="mr-1 h-3 w-3" />
            Saved
          </Badge>
        )}
      </div>

      {/* Live preview */}
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Live Preview
        </p>
        <div className="flex items-center gap-4">
          <div className="relative">
            {activeFrame.glowClass && (
              <div
                className={cn(
                  "absolute -inset-1 rounded-full blur-md",
                  activeFrame.glowClass,
                )}
              />
            )}
            <Avatar
              className={cn(
                "relative h-16 w-16 border-2",
                activeFrame.borderClass,
              )}
            >
              <AvatarImage
                src={profile.avatar || "/placeholder.svg"}
                alt="Preview avatar"
              />
              <AvatarFallback className="bg-secondary text-muted-foreground">
                {profile.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">
              {profile.username}
            </p>
            <p className="text-xs text-muted-foreground">
              Frame:{" "}
              <span className={activeFrame.color}>{activeFrame.label}</span>
            </p>
            {profile.bloxlinkVerified && (
              <div className="mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-[hsl(var(--success))]" />
                <span className="text-xs text-muted-foreground">
                  Bloxlink Verified
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nickname Editor */}
      <SectionCard
        icon={<Pencil className="h-4 w-4 text-primary" />}
        title="Display Name"
        description="Change your in-game display name"
      >
        <div className="flex items-center gap-3">
          {editingName ? (
            <>
              <Input
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                className="max-w-xs border-border bg-background text-foreground"
                placeholder="Enter display name"
                maxLength={20}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveName()
                  if (e.key === "Escape") {
                    setDraftName(profile.username)
                    setEditingName(false)
                  }
                }}
              />
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={saveName}
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:bg-secondary hover:text-foreground"
                onClick={() => {
                  setDraftName(profile.username)
                  setEditingName(false)
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-foreground">
                {profile.username}
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:bg-secondary hover:text-foreground"
                onClick={() => setEditingName(true)}
              >
                <Pencil className="mr-1 h-3 w-3" />
                Edit
              </Button>
            </>
          )}
        </div>
      </SectionCard>

      {/* Roblox Avatar (auto-synced) */}
      <SectionCard
        icon={<User className="h-4 w-4 text-primary" />}
        title="Roblox Avatar"
        description="Your avatar is automatically synced from your linked Roblox account"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4">
            <Avatar className="h-20 w-20 border-2 border-primary/30">
              <AvatarImage
                src={profile.avatar || "/placeholder.svg"}
                alt="Roblox avatar"
                className="object-cover"
              />
              <AvatarFallback className="bg-secondary text-xl text-muted-foreground">
                {profile.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {profile.robloxUsername || profile.username}
                </span>
                {profile.bloxlinkVerified && (
                  <Badge className="border-[hsl(var(--success))]/20 bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                Roblox ID: {profile.robloxId || "Not linked"}
              </span>
              {profile.robloxId && (
                <a
                  href={`https://www.roblox.com/users/${profile.robloxId}/profile`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-1 text-xs text-primary hover:text-primary/80"
                >
                  View Roblox Profile
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          <Button
            variant="outline"
            className="w-fit gap-2 border-border text-foreground hover:bg-secondary bg-transparent"
            onClick={syncAvatar}
            disabled={syncing}
          >
            {syncing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {syncing ? "Syncing..." : "Re-sync Avatar"}
          </Button>
        </div>
      </SectionCard>

      {/* Frame Selector */}
      <SectionCard
        icon={<Palette className="h-4 w-4 text-primary" />}
        title="Avatar Frame"
        description="Select a visual border for your avatar"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {FRAME_OPTIONS.map((frame) => (
            <button
              key={frame.id}
              type="button"
              onClick={() => {
                setProfile({ ...profile, frame: frame.id })
                flashSaved()
              }}
              className={cn(
                "flex flex-col items-center gap-3 rounded-xl border p-4 transition-all",
                profile.frame === frame.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30 hover:bg-secondary/30",
              )}
            >
              <div className="relative">
                {frame.glowClass && (
                  <div
                    className={cn(
                      "absolute -inset-1 rounded-full opacity-60 blur-md",
                      frame.glowClass,
                    )}
                  />
                )}
                <Avatar
                  className={cn(
                    "relative h-12 w-12 border-2",
                    frame.borderClass,
                  )}
                >
                  <AvatarImage
                    src={profile.avatar || "/placeholder.svg"}
                    alt="Frame preview"
                  />
                  <AvatarFallback className="bg-secondary text-muted-foreground">
                    P
                  </AvatarFallback>
                </Avatar>
              </div>
              <span className={cn("text-xs font-semibold", frame.color)}>
                {frame.label}
              </span>
              {profile.frame === frame.id && (
                <Check className="h-3.5 w-3.5 text-primary" />
              )}
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Re-link Roblox Account */}
      <SectionCard
        icon={<Link2 className="h-4 w-4 text-primary" />}
        title="Re-link Roblox Account"
        description="Connect a different Roblox account via Bloxlink"
      >
        <div className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Enter a new Roblox User ID to re-verify and link a different account.
            Your avatar will update automatically.
          </p>
          <div className="flex items-center gap-3">
            <Input
              value={relinkId}
              onChange={(e) => setRelinkId(e.target.value)}
              className="max-w-xs border-border bg-background font-mono text-foreground"
              placeholder="e.g. 123456789"
            />
            <Button
              size="sm"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleRelink}
              disabled={relinking || !relinkId.trim()}
            >
              {relinking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
              {relinking ? "Verifying..." : "Re-link"}
            </Button>
          </div>
        </div>
      </SectionCard>
    </div>
  )
}

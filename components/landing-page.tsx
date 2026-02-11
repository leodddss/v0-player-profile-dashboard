"use client"

import React, { useState, useEffect, useCallback } from "react"
import {
  Gamepad2,
  ArrowRight,
  Eye,
  EyeOff,
  Shield,
  Crosshair,
  CheckCircle2,
  Loader2,
  Link2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/app-context"
import { cn } from "@/lib/utils"
import Image from "next/image"

type AuthMode = "login" | "register"
type VerifyState = "idle" | "verifying" | "verified"

/** Small inline Bloxlink-style logo */
function BloxlinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-4 w-4", className)}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function LandingPage() {
  const { login } = useApp()
  const [mode, setMode] = useState<AuthMode>("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  // Bloxlink verification state (register only)
  const [verifyState, setVerifyState] = useState<VerifyState>("idle")
  const [robloxUsername, setRobloxUsername] = useState("")
  const [robloxId, setRobloxId] = useState("")

  // Reset Bloxlink state when switching modes
  useEffect(() => {
    setVerifyState("idle")
    setRobloxUsername("")
    setRobloxId("")
    setError("")
  }, [mode])

  const simulateBloxlinkVerify = useCallback(() => {
    setVerifyState("verifying")
    setError("")
    // Simulate an async Bloxlink verification (2.5 seconds)
    setTimeout(() => {
      const simulatedRobloxUser = username.trim() || "Player_1"
      const simulatedRobloxId = String(Math.floor(100000000 + Math.random() * 900000000))
      setRobloxUsername(simulatedRobloxUser)
      setRobloxId(simulatedRobloxId)
      setVerifyState("verified")
    }, 2500)
  }, [username])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!username.trim()) {
      setError("Username is required")
      return
    }
    if (!password.trim() || password.length < 4) {
      setError("Password must be at least 4 characters")
      return
    }

    if (mode === "register") {
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
      }
      if (verifyState !== "verified") {
        setError("You must verify your Roblox account with Bloxlink before registering")
        return
      }
      login(username.trim(), robloxUsername, robloxId)
    } else {
      // Login mode -- simulate verified user
      const simId = String(Math.floor(100000000 + Math.random() * 900000000))
      login(username.trim(), username.trim(), simId)
    }
  }

  const isRegisterReady = mode === "register" && verifyState === "verified"

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background images -- CT and T side by side */}
      <div className="absolute inset-0 flex">
        <div className="relative w-1/2 overflow-hidden">
          <Image
            src="/landing/ct-hero.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-[hsl(199,89%,48%,0.06)]" />
        </div>
        <div className="relative w-1/2 overflow-hidden">
          <Image
            src="/landing/t-hero.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-[hsl(30,80%,50%,0.04)]" />
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_hsl(222_47%_6%)_80%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-4 animate-page-in">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 glow-primary">
            <Gamepad2 className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Peek<span className="text-primary">it</span>
          </h1>
        </div>

        {/* Hero text */}
        <p className="mb-10 max-w-sm text-center text-base leading-relaxed text-muted-foreground text-balance">
          {
            "Peekit \u2014 \u041F\u0435\u0440\u0432\u0430\u044F \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u0434\u043B\u044F BloxStrike, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0438\u0433\u0440\u043E\u043A\u0430\u043C \u0440\u0430\u0437\u043D\u044B\u0445 \u0443\u0440\u043E\u0432\u043D\u0435\u0439 \u0438\u0433\u0440\u044B \u0438 \u0441\u0442\u0440\u0435\u043B\u044C\u0431\u044B \u0441\u0440\u0430\u0436\u0430\u0442\u044C\u0441\u044F \u0432\u043C\u0435\u0441\u0442\u0435."
          }
        </p>

        {/* CT vs T badges */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex items-center gap-1.5 rounded-full border border-[hsl(199,89%,48%)]/20 bg-[hsl(199,89%,48%)]/5 px-3 py-1">
            <Shield className="h-3.5 w-3.5 text-[hsl(199,89%,48%)]" />
            <span className="text-xs font-semibold text-[hsl(199,89%,48%)]">CT</span>
          </div>
          <span className="text-xs font-bold tracking-widest text-muted-foreground">VS</span>
          <div className="flex items-center gap-1.5 rounded-full border border-[hsl(45,93%,58%)]/20 bg-[hsl(45,93%,58%)]/5 px-3 py-1">
            <Crosshair className="h-3.5 w-3.5 text-[hsl(45,93%,58%)]" />
            <span className="text-xs font-semibold text-[hsl(45,93%,58%)]">T</span>
          </div>
        </div>

        {/* Auth form card */}
        <div className="w-full rounded-2xl border border-border/60 bg-card/80 p-6 backdrop-blur-xl">
          {/* Mode tabs */}
          <div className="mb-6 flex rounded-lg bg-secondary/60 p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-semibold transition-all",
                mode === "login"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-semibold transition-all",
                mode === "register"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-xs font-medium text-muted-foreground">
                Username
              </label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50"
                placeholder="Enter your username"
                autoComplete="username"
                maxLength={20}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-medium text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-border bg-background/50 pr-10 text-foreground placeholder:text-muted-foreground/50"
                  placeholder="Enter your password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm password (register only) */}
            {mode === "register" && (
              <div className="flex flex-col gap-1.5 animate-fade-in">
                <label htmlFor="confirm-password" className="text-xs font-medium text-muted-foreground">
                  Confirm Password
                </label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
              </div>
            )}

            {/* ---- Bloxlink verification section (register only) ---- */}
            {mode === "register" && (
              <div className="flex flex-col gap-3 rounded-lg border border-border bg-secondary/30 p-4 animate-fade-in">
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-foreground">
                    Roblox Account Verification
                  </span>
                </div>

                {verifyState === "idle" && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Link your Roblox account using Bloxlink to verify ownership and sync your avatar.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary bg-transparent"
                      onClick={simulateBloxlinkVerify}
                    >
                      <BloxlinkIcon className="h-4 w-4" />
                      Verify with Bloxlink
                    </Button>
                  </div>
                )}

                {verifyState === "verifying" && (
                  <div className="flex items-center gap-3 py-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        Waiting for Bloxlink verification...
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Connecting to your Roblox account
                      </span>
                    </div>
                  </div>
                )}

                {verifyState === "verified" && (
                  <div className="flex items-center gap-3 py-1 animate-fade-in">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {robloxUsername}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        ID: {robloxId}
                      </span>
                    </div>
                    <Badge className="border-[hsl(var(--success))]/20 bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                )}
              </div>
            )}

            {/* Error */}
            {error && <p className="text-sm text-destructive animate-fade-in">{error}</p>}

            {/* Submit */}
            <Button
              type="submit"
              disabled={mode === "register" && verifyState !== "verified"}
              className={cn(
                "mt-1 w-full font-semibold",
                mode === "register" && verifyState !== "verified"
                  ? "cursor-not-allowed bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 glow-primary-sm",
              )}
            >
              {mode === "login" ? "Login" : isRegisterReady ? "Create Account" : "Complete Verification First"}
              {(mode === "login" || isRegisterReady) && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
              {mode === "login" ? "New to Peekit?" : "Already have an account?"}
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="mt-3 w-full py-2 text-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            {mode === "login" ? "Create an account" : "Login instead"}
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          {"By continuing, you agree to Peekit\u2019s Terms of Service"}
        </p>
      </div>
    </div>
  )
}

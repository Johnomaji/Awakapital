"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""

  const [password, setPassword] = React.useState("")
  const [confirm, setConfirm] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirm) {
      setError("Passwords do not match")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setStatus("loading")
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus("success")
      } else {
        setError(data.error || "Something went wrong")
        setStatus("error")
      }
    } catch {
      setError("Network error. Please try again.")
      setStatus("error")
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-background">
        <div className="text-center space-y-4">
          <AlertCircle className="text-destructive mx-auto" size={48} />
          <h2 className="text-2xl font-display font-bold text-foreground">Invalid Link</h2>
          <p className="text-muted-foreground">This reset link is missing or invalid.</p>
          <Link href="/forgot-password">
            <Button variant="outline">Request a new link</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <img src="/logo.png" alt="Awakapital Logo" />
            </div>
            <span className="text-2xl font-display font-bold text-foreground">Awakapital</span>
          </Link>
        </div>

        {status === "success" ? (
          <div className="bg-card border border-green-500/20 rounded-2xl p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="text-green-500" size={32} />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground">Password Reset!</h2>
            <p className="text-muted-foreground">Your password has been updated. You can now sign in.</p>
            <Link href="/login">
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4">Sign In</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-display font-bold text-foreground">Set New Password</h1>
              <p className="text-muted-foreground">Choose a strong password for your account.</p>
            </div>

            {(status === "error" || error) && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="text-destructive" size={20} />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" disabled={status === "loading"} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                {status === "loading" ? "Saving..." : "Reset Password"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    }>
      <ResetPasswordForm />
    </React.Suspense>
  )
}

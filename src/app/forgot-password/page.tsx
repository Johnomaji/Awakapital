"use client"

import * as React from "react"
import Link from "next/link"
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setError("")

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
            <h2 className="text-2xl font-display font-bold text-foreground">Check your email</h2>
            <p className="text-muted-foreground">
              If an account exists for <strong>{email}</strong>, we've sent a password reset link. It expires in 1 hour.
            </p>
            <Link href="/login">
              <Button variant="outline" className="w-full mt-4">Back to Sign In</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-display font-bold text-foreground">Forgot Password</h1>
              <p className="text-muted-foreground">Enter your email and we'll send you a reset link.</p>
            </div>

            {status === "error" && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="text-destructive" size={20} />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" disabled={status === "loading"} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                {status === "loading" ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
              <ArrowLeft size={16} />
              Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

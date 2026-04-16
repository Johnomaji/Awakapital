"use client"

import * as React from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, Rocket, BarChart2, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { score, label: "Weak", color: "bg-red-500" }
  if (score <= 3) return { score, label: "Fair", color: "bg-yellow-500" }
  if (score === 4) return { score, label: "Good", color: "bg-blue-500" }
  return { score, label: "Strong", color: "bg-green-500" }
}

const benefits = [
  { icon: <Rocket size={18} />, title: "Apply for Funding", description: "Submit your pitch and get reviewed within 48 hours" },
  { icon: <BarChart2 size={18} />, title: "Track Progress", description: "Monitor your application status in real-time" },
  { icon: <Users size={18} />, title: "Connect with Investors", description: "Get feedback and guidance from our investment team" },
  { icon: <Globe size={18} />, title: "Join the Network", description: "Access our community of 140+ founders across Africa" },
]

export default function SignupPage() {
  const { signup, isLoading } = useAuth()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [error, setError] = React.useState("")
  const [agreedToTerms, setAgreedToTerms] = React.useState(false)

  // Real-time validation state
  const [emailTouched, setEmailTouched] = React.useState(false)
  const [confirmTouched, setConfirmTouched] = React.useState(false)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const emailError = emailTouched && email && !emailValid
  const confirmMismatch = confirmTouched && confirmPassword && confirmPassword !== password
  const confirmMatch = confirmTouched && confirmPassword && confirmPassword === password
  const strength = getPasswordStrength(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }
    if (!emailValid) {
      setError("Please enter a valid email address")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions")
      return
    }

    const success = await signup(name, email, password)
    if (!success) {
      setError("Email already registered. Please use a different email.")
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <img src="/logo.png" alt="Awakapital Logo" />
              </div>
              <span className="text-2xl font-display font-bold text-foreground">Awakapital</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-display font-bold text-foreground">Create Your Account</h1>
            <p className="text-muted-foreground">Join Awakapital and start building the future</p>
          </div>

          {/* Mobile Benefits (only on small screens) */}
          <div className="lg:hidden grid grid-cols-2 gap-3">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-2 bg-accent/5 border border-accent/10 rounded-lg p-3">
                <span className="text-accent mt-0.5 shrink-0">{b.icon}</span>
                <p className="text-xs font-medium text-foreground">{b.title}</p>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-3 animate-slide-down">
              <AlertCircle className="text-destructive shrink-0" size={20} />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  id="name" type="text" value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  id="email" type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    emailError ? "border-red-500 focus:ring-red-500" : "border-border"
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {emailError && <p className="text-xs text-red-500">Please enter a valid email address</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  id="password" type={showPassword ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {/* Password strength bar */}
              {password && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : "bg-muted"}`} />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${
                    strength.score <= 1 ? "text-red-500" : strength.score <= 3 ? "text-yellow-500" : strength.score === 4 ? "text-blue-500" : "text-green-500"
                  }`}>{strength.label} password</p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setConfirmTouched(true)}
                  className={`w-full pl-10 pr-12 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    confirmMismatch ? "border-red-500 focus:ring-red-500" : "border-border"
                  }`}
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {confirmMatch && (
                  <CheckCircle className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500" size={18} />
                )}
              </div>
              {confirmMismatch && <p className="text-xs text-red-500">Passwords do not match</p>}
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 mt-1 rounded border-border" />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link href="/terms" className="text-accent hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
              </span>
            </label>

            {/* Submit */}
            <Button type="submit" size="lg" disabled={isLoading}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:underline font-semibold">Sign in</Link>
          </p>
          <p className="text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">← Back to home</Link>
          </p>
        </div>
      </div>

      {/* Right Side - Benefits (desktop only) */}
      <div className="hidden lg:flex flex-1 bg-linear-to-br from-primary via-secondary to-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>
        <div className="relative z-10 space-y-8 text-primary-foreground max-w-lg">
          <h2 className="text-4xl font-display font-bold">Start Your Funding Journey Today</h2>
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className="flex items-start gap-4 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-accent">{benefit.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                  <p className="text-primary-foreground/70 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

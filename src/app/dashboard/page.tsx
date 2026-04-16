"use client"

import * as React from "react"
import { useAuth, type Application } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard, FileText, Clock, CheckCircle, XCircle,
  TrendingUp, Plus, LogOut, User, Bell, Search, Filter,
  Calendar, DollarSign, Briefcase, ArrowUp, ArrowDown,
  X, ExternalLink, Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [applications, setApplications] = React.useState<Application[]>([])
  const [loadingApps, setLoadingApps] = React.useState(true)
  const [loadError, setLoadError] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<"overview" | "applications" | "profile">("overview")
  const [selectedApp, setSelectedApp] = React.useState<Application | null>(null)
  const [profileForm, setProfileForm] = React.useState({ name: "", company: "", phone: "" })
  const [passwordForm, setPasswordForm] = React.useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
  const [profileStatus, setProfileStatus] = React.useState<"idle" | "saving" | "success" | "error">("idle")
  const [passwordStatus, setPasswordStatus] = React.useState<"idle" | "saving" | "success" | "error">("idle")
  const [profileError, setProfileError] = React.useState("")
  const [passwordError, setPasswordError] = React.useState("")

// Load applications from API
React.useEffect(() => {
  if (!user) {
    router.push("/login")
    return
  }

  const fetchApplications = async () => {
    setLoadingApps(true)
    setLoadError(false)
    try {
      const token = localStorage.getItem('vp_token')
      if (!token) { setLoadError(true); setLoadingApps(false); return }

      const response = await fetch('/api/applications', {
        headers: { 'Authorization': `Bearer ${token}` },
      })

      if (!response.ok) throw new Error('Failed')
      const data = await response.json()

      if (data.success && data.applications) {
        setApplications(data.applications)
      } else {
        setLoadError(true)
      }
    } catch {
      setLoadError(true)
    } finally {
      setLoadingApps(false)
    }
  }

  fetchApplications()
}, [user, router])

React.useEffect(() => {
  if (user) {
    setProfileForm({
      name: user.name || "",
      company: user.company || "",
      phone: user.phone || "",
    })
  }
}, [user])

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
    </div>
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    inReview: applications.filter(a => a.status === "in-review").length,
    approved: applications.filter(a => a.status === "approved").length,
    rejected: applications.filter(a => a.status === "rejected").length,
  }

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "pending": return "text-yellow-500 bg-yellow-500/10"
      case "in-review": return "text-blue-500 bg-blue-500/10"
      case "approved": return "text-green-500 bg-green-500/10"
      case "rejected": return "text-red-500 bg-red-500/10"
      default: return "text-gray-500 bg-gray-500/10"
    }
  }

  const getStatusIcon = (status: Application["status"]) => {
    switch (status) {
      case "pending": return <Clock size={16} />
      case "in-review": return <FileText size={16} />
      case "approved": return <CheckCircle size={16} />
      case "rejected": return <XCircle size={16} />
      default: return <Clock size={16} />
    }
  }

  return (
    <>
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                {/* <span className="text-primary-foreground font-bold text-lg">VP</span> */}
                <img src="/logo.png" alt="Awakapital Logo" className="w-6 h-6" />
              </div>
              <span className="text-xl font-display font-bold text-foreground hidden sm:block">
                Awakapital
              </span>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-accent/10 rounded-lg transition-colors">
                <Bell size={20} className="text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-2"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-custom py-8 pb-24 lg:pb-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 space-y-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "overview" ? "bg-accent text-accent-foreground" : "hover:bg-accent/10 text-muted-foreground"
              }`}
            >
              <LayoutDashboard size={20} />
              <span className="font-medium">Overview</span>
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "applications" ? "bg-accent text-accent-foreground" : "hover:bg-accent/10 text-muted-foreground"
              }`}
            >
              <FileText size={20} />
              <span className="font-medium">Applications</span>
              {stats.total > 0 && (
                <span className="ml-auto bg-accent/20 text-accent text-xs font-bold px-2 py-0.5 rounded-full">
                  {stats.total}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "profile" ? "bg-accent text-accent-foreground" : "hover:bg-accent/10 text-muted-foreground"
              }`}
            >
              <User size={20} />
              <span className="font-medium">Profile</span>
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-primary-foreground relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
                  </div>
                  <div className="relative z-10">
                    <h1 className="text-3xl font-display font-bold mb-2">
                      Welcome back, {user.name}! 👋
                    </h1>
                    <p className="text-primary-foreground/80">
                      Here's an overview of your funding applications
                    </p>
                  </div>
                </div>

                {/* Error / Loading state */}
                {loadError && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
                    <p className="text-sm text-destructive flex-1">Failed to load your applications. Please check your connection and try again.</p>
                    <button onClick={() => { setLoadingApps(true); setLoadError(false); const token = localStorage.getItem('vp_token'); if (!token) return; fetch('/api/applications', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).then(d => { if (d.success) setApplications(d.applications); else setLoadError(true); }).catch(() => setLoadError(true)).finally(() => setLoadingApps(false)) }}
                      className="shrink-0 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium hover:bg-destructive/90 transition-colors">
                      Retry
                    </button>
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="text-primary" size={24} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Total Applications</p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6 hover:border-yellow-500/50 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                        <Clock className="text-yellow-500" size={24} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stats.pending}</p>
                    <p className="text-sm text-muted-foreground">Pending Review</p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6 hover:border-blue-500/50 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-blue-500" size={24} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stats.inReview}</p>
                    <p className="text-sm text-muted-foreground">In Review</p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6 hover:border-green-500/50 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                        <CheckCircle className="text-green-500" size={24} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stats.approved}</p>
                    <p className="text-sm text-muted-foreground">Approved</p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6 hover:border-red-500/50 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                        <XCircle className="text-red-500" size={24} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stats.rejected}</p>
                    <p className="text-sm text-muted-foreground">Not Approved</p>
                  </div>
                </div>

                {/* Quick Action */}
                <div className="bg-card border border-border rounded-xl p-8 text-center">
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                      <Plus className="text-accent" size={32} />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground">
                      Ready to Apply for Funding?
                    </h3>
                    <p className="text-muted-foreground">
                      Submit your pitch deck and business plan to get started
                    </p>
                    <Link href="/apply">
                      <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        Submit New Application
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Recent Applications */}
                {applications.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                      Recent Applications
                    </h2>
                    <div className="space-y-4">
                      {applications.slice(0, 3).map((app) => (
                        <div key={app.id} className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-2">{app.companyName}</h3>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{app.description}</p>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  {new Date(app.submittedAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Briefcase size={14} />
                                  {app.industry}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign size={14} />
                                  {app.fundingAmount}
                                </span>
                              </div>
                            </div>
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                              {getStatusIcon(app.status)}
                              {app.status.replace('-', ' ')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "applications" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-display font-bold text-foreground">
                    My Applications
                  </h1>
                  <Button onClick={() => router.push("/apply")} className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                    <Plus size={20} />
                    New Application
                  </Button>
                </div>

                {loadingApps ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-card border border-border rounded-xl p-6 animate-pulse">
                        <div className="h-5 bg-muted rounded w-1/3 mb-3" />
                        <div className="h-4 bg-muted rounded w-2/3 mb-2" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : loadError ? (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-8 text-center space-y-4">
                    <p className="text-sm text-destructive">Failed to load applications.</p>
                    <button onClick={() => { setLoadingApps(true); setLoadError(false); const token = localStorage.getItem('vp_token'); if (!token) return; fetch('/api/applications', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).then(d => { if (d.success) setApplications(d.applications); else setLoadError(true); }).catch(() => setLoadError(true)).finally(() => setLoadingApps(false)) }}
                      className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium hover:bg-destructive/90 transition-colors">
                      Retry
                    </button>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="bg-card border border-border rounded-xl p-12 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="text-muted-foreground" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No applications yet</h3>
                    <p className="text-muted-foreground mb-6">Start your funding journey by submitting your first application</p>
                    <Button onClick={() => router.push("/apply")} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      Submit Application
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div key={app.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl font-display font-bold text-foreground mb-1">
                              {app.companyName}
                            </h3>
                            <p className="text-sm text-muted-foreground">{app.founderName} · {app.industry}</p>
                          </div>
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                            {getStatusIcon(app.status)}
                            {app.status.replace('-', ' ').toUpperCase()}
                          </div>
                        </div>

                        <p className="text-foreground mb-4 line-clamp-3">{app.description}</p>

                        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                              <Calendar size={16} />
                              Submitted: {new Date((app as any).submittedAt || (app as any).createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-2">
                              <DollarSign size={16} />
                              {app.fundingAmount}
                            </span>
                            <span className="flex items-center gap-2">
                              <TrendingUp size={16} />
                              {app.stage}
                            </span>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => setSelectedApp(app)} className="gap-2">
                            <Eye size={16} />
                            View Details
                          </Button>
                        </div>

                        {app.status === "pending" && (
                          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-sm text-yellow-600">
                            Your application is in the queue. Our team will begin reviewing it within 48 hours.
                          </div>
                        )}
                        {app.status === "in-review" && (
                          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-500">
                            Great news — your application is actively being reviewed by our investment team. We'll be in touch soon.
                          </div>
                        )}
                        {app.status === "approved" && (
                          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-600">
                            Congratulations! Your application has been approved. Check your email for next steps.
                          </div>
                        )}
                        {app.status === "rejected" && (
                          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500">
                            After careful review, we're unable to move forward at this time. You're welcome to reapply in the future.
                          </div>
                        )}
                        {app.notes && (
                          <div className="mt-3 p-4 bg-muted/50 border border-border rounded-lg">
                            <p className="text-sm font-semibold text-foreground mb-1">Reviewer Notes:</p>
                            <p className="text-sm text-muted-foreground">{app.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-display font-bold text-foreground">Profile Settings</h1>

                {/* Profile Info */}
                <div className="bg-card border border-border rounded-xl p-8">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-accent font-bold text-3xl">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-1">{user.name}</h2>
                      <p className="text-muted-foreground">{user.email}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Member since {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {profileError && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">{profileError}</div>
                  )}
                  {profileStatus === "success" && (
                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-sm">Profile updated successfully.</div>
                  )}

                  <form onSubmit={async (e) => {
                    e.preventDefault()
                    setProfileStatus("saving")
                    setProfileError("")
                    try {
                      const res = await fetch("/api/user/profile", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("vp_token")}` },
                        body: JSON.stringify(profileForm),
                      })
                      const data = await res.json()
                      if (data.success) setProfileStatus("success")
                      else { setProfileError(data.error || "Failed to save"); setProfileStatus("error") }
                    } catch { setProfileError("Network error"); setProfileStatus("error") }
                  }} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                        <input type="text" required value={profileForm.name} onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
                        <input type="email" value={user.email} disabled
                          className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-muted-foreground cursor-not-allowed" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Company</label>
                        <input type="text" placeholder="Your company name" value={profileForm.company} onChange={e => setProfileForm(p => ({ ...p, company: e.target.value }))}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Phone Number</label>
                        <input type="tel" placeholder="+234 XXX XXX XXXX" value={profileForm.phone} onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" />
                      </div>
                    </div>
                    <Button type="submit" disabled={profileStatus === "saving"} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      {profileStatus === "saving" ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </div>

                {/* Change Password */}
                <div className="bg-card border border-border rounded-xl p-8">
                  <h2 className="text-xl font-display font-bold text-foreground mb-6">Change Password</h2>

                  {passwordError && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">{passwordError}</div>
                  )}
                  {passwordStatus === "success" && (
                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-sm">Password changed successfully.</div>
                  )}

                  <form onSubmit={async (e) => {
                    e.preventDefault()
                    setPasswordError("")
                    if (passwordForm.newPassword !== passwordForm.confirmPassword) { setPasswordError("Passwords do not match"); return }
                    if (passwordForm.newPassword.length < 6) { setPasswordError("Password must be at least 6 characters"); return }
                    setPasswordStatus("saving")
                    try {
                      const res = await fetch("/api/user/profile", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("vp_token")}` },
                        body: JSON.stringify({ currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword }),
                      })
                      const data = await res.json()
                      if (data.success) { setPasswordStatus("success"); setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" }) }
                      else { setPasswordError(data.error || "Failed to change password"); setPasswordStatus("error") }
                    } catch { setPasswordError("Network error"); setPasswordStatus("error") }
                  }} className="space-y-5">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Current Password</label>
                      <input type="password" required value={passwordForm.currentPassword} onChange={e => setPasswordForm(p => ({ ...p, currentPassword: e.target.value }))}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" placeholder="••••••••" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">New Password</label>
                        <input type="password" required value={passwordForm.newPassword} onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" placeholder="••••••••" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Confirm New Password</label>
                        <input type="password" required value={passwordForm.confirmPassword} onChange={e => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" placeholder="••••••••" />
                      </div>
                    </div>
                    <Button type="submit" disabled={passwordStatus === "saving"} variant="outline">
                      {passwordStatus === "saving" ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    {/* Mobile Bottom Nav */}
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border flex">
      {[
        { tab: "overview", icon: <LayoutDashboard size={20} />, label: "Overview" },
        { tab: "applications", icon: <FileText size={20} />, label: "Applications" },
        { tab: "profile", icon: <User size={20} />, label: "Profile" },
      ].map(({ tab, icon, label }) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab as any)}
          className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 text-xs font-medium transition-colors ${
            activeTab === tab ? "text-accent" : "text-muted-foreground"
          }`}
        >
          {icon}
          {label}
        </button>
      ))}
    </nav>
    </div>

    {/* Application Detail Modal */}
    {selectedApp && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={() => setSelectedApp(null)}
      >
        <div
          className="bg-background border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 py-5 bg-card rounded-t-2xl border-b border-border flex-shrink-0">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">{selectedApp.companyName}</h2>
              <div className="flex items-center gap-3 mt-2">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedApp.status)}`}>
                  {getStatusIcon(selectedApp.status)}
                  {selectedApp.status.replace('-', ' ').toUpperCase()}
                </div>
                {selectedApp.industry && (
                  <span className="text-xs text-muted-foreground">{selectedApp.industry}</span>
                )}
              </div>
            </div>
            <button
              onClick={() => setSelectedApp(null)}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto flex-1 p-6 space-y-5">

            {/* Founder Information */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-muted/50 border-b border-border">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Founder Information</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-px bg-border">
                <div className="bg-card px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">Full Name</p>
                  <p className="text-sm font-medium text-foreground">{selectedApp.founderName || "—"}</p>
                </div>
                <div className="bg-card px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="text-sm font-medium text-foreground break-all">{selectedApp.email || "—"}</p>
                </div>
                <div className="bg-card px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">Phone</p>
                  <p className="text-sm font-medium text-foreground">{selectedApp.phone || "—"}</p>
                </div>
                <div className="bg-card px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">Country</p>
                  <p className="text-sm font-medium text-foreground">{(selectedApp as any).country || "—"}</p>
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-muted/50 border-b border-border">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Company Details</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-px bg-border">
                <div className="bg-card px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">Industry</p>
                  <p className="text-sm font-medium text-foreground">{selectedApp.industry || "—"}</p>
                </div>
                <div className="bg-card px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">Stage</p>
                  <p className="text-sm font-medium text-foreground">{selectedApp.stage || "—"}</p>
                </div>
                <div className="bg-card px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">Funding Amount</p>
                  <p className="text-sm font-medium text-foreground">{selectedApp.fundingAmount || "—"}</p>
                </div>
                <div className="bg-card px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">Website / LinkedIn</p>
                  {(selectedApp as any).website ? (
                    <a
                      href={(selectedApp as any).website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-accent flex items-center gap-1 hover:underline truncate"
                    >
                      {(selectedApp as any).website} <ExternalLink size={11} className="flex-shrink-0" />
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground">—</p>
                  )}
                </div>
              </div>
            </div>

            {/* Application Details */}
            {(() => {
              const raw = selectedApp.description || ""
              const labels = ["Why Now", "Traction", "Why You", "Additional Info"]
              const regex = new RegExp(`(${labels.map(l => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')}): ?`, 'g')
              const parts: { label: string; text: string }[] = []
              let oneLiner = raw
              let match: RegExpExecArray | null

              regex.lastIndex = 0
              match = regex.exec(raw)
              if (match) oneLiner = raw.slice(0, match.index).trim()

              regex.lastIndex = 0
              const allMatches: { label: string; index: number; end: number }[] = []
              while ((match = regex.exec(raw)) !== null) {
                allMatches.push({ label: match[1], index: match.index, end: match.index + match[0].length })
              }
              allMatches.forEach((m, i) => {
                const textEnd = i + 1 < allMatches.length ? allMatches[i + 1].index : raw.length
                parts.push({ label: m.label, text: raw.slice(m.end, textEnd).trim() })
              })

              const hasParsed = parts.length > 0

              return (
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="px-4 py-3 bg-muted/50 border-b border-border">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Application Details</h3>
                  </div>
                  {hasParsed ? (
                    <div className="divide-y divide-border">
                      {oneLiner && (
                        <div className="px-4 py-4">
                          <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider">One-Liner</p>
                          <p className="text-sm text-foreground leading-relaxed">{oneLiner}</p>
                        </div>
                      )}
                      {parts.map(({ label, text }) => text && (
                        <div key={label} className="px-4 py-4">
                          <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider">{label}</p>
                          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-4">
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{raw || "—"}</p>
                    </div>
                  )}
                </div>
              )
            })()}

            {/* Reviewer Notes (only if present) */}
            {selectedApp.notes && (
              <div className="bg-card border border-blue-500/30 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-blue-500/10 border-b border-blue-500/20">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-blue-500">Reviewer Notes</h3>
                </div>
                <div className="px-4 py-4">
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selectedApp.notes}</p>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-muted/50 border-b border-border">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Timeline</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-px bg-border">
                <div className="bg-card px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">Submitted</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date((selectedApp as any).submittedAt || (selectedApp as any).createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="bg-card px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
                  <p className="text-sm font-medium text-foreground">
                    {selectedApp.reviewedAt ? new Date(selectedApp.reviewedAt).toLocaleString() : "—"}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end px-6 py-4 bg-card rounded-b-2xl border-t border-border flex-shrink-0">
            <Button variant="outline" onClick={() => setSelectedApp(null)}>Close</Button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
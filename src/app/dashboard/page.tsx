"use client"

import * as React from "react"
import { useAuth, type Application } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { 
  LayoutDashboard, FileText, Clock, CheckCircle, XCircle, 
  TrendingUp, Plus, LogOut, User, Bell, Search, Filter,
  Calendar, DollarSign, Briefcase, ArrowUp, ArrowDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [applications, setApplications] = React.useState<Application[]>([])
  const [activeTab, setActiveTab] = React.useState<"overview" | "applications" | "profile">("overview")

  // Load applications from localStorage
  React.useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const appsStr = localStorage.getItem("vp_applications")
    if (appsStr) {
      const allApps: Application[] = JSON.parse(appsStr)
      const userApps = allApps.filter(app => app.userId === user.id)
      setApplications(userApps)
    }
  }, [user, router])

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

      <div className="container-custom py-8">
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
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                    <Plus size={20} />
                    New Application
                  </Button>
                </div>

                {applications.length === 0 ? (
                  <div className="bg-card border border-border rounded-xl p-12 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="text-muted-foreground" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No applications yet
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Start your funding journey by submitting your first application
                    </p>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
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

                        <p className="text-foreground mb-4">{app.description}</p>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t border-border pt-4">
                          <span className="flex items-center gap-2">
                            <Calendar size={16} />
                            Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-2">
                            <DollarSign size={16} />
                            Funding: {app.fundingAmount}
                          </span>
                          <span className="flex items-center gap-2">
                            <TrendingUp size={16} />
                            Stage: {app.stage}
                          </span>
                        </div>

                        {app.notes && (
                          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-foreground mb-1">Reviewer Notes:</p>
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
                <h1 className="text-3xl font-display font-bold text-foreground">
                  Profile Settings
                </h1>

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

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        disabled
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Your company name"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+234 XXX XXX XXXX"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
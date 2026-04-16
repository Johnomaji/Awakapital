"use client"

import * as React from "react"
import { useAuth, type Application, type User as UserType } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard, Users, FileText, TrendingUp, LogOut,
  Search, Filter, MoreVertical, CheckCircle, XCircle, Eye,
  Clock, Mail, Phone, Briefcase, Calendar, DollarSign,
  Bell, Settings, Download, RefreshCw, X, ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [applications, setApplications] = React.useState<Application[]>([])
  const [users, setUsers] = React.useState<UserType[]>([])
  const [activeTab, setActiveTab] = React.useState<"overview" | "applications" | "users">("overview")
  const [filterStatus, setFilterStatus] = React.useState<string>("all")
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [loadError, setLoadError] = React.useState(false)
  const [selectedApp, setSelectedApp] = React.useState<Application | null>(null)
  const [notifOpen, setNotifOpen] = React.useState(false)
  const [adminNotes, setAdminNotes] = React.useState("")
  const [notesStatus, setNotesStatus] = React.useState<"idle" | "saving" | "saved">("idle")

  const openApp = (app: Application) => {
    setSelectedApp(app)
    setAdminNotes(app.notes || "")
    setNotesStatus("idle")
  }

  const saveNotes = async () => {
    if (!selectedApp) return
    const appId = (selectedApp as any)._id?.toString() || selectedApp.id
    setNotesStatus("saving")
    try {
      const token = localStorage.getItem("vp_token")
      await fetch(`/api/applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: selectedApp.status, notes: adminNotes }),
      })
      setSelectedApp({ ...selectedApp, notes: adminNotes })
      setNotesStatus("saved")
    } catch {
      setNotesStatus("idle")
    }
  }

  // Fetch data function
  const fetchData = React.useCallback(async () => {
    setLoadError(false)
    try {
      const token = localStorage.getItem('vp_token')
      if (!token) { setLoadError(true); setIsRefreshing(false); return }

      const appsResponse = await fetch('/api/applications', {
        headers: { 'Authorization': `Bearer ${token}` },
      })

      if (!appsResponse.ok) throw new Error('Failed')
      const appsData = await appsResponse.json()

      if (appsData.success && appsData.applications) {
        setApplications(appsData.applications)
      } else {
        setLoadError(true)
      }

      const usersStr = localStorage.getItem("vp_users")
      if (usersStr) setUsers(JSON.parse(usersStr))
    } catch {
      setLoadError(true)
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  // Load data from API
  React.useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login")
      return
    }

    fetchData()
  }, [user, router, fetchData])

  if (!user || user.role !== "admin") {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
    </div>
  }

  const stats = {
    totalApplications: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    inReview: applications.filter(a => a.status === "in-review").length,
    approved: applications.filter(a => a.status === "approved").length,
    rejected: applications.filter(a => a.status === "rejected").length,
    totalUsers: users.length,
    approvalRate: applications.length > 0 
      ? Math.round((applications.filter(a => a.status === "approved").length / applications.length) * 100) 
      : 0,
  }

  // Handle status change
  // const handleStatusChange = async (appId: string, newStatus: Application["status"]) => {
  //   try {
  //     const token = localStorage.getItem('vp_token')
      
  //     const response = await fetch(`/api/applications/${appId}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         status: newStatus,
  //         notes: '',
  //       }),
  //     })

  //     const data = await response.json()

  //     if (data.success) {
  //       // Update local state - handle both id and _id
  //       const updatedApps = applications.map(app => {
  //         const currentId = (app as any)._id?.toString() || app.id
  //         if (currentId === appId) {
  //           return {
  //             ...app,
  //             status: newStatus,
  //             reviewedAt: new Date().toISOString(),
  //             reviewedBy: user.name,
  //           }
  //         }
  //         return app
  //       })
  //       setApplications(updatedApps)
  //     } else {
  //       alert('Failed to update status: ' + (data.error || 'Unknown error'))
  //     }
  //   } catch (error) {
  //     console.error('Failed to update application:', error)
  //     alert('Error updating application. Please try again.')
  //   }
  // }

  const handleStatusChange = async (appId: string, newStatus: string) => {
  console.log('🔵 Attempting to update:', appId, 'to', newStatus)
  
  try {
    const token = localStorage.getItem('vp_token')
    console.log('🔵 Token exists:', !!token)
    
    const url = `/api/applications/${appId}`
    console.log('🔵 Calling URL:', url)
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus, notes: '' }),
    })
    
    console.log('🔵 Response status:', response.status)
    
    const data = await response.json()
    console.log('🔵 Response data:', data)
    
    if (data.success) {
      console.log('✅ Update successful!')
      // Update state...
    } else {
      console.error('❌ Update failed:', data.error)
      alert('Failed: ' + data.error)
    }
  } catch (error) {
    console.error('❌ Exception:', error)
    alert('Error: ' + error)
  }
}

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchData()
  }

  // Handle export to CSV
  const handleExport = () => {
    if (applications.length === 0) {
      alert('No applications to export')
      return
    }

    const csvContent = [
      ['Company', 'Founder', 'Email', 'Industry', 'Stage', 'Funding', 'Status', 'Submitted'].join(','),
      ...applications.map(app => [
        `"${app.companyName}"`,
        `"${app.founderName}"`,
        app.email,
        app.industry,
        app.stage,
        `"${app.fundingAmount}"`,
        app.status,
        new Date((app as any).submittedAt || (app as any).createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `applications-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const filteredApplications = filterStatus === "all" 
    ? applications 
    : applications.filter(a => a.status === filterStatus)

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "pending": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "in-review": return "text-blue-500 bg-blue-500/10 border-blue-500/20"
      case "approved": return "text-green-500 bg-green-500/10 border-green-500/20"
      case "rejected": return "text-red-500 bg-red-500/10 border-red-500/20"
    }
  }

  return (
    <>
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <img src="/logo.png" alt="Awakapital Logo" className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-display font-bold text-foreground block">
                  Admin Dashboard
                </span>
                <span className="text-xs text-muted-foreground">Awakapital</span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button onClick={() => setNotifOpen(o => !o)} className="relative p-2 hover:bg-accent/10 rounded-lg transition-colors">
                  <Bell size={20} className="text-muted-foreground" />
                  {stats.pending > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-accent rounded-full text-[10px] text-accent-foreground font-bold flex items-center justify-center">
                      {stats.pending}
                    </span>
                  )}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                      <h3 className="font-semibold text-foreground text-sm">Pending Applications</h3>
                      <button onClick={() => setNotifOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-border">
                      {applications.filter(a => a.status === "pending").length === 0 ? (
                        <p className="px-4 py-6 text-sm text-muted-foreground text-center">No pending applications</p>
                      ) : (
                        applications.filter(a => a.status === "pending").map(app => {
                          const appId = (app as any)._id?.toString() || app.id
                          return (
                            <button key={appId} onClick={() => { openApp(app); setNotifOpen(false); setActiveTab("applications") }}
                              className="w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors">
                              <p className="text-sm font-medium text-foreground">{app.companyName}</p>
                              <p className="text-xs text-muted-foreground">{app.founderName} · {app.industry}</p>
                            </button>
                          )
                        })
                      )}
                    </div>
                    {stats.pending > 0 && (
                      <div className="px-4 py-3 border-t border-border">
                        <button onClick={() => { setActiveTab("applications"); setFilterStatus("pending"); setNotifOpen(false) }}
                          className="text-xs text-accent hover:underline font-medium">
                          View all {stats.pending} pending →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <button className="p-2 hover:bg-accent/10 rounded-lg transition-colors">
                <Settings size={20} className="text-muted-foreground" />
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-accent">Administrator</p>
                </div>
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-accent-foreground font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={logout} className="gap-2">
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
              {stats.pending > 0 && (
                <span className="ml-auto bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {stats.pending}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "users" ? "bg-accent text-accent-foreground" : "hover:bg-accent/10 text-muted-foreground"
              }`}
            >
              <Users size={20} />
              <span className="font-medium">Users</span>
              <span className="ml-auto text-xs">{stats.totalUsers}</span>
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                    Dashboard Overview
                  </h1>
                  <p className="text-muted-foreground">
                    Monitor and manage all applications and users
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="text-primary" size={24} />
                      </div>
                      <TrendingUp className="text-green-500" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stats.totalApplications}</p>
                    <p className="text-sm text-muted-foreground">Total Applications</p>
                  </div>

                  <div className="bg-card border border-yellow-500/20 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                        <Clock className="text-yellow-500" size={24} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stats.pending}</p>
                    <p className="text-sm text-muted-foreground">Pending Review</p>
                  </div>

                  <div className="bg-card border border-green-500/20 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                        <CheckCircle className="text-green-500" size={24} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stats.approved}</p>
                    <p className="text-sm text-muted-foreground">Approved</p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Users className="text-accent" size={24} />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stats.totalUsers}</p>
                    <p className="text-sm text-muted-foreground">Registered Users</p>
                  </div>
                </div>

                {/* Charts/Additional Stats */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-6">Application Status</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Pending</span>
                          <span className="font-medium">{stats.pending}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-500 rounded-full transition-all"
                            style={{ width: stats.totalApplications > 0 ? `${(stats.pending / stats.totalApplications) * 100}%` : '0%' }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">In Review</span>
                          <span className="font-medium">{stats.inReview}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: stats.totalApplications > 0 ? `${(stats.inReview / stats.totalApplications) * 100}%` : '0%' }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Approved</span>
                          <span className="font-medium">{stats.approved}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full transition-all"
                            style={{ width: stats.totalApplications > 0 ? `${(stats.approved / stats.totalApplications) * 100}%` : '0%' }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Rejected</span>
                          <span className="font-medium">{stats.rejected}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-red-500 rounded-full transition-all"
                            style={{ width: stats.totalApplications > 0 ? `${(stats.rejected / stats.totalApplications) * 100}%` : '0%' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-primary-foreground">
                    <h3 className="text-lg font-semibold mb-6">Performance Metrics</h3>
                    <div className="space-y-6">
                      <div>
                        <p className="text-primary-foreground/70 text-sm mb-2">Approval Rate</p>
                        <p className="text-5xl font-bold">{stats.approvalRate}%</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-foreground/20">
                        <div>
                          <p className="text-primary-foreground/70 text-sm mb-1">This Month</p>
                          <p className="text-2xl font-bold">{stats.totalApplications}</p>
                        </div>
                        <div>
                          <p className="text-primary-foreground/70 text-sm mb-1">Avg. Review Time</p>
                          <p className="text-2xl font-bold">2d</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Applications */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold text-foreground">
                      Recent Applications
                    </h2>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("applications")}>
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {applications.slice(0, 5).map((app) => {
                      const appId = (app as any)._id?.toString() || app.id
                      return (
                        <div key={appId} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-foreground">{app.companyName}</h3>
                                  <p className="text-sm text-muted-foreground">{app.founderName} · {app.industry}</p>
                                </div>
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}>
                                  {app.status.toUpperCase()}
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                                <span className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  {new Date((app as any).submittedAt || (app as any).createdAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign size={14} />
                                  {app.fundingAmount}
                                </span>
                              </div>
                            </div>
                            {app.status === "pending" && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusChange(appId, "approved")}
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                >
                                  <CheckCircle size={16} className="mr-1" />
                                  Approve
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "applications" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                      All Applications
                    </h1>
                    <p className="text-muted-foreground">
                      Review and manage funding applications
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button 
                      onClick={handleExport}
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      disabled={applications.length === 0}
                    >
                      <Download size={16} />
                      Export
                    </Button>
                    <Button 
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                    >
                      <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
                      Refresh
                    </Button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  {["all", "pending", "in-review", "approved", "rejected"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filterStatus === status 
                          ? "bg-accent text-accent-foreground" 
                          : "bg-card border border-border text-muted-foreground hover:bg-accent/10"
                      }`}
                    >
                      {status.replace('-', ' ').toUpperCase()}
                      {status !== "all" && (
                        <span className="ml-2 text-xs">
                          ({applications.filter(a => a.status === status).length})
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Applications Table */}
                {loadError && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 mb-4">
                    <p className="text-sm text-destructive flex-1">Failed to load applications. Please check your connection.</p>
                    <button onClick={handleRefresh} className="shrink-0 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium hover:bg-destructive/90 transition-colors">
                      Retry
                    </button>
                  </div>
                )}
                <div className="space-y-4">
                  {filteredApplications.length === 0 ? (
                    <div className="bg-card border border-border rounded-xl p-12 text-center">
                      <FileText className="mx-auto text-muted-foreground mb-4" size={48} />
                      <p className="text-muted-foreground">No applications found</p>
                    </div>
                  ) : (
                    filteredApplications.map((app) => {
                      const appId = (app as any)._id?.toString() || app.id
                      return (
                        <div key={appId} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-foreground mb-2">{app.companyName}</h3>
                              <p className="text-muted-foreground mb-4 line-clamp-3">{app.description}</p>
                              <div className="flex flex-wrap gap-4 text-sm">
                                <span className="flex items-center gap-1.5 text-muted-foreground">
                                  {app.founderName}
                                </span>
                                <span className="flex items-center gap-1.5 text-muted-foreground">
                                  <Mail className="text-accent" size={16} />
                                  {app.email}
                                </span>
                                <span className="flex items-center gap-1.5 text-muted-foreground">
                                  <Briefcase className="text-accent" size={16} />
                                  {app.industry}
                                </span>
                                <span className="flex items-center gap-1.5 text-muted-foreground">
                                  <DollarSign className="text-accent" size={16} />
                                  {app.fundingAmount}
                                </span>
                              </div>
                            </div>
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(app.status)}`}>
                              {app.status.toUpperCase()}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <span className="text-sm text-muted-foreground">
                              Submitted: {new Date((app as any).submittedAt || (app as any).createdAt).toLocaleDateString()}
                            </span>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openApp(app)}
                                className="gap-2"
                              >
                                <Eye size={16} />
                                View Details
                              </Button>
                              {app.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleStatusChange(appId, "in-review")}
                                    className="gap-2"
                                  >
                                    <Eye size={16} />
                                    Review
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleStatusChange(appId, "approved")}
                                    className="bg-green-500 hover:bg-green-600 text-white gap-2"
                                  >
                                    <CheckCircle size={16} />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleStatusChange(appId, "rejected")}
                                    className="gap-2"
                                  >
                                    <XCircle size={16} />
                                    Reject
                                  </Button>
                                </>
                              )}
                              {app.status === "in-review" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleStatusChange(appId, "approved")}
                                    className="bg-green-500 hover:bg-green-600 text-white gap-2"
                                  >
                                    <CheckCircle size={16} />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleStatusChange(appId, "rejected")}
                                    className="gap-2"
                                  >
                                    <XCircle size={16} />
                                    Reject
                                  </Button>
                                </>
                              )}
                              {(app.status === "approved" || app.status === "rejected") && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusChange(appId, "pending")}
                                >
                                  Reset Status
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                      User Management
                    </h1>
                    <p className="text-muted-foreground">
                      {users.length} registered users
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {users.map((u) => (
                    <div key={u.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                            <span className="font-bold text-accent">
                              {u.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{u.name}</h3>
                            <p className="text-sm text-muted-foreground">{u.email}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Joined: {new Date(u.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            u.role === "admin" 
                              ? "bg-accent/20 text-accent" 
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {u.role.toUpperCase()}
                          </span>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
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
          { tab: "applications", icon: <FileText size={20} />, label: "Applications", badge: stats.pending },
          { tab: "users", icon: <Users size={20} />, label: "Users" },
        ].map(({ tab, icon, label, badge }: any) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 text-xs font-medium transition-colors relative ${
              activeTab === tab ? "text-accent" : "text-muted-foreground"
            }`}
          >
            {icon}
            {label}
            {badge > 0 && (
              <span className="absolute top-2 right-1/4 w-4 h-4 bg-yellow-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center">
                {badge}
              </span>
            )}
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
          {/* Modal Header */}
          <div className="flex items-start justify-between px-6 py-5 bg-card rounded-t-2xl border-b border-border flex-shrink-0">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">{selectedApp.companyName}</h2>
              <div className="flex items-center gap-3 mt-2">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedApp.status)}`}>
                  {selectedApp.status.toUpperCase()}
                </div>
                {selectedApp.industry && (
                  <span className="text-xs text-muted-foreground">{selectedApp.industry}</span>
                )}
                {(selectedApp as any).country && (
                  <span className="text-xs text-muted-foreground">{(selectedApp as any).country}</span>
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

            {/* Section: Founder Information */}
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

            {/* Section: Company Details */}
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

            {/* Section: Application Details */}
            {(() => {
              const raw = selectedApp.description || ""
              const labels = ["Why Now", "Traction", "Why You", "Additional Info"]
              const regex = new RegExp(`(${labels.map(l => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')}): ?`, 'g')
              const parts: { label: string; text: string }[] = []
              let oneLiner = raw
              let match: RegExpExecArray | null
              let firstMatchIndex = -1

              regex.lastIndex = 0
              match = regex.exec(raw)
              if (match) {
                firstMatchIndex = match.index
                oneLiner = raw.slice(0, firstMatchIndex).trim()
              }

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

            {/* Section: Admin Notes (editable) */}
            <div className="bg-card border border-yellow-500/30 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-yellow-500/10 border-b border-yellow-500/20">
                <h3 className="text-xs font-bold uppercase tracking-widest text-yellow-600">Admin Notes</h3>
                {notesStatus === "saved" && <span className="text-xs text-green-500 font-medium">Saved ✓</span>}
              </div>
              <div className="px-4 py-4 space-y-3">
                <textarea
                  value={adminNotes}
                  onChange={e => { setAdminNotes(e.target.value); setNotesStatus("idle") }}
                  rows={4}
                  placeholder="Add internal notes about this application…"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none text-foreground"
                />
                <Button size="sm" variant="outline" disabled={notesStatus === "saving"} onClick={saveNotes}>
                  {notesStatus === "saving" ? "Saving…" : "Save Notes"}
                </Button>
              </div>
            </div>

            {/* Section: Timeline */}
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
                  <p className="text-xs text-muted-foreground mb-1">Reviewed At</p>
                  <p className="text-sm font-medium text-foreground">
                    {selectedApp.reviewedAt ? new Date(selectedApp.reviewedAt).toLocaleString() : "—"}
                  </p>
                </div>
                <div className="bg-card px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">Reviewed By</p>
                  <p className="text-sm font-medium text-foreground">{selectedApp.reviewedBy || "—"}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Modal Footer – Actions */}
          <div className="flex items-center justify-end gap-2 px-6 py-4 bg-card rounded-b-2xl border-t border-border flex-shrink-0">
            {(() => {
              const appId = (selectedApp as any)._id?.toString() || selectedApp.id
              return (
                <>
                  {selectedApp.status === "pending" && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => { handleStatusChange(appId, "in-review"); setSelectedApp(null) }} className="gap-2">
                        <Eye size={16} /> Review
                      </Button>
                      <Button size="sm" onClick={() => { handleStatusChange(appId, "approved"); setSelectedApp(null) }} className="bg-green-500 hover:bg-green-600 text-white gap-2">
                        <CheckCircle size={16} /> Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => { handleStatusChange(appId, "rejected"); setSelectedApp(null) }} className="gap-2">
                        <XCircle size={16} /> Reject
                      </Button>
                    </>
                  )}
                  {selectedApp.status === "in-review" && (
                    <>
                      <Button size="sm" onClick={() => { handleStatusChange(appId, "approved"); setSelectedApp(null) }} className="bg-green-500 hover:bg-green-600 text-white gap-2">
                        <CheckCircle size={16} /> Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => { handleStatusChange(appId, "rejected"); setSelectedApp(null) }} className="gap-2">
                        <XCircle size={16} /> Reject
                      </Button>
                    </>
                  )}
                  {(selectedApp.status === "approved" || selectedApp.status === "rejected") && (
                    <Button size="sm" variant="outline" onClick={() => { handleStatusChange(appId, "pending"); setSelectedApp(null) }}>
                      Reset Status
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => setSelectedApp(null)}>Close</Button>
                </>
              )
            })()}
          </div>
        </div>
      </div>
    )}
    </>
  )
}
"use client"

import * as React from "react"
import { useAuth, type Application, type User as UserType } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { 
  LayoutDashboard, Users, FileText, TrendingUp, LogOut, 
  Search, Filter, MoreVertical, CheckCircle, XCircle, Eye,
  Clock, Mail, Phone, Briefcase, Calendar, DollarSign,
  Bell, Settings, Download, RefreshCw
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

  // Fetch data function
  const fetchData = React.useCallback(async () => {
    try {
      const token = localStorage.getItem('vp_token')
      
      if (!token) {
        console.error('No token found')
        return
      }

      const appsResponse = await fetch('/api/applications', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const appsData = await appsResponse.json()

      if (appsData.success && appsData.applications) {
        setApplications(appsData.applications)
      }

      const usersStr = localStorage.getItem("vp_users")
      if (usersStr) {
        setUsers(JSON.parse(usersStr))
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
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
  const handleStatusChange = async (appId: string, newStatus: Application["status"]) => {
    try {
      const token = localStorage.getItem('vp_token')
      
      const response = await fetch(`/api/applications/${appId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
          notes: '',
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Update local state - handle both id and _id
        const updatedApps = applications.map(app => {
          const currentId = (app as any)._id?.toString() || app.id
          if (currentId === appId) {
            return {
              ...app,
              status: newStatus,
              reviewedAt: new Date().toISOString(),
              reviewedBy: user.name,
            }
          }
          return app
        })
        setApplications(updatedApps)
      } else {
        alert('Failed to update status: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Failed to update application:', error)
      alert('Error updating application. Please try again.')
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
              <button className="relative p-2 hover:bg-accent/10 rounded-lg transition-colors">
                <Bell size={20} className="text-muted-foreground" />
                {stats.pending > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                )}
              </button>
              
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
                              <p className="text-muted-foreground mb-4 line-clamp-2">{app.description}</p>
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
    </div>
  )
}
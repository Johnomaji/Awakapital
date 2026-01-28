"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

export type UserRole = "user" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
  avatar?: string
  company?: string
  phone?: string
}

export interface Application {
  id: string
  userId: string
  companyName: string
  founderName: string
  email: string
  phone: string
  industry: string
  stage: string
  fundingAmount: string
  pitchDeck?: string
  description: string
  status: "pending" | "in-review" | "approved" | "rejected"
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  notes?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const router = useRouter()

  // Load user from localStorage on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem("vp_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Get all users from localStorage
    const usersStr = localStorage.getItem("vp_users")
    const users: User[] = usersStr ? JSON.parse(usersStr) : []

    // Check for admin account
    if (email === "admin@venturesplatform.com" && password === "admin123") {
      const adminUser: User = {
        id: "admin-1",
        email: "admin@venturesplatform.com",
        name: "Admin User",
        role: "admin",
        createdAt: new Date().toISOString(),
      }
      setUser(adminUser)
      localStorage.setItem("vp_user", JSON.stringify(adminUser))
      setIsLoading(false)
      router.push("/dashboard/admin")
      return true
    }

    // Check for regular user
    const foundUser = users.find(u => u.email === email)
    if (foundUser && password === "password123") { // Demo password
      setUser(foundUser)
      localStorage.setItem("vp_user", JSON.stringify(foundUser))
      setIsLoading(false)
      router.push("/dashboard")
      return true
    }

    setIsLoading(false)
    return false
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Get existing users
    const usersStr = localStorage.getItem("vp_users")
    const users: User[] = usersStr ? JSON.parse(usersStr) : []

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      setIsLoading(false)
      return false
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: "user",
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage
    users.push(newUser)
    localStorage.setItem("vp_users", JSON.stringify(users))
    localStorage.setItem("vp_user", JSON.stringify(newUser))

    setUser(newUser)
    setIsLoading(false)
    router.push("/dashboard")
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("vp_user")
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
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
  
  try {
    // Call your API
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (data.success) {
      // Save user and token
      setUser(data.user)
      localStorage.setItem('vp_token', data.token)
      localStorage.setItem('vp_user', JSON.stringify(data.user))
      
      // Redirect based on role
      router.push(data.user.role === 'admin' ? '/dashboard/admin' : '/dashboard')
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  } catch (error) {
    console.error('Login error:', error)
    setIsLoading(false)
    return false
  }
}

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
  setIsLoading(true)

  try {
    // Call signup API
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await response.json()

    if (data.success) {
      // Auto-login after successful signup
      return await login(email, password)
    }

    setIsLoading(false)
    return false
  } catch (error) {
    console.error('Signup error:', error)
    setIsLoading(false)
    return false
  }
}

  const logout = () => {
    setUser(null)
    localStorage.removeItem("vp_user")
    localStorage.removeItem("vp_token")
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
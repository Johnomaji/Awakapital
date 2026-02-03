"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { useAuth } from "@/lib/auth-context"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Stories", href: "#stories" },
  { name: "Contact", href: "#contact" },
  { name: "Team", href: "/team" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const { user } = useAuth()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <img src="/logo.png" alt="Awakapital Logo" width="38" height="38" />
              </div>
              <div className="absolute -inset-1 bg-accent/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-display font-bold text-foreground hidden sm:block">
              Awakapital
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {user ? (
              <Link href={user.role === "admin" ? "/dashboard/admin" : "/dashboard"}>
                <Button className="hidden md:flex bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="hidden md:flex bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 hover:glow-accent transition-all duration-300">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden backdrop-blur-lg ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 px-4 py-2 rounded-lg transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <Link href={user.role === "admin" ? "/dashboard/admin" : "/dashboard"}>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
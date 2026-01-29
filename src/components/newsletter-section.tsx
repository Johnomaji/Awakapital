"use client"

import * as React from "react"
import { Mail, Sparkles, CheckCircle } from "lucide-react"
import { Button } from "./ui/button"

export function NewsletterSection() {
  const [email, setEmail] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 5000)
    }
  }

  return (
    <section className="py-24 bg-linear-to-br from-primary via-secondary to-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-full animate-float">
            <Mail className="text-accent" size={40} />
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground">
              Subscribe to the{" "}
              <span className="inline-flex items-center gap-2">
                "Series V"
                <Sparkles className="text-accent animate-pulse" size={32} />
              </span>
              {" "}newsletter today!
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Every month we send insights on relevant industry trends, resources 
              and exclusive interviews with African founders building groundbreaking companies.
            </p>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <div className="bg-accent/20 border border-accent/30 rounded-xl p-6 animate-scale-in">
              <div className="flex items-center justify-center gap-3 text-accent">
                <CheckCircle size={24} />
                <p className="font-semibold text-lg">
                  Thanks for subscribing! Check your inbox to confirm.
                </p>
              </div>
            </div>
          )}

          {/* Newsletter Form */}
          {!isSubmitted && (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-2 border border-primary-foreground/20">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 bg-primary-foreground text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all placeholder:text-muted-foreground"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 whitespace-nowrap hover:glow-accent transition-all duration-300"
                >
                  Subscribe Now
                </Button>
              </div>
              
              {/* Privacy Note */}
              <p className="text-sm text-primary-foreground/60 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary-foreground/20">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-accent">15K+</div>
              <div className="text-sm text-primary-foreground/70">Subscribers</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-accent">50+</div>
              <div className="text-sm text-primary-foreground/70">Issues Sent</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-accent">4.9/5</div>
              <div className="text-sm text-primary-foreground/70">Reader Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
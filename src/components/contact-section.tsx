"use client"

import * as React from "react"
import { Mail, MessageSquare, Phone, MapPin, Send, } from "lucide-react"
import { Button } from "./ui/button"
import Link  from "next/link"

export function ContactSection() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", company: "", message: "" })
    }, 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider px-4 py-2 bg-accent/10 rounded-full">
              Get in Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Let's Build the Future{" "}
            <span className="text-gradient">Together</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're a founder looking for funding or want to learn more about our portfolio, 
            we'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail className="text-accent" size={24} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">Email Us</h3>
                    <p className="text-sm text-muted-foreground">Our team will respond within 24 hours</p>
                    <a href="mailto:founders@awakapital.vc" className="text-sm text-accent hover:underline font-medium">
                      founders@awakapital.vc
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone className="text-accent" size={24} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">Call Us</h3>
                    <p className="text-sm text-muted-foreground">Mon-Fri from 9am to 5pm WAT</p>
                    <a href="tel:+2347026799511" className="text-sm text-accent hover:underline font-medium">
                      +234 (0) 7026799511
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <MapPin className="text-accent" size={24} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">Visit Us</h3>
                    <p className="text-sm text-muted-foreground">Come say hello at our office</p>
                    <p className="text-sm text-accent font-medium">
                      28, Aminu Kano Crescent, Wuse 2, Abuja
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-linear-to-br from-primary to-secondary rounded-2xl p-8 text-primary-foreground space-y-4">
              <MessageSquare className="text-accent" size={40} />
              <h3 className="text-2xl font-display font-bold">
                Looking for Funding?
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Submit your pitch deck and we'll get back to you within 48 hours.
              </p>
              <Link href="/apply">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full hover:glow-accent">
                Submit Your Pitch
              </Button>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <div className="bg-card border border-accent rounded-2xl p-12 text-center space-y-6 animate-scale-in">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <Send className="text-accent" size={40} />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground">
                  Message Sent Successfully!
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-foreground">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    placeholder="Your Company"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                    placeholder="Tell us about your company and what you're building..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold hover:glow-accent transition-all duration-300"
                >
                  Send Message
                  <Send size={18} className="ml-2" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
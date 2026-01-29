"use client"

import * as React from "react"
import { ExternalLink } from "lucide-react"

// Portfolio companies (using placeholder logos - you'll replace with actual logos)
const portfolioCompanies = [
  { name: "Steward", industry: "Health Tech" },
  { name: "Moni", industry: "Fintech" },
  { name: "Fluna", industry: "Logistics" },
  { name: "Brass", industry: "Banking" },
  { name: "Paystack", industry: "Payments" },
  { name: "Wealth8", industry: "Investment" },
  { name: "Earnipay", industry: "HR Tech" },
  { name: "Med G", industry: "Med Tech" },
  { name: "Engage", industry: "Marketing" },
  { name: "SunFi", industry: "Energy" },
  // { name: "Quobbly", industry: "Education" },
  // { name: "OmniRetail", industry: "Retail" },
  // { name: "Bridgecard", industry: "Fintech" },
  // { name: "Piggyvest", industry: "Savings" },
  // { name: "SeamlessHR", industry: "HR Tech" },
]

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 bg-card/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider px-4 py-2 bg-accent/10 rounded-full">
              Our Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Backing Africa's Most{" "}
            <span className="text-gradient">Innovative Companies</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We're proud to support 75+ companies solving critical problems across the continent
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {portfolioCompanies.map((company, index) => (
            <div
              key={company.name}
              className="group relative bg-card border border-border rounded-xl p-6 hover:border-accent/50 hover:shadow-xl transition-all duration-300 cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Company Logo Placeholder */}
              <div className="aspect-square flex items-center justify-center mb-4">
                <div className="w-full h-full bg-linear-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                    {company.name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Company Info */}
              <div className="text-center">
                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                  {company.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{company.industry}</p>
              </div>

              {/* Hover Effect */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink size={16} className="text-accent" />
              </div>

              {/* Glow Effect on Hover */}
              <div className="absolute -inset-0.5 bg-accent/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all duration-300 group">
            View Full Portfolio
            <ExternalLink className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
          </button>
        </div>

        {/* Decorative Element */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-6 py-2 bg-background text-sm text-muted-foreground">
              Trusted by founders across Africa
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
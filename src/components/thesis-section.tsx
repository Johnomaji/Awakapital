"use client"

import * as React from "react"
import { Target, TrendingUp, Users, Zap } from "lucide-react"

const thesisPoints = [
  {
    icon: Target,
    title: "Non-Consumption",
    description: "We invest in solutions that serve previously unserved markets, creating entirely new categories of consumers.",
  },
  {
    icon: Zap,
    title: "Infrastructure Gaps",
    description: "We back companies building critical infrastructure that enables economic growth and innovation.",
  },
  {
    icon: TrendingUp,
    title: "Democratization",
    description: "We support businesses that make essential goods and services accessible to the masses.",
  },
  {
    icon: Users,
    title: "Cost Reduction",
    description: "We invest in technologies that dramatically reduce the cost of delivering products and services.",
  },
]

export function ThesisSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-card/30">
      <div className="container-custom">
        {/* Main Thesis Card */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative bg-card border border-border rounded-2xl p-8 md:p-12 hover:border-accent/50 transition-all duration-300 group">
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -z-10 group-hover:bg-accent/10 transition-colors duration-300" />
            
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                  Our Investment Thesis
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Building the Future of African Commerce
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                We invest in companies that solve for non-consumption, plug infrastructural 
                gaps and democratise prosperity in Africa, by eliminating the barriers 
                to access and reducing the costs of delivering goods and services.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border">
                <div>
                  <div className="text-3xl font-bold text-primary">$18M+</div>
                  <div className="text-sm text-muted-foreground mt-1">Deployed in Capital</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">6+</div>
                  <div className="text-sm text-muted-foreground mt-1">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">75+</div>
                  <div className="text-sm text-muted-foreground mt-1">Active Companies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">140+</div>
                  <div className="text-sm text-muted-foreground mt-1">Founders Backed</div>
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-20" />
          </div>
        </div>

        {/* Four Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {thesisPoints.map((point, index) => (
            <div
              key={point.title}
              className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 hover:shadow-lg transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                <point.icon className="text-accent" size={24} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {point.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {point.description}
              </p>

              {/* Hover Indicator */}
              <div className="mt-4 w-0 h-1 bg-accent group-hover:w-12 transition-all duration-300 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
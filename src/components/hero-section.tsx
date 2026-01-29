"use client"

import * as React from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import { UndulateBackground } from "./UndulateBackground"
import  Link  from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Swirly Background */}
      <div className="absolute inset-0 opacity-80">

      
      <UndulateBackground  />
      </div>

      {/* Content */}
      <div className="container-custom py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium animate-scale-in text-muted-foreground">
            {/* <Sparkles size={16} className="animate-pulse" /> */}
            Backing Africa's Next Generation of Founders
          </div>

          {/* Main Heading */}
          <h1 className="text-accent animate-slide-up">
            {/* <span className="text-sm font-semibold text-accent uppercase tracking-wider"></span> */}
            We back founders building the future of Africa
          </h1>

          {/* Subheading */}
          <p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            We invest in companies that solve for non-consumption, plug infrastructural 
            gaps and democratise prosperity in Africa.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <Link href="/apply">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg group hover:glow-accent transition-all duration-300"
            >
              Tell us what you're building
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-border hover:border-accent hover:bg-accent/5 font-semibold px-8 py-6 text-lg transition-all duration-300"
            >
              View Portfolio
            </Button>
          </div>

          {/* Stats Preview */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            {[
              { value: "$18M+", label: "Deployed Capital" },
              { value: "6+", label: "Countries" },
              { value: "75+", label: "Companies" },
              { value: "140+", label: "Founders" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="group cursor-pointer"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 animate-bounce">
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full mx-auto flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-muted-foreground rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
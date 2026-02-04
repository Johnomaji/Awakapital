"use client"

import * as React from "react"
import { Linkedin, Twitter, ExternalLink } from "lucide-react"
import Link from "next/link"

// Founder Data

const founders = [
  {
    name: "Farida Abubakar Nasir",
    company: "Ventures Platform",
    role: "Founder & General Partner",
    image: "farida.jpg", // Replace with actual image
    bio: "Leading African venture capital with a focus on sustainable growth and infrastructure development.",
    linkedin: "https://www.linkedin.com/in/farida-nasir-789984162?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    twitter: "https://x.com/FaridaTahir10",
  },
  {
    name: "Emmanuel Angbula Adakwu",
    company: "Moni",
    role: "Co-Founder & CEO",
    image: "emmaawakapital.jpeg",
    bio: "Building the future of digital lending in Africa with innovative fintech solutions.",
    linkedin: "https://www.linkedin.com/in/emmanuel-angbula-adakwu-702850142?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    twitter: "#",
  },
  // {
  //   name: "Shola Akinlade",
  //   company: "Paystack",
  //   role: "Co-Founder & CEO",
  //   image: "/GJw7ir1WwAAWGm8.jpg",
  //   bio: "Revolutionizing online payments across Africa, acquired by Stripe for $200M+.",
  //   linkedin: "#",
  //   twitter: "#",
  // },
  // {
  //   name: "Odunayo Eweniyi",
  //   company: "PiggyVest",
  //   role: "Co-Founder & COO",
  //   image: "/GJw7ir1WwAAWGm8.jpg",
  //   bio: "Empowering Africans to save and invest through innovative savings technology.",
  //   linkedin: "#",
  //   twitter: "#",
  // },
]

export function FoundersSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider px-4 py-2 bg-accent/10 rounded-full">
              Our Founders
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Building with{" "}
            <span className="text-gradient">Exceptional Leaders</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Meet the visionary founders we're proud to back across Africa
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-2xl transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Founder Image */}
              <div className="relative h-64 bg-linear-to-br from-primary/20 to-accent/20 overflow-hidden">
                {/* Placeholder - replace with actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-accent/20 rounded-full flex items-center justify-center text-4xl font-bold text-accent">
                    {/* {founder.name.split(' ').map(n => n[0]).join('')} */}
                    <img src={founder.image} alt={founder.name} className="w-full h-full rounded-full object-cover " />
                  </div>
                </div>
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-linear-to-t from-card via-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Social Links (appear on hover) */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={founder.linkedin}
                    className="w-10 h-10 bg-accent/90 hover:bg-accent rounded-full flex items-center justify-center text-accent-foreground transition-all hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={founder.twitter}
                    className="w-10 h-10 bg-accent/90 hover:bg-accent rounded-full flex items-center justify-center text-accent-foreground transition-all hover:scale-110"
                    aria-label="Twitter"
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </div>

              {/* Founder Info */}
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground group-hover:text-accent transition-colors">
                    {founder.name}
                  </h3>
                  <p className="text-sm text-accent font-medium">{founder.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">{founder.role}</p>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {founder.bio}
                </p>

                {/* Learn More Link */}
                <button className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all duration-300 group/link">
                  Learn more
                  <ExternalLink size={14} className="group-hover/link:rotate-12 transition-transform" />
                </button>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-full -z-10 group-hover:bg-accent/10 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* View All Founders */}
        <div className="text-center mt-12">
          <Link href="/team">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all duration-300 group">
            Meet All Our Founders
            <ExternalLink className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
          </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
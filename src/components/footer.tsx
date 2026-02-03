"use client"

import * as React from "react"
import Link from "next/link"
import { Linkedin, Twitter, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

const footerLinks = {
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Thesis", href: "#about" },
    { name: "Team", href: "/team" },
    { name: "Careers", href: "#careers" },
  ],
  resources: [
    { name: "Portfolio", href: "#portfolio" },
    { name: "Stories", href: "#stories" },
    { name: "Blog", href: "#stories" },
    { name: "Press Kit", href: "#press" },
  ],
  founders: [
    { name: "How We Invest", href: "#invest" },
    { name: "Application Process", href: "/apply" },
    { name: "FAQs", href: "#faq" },
    { name: "Contact Us", href: "#contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
}

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-[#0A66C2]" },
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-[#1DA1F2]" },
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-[#1877F2]" },
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-[#E4405F]" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                {/* <span className="text-primary-foreground font-bold text-xl">VP</span> */}
                <img src="/logo.png" alt="Awakapital Logo" width="38" height="38" />
              </div>
              <span className="text-xl font-display font-bold text-foreground">
                Awakapital
              </span>
            </Link>
            
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Backing Africa's most innovative founders to build the future of commerce, 
              infrastructure, and prosperity across the continent.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin size={16} className="text-accent" />
                <span>28, Aminu Kano Crescent, Wuse 2, Abuja</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={16} className="text-accent" />
                <a href="mailto:hello@awakapital.com" className="hover:text-accent transition-colors">
                  hello@awakapital.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={16} className="text-accent" />
                <a href="tel:+2347026799511" className="hover:text-accent transition-colors">
                  +234 (0) 7026799511
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground ${social.color} hover:border-accent transition-all duration-300 hover:scale-110`}
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider">
              For Founders
            </h3>
            <ul className="space-y-3">
              {footerLinks.founders.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} Awakapital. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              Made for{" "}
              {/* <span className="text-accent animate-pulse">❤️</span>{" "} */}
              businesses in Africa
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
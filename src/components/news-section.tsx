"use client"

import * as React from "react"
import Link from "next/link"
import { Calendar, ArrowRight, Clock } from "lucide-react"

const articles = [
  {
    title: "Venture on Platform: Empowering 11 Leading African Tech CEOs to Power Growth",
    category: "Portfolio News",
    date: "January 15, 2026",
    readTime: "5 min read",
    excerpt: "Discover how our portfolio companies are driving innovation and creating value across African markets through strategic partnerships and sustainable growth.",
    image: "/blogimage1.png",
    slug: "empowering-african-tech-ceos",
    featured: true,
  },
  {
    title: "Identifying AI and Machine Learning Opportunities Beyond Product Strategy",
    category: "Insights",
    date: "January 10, 2026",
    readTime: "8 min read",
    excerpt: "Exploring how African startups can leverage AI and ML to solve unique infrastructure challenges and create market-defining solutions.",
    image: "/blogimage2.png",
    slug: "ai-ml-opportunities-africa",
    featured: false,
  },
  {
    title: "Africa's Wealth Investment Class with PiggyVest Returns from Unicorn",
    category: "Market Analysis",
    date: "January 5, 2026",
    readTime: "6 min read",
    excerpt: "An in-depth look at how digital savings platforms are democratizing wealth creation and investment opportunities across the continent.",
    image: "/blogimage3.png",
    slug: "piggyvest-wealth-investment",
    featured: false,
  },
]

export function NewsSection() {
  return (
    <section id="stories" className="py-24 bg-card/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-block">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider px-4 py-2 bg-accent/10 rounded-full">
                News, Resources and Insights
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Latest from{" "}
              <span className="text-gradient">Awakapital</span>
            </h2>
          </div>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-accent hover:gap-3 font-semibold transition-all duration-300 group"
          >
            View all articles
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>

        {/* Featured Article */}
        {articles.filter(a => a.featured).map((article, index) => (
          <Link
            key={article.title}
            href={`/blog/${article.slug}`}
            className="block mb-12 group cursor-pointer animate-fade-in"
          >
            <div className="grid lg:grid-cols-2 gap-8 bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-2xl transition-all duration-500">
              {/* Image */}
              <div className="relative h-80 lg:h-auto bg-linear-to-br from-primary/20 to-accent/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* <div className="text-6xl font-bold text-accent/20">VP</div> */}
                  <img src={article.image} alt="" />
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={16} />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-3xl font-display font-bold text-foreground group-hover:text-accent transition-colors">
                  {article.title}
                </h3>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {article.excerpt}
                </p>

                <button className="inline-flex items-center gap-2 text-accent hover:gap-3 font-semibold transition-all duration-300 group/link mt-4">
                  Read full article
                  <ArrowRight className="group-hover/link:translate-x-1 transition-transform" size={18} />
                </button>
              </div>
            </div>
          </Link>
        ))}

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {articles.filter(a => !a.featured).map((article, index) => (
            <Link
              key={article.title}
              href={`/blog/${article.slug}`}
              className="group cursor-pointer bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-56 bg-linear-to-br from-primary/20 to-accent/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* <div className="text-4xl font-bold text-accent/20">VP</div> */}
                  <img src={article.image} alt="" />
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                <button className="inline-flex items-center gap-2 text-sm text-accent hover:gap-3 font-semibold transition-all duration-300 group/link pt-2">
                  Read more
                  <ArrowRight className="group-hover/link:translate-x-1 transition-transform" size={16} />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
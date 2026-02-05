"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What types of companies does Awakapital invest in?",
    answer: "We invest in early-stage African companies (Pre-Seed to Series A) that solve for non-consumption, plug infrastructural gaps, and democratize prosperity. Our focus areas include fintech, health tech, logistics, e-commerce, education, and agriculture.",
  },
  {
    question: "What is your typical investment size?",
    answer: "We typically invest between $5,000 to $100,000 in initial funding rounds, with reserves for follow-on investments. The exact amount depends on the stage of your company, traction, and funding requirements.",
  },
  {
    question: "What stage companies do you invest in?",
    answer: "We invest primarily in Pre-Seed and Seed stage companies, though we occasionally participate in Series A rounds for exceptional companies. We look for companies with early traction, clear product-market fit, and ambitious founders.",
  },
  {
    question: "Do you only invest in Nigerian companies?",
    answer: "No, we invest across Africa. While we're based in Nigeria, we back founders from across the continent including Kenya, South Africa, Ghana, Egypt, and other African countries. We have portfolio companies in 6+ countries.",
  },
  {
    question: "How long does the application process take?",
    answer: "Our initial review takes 48 hours. If we're interested, the full due diligence process typically takes 4-6 weeks from initial meeting to term sheet. We strive to be founder-friendly and move quickly.",
  },
  {
    question: "What do you look for in founders?",
    answer: "We look for exceptional founders with deep domain expertise, strong execution capabilities, and unwavering commitment to their vision. We value technical founders, diverse teams, and those with a clear understanding of their market.",
  },
  {
    question: "Do you require a pitch deck?",
    answer: "While a pitch deck helps us understand your business faster, it's not mandatory for initial applications. We care more about your traction, team, and the problem you're solving. However, a well-prepared deck does help in later stages.",
  },
  {
    question: "What support do you provide beyond capital?",
    answer: "We provide hands-on support including strategic guidance, hiring assistance, customer introductions, follow-on funding connections, and access to our network of 140+ founders. We also run regular events and workshops for our portfolio.",
  },
  {
    question: "Can I apply if I'm still at the idea stage?",
    answer: "We prefer companies with some early traction (customers, revenue, or strong user engagement). However, exceptional founding teams with unique insights into large markets may be considered even at the idea stage.",
  },
  {
    question: "How often do you invest?",
    answer: "We make approximately 10-15 new investments per year. We review hundreds of applications and meet with dozens of companies before making investment decisions.",
  },
  {
    question: "What happens after I submit my application?",
    answer: "You'll receive a confirmation email immediately. Our team reviews all applications within 48 hours. If there's a potential fit, we'll schedule an initial call to learn more about your company. The full process from application to investment typically takes 4-8 weeks.",
  },
  {
    question: "Do you lead or participate in funding rounds?",
    answer: "We both lead and participate in funding rounds. For Pre-Seed rounds, we often lead. For Seed and Series A, we typically participate alongside other investors. We're flexible and founder-focused in our approach.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider px-4 py-2 bg-accent/10 rounded-full">
              FAQs
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about applying for funding and working with Awakapital
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-accent/5 transition-colors"
              >
                <span className="font-semibold text-foreground pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`text-accent flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 text-muted-foreground leading-relaxed border-t border-border pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-linear-to-r from-primary to-secondary rounded-2xl p-8 text-primary-foreground">
            <h3 className="text-2xl font-display font-bold mb-4">
              Still have questions?
            </h3>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our team is here to help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:founders@awakapital.vc"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-all"
              >
                Email Us
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold rounded-lg transition-all"
              >
                Contact Form
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
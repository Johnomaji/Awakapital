"use client"

import * as React from "react"
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react"
import { Button } from "./ui/button"

// Comprehensive knowledge base about Awakapital
const knowledgeBase = {
  about: {
    main: "Awakapital is a venture capital firm investing $5K-$100K at the inflection points of Africa's markets, from Pre-seed to Series A. We help the daring build legendary companies by backing founders at moments when structural change creates opportunities for category-defining businesses.",
    philosophy: "We don't just write checks—we partner with exceptional founders building infrastructure-layer companies that other businesses will build upon. Think AWS, not individual SaaS apps. Stripe, not e-commerce stores. We're operators who became investors, bringing real operational experience to every investment decision.",
    deployed: "We've deployed over $100K in capital, operate in 6+ countries across Africa, back 75+ active portfolio companies, and support 140+ founders building the future of the continent.",
  },
  
  investment: {
    thesis: "We invest at inflection points where structural change creates opportunities for category-defining companies. We focus on four key areas:\n\n1. Power Law Distribution & Outlier Thinking: We optimize for 100x returns, not incremental gains. The best companies don't look like safe bets at the beginning.\n\n2. Deep Tech Infrastructure Over Consumer Apps: We back companies building enabling technologies that create defensible moats through technical complexity and proprietary data.\n\n3. Market Timing > Market Size: We care more about rate of change than current market size. A $50M market growing 10x annually beats a $5B stable market.\n\n4. Proprietary Data Moats: In the AI era, the winners are those collecting unique datasets that can't be replicated.",
    checkSize: "We invest $5K to $100K depending on the stage and need. Our $5K checks are bridge capital for reaching technical milestones. Our $100K checks lead seed rounds with full conviction. Median check: $35K.",
    stages: "We're stage-agnostic from Pre-seed through Series A. We can lead rounds, set terms, and help build syndicates. We believe in founder control—no mandatory board seats, no blocking rights, no super pro-rata demands.",
    timeline: "We move fast: 1-2 weeks from first meeting to decision. Week 1: Initial meeting within 48 hours, deep diligence, decision within 48 hours. Week 2: Due diligence and reference checks. Week 3-4: Term sheet and closing. Fastest close: 3 days. Median: 2 weeks total.",
    sectors: "We focus on deep tech infrastructure companies in Africa: AI/ML systems, industrial automation, fintech infrastructure, logistics tech, agricultural technology, energy systems, and healthcare technology. We avoid consumer apps replicating Western models.",
  },
  
  portfolio: {
    featured: "Royal Laundry is our flagship portfolio company—building proprietary AI and robotics infrastructure for textile processing automation. They're developing computer vision, decision engines, and automation units for licensing to commercial operators globally. Their physical operation generates 2.5M+ training images, achieving 99.2% model accuracy on a $15B TAM.",
    companies: "Our portfolio includes leading African companies building critical infrastructure: Royal Laundry (AI/Robotics), and 75+ other exceptional companies across fintech, healthtech, logistics, and industrial automation.",
    success: "We've backed companies that became category leaders, with multiple exits and follow-on rounds from tier-1 VCs. Our portfolio companies have created thousands of jobs and serve millions of customers across Africa.",
  },
  
  howWeHelp: {
    support: "Post-investment, we're as involved as you want us to be. Some founders engage daily for product feedback and strategic decisions. Others check in quarterly. What matters is no surprises—if something significant happens (breakthrough or crisis), tell us early.",
    value: "We provide: Customer and partner introductions across our network, investor connections for follow-on rounds, technical and strategic feedback from operators who've built companies, hiring support for key roles, operational pattern-matching from 75+ portfolio companies, and availability when critical decisions arise.",
    notMicromanage: "What we don't do: Micromanage operations, demand board seats we haven't earned, override founder decisions, or create bureaucratic overhead. Our role is acceleration, not governance.",
  },
  
  apply: {
    process: "Submit your application through our platform at awakapital.vc/apply. We review all applications and respond within 48 hours with either excited next steps or specific, actionable feedback.",
    requirements: "We look for: Deep understanding of the problem (not just market research), defensible moats (proprietary data, network effects, technical complexity), markets in transition (inflection points), unit economics that work at scale, and ability to execute with limited capital.",
    founders: "We back founders with: Technical depth or operational mastery in their domain, determination bordering on unreasonable commitment, ability to recruit exceptional talent, and capital efficiency mindset. We don't care about pedigree—we care about capability and conviction.",
    pass: "We pass on: Shallow understanding of problems, no defensible moat, stable markets (not inflection points), structural unprofitability at scale, and inability to execute with constraints.",
  },
  
  team: {
    overview: "We're operators who became investors. We've built companies, scaled teams, managed burn rates during downturns, and made the hard decisions that keep companies alive. This shapes how we evaluate companies and support founders.",
    experience: "Our team has deep operational experience across African markets, having built and scaled technology companies, navigated regulatory challenges, raised capital, and achieved exits. We know the difference between vanity metrics and real traction.",
    approach: "We remember what it's like to be a founder. We respect the craft of company-building. We don't micromanage or second-guess every decision. But when you need help—when you're facing a challenge we've navigated before—we can actually be useful.",
  },
  
  contact: {
    email: "Reach us at founders@awakapital.vc We respond to all inquiries within 24 hours.",
    office: "Visit us at 28, Aminu Kano Crescent, Wuse 2, Abuja, Nigeria.",
    response: "For funding applications, we review and respond within 48 hours. For general inquiries, expect a response within 24 hours.",
    application: "The fastest way to get funded is to submit your application at awakapital.vc/apply. Include your deck, traction metrics, and why now is the right time for your solution.",
  },
  
  philosophy: {
    powerLaw: "95% of venture returns come from 5% of investors. The difference? They have what Charlie Munger called a 'prepared mind'—deep pattern recognition of markets undergoing fundamental change before it becomes obvious.",
    deepTech: "The most enduring value accrues to infrastructure platforms. AWS, not SaaS apps. Stripe, not e-commerce stores. Twilio, not communication apps. These create moats through technical complexity and network effects.",
    timing: "We obsess over 'why now?'—what changed that makes this solution possible today when it wasn't five years ago? New enabling technologies, regulatory shifts, or fundamental customer behavior changes.",
    data: "In the AI era, proprietary data is the ultimate advantage. The best AI companies aren't those with smart algorithms (those commoditize). Winners collect unique datasets that can't be replicated.",
    africa: "Africa's industrial sectors are undergoing simultaneous digitization and automation. Agriculture, logistics, manufacturing, energy—trillion-dollar industries still operating with 1980s technology. The convergence of affordable sensors, cloud computing, AI/ML, and smartphone penetration makes intelligent automation suddenly possible.",
  },
}

// Expanded keyword matching with more intelligent responses
function getBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()
  
  // Philosophy and investment approach
  if (message.match(/\b(philosophy|believe|approach|think|thesis|invest|why|inflection)\b/)) {
    if (message.includes("power law") || message.includes("return")) {
      return knowledgeBase.philosophy.powerLaw
    }
    if (message.includes("deep tech") || message.includes("infrastructure")) {
      return knowledgeBase.philosophy.deepTech
    }
    if (message.includes("timing") || message.includes("why now")) {
      return knowledgeBase.philosophy.timing
    }
    if (message.includes("data") || message.includes("moat")) {
      return knowledgeBase.philosophy.data
    }
    if (message.includes("africa")) {
      return knowledgeBase.philosophy.africa
    }
    return knowledgeBase.investment.thesis
  }

  // About Awakapital
  if (message.match(/\b(about|who are you|what is awakapital|tell me about)\b/)) {
    if (message.includes("stat") || message.includes("number")) {
      return knowledgeBase.about.deployed
    }
    return `${knowledgeBase.about.main}\n\n${knowledgeBase.about.philosophy}`
  }

  // Investment details
  if (message.match(/\b(invest|capital|check|money|fund|amount)\b/)) {
    if (message.includes("size") || message.includes("much") || message.includes("range")) {
      return knowledgeBase.investment.checkSize
    }
    if (message.includes("stage") || message.includes("series") || message.includes("pre-seed")) {
      return knowledgeBase.investment.stages
    }
    if (message.includes("how long") || message.includes("timeline") || message.includes("fast") || message.includes("quick")) {
      return knowledgeBase.investment.timeline
    }
    if (message.includes("sector") || message.includes("industry") || message.includes("focus")) {
      return knowledgeBase.investment.sectors
    }
    return knowledgeBase.investment.thesis
  }

  // Portfolio
  if (message.match(/\b(portfolio|companies|invested|backed|startup)\b/)) {
    if (message.includes("royal") || message.includes("laundry") || message.includes("example") || message.includes("case")) {
      return knowledgeBase.portfolio.featured
    }
    if (message.includes("success") || message.includes("exit") || message.includes("result")) {
      return knowledgeBase.portfolio.success
    }
    return `${knowledgeBase.portfolio.companies}\n\n${knowledgeBase.portfolio.featured}`
  }

  // How you help
  if (message.match(/\b(help|support|value|benefit|after|post)\b/)) {
    return `${knowledgeBase.howWeHelp.support}\n\n${knowledgeBase.howWeHelp.value}\n\n${knowledgeBase.howWeHelp.notMicromanage}`
  }

  // Application process
  if (message.match(/\b(apply|application|pitch|submit|raise|funding|get funded)\b/)) {
    if (message.includes("how") || message.includes("process") || message.includes("submit")) {
      return `${knowledgeBase.apply.process}\n\n${knowledgeBase.apply.requirements}`
    }
    if (message.includes("look for") || message.includes("criteria") || message.includes("requirement")) {
      return `${knowledgeBase.apply.requirements}\n\n${knowledgeBase.apply.founders}`
    }
    if (message.includes("founder") || message.includes("team")) {
      return knowledgeBase.apply.founders
    }
    if (message.includes("pass") || message.includes("reject") || message.includes("no")) {
      return knowledgeBase.apply.pass
    }
    return knowledgeBase.apply.process
  }

  // Timeline questions
  if (message.match(/\b(timeline|how long|when|fast|quick|time)\b/)) {
    return knowledgeBase.investment.timeline
  }

  // Team
  if (message.match(/\b(team|who|people|partner|founder)\b/)) {
    return `${knowledgeBase.team.overview}\n\n${knowledgeBase.team.experience}`
  }

  // Contact
  if (message.match(/\b(contact|reach|email|phone|office|address|meet)\b/)) {
    return `${knowledgeBase.contact.email}\n\n${knowledgeBase.contact.office}\n\n${knowledgeBase.contact.application}`
  }

  // Stats
  if (message.match(/\b(stat|data|number|how much|how many|deployed|portfolio size)\b/)) {
    return knowledgeBase.about.deployed
  }

  // Sectors/Focus areas
  if (message.match(/\b(sector|industry|market|vertical|focus area)\b/)) {
    return knowledgeBase.investment.sectors
  }

  // Check size
  if (message.match(/\b(check size|ticket|investment size)\b/)) {
    return knowledgeBase.investment.checkSize
  }

  // Decision criteria
  if (message.match(/\b(criteria|evaluate|decision|choose|select)\b/)) {
    return `${knowledgeBase.apply.requirements}\n\n${knowledgeBase.apply.founders}`
  }

  // Deep tech / Infrastructure
  if (message.match(/\b(deep tech|infrastructure|technology|platform)\b/)) {
    return knowledgeBase.philosophy.deepTech
  }

  // Africa focus
  if (message.match(/\b(africa|african|continent|opportunity)\b/)) {
    return knowledgeBase.philosophy.africa
  }

  // Royal Laundry specific
  if (message.match(/\b(royal laundry|case study|example company)\b/)) {
    return knowledgeBase.portfolio.featured
  }

  // Greetings
  if (message.match(/\b(hello|hi|hey|good morning|good afternoon|good evening|greetings)\b/)) {
    return "Hello! 👋 I'm the Awakapital AI assistant. I can help you understand our investment philosophy, learn about our portfolio, explore how we support founders, or guide you through the application process. What would you like to know?"
  }

  // Thanks
  if (message.match(/\b(thank|thanks|appreciate|grateful)\b/)) {
    return "You're very welcome! Feel free to ask me anything else about Awakapital. I'm here to help whether you're a founder considering applying, an investor looking to learn more, or just curious about our approach. 😊"
  }

  // Goodbye
  if (message.match(/\b(bye|goodbye|see you|later)\b/)) {
    return "Thanks for chatting! If you're a founder building at an inflection point, we'd love to hear from you at awakapital.vc/apply. Best of luck! 🚀"
  }

  // Questions about the AI itself
  if (message.match(/\b(who are you|what are you|ai|bot|assistant)\b/)) {
    return "I'm Awakapital's AI assistant, trained on our investment philosophy, portfolio insights, and operational knowledge. I can answer questions about our thesis, help you understand if your company might be a fit, explain our process, and connect you with the right resources. How can I help you today?"
  }

  // Default intelligent response
  return "Great question! I can help you learn about:\n\n• Our investment philosophy (inflection points, power law returns, deep tech infrastructure)\n• Portfolio companies and case studies (like Royal Laundry)\n• How to apply for funding (process, timeline, criteria)\n• What we look for in founders\n• How we support portfolio companies\n• Our check sizes ($5K-$100K) and stages (Pre-seed to Series A)\n\nWhat would you like to explore?"
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [messages, setMessages] = React.useState<Array<{ text: string; isBot: boolean }>>([
    { 
      text: "Hi! 👋 I'm the Awakapital AI assistant. I'm trained on our investment philosophy, portfolio insights, and everything about backing legendary African founders.\n\nI can help you understand our thesis, explore our portfolio, learn about the application process, or discover what makes a great fit for Awakapital.\n\nWhat would you like to know?", 
      isBot: true 
    }
  ])
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    const newMessages = [...messages, { text: message, isBot: false }]
    setMessages(newMessages)
    setMessage("")

    // Get AI response with slight delay for realism
    setTimeout(() => {
      const botResponse = getBotResponse(message)
      setMessages(prev => [...prev, { text: botResponse, isBot: true }])
    }, 600)
  }

  const handleQuickAction = (question: string) => {
    setMessages([...messages, { text: question, isBot: false }])
    setTimeout(() => {
      const botResponse = getBotResponse(question)
      setMessages(prev => [...prev, { text: botResponse, isBot: true }])
    }, 600)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X size={28} className="transition-transform duration-300" />
        ) : (
          <MessageCircle size={28} className="transition-transform duration-300 group-hover:scale-110" />
        )}
        
        {/* AI Badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full border-2 border-background flex items-center justify-center">
            <Bot size={14} className="text-primary-foreground" />
          </span>
        )}
        
        {/* Glow Effect */}
        <div className="absolute -inset-2 bg-accent/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-md animate-scale-in">
          <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-linear-to-r from-primary to-secondary p-6 text-primary-foreground">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-accent/30">
                    <Bot size={24} className="text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      Awakapital AI
                      <Sparkles size={16} className="text-accent animate-pulse" />
                    </h3>
                    <p className="text-sm text-primary-foreground/80">Powered by Deep Learning · Always Available</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-background/50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-slide-up`}
                >
                  <div className="flex items-start gap-2 max-w-[85%]">
                    {msg.isBot && (
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center shrink-0 mt-1">
                        <Bot size={16} className="text-accent" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        msg.isBot
                          ? 'bg-muted text-foreground rounded-tl-none'
                          : 'bg-accent text-accent-foreground rounded-tr-none'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-3 border-t border-border bg-card/50">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Quick questions:</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleQuickAction("What's your investment philosophy?")}
                  className="text-xs px-3 py-1.5 bg-muted hover:bg-accent/20 hover:text-accent rounded-full transition-colors"
                >
                  💡 Investment Philosophy
                </button>
                <button
                  onClick={() => handleQuickAction("How do I apply for funding?")}
                  className="text-xs px-3 py-1.5 bg-muted hover:bg-accent/20 hover:text-accent rounded-full transition-colors"
                >
                  🚀 Apply for Funding
                </button>
                <button
                  onClick={() => handleQuickAction("Tell me about Royal Laundry")}
                  className="text-xs px-3 py-1.5 bg-muted hover:bg-accent/20 hover:text-accent rounded-full transition-colors"
                >
                  🏢 Portfolio Example
                </button>
                <button
                  onClick={() => handleQuickAction("What do you look for in founders?")}
                  className="text-xs px-3 py-1.5 bg-muted hover:bg-accent/20 hover:text-accent rounded-full transition-colors"
                >
                  👥 Founder Criteria
                </button>
              </div>
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSubmit} className="p-6 border-t border-border bg-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask me anything about Awakapital..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground w-12 h-12 rounded-lg"
                >
                  <Send size={20} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                AI-Powered · Trained on Awakapital's investment knowledge
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
"use client"

import * as React from "react"
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react"
import { Button } from "./ui/button"

// Knowledge base about the organization
const knowledgeBase = {
  about: "Awakapital is a leading African venture capital firm that backs founders building the future of Africa. We invest in companies that solve for non-consumption, plug infrastructural gaps, and democratize prosperity across the continent.",
  
  investment: "We focus on companies that eliminate barriers to access and reduce the costs of delivering goods and services in Africa. Our thesis centers on non-consumption, infrastructure development, democratization, and cost reduction.",
  
  stats: "We have deployed over $18M in capital, operate in 6+ countries, back 75+ active portfolio companies, and support 140+ founders across Africa.",
  
  portfolio: "Our portfolio includes leading African companies like Paystack (acquired by Stripe), PiggyVest, Moni, Fluna, Brass, Steward, and many others across fintech, health tech, logistics, and more.",
  
  contact: "You can reach us at hello@awakapital.com or visit our office in Lagos, Nigeria. We respond to all inquiries within 24 hours.",
  
  funding: "If you're a founder looking for funding, you can submit your pitch deck through our contact form or email us directly. We review all applications and respond within 48 hours.",
  
  team: "Our team consists of experienced investors, operators, and advisors with deep expertise in African markets and technology.",
}

function getBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()
  
  // About questions
  if (message.includes("about") || message.includes("who are you") || message.includes("what is") || message.includes("tell me")) {
    return knowledgeBase.about
  }
  
  // Investment/Thesis questions
  if (message.includes("invest") || message.includes("thesis") || message.includes("focus") || message.includes("criteria")) {
    return knowledgeBase.investment
  }
  
  // Stats questions
  if (message.includes("stat") || message.includes("number") || message.includes("how much") || message.includes("how many")) {
    return knowledgeBase.stats
  }
  
  // Portfolio questions
  if (message.includes("portfolio") || message.includes("companies") || message.includes("invested in") || message.includes("backed")) {
    return knowledgeBase.portfolio
  }
  
  // Contact questions
  if (message.includes("contact") || message.includes("reach") || message.includes("email") || message.includes("phone") || message.includes("office")) {
    return knowledgeBase.contact
  }
  
  // Funding questions
  if (message.includes("funding") || message.includes("pitch") || message.includes("apply") || message.includes("raise") || message.includes("capital")) {
    return knowledgeBase.funding
  }
  
  // Team questions
  if (message.includes("team") || message.includes("who") || message.includes("people")) {
    return knowledgeBase.team
  }
  
  // Greetings
  if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    return "Hello! 👋 I'm the Awakapital assistant. I can help you learn about our investment thesis, portfolio companies, how to apply for funding, and more. What would you like to know?"
  }
  
  // Thanks
  if (message.includes("thank") || message.includes("thanks")) {
    return "You're welcome! Feel free to ask me anything else about Awakapital. 😊"
  }
  
  // Default response
  return "I can help you with information about Awakapital, including our investment thesis, portfolio companies, funding process, and contact details. What would you like to know more about?"
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [messages, setMessages] = React.useState<Array<{ text: string; isBot: boolean }>>([
    { 
      text: "Hi! 👋 I'm the Awakapital AI assistant. I can answer questions about our investment thesis, portfolio, funding process, and more. How can I help you today?", 
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

    // Get AI response
    setTimeout(() => {
      const botResponse = getBotResponse(message)
      setMessages(prev => [...prev, { text: botResponse, isBot: true }])
    }, 500)
  }

  const handleQuickAction = (question: string) => {
    setMessages([...messages, { text: question, isBot: false }])
    setTimeout(() => {
      const botResponse = getBotResponse(question)
      setMessages(prev => [...prev, { text: botResponse, isBot: true }])
    }, 500)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group hover:scale-110 animate-float"
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
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Bot size={24} className="text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      VP Assistant
                      <Sparkles size={16} className="text-accent animate-pulse" />
                    </h3>
                    <p className="text-sm text-primary-foreground/80">AI-Powered · Always Online</p>
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
              <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleQuickAction("Tell me about your investment thesis")}
                  className="text-xs px-3 py-1.5 bg-muted hover:bg-accent/20 hover:text-accent rounded-full transition-colors"
                >
                  Investment Thesis
                </button>
                <button
                  onClick={() => handleQuickAction("How can I get funding?")}
                  className="text-xs px-3 py-1.5 bg-muted hover:bg-accent/20 hover:text-accent rounded-full transition-colors"
                >
                  Get Funding
                </button>
                <button
                  onClick={() => handleQuickAction("Show me your portfolio")}
                  className="text-xs px-3 py-1.5 bg-muted hover:bg-accent/20 hover:text-accent rounded-full transition-colors"
                >
                  Portfolio
                </button>
                <button
                  onClick={() => handleQuickAction("What are your stats?")}
                  className="text-xs px-3 py-1.5 bg-muted hover:bg-accent/20 hover:text-accent rounded-full transition-colors"
                >
                  Our Stats
                </button>
              </div>
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSubmit} className="p-6 border-t border-border bg-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask me anything..."
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
                Powered by AI · Trained on Awakapital data
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
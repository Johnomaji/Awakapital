"use client"

import * as React from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { 
  Briefcase, Globe, MapPin, TrendingUp, Upload, CheckCircle, 
  ArrowLeft, DollarSign, Lightbulb, Target, Award, FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ImprovedApplicationPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState("")
  
  const [formData, setFormData] = React.useState({
    founderName: "",
    email: "",
    phone: "",
    companyName: "",
    website: "",
    country: "",
    stage: "",
    sector: "",
    fundingAmount: "",
    oneLiner: "",
    whyNow: "",
    traction: "",
    whyYou: "",
    additionalInfo: "",
  })

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/apply")
    } else {
      // Pre-fill user data
      setFormData(prev => ({
        ...prev,
        founderName: user.name || "",
        email: user.email || "",
      }))
    }
  }, [user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    if (!user) {
      router.push("/login")
      return
    }

    try {
      // Get token from localStorage
      const token = localStorage.getItem('vp_token')

      if (!token) {
        setError("Authentication token not found. Please login again.")
        router.push("/login")
        return
      }

      // Prepare data for API
      const applicationData = {
        companyName: formData.companyName,
        founderName: formData.founderName,
        email: formData.email,
        phone: formData.phone || "",
        industry: formData.sector,
        stage: formData.stage,
        fundingAmount: formData.fundingAmount || "Not specified",
        description: `${formData.oneLiner}\n\nWhy Now: ${formData.whyNow}\n\nTraction: ${formData.traction}\n\nWhy You: ${formData.whyYou}\n\nAdditional Info: ${formData.additionalInfo}`,
      }

      // Call API
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(applicationData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSubmitted(true)
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setError(data.error || "Failed to submit application. Please try again.")
      }
    } catch (error) {
      console.error('Application submission error:', error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20">
          <div className="container-custom py-20">
            <div className="max-w-2xl mx-auto text-center space-y-8 animate-scale-in">
              {/* Success Icon */}
              <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="text-green-500" size={48} />
              </div>

              {/* Success Message */}
              <div className="space-y-4">
                <h1 className="text-4xl font-display font-bold text-foreground">
                  Application Received!
                </h1>
                <p className="text-xl text-muted-foreground">
                  Thank you for your submission. We'll review your application and respond within 48 hours.
                </p>
                <p className="text-sm text-muted-foreground">
                  Check your email for confirmation. In the meantime, feel free to explore our portfolio.
                </p>
              </div>

              {/* What's Next */}
              <div className="bg-card border border-border rounded-2xl p-8 text-left space-y-6">
                <h2 className="text-2xl font-display font-bold text-foreground">
                  What Happens Next?
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Initial Review (48 hours)",
                      description: "Our team will review your application"
                    },
                    {
                      step: "2",
                      title: "Due Diligence (1-2 weeks)",
                      description: "If selected, we'll conduct deeper analysis"
                    },
                    {
                      step: "3",
                      title: "Decision & Next Steps",
                      description: "You'll receive our investment decision"
                    }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-accent">{item.step}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    View in Dashboard
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg" variant="outline">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-primary via-secondary to-primary text-primary-foreground">
          <div className="container-custom max-w-4xl text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Apply for Investment
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Building something exceptional? Tell us about it. We respond to all applications within 48 hours.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12">
          <div className="container-custom max-w-4xl">
            {/* Back Link */}
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Award className="text-accent" size={20} />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    Founder Information
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="founderName" className="text-sm font-medium text-foreground">
                      Your Name *
                    </label>
                    <input
                      id="founderName"
                      name="founderName"
                      type="text"
                      required
                      value={formData.founderName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="jane@startup.com"
                    />
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="text-accent" size={20} />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    Company Details
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="companyName" className="text-sm font-medium text-foreground">
                      Company Name *
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="Your Startup Inc."
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="website" className="text-sm font-medium text-foreground">
                      Website / LinkedIn
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="https://yourcompany.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="country" className="text-sm font-medium text-foreground">
                      Country *
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    >
                      <option value="">Select country</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Kenya">Kenya</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Egypt">Egypt</option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="Senegal">Senegal</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Other">Other African Country</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="stage" className="text-sm font-medium text-foreground">
                      Current Stage *
                    </label>
                    <select
                      id="stage"
                      name="stage"
                      required
                      value={formData.stage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    >
                      <option value="">Select stage</option>
                      <option value="Idea">Idea Stage</option>
                      <option value="Pre-Seed">Pre-Seed</option>
                      <option value="Seed">Seed</option>
                      <option value="Series A">Series A</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="sector" className="text-sm font-medium text-foreground">
                      Primary Sector *
                    </label>
                    <select
                      id="sector"
                      name="sector"
                      required
                      value={formData.sector}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    >
                      <option value="">Select sector</option>
                      <option value="Fintech">Fintech & Financial Services</option>
                      <option value="AgTech">Agriculture & Climate Tech</option>
                      <option value="HealthTech">Healthcare</option>
                      <option value="EdTech">Education & Skills</option>
                      <option value="Infrastructure">Digital Infrastructure</option>
                      <option value="Logistics">E-Commerce & Logistics</option>
                      <option value="DeepTech">Deep Tech / AI / Robotics</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="fundingAmount" className="text-sm font-medium text-foreground">
                      Amount Raising
                    </label>
                    <input
                      id="fundingAmount"
                      name="fundingAmount"
                      type="text"
                      value={formData.fundingAmount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="e.g., $5K - $100K"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="oneLiner" className="text-sm font-medium text-foreground">
                    One-Line Description *
                  </label>
                  <input
                    id="oneLiner"
                    name="oneLiner"
                    type="text"
                    required
                    maxLength={150}
                    value={formData.oneLiner}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    placeholder="We're building AI-powered logistics infrastructure for last-mile delivery in Africa"
                  />
                  <small className="text-xs text-muted-foreground">
                    Max 150 characters ({150 - formData.oneLiner.length} remaining)
                  </small>
                </div>
              </div>

              {/* Business Questions */}
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Lightbulb className="text-accent" size={20} />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    Tell Us More
                  </h2>
                </div>

                <div className="space-y-2">
                  <label htmlFor="whyNow" className="text-sm font-medium text-foreground">
                    Why Now? *
                  </label>
                  <textarea
                    id="whyNow"
                    name="whyNow"
                    required
                    rows={4}
                    value={formData.whyNow}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                    placeholder="What has changed that makes this solution possible or necessary today? (Market shifts, new technology, regulatory changes, etc.)"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="traction" className="text-sm font-medium text-foreground">
                    Current Traction
                  </label>
                  <textarea
                    id="traction"
                    name="traction"
                    rows={4}
                    value={formData.traction}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                    placeholder="Users, customers, revenue, partnerships, or other validation metrics. If pre-revenue, describe customer development work."
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="whyYou" className="text-sm font-medium text-foreground">
                    Why You? *
                  </label>
                  <textarea
                    id="whyYou"
                    name="whyYou"
                    required
                    rows={4}
                    value={formData.whyYou}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                    placeholder="What makes you the right founder to build this? (Domain expertise, relevant experience, unique insights, etc.)"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="additionalInfo" className="text-sm font-medium text-foreground">
                    Anything Else?
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    rows={3}
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                    placeholder="Pitch deck link, demo video, notable advisors, competitive advantages, etc."
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      className="w-5 h-5 mt-1 rounded border-border"
                    />
                    <p className="text-sm text-muted-foreground">
                      I confirm that the information provided is accurate and I agree to be contacted by Ventures Platform regarding this application.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg py-6 hover:glow-accent"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    We review all applications and respond within 48 hours. For urgent inquiries, email{" "}
                    <a href="mailto:founders@awakapital.vc" className="text-accent hover:underline">
                      founders@awakapital.vc
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
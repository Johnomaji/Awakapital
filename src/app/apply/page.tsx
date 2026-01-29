"use client"

import * as React from "react"
import { useAuth, type Application } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { 
  Briefcase, DollarSign, FileText, User, Mail, Phone, 
  Building, TrendingUp, Upload, CheckCircle, ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ApplicationPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [formData, setFormData] = React.useState({
    companyName: "",
    founderName: "",
    email: "",
    phone: "",
    industry: "",
    stage: "",
    fundingAmount: "",
    description: "",
  })

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/apply")
    }
  }, [user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push("/login")
      return
    }

    // Create new application
    const newApplication: Application = {
      id: `app-${Date.now()}`,
      userId: user.id,
      companyName: formData.companyName,
      founderName: formData.founderName,
      email: formData.email,
      phone: formData.phone,
      industry: formData.industry,
      stage: formData.stage,
      fundingAmount: formData.fundingAmount,
      description: formData.description,
      status: "pending",
      submittedAt: new Date().toISOString(),
    }

    // Save to localStorage
    const existingAppsStr = localStorage.getItem("vp_applications")
    const existingApps: Application[] = existingAppsStr ? JSON.parse(existingAppsStr) : []
    existingApps.push(newApplication)
    localStorage.setItem("vp_applications", JSON.stringify(existingApps))

    setIsSubmitted(true)
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
                  Application Submitted Successfully!
                </h1>
                <p className="text-xl text-muted-foreground">
                  Thank you for applying to Ventures Platform. We've received your application 
                  and our team will review it within 48 hours.
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
                      title: "Initial Review",
                      description: "Our team will review your application within 48 hours"
                    },
                    {
                      step: "2",
                      title: "Due Diligence",
                      description: "If selected, we'll conduct deeper analysis of your business"
                    },
                    {
                      step: "3",
                      title: "Decision",
                      description: "You'll receive our investment decision and next steps"
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

              {/* Support */}
              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Questions? Email us at{" "}
                  <a href="mailto:hello@venturesplatform.com" className="text-accent hover:underline">
                    hello@venturesplatform.com
                  </a>
                </p>
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
              Apply for Funding
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Tell us about your company and how we can help you build the future of Africa
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

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Company Information */}
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Building className="text-accent" size={20} />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    Company Information
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="companyName" className="text-sm font-medium text-foreground">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                        placeholder="Your Company Ltd"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="industry" className="text-sm font-medium text-foreground">
                      Industry *
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      required
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    >
                      <option value="">Select Industry</option>
                      <option value="Fintech">Fintech</option>
                      <option value="Health Tech">Health Tech</option>
                      <option value="Logistics">Logistics</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Education">Education</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Energy">Energy</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="stage" className="text-sm font-medium text-foreground">
                      Company Stage *
                    </label>
                    <select
                      id="stage"
                      name="stage"
                      required
                      value={formData.stage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    >
                      <option value="">Select Stage</option>
                      <option value="Idea">Idea Stage</option>
                      <option value="Pre-Seed">Pre-Seed</option>
                      <option value="Seed">Seed</option>
                      <option value="Series A">Series A</option>
                      <option value="Series B+">Series B+</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="fundingAmount" className="text-sm font-medium text-foreground">
                      Funding Amount Sought *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        id="fundingAmount"
                        name="fundingAmount"
                        type="text"
                        required
                        value={formData.fundingAmount}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                        placeholder="$100,000 - $500,000"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-foreground">
                    Company Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                    placeholder="Tell us about your company, the problem you're solving, your traction, and why you're seeking funding..."
                  />
                </div>
              </div>

              {/* Founder Information */}
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <User className="text-accent" size={20} />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    Founder Information
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="founderName" className="text-sm font-medium text-foreground">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        id="founderName"
                        name="founderName"
                        type="text"
                        required
                        value={formData.founderName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                        placeholder="+234 XXX XXX XXXX"
                      />
                    </div>
                  </div>
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
                      I confirm that all information provided is accurate and I agree to Ventures Platform's{" "}
                      <Link href="#" className="text-accent hover:underline">terms and conditions</Link>.
                      I understand that this application will be reviewed and I'll be contacted within 48 hours.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg py-6 hover:glow-accent"
                  >
                    Submit Application
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By submitting this application, you agree to our Privacy Policy and Terms of Service
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
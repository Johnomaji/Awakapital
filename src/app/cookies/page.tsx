import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        <div className="container-custom max-w-4xl py-16">
          {/* Back Link */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Cookie Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 30, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                1. What Are Cookies?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, understanding how you use our site, and improving our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                2. How We Use Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Awakapital uses cookies for several purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Authentication:</strong> To keep you logged in securely</li>
                <li><strong>Preferences:</strong> To remember your settings and choices</li>
                <li><strong>Analytics:</strong> To understand how visitors use our site</li>
                <li><strong>Performance:</strong> To optimize website functionality</li>
                <li><strong>Security:</strong> To protect against fraudulent activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                3. Types of Cookies We Use
              </h2>

              <div className="space-y-6">
                <div className="p-6 bg-card border border-border rounded-lg">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Essential Cookies (Required)
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    These cookies are necessary for the website to function properly. They enable core functionality such as authentication, security, and accessibility.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground"><strong>Examples:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>Session management cookies</li>
                      <li>Authentication tokens</li>
                      <li>Security cookies</li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    <strong>Duration:</strong> Session or up to 30 days
                  </p>
                </div>

                <div className="p-6 bg-card border border-border rounded-lg">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Functional Cookies (Optional)
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground"><strong>Examples:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>Language preferences</li>
                      <li>Theme selection (dark/light mode)</li>
                      <li>Dashboard layout preferences</li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    <strong>Duration:</strong> Up to 1 year
                  </p>
                </div>

                <div className="p-6 bg-card border border-border rounded-lg">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Analytics Cookies (Optional)
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground"><strong>What we track:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>Pages visited</li>
                      <li>Time spent on pages</li>
                      <li>Click patterns</li>
                      <li>Device and browser type</li>
                      <li>Geographic location (country/city level)</li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    <strong>Duration:</strong> Up to 2 years
                  </p>
                </div>

                <div className="p-6 bg-card border border-border rounded-lg">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Performance Cookies (Optional)
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    These cookies help us improve website performance and user experience by measuring load times and identifying errors.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground"><strong>Examples:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>Page load time monitoring</li>
                      <li>Error tracking</li>
                      <li>Performance metrics</li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    <strong>Duration:</strong> Up to 1 year
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                4. Third-Party Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may use third-party services that set cookies on your device:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-card border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Vercel Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    For website performance monitoring and analytics. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Privacy Policy</a>
                  </p>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">MongoDB Atlas</h4>
                  <p className="text-sm text-muted-foreground">
                    For secure data storage and management. <a href="https://www.mongodb.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Privacy Policy</a>
                  </p>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Resend</h4>
                  <p className="text-sm text-muted-foreground">
                    For email delivery services. <a href="https://resend.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Privacy Policy</a>
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                5. How to Control Cookies
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Browser Settings
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Most web browsers allow you to control cookies through their settings. You can:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>View cookies stored on your device</li>
                    <li>Delete existing cookies</li>
                    <li>Block all cookies</li>
                    <li>Block third-party cookies only</li>
                    <li>Receive notifications when cookies are set</li>
                  </ul>
                </div>

                <div className="p-6 bg-accent/10 border border-accent/20 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">Browser-Specific Instructions:</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</p>
                    <p><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</p>
                    <p><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</p>
                    <p><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and data stored</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Opt-Out Tools
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You can opt out of analytics cookies using these tools:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                    <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
                    <li><a href="http://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Digital Advertising Alliance Opt-Out</a></li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                6. Impact of Blocking Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                While you can block or delete cookies, please note that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Some features of our website may not function properly</li>
                <li>You may need to re-enter information more frequently</li>
                <li>Your preferences will not be saved</li>
                <li>You may see less relevant content</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Essential cookies cannot be disabled as they are necessary for the website to function.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                7. Cookie Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Different cookies have different retention periods:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent cookies:</strong> Remain until expiration date or manual deletion</li>
                <li><strong>Essential cookies:</strong> Up to 30 days</li>
                <li><strong>Analytics cookies:</strong> Up to 2 years</li>
                <li><strong>Preference cookies:</strong> Up to 1 year</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                8. Updates to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. We will notify you of significant changes by posting a notice on our website. Please review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                9. More Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For more information about how we handle your data, please see our:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-accent hover:underline">Terms of Service</Link></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                10. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="mt-4 p-6 bg-card border border-border rounded-lg">
                <p className="text-foreground mb-2"><strong>Email:</strong> <a href="mailto:founders@awakapital.vc" className="text-accent hover:underline">founders@awakapital.vc</a></p>
                <p className="text-foreground mb-2"><strong>Address:</strong> 28, Aminu Kano Crescent, Wuse 2, Abuja</p>
                <p className="text-foreground"><strong>Website:</strong> <a href="https://awakapital.vc" className="text-accent hover:underline">awakapital.vc</a></p>
              </div>
            </section>

            <section className="mt-12 p-6 bg-primary/10 border border-primary/20 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-2">Your Consent</h3>
              <p className="text-sm text-muted-foreground">
                By continuing to use our website, you consent to our use of cookies as described in this policy. You can withdraw your consent at any time by clearing your cookies or adjusting your browser settings.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
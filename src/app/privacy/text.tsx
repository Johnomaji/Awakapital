import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 30, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Awakapital ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                2. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect several types of information:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Personal Information
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When you create an account or submit an application, we collect: name, email address, phone number, company name, business information, and any other information you provide.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Usage Data
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We automatically collect: IP address, browser type, device information, pages visited, time spent on pages, and referring website.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Cookies and Tracking
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies and similar tracking technologies to improve your experience. See our Cookie Policy for more details.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use your information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Process and review funding applications</li>
                <li>Communicate about your application status</li>
                <li>Provide customer support</li>
                <li>Send important updates and notifications</li>
                <li>Improve our services and user experience</li>
                <li>Comply with legal obligations</li>
                <li>Detect and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                4. Data Sharing and Disclosure
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell your personal information. We may share your data with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Service Providers:</strong> Third-party vendors who help operate our platform (hosting, email, analytics)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
                <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                5. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures including encryption, secure servers, access controls, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                6. Your Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your data</li>
                <li><strong>Portability:</strong> Request transfer of your data</li>
                <li><strong>Objection:</strong> Object to certain data processing</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise these rights, contact us at <a href="mailto:privacy@awakapital.com" className="text-accent hover:underline">privacy@awakapital.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                7. Data Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Application data is retained for 7 years for legal and business purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                8. International Data Transfers
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Your data may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                9. Children's Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not intended for individuals under 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                10. Changes to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of significant changes by email or through a notice on our website. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                11. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="mt-4 p-6 bg-card border border-border rounded-lg">
                <p className="text-foreground mb-2"><strong>Email:</strong> <a href="mailto:privacy@awakapital.com" className="text-accent hover:underline">privacy@awakapital.com</a></p>
                <p className="text-foreground mb-2"><strong>Address:</strong> Awakapital, Lagos, Nigeria</p>
                <p className="text-foreground"><strong>Website:</strong> <a href="https://awakapital.com" className="text-accent hover:underline">awakapital.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
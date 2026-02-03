import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 30, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Awakapital's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                2. Description of Services
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Awakapital provides:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>A platform for founders to submit funding applications</li>
                <li>Investment evaluation and decision-making services</li>
                <li>Portfolio company support and resources</li>
                <li>Educational content and insights about venture capital</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                3. Eligibility
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You must be at least 18 years old and have the legal capacity to enter into contracts to use our services. By using our platform, you represent and warrant that you meet these requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                4. Account Registration
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To submit applications, you must create an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information as needed</li>
                <li>Maintain the security of your password</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of unauthorized use</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We reserve the right to suspend or terminate accounts that violate these terms or are inactive for extended periods.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                5. Application Submissions
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Accuracy of Information
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You represent and warrant that all information submitted in your application is true, accurate, and complete. Providing false or misleading information may result in immediate disqualification and account termination.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No Guarantee of Investment
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Submitting an application does not guarantee funding, investment, or any other form of financial commitment from Awakapital. All investment decisions are made at our sole discretion.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Confidentiality
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We treat application information as confidential and will not share it with third parties except as necessary for evaluation purposes or as required by law.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                6. Intellectual Property
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Our Content
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All content on our platform, including text, graphics, logos, images, and software, is the property of Awakapital and protected by copyright, trademark, and other intellectual property laws.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Your Content
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You retain ownership of content you submit. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display it for the purposes of evaluating your application and operating our services.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                7. Prohibited Activities
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Use our services for any illegal purpose</li>
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services</li>
                <li>Collect or harvest information about other users</li>
                <li>Submit spam or unsolicited communications</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                8. Investment Disclaimer
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Important Notice:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Awakapital is not a registered investment advisor or broker-dealer</li>
                <li>Nothing on our platform constitutes investment advice</li>
                <li>Investment decisions are made at our sole discretion</li>
                <li>Past performance does not guarantee future results</li>
                <li>All investments carry risk, including loss of capital</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Awakapital shall not be liable for any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Our total liability shall not exceed the amount you paid us in the past 12 months (if any)</li>
                <li>We are not responsible for any loss of data, business, profits, or opportunities</li>
                <li>We do not guarantee the accuracy, completeness, or timeliness of information on our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                10. Indemnification
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify, defend, and hold harmless Awakapital, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising from your use of our services, violation of these terms, or infringement of any rights of another party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                11. Termination
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these terms. Upon termination, your right to use our services will immediately cease. All provisions that should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                12. Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of Lagos, Nigeria.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                13. Changes to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify you of significant changes by email or through a notice on our website. Your continued use of our services after changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                14. Severability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                15. Entire Agreement
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms constitute the entire agreement between you and Awakapital regarding our services and supersede all prior agreements and understandings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                16. Contact Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-6 bg-card border border-border rounded-lg">
                <p className="text-foreground mb-2"><strong>Email:</strong> <a href="mailto:legal@awakapital.com" className="text-accent hover:underline">legal@awakapital.com</a></p>
                <p className="text-foreground mb-2"><strong>Address:</strong> Awakapital, Lagos, Nigeria</p>
                <p className="text-foreground"><strong>Website:</strong> <a href="https://awakapital.com" className="text-accent hover:underline">awakapital.com</a></p>
              </div>
            </section>

            <section className="mt-12 p-6 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Acknowledgment:</strong> By using Awakapital's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
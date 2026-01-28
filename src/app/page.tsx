import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ThesisSection } from "@/components/thesis-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { FoundersSection } from "@/components/founders-section";
import { NewsSection } from "@/components/news-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ThesisSection />
        <PortfolioSection />
        <FoundersSection />
        <NewsSection />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
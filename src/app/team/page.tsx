import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChatWidget } from "@/components/chat-widget"
import { Linkedin, Twitter, Mail, ExternalLink } from "lucide-react"

const teamMembers = [
  {
    name: "Farida Abubakar Nasir",
    role: "Founder & General Partner",
    department: "Leadership",
    image: "/farida.jpg",
    bio: "Farida founded Ventures Platform to back Africa's most innovative founders. With over 15 years of experience in venture capital and technology, she leads our investment strategy across the continent.",
    linkedin: "#",
    // twitter: "#",
    email: "phareedahnasir8@gmail.com",
    expertise: ["Venture Capital", "Strategy", "African Markets"],
  },
  {
    name: "Emmanuel Angbula Adakwu",
    role: "Director",
    department: "Investments",
    image: "/emmaawakapital.jpeg",
    bio: "Emmanuel leads our fintech and infrastructure investments. He has deep expertise in scaling technology companies across emerging markets.",
    linkedin: "#",
    // twitter: "#",
    email: "adakwuangbula@gmail.com",
    expertise: ["Fintech", "Infrastructure", "Due Diligence"],
  },
  // {
  //   name: "Dotun Olowoporoku",
  //   role: "Principal",
  //   department: "Investments",
  //   image: "/GJw7ir1WwAAWGm8.jpg",
  //   bio: "Dotun focuses on early-stage investments in health tech and logistics. He brings operational expertise from building multiple startups.",
  //   linkedin: "#",
  //   twitter: "#",
  //   email: "dotun@awakapital.com",
  //   expertise: ["Health Tech", "Logistics", "Operations"],
  // },
  // {
  //   name: "Oluwatobi Ajayi",
  //   role: "Investment Associate",
  //   department: "Investments",
  //   image: "/GJw7ir1WwAAWGm8.jpg",
  //   bio: "Tobi supports our portfolio companies with growth strategy and market expansion. She specializes in go-to-market strategies for African markets.",
  //   linkedin: "#",
  //   twitter: "#",
  //   email: "tobi@awakapital.com",
  //   expertise: ["Growth Strategy", "Market Expansion", "Analytics"],
  // },
  // {
  //   name: "Chinedu Eze",
  //   role: "Head of Platform",
  //   department: "Platform",
  //   image: "/GJw7ir1WwAAWGm8.jpg",
  //   bio: "Chinedu leads our platform team, providing operational support to portfolio companies including hiring, finance, and legal assistance.",
  //   linkedin: "#",
  //   twitter: "#",
  //   email: "chinedu@awakapital.com",
  //   expertise: ["Operations", "Talent", "Legal"],
  // },
  // {
  //   name: "Amina Yusuf",
  //   role: "Venture Partner",
  //   department: "Advisory",
  //   image: "/GJw7ir1WwAAWGm8.jpg",
  //   bio: "Amina advises on our climate tech and agriculture investments. She brings deep domain expertise in sustainable development.",
  //   linkedin: "#",
  //   twitter: "#",
  //   email: "amina@awakapital.com",
  //   expertise: ["Climate Tech", "Agriculture", "Impact"],
  // },
]

const departments = [
  {
    name: "Leadership",
    description: "Setting the vision and strategy for backing Africa's most innovative founders",
  },
  {
    name: "Investments",
    description: "Identifying and supporting exceptional companies across the continent",
  },
  {
    name: "Platform",
    description: "Providing operational support to help our portfolio companies scale",
  },
  {
    name: "Advisory",
    description: "Domain experts guiding our investment strategy in specialized sectors",
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-linear-to-br from-primary via-secondary to-primary text-primary-foreground relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold">
                  Our Team
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold">
                Meet the People Building{" "}
                <span className="text-accent">Africa's Future</span>
              </h1>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                We're a diverse team of investors, operators, and advisors with deep expertise 
                in African markets and a shared passion for backing exceptional founders.
              </p>
            </div>
          </div>
        </section>

        {/* Departments Overview */}
        <section className="py-16 bg-card/30">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept, index) => (
                <div
                  key={dept.name}
                  className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">
                    {dept.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dept.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members Grid */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-foreground mb-4">
                Our Team Members
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experienced investors and operators dedicated to building the future of African commerce
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-2xl transition-all duration-500 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Member Image */}
                  <div className="relative h-80 bg-linear-to-br from-primary/20 to-accent/20 overflow-hidden">
                    {/* Placeholder - replace with actual image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-40 h-40 bg-accent/20 rounded-full flex items-center justify-center text-5xl font-bold text-accent">
                        {/* {member.name.split(' ').map(n => n[0]).join('')} */}
                        <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover " />
                      </div>
                    </div>
                    
                    {/* Department Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-card/90 backdrop-blur-sm text-xs font-semibold rounded-full border border-border">
                        {member.department}
                      </span>
                    </div>

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-card via-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* Social Links */}
                      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
                        <a
                          href={member.linkedin}
                          className="w-10 h-10 bg-accent hover:bg-accent/90 rounded-full flex items-center justify-center text-accent-foreground transition-all hover:scale-110"
                          aria-label="LinkedIn"
                        >
                          <Linkedin size={18} />
                        </a>
                        {/* <a
                          href={member.twitter}
                          className="w-10 h-10 bg-accent hover:bg-accent/90 rounded-full flex items-center justify-center text-accent-foreground transition-all hover:scale-110"
                          aria-label="Twitter"
                        >
                          <Twitter size={18} />
                        </a> */}
                        <a
                          href={`mailto:${member.email}`}
                          className="w-10 h-10 bg-accent hover:bg-accent/90 rounded-full flex items-center justify-center text-accent-foreground transition-all hover:scale-110"
                          aria-label="Email"
                        >
                          <Mail size={18} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-accent transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-sm text-accent font-medium">{member.role}</p>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {member.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-muted text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-full -z-10 group-hover:bg-accent/10 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team CTA */}
        <section className="py-20 bg-card/30">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto bg-linear-to-br from-primary to-secondary rounded-2xl p-12 text-center text-primary-foreground relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 space-y-6">
                <h2 className="text-4xl font-display font-bold">
                  Join Our Team
                </h2>
                <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
                  We're always looking for talented individuals who share our passion for 
                  backing exceptional African founders. Explore our open positions.
                </p>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg hover:shadow-lg transition-all duration-300 group">
                  View Open Positions
                  <ExternalLink className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Founder-First",
                  description: "We exist to serve exceptional founders building transformative companies across Africa."
                },
                {
                  title: "Long-Term Thinking",
                  description: "We're patient capital, committed to supporting our founders through multiple stages of growth."
                },
                {
                  title: "Collaborative Excellence",
                  description: "We believe the best outcomes come from working together—with founders, co-investors, and our network."
                }
              ].map((value, index) => (
                <div
                  key={value.title}
                  className="text-center space-y-4 p-8 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-8 h-8 bg-accent rounded-full" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  )
}
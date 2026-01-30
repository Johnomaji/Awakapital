import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChatWidget } from "@/components/chat-widget"
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// This would come from a database or CMS in production
const article = {
  id: "1",
  title: "Venture on Platform: Empowering 11 Leading African Tech CEOs to Power Growth",
  category: "Portfolio News",
  date: "January 15, 2026",
  readTime: "8 min read",
  author: {
    name: "Kola Aina",
    role: "Founder & General Partner",
    avatar: "/team/kola-aina.jpg"
  },
  coverImage: "/blogimage1.png",
  content: `
# Introduction

The African tech ecosystem is experiencing unprecedented growth, driven by visionary founders who are building solutions to the continent's most pressing challenges. At Awakapital, we're proud to support 11 leading African tech CEOs who are not just building companies, but reshaping entire industries.

## The Power of Strategic Capital

In the past year, our portfolio companies have collectively raised over $500M in funding, expanded to 15+ countries, and served more than 10 million customers across Africa. This growth didn't happen by accident—it's the result of strategic capital deployment, operational support, and a deep understanding of African markets.

### Key Success Factors

1. **Market-First Approach**: Our founders understand their markets deeply. They don't import solutions from Silicon Valley; they build products specifically designed for African realities.

2. **Infrastructure Building**: Rather than waiting for infrastructure to exist, our portfolio companies are building it themselves—from payment rails to logistics networks.

3. **Regulatory Navigation**: Success in Africa requires working closely with regulators. Our founders have mastered this art, turning regulatory challenges into competitive advantages.

## Portfolio Spotlight: Paystack's Journey

One of our most celebrated exits, Paystack, exemplifies what's possible when African founders get the right support. From our initial investment to their $200M+ acquisition by Stripe, we provided:

- Strategic guidance on market expansion
- Introduction to key enterprise customers
- Support with regulatory compliance
- Follow-on funding at critical growth stages

## The Infrastructure Gap Opportunity

Africa's infrastructure gaps represent the continent's biggest opportunities. Our thesis centers on companies that:

- **Solve for non-consumption**: Serving markets that have never had access to certain products or services
- **Plug infrastructural gaps**: Building the rails that enable commerce
- **Democratize prosperity**: Making essential services accessible to the masses
- **Reduce delivery costs**: Leveraging technology to dramatically lower costs

## Lessons from the Field

### 1. Patience is a Virtue

Building in Africa takes time. Infrastructure doesn't appear overnight, and behavioral change happens gradually. The most successful founders in our portfolio share a long-term mindset.

### 2. Local Expertise Matters

Every African market is unique. What works in Nigeria may not work in Kenya. Our founders who've scaled successfully across multiple markets have done so by building local teams with deep market knowledge.

### 3. Unit Economics are King

In a capital-scarce environment, companies that achieve strong unit economics early have a massive advantage. Our portfolio companies that have scaled sustainably all figured out their economics before aggressive expansion.

## Looking Ahead: The Next Wave

We're incredibly excited about the next wave of African innovation. Key areas we're watching include:

- **Climate Tech**: Solutions addressing Africa's unique climate challenges
- **Health Tech**: Democratizing access to quality healthcare
- **EdTech**: Transforming education delivery and outcomes
- **Fintech 2.0**: Beyond payments into insurance, wealth management, and more

## Supporting Our Founders

Our support goes beyond capital. We provide:

- **Network Access**: Connections to customers, partners, and follow-on investors
- **Operational Expertise**: Help with hiring, scaling, and market expansion
- **Strategic Guidance**: Board-level support and strategic planning
- **Community**: Access to a network of fellow founders facing similar challenges

## The Path Forward

As Africa's tech ecosystem matures, we're seeing more sophisticated investors, better infrastructure, and more ambitious founders. The next decade will see the emergence of truly pan-African tech giants.

Our role is to identify and support the founders building these companies—providing not just capital, but the strategic support needed to turn ambitious visions into reality.

## Conclusion

The 11 CEOs we're backing represent the future of African commerce. They're solving real problems, building sustainable businesses, and creating thousands of jobs across the continent.

We're honored to be part of their journey and excited about what the future holds for African innovation.

---

**Want to learn more about our portfolio?** [View our full portfolio](/portfolio) or [get in touch](/contact) to discuss potential partnerships.
  `,
  tags: ["Portfolio", "Growth", "African Tech", "Investment"],
  relatedArticles: [
    {
      id: "2",
      title: "Identifying AI and Machine Learning Opportunities Beyond Product Strategy",
      category: "Insights",
      image: "/blogimage2.png",
      slug: "ai-ml-opportunities-africa"
    },
    {
      id: "3",
      title: "Africa's Wealth Investment Class with PiggyVest Returns",
      category: "Market Analysis",
      image: "/blogimage3.png",
      slug: "piggyvest-wealth-investment"
    }
  ]
}

export default function BlogArticle() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-card/30 border-b border-border">
          <div className="container-custom max-w-4xl">
            {/* Back Button */}
            <Link 
              href="/#stories"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Stories
            </Link>

            {/* Category */}
            <div className="mb-4">
              <span className="px-4 py-2 bg-accent/10 text-accent text-sm font-semibold rounded-full">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                className="gap-2"
              >
                <Share2 size={16} />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="gap-2"
              >
                <Bookmark size={16} />
                Save
              </Button>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        <section className="py-12">
          <div className="container-custom max-w-4xl">
            <div className="aspect-video bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden">
              {/* Replace with actual image */}
              <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container-custom max-w-3xl">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <div 
                className="text-foreground leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }}
              />
            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-4 py-2 bg-muted hover:bg-accent/10 text-sm rounded-full transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-8 bg-card border border-border rounded-2xl">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
                  <img src={article.author.avatar} alt={article.author.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-1">
                    {article.author.name}
                  </h3>
                  <p className="text-sm text-accent mb-3">{article.author.role}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Leading Awakapital's investment strategy across Africa, with a focus on
                    backing exceptional founders building transformative companies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-card/30">
          <div className="container-custom max-w-6xl">
            <h2 className="text-3xl font-display font-bold text-foreground mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {article.relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-56 bg-linear-to-br from-primary/20 to-accent/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img src={related.image} alt={related.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                        {related.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container-custom max-w-4xl">
            <div className="bg-linear-to-br from-primary to-secondary rounded-2xl p-12 text-center text-primary-foreground">
              <h2 className="text-3xl font-display font-bold mb-4">
                Want to Build the Future of Africa?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                We're always looking for exceptional founders solving big problems. 
                Tell us what you're building.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8"
                >
                  Submit Your Pitch
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  )
}

// import { Navigation } from "@/components/navigation"
// import { Footer } from "@/components/footer"
// import { ChatWidget } from "@/components/chat-widget"
// import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from "lucide-react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { notFound } from "next/navigation"
// import { getArticleBySlug, getRelatedArticles, blogArticles } from "@/lib/blog-data"

// // Generate static params for all blog articles
// export async function generateStaticParams() {
//   return blogArticles.map((article) => ({
//     slug: article.slug,
//   }))
// }

// export default function BlogArticlePage({ params }: { params: { slug: string } }) {
//   const article = getArticleBySlug(params.slug)

//   if (!article) {
//     notFound()
//   }

//   const relatedArticles = getRelatedArticles(article.slug)

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
      
//       <main className="pt-20">
//         {/* Hero Section */}
//         <section className="py-12 bg-card/30 border-b border-border">
//           <div className="container-custom max-w-4xl">
//             {/* Back Button */}
//             <Link 
//               href="/#stories"
//               className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
//             >
//               <ArrowLeft size={16} />
//               Back to Stories
//             </Link>

//             {/* Category */}
//             <div className="mb-4">
//               <span className="px-4 py-2 bg-accent/10 text-accent text-sm font-semibold rounded-full">
//                 {article.category}
//               </span>
//             </div>

//             {/* Title */}
//             <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
//               {article.title}
//             </h1>

//             {/* Meta Info */}
//             <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
//               <div className="flex items-center gap-2">
//                 <User size={16} />
//                 <span>{article.author.name}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Calendar size={16} />
//                 <span>{article.date}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Clock size={16} />
//                 <span>{article.readTime}</span>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center gap-4">
//               <Button 
//                 variant="outline" 
//                 size="sm"
//                 className="gap-2"
//               >
//                 <Share2 size={16} />
//                 Share
//               </Button>
//               <Button 
//                 variant="outline" 
//                 size="sm"
//                 className="gap-2"
//               >
//                 <Bookmark size={16} />
//                 Save
//               </Button>
//             </div>
//           </div>
//         </section>

//         {/* Cover Image */}
//         <section className="py-12">
//           <div className="container-custom max-w-4xl">
//             <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden">
//               {/* Replace with actual image */}
//               <div className="w-full h-full flex items-center justify-center">
//                 <div className="text-6xl font-bold text-accent/20">VP</div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Article Content */}
//         <section className="py-12">
//           <div className="container-custom max-w-3xl">
//             <article className="prose prose-lg dark:prose-invert max-w-none">
//               <div 
//                 className="text-foreground leading-relaxed space-y-6 [&>h1]:text-3xl [&>h1]:font-display [&>h1]:font-bold [&>h1]:mt-12 [&>h1]:mb-6 [&>h2]:text-2xl [&>h2]:font-display [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-display [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3 [&>p]:mb-6 [&>ul]:my-6 [&>ul]:space-y-2 [&>ol]:my-6 [&>ol]:space-y-2 [&>strong]:text-foreground [&>strong]:font-semibold"
//                 dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }}
//               />
//             </article>

//             {/* Tags */}
//             <div className="mt-12 pt-8 border-t border-border">
//               <h3 className="text-sm font-semibold text-muted-foreground mb-4">Tags:</h3>
//               <div className="flex flex-wrap gap-2">
//                 {article.tags.map((tag) => (
//                   <span 
//                     key={tag}
//                     className="px-4 py-2 bg-muted hover:bg-accent/10 text-sm rounded-full transition-colors cursor-pointer"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Author Bio */}
//             <div className="mt-12 p-8 bg-card border border-border rounded-2xl">
//               <div className="flex items-start gap-6">
//                 <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
//                   <span className="text-2xl font-bold text-accent">
//                     {article.author.name.split(' ').map(n => n[0]).join('')}
//                   </span>
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-display font-bold text-foreground mb-1">
//                     {article.author.name}
//                   </h3>
//                   <p className="text-sm text-accent mb-3">{article.author.role}</p>
//                   <p className="text-muted-foreground leading-relaxed">
//                     Leading Ventures Platform's investment strategy across Africa, with a focus on 
//                     backing exceptional founders building transformative companies.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Related Articles */}
//         {relatedArticles.length > 0 && (
//           <section className="py-16 bg-card/30">
//             <div className="container-custom max-w-6xl">
//               <h2 className="text-3xl font-display font-bold text-foreground mb-8">
//                 Related Articles
//               </h2>
//               <div className="grid md:grid-cols-2 gap-8">
//                 {relatedArticles.map((related) => (
//                   <Link
//                     key={related.id}
//                     href={`/blog/${related.slug}`}
//                     className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300"
//                   >
//                     {/* Image */}
//                     <div className="relative h-56 bg-gradient-to-br from-primary/20 to-accent/20">
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="text-4xl font-bold text-accent/20">VP</div>
//                       </div>
//                       <div className="absolute top-4 left-4">
//                         <span className="px-3 py-1.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
//                           {related.category}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <div className="p-6">
//                       <h3 className="text-xl font-display font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
//                         {related.title}
//                       </h3>
//                       <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
//                         {related.excerpt}
//                       </p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </section>
//         )}

//         {/* CTA Section */}
//         <section className="py-16">
//           <div className="container-custom max-w-4xl">
//             <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-12 text-center text-primary-foreground">
//               <h2 className="text-3xl font-display font-bold mb-4">
//                 Want to Build the Future of Africa?
//               </h2>
//               <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
//                 We're always looking for exceptional founders solving big problems. 
//                 Tell us what you're building.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link href="/apply">
//                   <Button 
//                     size="lg"
//                     className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8"
//                   >
//                     Submit Your Pitch
//                   </Button>
//                 </Link>
//                 <Link href="/#portfolio">
//                   <Button 
//                     size="lg"
//                     variant="outline"
//                     className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
//                   >
//                     View Portfolio
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//       <ChatWidget />
//     </div>
//   )
// }
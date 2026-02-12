import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChatWidget } from "@/components/chat-widget"
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { getArticleBySlug, getRelatedArticles, blogArticles } from "@/lib/blog-data"

// Generate static params for all blog articles
export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(article.slug)

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
              {article.coverImage ? (
                <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-6xl font-bold text-accent/20">AK</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container-custom max-w-3xl">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <div
                className="text-foreground leading-relaxed space-y-6 [&>h1]:text-3xl [&>h1]:font-display [&>h1]:font-bold [&>h1]:mt-12 [&>h1]:mb-6 [&>h2]:text-2xl [&>h2]:font-display [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-display [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3 [&>p]:mb-6 [&>ul]:my-6 [&>ul]:space-y-2 [&>ol]:my-6 [&>ol]:space-y-2 [&>strong]:text-foreground [&>strong]:font-semibold"
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
                  {article.author.avatar ? (
                    <img src={article.author.avatar} alt={article.author.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-accent">
                      {article.author.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-1">
                    {article.author.name}
                  </h3>
                  <p className="text-sm text-accent mb-3">{article.author.role}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Leading Awakapital&apos;s investment strategy across Africa, with a focus on
                    backing exceptional founders building transformative companies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 bg-card/30">
            <div className="container-custom max-w-6xl">
              <h2 className="text-3xl font-display font-bold text-foreground mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-56 bg-linear-to-br from-primary/20 to-accent/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {related.coverImage ? (
                          <img src={related.coverImage} alt={related.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-4xl font-bold text-accent/20">AK</div>
                        )}
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
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {related.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16">
          <div className="container-custom max-w-4xl">
            <div className="bg-linear-to-br from-primary to-secondary rounded-2xl p-12 text-center text-primary-foreground">
              <h2 className="text-3xl font-display font-bold mb-4">
                Want to Build the Future of Africa?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                We&apos;re always looking for exceptional founders solving big problems.
                Tell us what you&apos;re building.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8"
                  >
                    Submit Your Pitch
                  </Button>
                </Link>
                <Link href="/#portfolio">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    View Portfolio
                  </Button>
                </Link>
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

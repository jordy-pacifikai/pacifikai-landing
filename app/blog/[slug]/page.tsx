import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/lib/blog-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article introuvable | PACIFIK'AI" };
  }

  return {
    title: `${article.title} | PACIFIK'AI`,
    description: article.description,
    openGraph: {
      title: `${article.title} | PACIFIK'AI`,
      description: article.description,
      type: "article",
      locale: "fr_PF",
      publishedTime: article.date,
      authors: ["PACIFIK'AI"],
      images: [
        {
          url: "/assets/og-image.png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | PACIFIK'AI`,
      description: article.description,
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  Tendances: "text-[#f97066] bg-[#f97066]/10 border-[#f97066]/20",
  "Cas Concrets": "text-[#14b8a6] bg-[#14b8a6]/10 border-[#14b8a6]/20",
  "Focus Polynésie": "text-[#f5c542] bg-[#f5c542]/10 border-[#f5c542]/20",
  "Guides Pratiques": "text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/20",
  Comparatifs: "text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/20",
};

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = articles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3);

  const categoryColor =
    CATEGORY_COLORS[article.category] ??
    "text-white/60 bg-white/5 border-white/10";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Organization",
      name: "PACIFIK'AI",
      url: "https://pacifikai.com",
    },
    publisher: {
      "@type": "Organization",
      name: "PACIFIK'AI",
      logo: {
        "@type": "ImageObject",
        url: "https://pacifikai.com/assets/logo.png",
      },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: `https://pacifikai.com/blog/${slug}`,
    inLanguage: "fr",
    image: "https://pacifikai.com/assets/og-image.png",
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-[#f97066]/4 blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-[#14b8a6]/3 blur-[100px]" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="relative z-10 pt-28 pb-24 px-4">
        {/* Breadcrumb */}
        <div className="max-w-3xl mx-auto mb-8">
          <nav className="flex items-center gap-2 text-xs text-text-dim">
            <Link href="/" className="hover:text-text transition-colors">
              Accueil
            </Link>
            <span className="opacity-40">/</span>
            <Link href="/blog" className="hover:text-text transition-colors">
              Blog
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-text-secondary truncate max-w-[200px]">
              {article.title}
            </span>
          </nav>
        </div>

        {/* Article header */}
        <header className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase border ${categoryColor}`}
            >
              {article.category}
            </span>
            <span className="text-xs text-text-dim">
              {formatDate(article.date)}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6 text-text">
            {article.title}
          </h1>

          <p className="text-text-secondary text-lg leading-relaxed">
            {article.description}
          </p>

          <div className="mt-6 h-px bg-gradient-to-r from-[#f97066]/30 via-border to-transparent" />
        </header>

        {/* Article body */}
        <article className="max-w-3xl mx-auto">
          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* CTA block */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="glass rounded-2xl p-8 md:p-10 border border-[#f97066]/15 text-center">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#f97066] mb-3">
              Passez à l&apos;action
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Prêt à transformer votre entreprise ?
            </h2>
            <p className="text-text-secondary text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Discutons de votre projet. Devis gratuit et sans engagement —
              réponse sous 24h.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#f97066] text-white font-semibold text-sm hover:bg-[#f97066]/90 transition-colors"
              >
                Demander un devis gratuit
              </a>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 text-text-secondary font-medium text-sm hover:border-white/20 hover:text-text transition-colors"
              >
                Retour au blog
              </Link>
            </div>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="max-w-5xl mx-auto mt-20">
            <h2 className="font-display text-2xl font-bold mb-8 text-center">
              Articles similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((rel) => {
                const relColor =
                  CATEGORY_COLORS[rel.category] ??
                  "text-white/60 bg-white/5 border-white/10";
                return (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group glass glass-hover rounded-xl p-5 border border-white/[0.06] hover:border-[#f97066]/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase border ${relColor} mb-3`}
                    >
                      {rel.category}
                    </span>
                    <h3 className="font-semibold text-sm leading-snug group-hover:text-[#f97066] transition-colors">
                      {rel.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[#f97066] text-xs font-semibold mt-3 group-hover:gap-2 transition-all">
                      Lire
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M1 6h10M7 2l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Article prose styles */}
      <style>{`
        .article-prose h1,
        .article-prose h2,
        .article-prose h3,
        .article-prose h4 {
          font-family: var(--font-display);
          font-weight: 700;
          line-height: 1.25;
          margin-top: 2em;
          margin-bottom: 0.75em;
          color: var(--color-text);
        }
        .article-prose h1 { font-size: 1.875rem; }
        .article-prose h2 { font-size: 1.5rem; color: var(--color-text); padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .article-prose h3 { font-size: 1.125rem; color: var(--color-text); }
        .article-prose p {
          margin-bottom: 1.25em;
          color: var(--color-text-secondary);
          line-height: 1.75;
          font-size: 1rem;
        }
        .article-prose ul,
        .article-prose ol {
          margin-bottom: 1.25em;
          padding-left: 1.5rem;
          color: var(--color-text-secondary);
          line-height: 1.75;
        }
        .article-prose ul { list-style-type: disc; }
        .article-prose ol { list-style-type: decimal; }
        .article-prose li { margin-bottom: 0.4em; }
        .article-prose a {
          color: #f97066;
          text-decoration: underline;
          text-decoration-color: rgba(249,112,102,0.3);
          transition: text-decoration-color 0.2s;
        }
        .article-prose a:hover { text-decoration-color: #f97066; }
        .article-prose strong { color: var(--color-text); font-weight: 600; }
        .article-prose em { color: var(--color-text-secondary); font-style: italic; }
        .article-prose blockquote {
          border-left: 3px solid #f97066;
          padding-left: 1.25rem;
          margin: 1.5em 0;
          color: var(--color-text-secondary);
          font-style: italic;
        }
        .article-prose table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5em;
          font-size: 0.9rem;
        }
        .article-prose th {
          background: rgba(249,112,102,0.08);
          color: var(--color-text);
          font-weight: 600;
          padding: 0.6rem 0.75rem;
          text-align: left;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .article-prose td {
          padding: 0.6rem 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: var(--color-text-secondary);
        }
        .article-prose tr:last-child td { border-bottom: none; }
        .article-prose code {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          padding: 0.1em 0.4em;
          font-size: 0.85em;
          color: #14b8a6;
          font-family: monospace;
        }
        .article-prose pre {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 1rem;
          overflow-x: auto;
          margin-bottom: 1.5em;
        }
        .article-prose pre code {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.875rem;
        }
        .article-prose hr {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 2em 0;
        }
        .article-prose .stats-grid,
        .article-prose .comparison-table,
        .article-prose .highlight-box,
        .article-prose .cta-box,
        .article-prose .info-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 1.5em;
        }
      `}</style>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

const FOOTER_SECTIONS = [
  {
    title: "Solutions",
    links: [
      { label: "Chatbots IA", href: "/services/chatbots" },
      { label: "Automatisation", href: "/services/workflows" },
      { label: "Extraction docs", href: "/services/documents" },
      { label: "Marketing IA", href: "/services/marketing" },
    ],
  },
  {
    title: "Création",
    links: [
      { label: "Sites web", href: "/services/landing-pages" },
      { label: "Applications", href: "/services/apps" },
      { label: "Conseil", href: "/services/conseil" },
      { label: "Intégrations API", href: "/services/api" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Calculateur ROI", href: "/calculateur-roi" },
      { label: "Offre site web", href: "/offre-site-web" },
      { label: "Tarifs", href: "/tarifs" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "CGU", href: "/cgu" },
      { label: "Confidentialité", href: "/confidentialite" },
    ],
  },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) return;
    setStatus("loading");
    try {
      const resp = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await resp.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="md:col-span-2">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-text-dim mb-4">
        Restez informé
      </h4>
      {status === "success" ? (
        <p className="text-sm text-[#14b8a6] font-medium">
          Merci ! Vous êtes bien inscrit.
        </p>
      ) : (
        <>
          <form onSubmit={handleSubmit} noValidate className="flex gap-2">
            <label htmlFor="footer-email" className="sr-only">
              Votre email
            </label>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              className="flex-1 min-h-[40px] rounded-lg border border-white/10 bg-bg px-3 py-2 text-sm text-text placeholder:text-text-dim outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 transition"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="whitespace-nowrap rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-[#14b8a6] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {status === "loading" ? "…" : "S'inscrire"}
            </button>
          </form>
          {status === "error" && (
            <p className="mt-1.5 text-xs text-red-400">Erreur, réessayez.</p>
          )}
          <p className="mt-2 text-[11px] text-text-dim">
            Pas de spam. Désabonnement en 1 clic.
          </p>
        </>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Newsletter banner */}
        <div className="mb-12 rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-8 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <h3 className="font-display text-lg font-semibold text-text mb-1">
              Restez à la pointe de l&rsquo;IA en Polynésie
            </h3>
            <p className="text-sm text-text-secondary">
              Conseils pratiques, outils IA, offres exclusives — chaque mois dans votre boîte.
            </p>
          </div>
          <NewsletterForm />
        </div>

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-lg mb-3">PACIFIK&apos;AI</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4 max-w-[220px]">
              Agence digitale &amp; IA à Papeete, Tahiti. Sites web, chatbots,
              automatisation et conseil pour entreprises en Polynésie française.
            </p>
            <p className="text-text-dim text-xs">
              Tahiti &middot; Moorea &middot; Bora Bora
            </p>
          </div>

          {/* Link sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-dim mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {section.title === "Légal" && (
                  <li>
                    <a
                      href="mailto:contact@pacifikai.com"
                      className="text-sm text-accent hover:underline underline-offset-4"
                    >
                      contact@pacifikai.com
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-dim text-xs">
            &copy; {new Date().getFullYear()} PACIFIK&apos;AI. Tous droits
            réservés.
          </p>
          <p className="text-text-dim text-xs">
            Polynésie française &middot; SIRET en cours
          </p>
        </div>
      </div>
    </footer>
  );
}

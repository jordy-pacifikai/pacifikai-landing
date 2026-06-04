"use client";

import { useState } from "react";
import SectionReveal from "@/components/effects/SectionReveal";
import MagneticButton from "@/components/effects/MagneticButton";

type Plan = {
  name: string;
  tagline: string;
  priceMonth: string;
  priceYear: string;
  yearEq: string;
  featured: boolean;
  badge?: string;
  features: string[];
  cta: string;
};

const PLANS: Plan[] = [
  {
    name: "Présence",
    tagline: "Le site complet, tout inclus.",
    priceMonth: "4 900",
    priceYear: "49 000",
    yearEq: "≈ 4 080 XPF/mois",
    featured: true,
    badge: "Le plus choisi",
    features: [
      "Site complet, jusqu'à 5 pages standards",
      "Design sur mesure, 100 % responsive",
      "Hébergement premium + SSL + nom de domaine",
      "SEO local + Google My Business",
      "Google Maps + avis Google intégrés",
      "Formulaire de contact + FAQ",
      "Maintenance, sécurité & sauvegardes",
      "Petites modifications de contenu incluses",
      "Support réactif (e-mail + WhatsApp)",
    ],
    cta: "Lancer mon site",
  },
  {
    name: "Croissance",
    tagline: "Pour aller plus loin, avec l'IA.",
    priceMonth: "9 900",
    priceYear: "99 000",
    yearEq: "≈ 8 250 XPF/mois",
    featured: false,
    features: [
      "Tout Présence, plus :",
      "Jusqu'à 8–10 pages + blog / actualités",
      "Réservation & prise de RDV en ligne",
      "Newsletter / emailing intégré",
      "Bilingue & reo Tahiti",
      "Assistant IA MANA 24/7 inclus",
      "SEO avancé + suivi mensuel",
      "Support prioritaire",
    ],
    cta: "Choisir Croissance",
  },
];

const ADDONS = [
  { name: "Assistant IA MANA 24/7", price: "+3 900 / mois" },
  { name: "Bilingue & reo Tahiti", price: "+1 200 / mois" },
  { name: "Réservation & prise de RDV", price: "+2 500 / mois" },
  { name: "Newsletter & emailing", price: "+1 500 / mois" },
  { name: "Page ou section en plus", price: "+900 / mois" },
  { name: "Boutique en ligne", price: "sur devis" },
];

const COMPARE = [
  { label: "Engagement", us: "Aucun — résiliable à tout moment", them: "Souvent 12 mois (contrat)", win: true },
  { label: "Frais de mise en place", us: "0 XPF", them: "Variable selon prestataire", win: true },
  { label: "Site multi-pages", us: "Inclus dès 4 900/mois", them: "Souvent à partir d'un palier supérieur", win: true },
  { label: "Avis Google, Maps, SEO, FAQ", us: "Inclus", them: "Souvent en modules payants", win: true },
  { label: "Chatbot IA", us: "Disponible (agence IA)", them: "Souvent en option ou forfait supérieur", win: true },
  { label: "Équipe locale à Tahiti", us: "Oui", them: "Selon prestataire", win: false },
];

const REASSURANCE = [
  {
    titre: "Sans engagement",
    desc: "Vous gardez si ça marche. Résiliable à tout moment, sans pénalité. À la résiliation, vous récupérez votre contenu et votre nom de domaine (le code reste à PACIFIK'AI, export possible sur devis).",
  },
  {
    titre: "Tout inclus dès le départ",
    desc: "Avis Google, Maps, SEO, FAQ : déjà dedans dans Présence. Pas de suppléments cachés au fil de l'eau — le prix affiché est le prix payé.",
  },
  {
    titre: "On s'occupe de tout",
    desc: "Hébergement, sécurité, sauvegardes, bugs, mises à jour : géré. Vous, vous gérez votre business.",
  },
];

export default function SiteAbonnementSection() {
  const [annual, setAnnual] = useState(false);

  const toggleBtn = (active: boolean) =>
    `px-5 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-accent/40 ${
      active ? "bg-accent text-bg" : "text-text-secondary hover:text-text"
    }`;

  return (
    <section id="site-abonnement" className="section-padding relative overflow-hidden">
      <div
        className="absolute pointer-events-none rounded-full blur-[120px] opacity-[0.10]"
        style={{ width: 560, height: 560, background: "#f97066", top: "0%", left: "50%", transform: "translateX(-50%)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <SectionReveal>
          <div className="text-center mb-10 reveal-child">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-soft border border-accent/20 text-accent text-xs font-medium tracking-[0.15em] uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
              Site web · sans engagement · agence IA
            </span>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-5">
              Votre site web professionnel.
              <br className="hidden sm:block" />{" "}
              <span className="gradient-text-coral">Sans engagement.</span>
            </h2>
            <p className="text-text-secondary text-[clamp(1rem,2vw,1.15rem)] max-w-2xl mx-auto leading-relaxed">
              Un site pro complet à partir de <strong className="text-text">4 900 XPF/mois</strong>, tout
              inclus. Vous partez quand vous voulez — pas de contrat 12 mois, pas
              de frais de mise en place.
            </p>
          </div>
        </SectionReveal>

        {/* Billing toggle */}
        <SectionReveal>
          <div className="reveal-child flex items-center justify-center gap-1 p-1 rounded-full bg-bg/60 border border-border w-fit mx-auto mb-10">
            <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)} className={toggleBtn(!annual)}>
              Mensuel
            </button>
            <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)} className={toggleBtn(annual)}>
              Annuel
              <span className="ml-2 text-[0.65rem] px-1.5 py-0.5 rounded-full bg-lagoon text-bg font-semibold">
                2 mois offerts
              </span>
            </button>
          </div>
        </SectionReveal>

        {/* Plans */}
        <SectionReveal stagger={0.12}>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                data-tilt
                className={`reveal-child glass rounded-3xl p-8 relative flex flex-col ${
                  plan.featured ? "border-2 border-accent/30 ring-1 ring-accent/10" : "border border-border"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-accent text-bg text-xs font-semibold tracking-wide whitespace-nowrap">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <h3 className="font-display text-xl mb-1">{plan.name}</h3>
                <p className="text-text-dim text-sm mb-5">{plan.tagline}</p>

                <div className="mb-1">
                  <span className="font-display text-[clamp(2.2rem,6vw,3rem)] gradient-text-coral">
                    {annual ? plan.priceYear : plan.priceMonth}
                  </span>
                  <span className="text-text-dim text-sm ml-2">XPF {annual ? "/ an" : "/ mois"}</span>
                </div>
                <p className="text-text-dim text-xs mb-6 min-h-4">{annual ? `${plan.yearEq} · 2 mois offerts` : "sans engagement"}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, fi) => {
                    const isHeader = fi === 0 && plan.name === "Croissance";
                    return (
                      <li key={fi} className={`flex items-start gap-2.5 text-sm ${isHeader ? "text-text font-medium" : "text-text-secondary"}`}>
                        {!isHeader && <span aria-hidden="true" className="text-lagoon mt-0.5 flex-shrink-0">✓</span>}
                        {feat}
                      </li>
                    );
                  })}
                </ul>

                <MagneticButton href="#contact" variant={plan.featured ? "primary" : "secondary"} className="w-full justify-center">
                  {plan.cta}
                </MagneticButton>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Add-ons */}
        <SectionReveal>
          <div className="reveal-child mt-6 max-w-4xl mx-auto glass rounded-3xl p-7 border border-border">
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-5">
              <p className="text-gold text-xs font-medium tracking-[0.2em] uppercase">Modules à la carte</p>
              <p className="text-text-dim text-xs">Activez seulement ce dont vous avez besoin · sans engagement</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ADDONS.map((a) => (
                <div key={a.name} className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-bg/50 border border-border">
                  <span className="text-sm text-text-secondary">{a.name}</span>
                  <span className="text-sm text-accent font-medium whitespace-nowrap">{a.price}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Comparison */}
        <SectionReveal>
          <div className="reveal-child mt-12">
            <h3 className="font-display text-[clamp(1.4rem,3.5vw,2rem)] text-center mb-2">
              PACIFIK&apos;AI <span className="text-text-dim">vs</span> forfait classique
            </h3>
            <p className="text-text-dim text-sm text-center mb-8">
              Même type de site, deux modèles très différents.
            </p>

            <div className="overflow-x-auto -mx-4 px-4">
              <div className="min-w-[560px] max-w-4xl mx-auto glass rounded-3xl border border-border overflow-hidden">
                <table className="w-full border-collapse text-sm">
                  <caption className="sr-only">
                    Comparaison entre l&apos;offre PACIFIK&apos;AI et un forfait classique du marché
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" className="p-4 text-left font-normal text-text-dim border-b border-border" />
                      <th scope="col" className="p-4 border-b border-l border-border bg-accent-soft text-center font-display text-accent">
                        PACIFIK&apos;AI
                      </th>
                      <th scope="col" className="p-4 border-b border-l border-border text-center font-normal text-text-dim">
                        Forfait classique
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE.map((row, i) => {
                      const b = i === COMPARE.length - 1 ? "" : "border-b";
                      return (
                        <tr key={i}>
                          <th scope="row" className={`p-4 text-left font-normal ${b} border-border text-text-secondary`}>
                            {row.label}
                          </th>
                          <td className={`p-4 ${b} border-l border-border bg-accent-soft/40 text-center ${row.win ? "text-text font-medium" : "text-text-secondary"}`}>
                            {row.win && <span aria-hidden="true" className="text-lagoon mr-1.5">✓</span>}
                            {row.us}
                          </td>
                          <td className={`p-4 ${b} border-l border-border text-center text-text-dim`}>
                            {row.them}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-text-dim text-[0.7rem] text-center mt-3 max-w-2xl mx-auto">
              Comparaison indicative basée sur des offres publiques observées en Polynésie française (juin 2026).
              Les périmètres, conditions et options varient selon le prestataire.
            </p>
          </div>
        </SectionReveal>

        {/* Reassurance */}
        <SectionReveal stagger={0.1}>
          <div className="grid sm:grid-cols-3 gap-5 mt-12">
            {REASSURANCE.map((r, i) => (
              <div key={i} className="reveal-child glass rounded-2xl p-6 border border-border">
                <h3 className="font-display text-base mb-2 text-text">{r.titre}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

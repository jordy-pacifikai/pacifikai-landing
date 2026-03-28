"use client";

import SectionReveal from "@/components/effects/SectionReveal";

const BEFORE = [
  "Répondre manuellement à chaque client",
  "Perdre des heures sur des tâches répétitives",
  "Disponible uniquement aux heures de bureau",
  "Erreurs humaines sur la saisie de données",
  "Suivi client approximatif sur Excel",
];

const AFTER = [
  "Chatbot IA répond 24/7 instantanément",
  "Workflows automatisés, zéro tâche répétitive",
  "Service continu, même la nuit et le week-end",
  "Extraction IA avec 98% de précision",
  "CRM intelligent avec relances automatiques",
];

export default function CompareSection() {
  return (
    <section id="compare" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16 reveal-child">
            <p className="text-lagoon text-sm font-medium tracking-[0.2em] uppercase mb-4">
              L&apos;impact
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight">
              Avant vs Après{" "}
              <span className="gradient-text-coral">PACIFIK&apos;AI</span>
            </h2>
          </div>
        </SectionReveal>

        <SectionReveal stagger={0.08}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="glass p-8 rounded-3xl border border-accent/10 reveal-child">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <h3 className="font-display text-lg text-accent">Sans automatisation IA</h3>
              </div>
              <ul className="space-y-4">
                {BEFORE.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-secondary text-sm">
                    <span className="text-accent/60 mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="glass p-8 rounded-3xl border border-lagoon/20 reveal-child">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-lagoon" />
                <h3 className="font-display text-lg text-lagoon">Avec PACIFIK&apos;AI</h3>
              </div>
              <ul className="space-y-4">
                {AFTER.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-secondary text-sm">
                    <span className="text-lagoon mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

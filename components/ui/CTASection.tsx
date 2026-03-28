"use client";

import { useState, FormEvent } from "react";
import SectionReveal from "@/components/effects/SectionReveal";
import MagneticButton from "@/components/effects/MagneticButton";

export default function CTASection() {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: wire to actual form handler / API
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-2xl mx-auto">
        <SectionReveal>
          <div className="glass rounded-3xl p-8 md:p-12 border border-accent/20 text-center reveal-child">
            <h2 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] leading-tight mb-4">
              On en <span className="gradient-text-coral">discute</span> ?
            </h2>
            <p className="text-text-secondary text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Écrivez-nous pour parler de votre projet et voir comment
              l&apos;IA peut transformer votre business.
            </p>

            {!submitted ? (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="text"
                    placeholder="Votre entreprise"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-border text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-accent/40 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-border text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-accent/40 transition-colors"
                  />
                  <MagneticButton variant="primary" className="px-6">
                    Réserver mon audit
                  </MagneticButton>
                </form>
                <p className="text-text-dim text-xs mt-4">
                  Réponse sous 24h · 100% gratuit · Aucun engagement
                </p>
              </>
            ) : (
              <div className="text-lagoon font-medium">
                ✓ Merci ! On vous recontacte très vite.
              </div>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import RotatingText from "@/components/effects/RotatingText";
import MagneticButton from "@/components/effects/MagneticButton";
import TrustBar from "@/components/ui/TrustBar";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { ssr: false });

export default function HeroSection() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge fade in
      gsap.from(badgeRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });
      // Subtitle
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.2,
      });
      // CTAs
      gsap.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 1.5,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen overflow-visible hero-mesh">
      {/* 3D Canvas — behind text, scrolls with page */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Text content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-4xl text-center">
          {/* Badge */}
          <div ref={badgeRef} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-soft border border-accent/20 text-accent text-xs font-medium tracking-[0.15em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
              Agence IA — Tahiti
            </span>
          </div>

          {/* Headline — dynamic rotating */}
          <RotatingText
            prefix="Transformez votre"
            words={[
              "business.",
              "marketing.",
              "service client.",
              "productivité.",
              "croissance.",
              "présence digitale.",
            ]}
            className="font-display font-bold text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-tight mb-6 text-text"
            interval={3000}
          />

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-text-secondary text-[clamp(1rem,2vw,1.25rem)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Sites web, applications, automatisation, agents IA et
            stratégie digitale pour les entreprises de Tahiti et
            Polynésie française.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex gap-4 justify-center flex-wrap">
            <MagneticButton href="#services" variant="primary">
              Découvrir nos solutions
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Nous contacter
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Trust bar — inside hero so it shares the same background */}
      <div className="relative z-10">
        <TrustBar />
      </div>
    </section>
  );
}

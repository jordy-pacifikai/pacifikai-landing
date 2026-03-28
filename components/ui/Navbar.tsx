"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Processus", href: "#process" },
  { label: "Solutions", href: "#solutions" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* Announcement bar */}
      <a href="/offre-site-web" className="block bg-accent/10 border-b border-accent/20 text-center py-2 px-4 hover:bg-accent/15 transition-colors">
        <p className="text-xs text-accent font-medium tracking-wide">
          Offre limitée : Site internet pro à partir de 100 000 XPF →
        </p>
      </a>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/logo-nav.png"
            alt="PACIFIK'AI"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-display text-lg tracking-wide">
            PACIFIK&apos;AI
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm px-5 py-2 rounded-full bg-accent text-bg font-medium hover:bg-accent/90 transition-colors"
          >
            Nous contacter
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span
            className={`w-6 h-0.5 bg-text transition-transform duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-text transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-text transition-transform duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 top-[calc(2rem+4rem)] bg-bg/95 backdrop-blur-xl transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center gap-8 pt-16">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-lg text-text-secondary hover:text-text transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="text-sm px-6 py-3 rounded-full bg-accent text-bg font-medium"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </nav>
  );
}

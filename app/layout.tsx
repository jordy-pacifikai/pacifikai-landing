import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PACIFIK'AI | Agence Digitale & IA à Tahiti",
  description:
    "Agence digitale et IA à Papeete, Tahiti. Sites web, chatbots, automatisation et conseil pour entreprises en Polynésie française.",
  metadataBase: new URL("https://pacifikai.com"),
  keywords: [
    "agence digitale tahiti",
    "agence ia polynesie",
    "site web papeete",
    "chatbot ia tahiti",
    "automatisation entreprise polynesie",
    "intelligence artificielle tahiti",
    "creation site internet tahiti",
    "agence web polynesie francaise",
    "marketing digital tahiti",
    "transformation digitale polynesie",
    "PACIFIK'AI",
    "pacifikai",
  ],
  openGraph: {
    title: "PACIFIK'AI | Agence Digitale & IA à Tahiti",
    description:
      "Solutions IA sur mesure pour les PME de Tahiti et Polynésie française.",
    type: "website",
    locale: "fr_PF",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "PACIFIK'AI — Agence Digitale & IA à Tahiti",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PACIFIK'AI | Agence Digitale & IA à Tahiti",
    description:
      "Solutions IA sur mesure pour les PME de Tahiti et Polynésie française.",
    images: ["/assets/og-image.png"],
  },
  icons: {
    icon: "/assets/favicon.png",
    apple: "/assets/apple-touch-icon.png",
  },
  other: {
    "google-site-verification": "hfgGx3lKxRCrn_DUbR_boTxcTvVh4ttg1tbdSuI5_40",
    "geo.region": "PF",
    "geo.placename": "Papeete, Polynésie française",
    "geo.position": "-17.5353;-149.5696",
    ICBM: "-17.5353, -149.5696",
  },
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "PACIFIK'AI",
  alternateName: "PACIFIKAI",
  url: "https://pacifikai.com",
  logo: "https://pacifikai.com/assets/logo.png",
  image: "https://pacifikai.com/assets/og-image.png",
  description:
    "Agence digitale et intelligence artificielle à Papeete, Tahiti. Création de sites web, chatbots IA, automatisation, applications et conseil digital pour entreprises en Polynésie française.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Papeete",
    addressLocality: "Papeete",
    addressRegion: "Tahiti",
    postalCode: "98714",
    addressCountry: "PF",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -17.535,
    longitude: -149.5696,
  },
  telephone: "+689-89558189",
  email: "jordy@pacifikai.com",
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "contact@pacifikai.com",
      contactType: "sales",
      availableLanguage: ["French", "English"],
    },
    {
      "@type": "ContactPoint",
      email: "jordy@pacifikai.com",
      contactType: "customer service",
      availableLanguage: ["French", "English"],
    },
  ],
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "Polynésie française",
      sameAs: "https://en.wikipedia.org/wiki/French_Polynesia",
    },
    { "@type": "City", name: "Papeete" },
    { "@type": "City", name: "Moorea" },
    { "@type": "City", name: "Bora Bora" },
  ],
  priceRange: "$$",
  currenciesAccepted: "XPF,EUR",
  paymentAccepted: "Virement bancaire, Carte bancaire",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services PACIFIK'AI",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Création de sites web et applications",
          description:
            "Sites internet professionnels, landing pages et applications sur mesure pour entreprises en Polynésie française",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Chatbots et agents IA",
          description:
            "Chatbots intelligents pour service client automatisé, disponibles 24/7 sur WhatsApp, Messenger et site web",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automatisation des processus",
          description:
            "Automatisation des tâches répétitives : devis, factures, relances, onboarding client",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Extraction de documents IA",
          description:
            "Extraction automatique de données depuis PDF, formulaires et documents scannés",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Conseil digital et stratégie IA",
          description:
            "Accompagnement stratégique pour la transformation digitale des entreprises polynésiennes",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${jakarta.variable}`}>
      <body className="bg-bg text-text font-body antialiased grain">
        <SmoothScroll>{children}</SmoothScroll>
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA),
          }}
        />
      </body>
    </html>
  );
}

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#080c14",
          card: "#0d1424",
          "card-hover": "#111d33",
          surface: "#1a2235",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.06)",
          light: "rgba(255, 255, 255, 0.12)",
        },
        text: {
          DEFAULT: "#f0f2f8",
          secondary: "#b0bcd4",
          dim: "#7888a8",
        },
        accent: {
          DEFAULT: "#f97066",
          glow: "rgba(249, 112, 102, 0.4)",
          soft: "rgba(249, 112, 102, 0.08)",
        },
        lagoon: {
          DEFAULT: "#14b8a6",
          glow: "rgba(20, 184, 166, 0.3)",
          soft: "rgba(20, 184, 166, 0.08)",
        },
        gold: {
          DEFAULT: "#f5c542",
          soft: "rgba(245, 197, 66, 0.08)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};
export default config;

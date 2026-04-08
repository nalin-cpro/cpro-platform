import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-manrope)", "Manrope", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // ConversionPro brand — extracted from conversionprollp.com (production)
        // Primary text/dark: #2B2B2B  | Accent: #EE4D34
        ink: {
          DEFAULT: "#2B2B2B",
          900: "#1a1a1a",
          800: "#2B2B2B",
          700: "#4a4a4a",
          600: "#727272",
          500: "#999999",
          400: "#bcbcbc",
          300: "#d6d6d6",
          200: "#ebebeb",
          100: "#f1f3f5",
        },
        brand: {
          50:  "#fef0ed",
          100: "#fcd9d2",
          200: "#fab5a8",
          300: "#f6917a",
          400: "#f26b51",
          500: "#EE4D34", // primary accent (CTAs, links)
          600: "#d63920",
          700: "#a82a17",
          800: "#7e1f10",
          900: "#54140a",
        },
        sky2: {
          100: "#C3DBF1", // soft blue accent from prod
        },
        lime2: {
          100: "#C2E74D", // accent green from prod
        },
        sun2: {
          100: "#FFBC7D", // warm orange highlight from prod
        },
      },
    },
  },
  plugins: [],
};
export default config;

// להוספה לקונפיג הקיים של הפרויקט ב־Lovable (theme.extend). לא להחליף את כל הקובץ.
import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      screens: { desktop: "1025px" },
      fontFamily: {
        sans: ['"Discovery FS"', "Assistant", '"Segoe UI"', "system-ui", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          hover: "hsl(var(--accent-hover))",
        },
        "accent-hover": "hsl(var(--accent-hover))",
        "brand-deep": "hsl(var(--brand-deep))",
        logo: { orange: "hsl(var(--logo-orange))", bordeaux: "hsl(var(--logo-bordeaux))" },
      },
      borderRadius: { lg: "var(--radius)", xl: "var(--radius)", sm: "5px" },
      transitionTimingFunction: { brand: "cubic-bezier(.4,0,.2,1)" },
      keyframes: {
        kenburns: { from: { transform: "scale(1)" }, to: { transform: "scale(1.06)" } },
        "strip-a": { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "strip-b": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        kenburns: "kenburns 7.5s linear forwards",
        "strip-a": "strip-a 60s linear infinite",
        "strip-b": "strip-b 60s linear infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
} satisfies Partial<Config>;

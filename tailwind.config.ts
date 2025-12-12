import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "SF Pro Display", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["SF Mono", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // iOS 18 / Apple 2025 Color System
        ios: {
          blue: "#0A84FF",
          green: "#30D158",
          red: "#FF453A",
          orange: "#FF9F0A",
          yellow: "#FFD60A",
          purple: "#BF5AF2",
          pink: "#FF375F",
          teal: "#64D2FF",
          indigo: "#5E5CE6",
          mint: "#66D4CF",
          cyan: "#5AC8FA",
        },
        // Medical-specific colors (kept for backward compatibility)
        medical: {
          redFlag: "#FF453A",
          warning: "#FF9F0A",
          safe: "#30D158",
          info: "#64D2FF",
        },
        // Apple accent colors (legacy compatibility)
        apple: {
          blue: "#0A84FF",
          green: "#30D158",
          orange: "#FF9F0A",
          red: "#FF453A",
          purple: "#BF5AF2",
          pink: "#FF375F",
          teal: "#64D2FF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Apple Squircle Radii
        "squircle-xs": "var(--radius-squircle-xs)",
        "squircle-sm": "var(--radius-squircle-sm)",
        "squircle-md": "var(--radius-squircle-md)",
        "squircle-lg": "var(--radius-squircle-lg)",
        "squircle-xl": "var(--radius-squircle-xl)",
        "squircle-2xl": "var(--radius-squircle-2xl)",
      },
      animation: {
        // Apple-style animations
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "fade-in-down": "fadeInDown 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "bounce-subtle": "bounceSubtle 0.6s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s linear infinite",
        // Liquid Glass animations
        "glass-shimmer": "glassShimmer 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        glassShimmer: {
          "0%": { opacity: "0.5", transform: "translateX(-100%)" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.5", transform: "translateX(100%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
      backdropBlur: {
        xs: "2px",
        "3xl": "64px",
      },
      transitionTimingFunction: {
        "apple": "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "apple-spring": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "apple-bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "apple-in": "cubic-bezier(0.4, 0, 1, 1)",
        "apple-out": "cubic-bezier(0, 0, 0.2, 1)",
      },
      boxShadow: {
        "apple": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "apple-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "apple-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        // Liquid Glass Shadows
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
        "glass-sm": "0 4px 16px 0 rgba(31, 38, 135, 0.08)",
        "glass-lg": "0 12px 48px 0 rgba(31, 38, 135, 0.12)",
        "glass-xl": "0 20px 60px 0 rgba(31, 38, 135, 0.15)",
        // Glow Effects
        "glow-blue": "0 0 40px rgba(10, 132, 255, 0.25)",
        "glow-green": "0 0 40px rgba(48, 209, 88, 0.25)",
        "glow-red": "0 0 40px rgba(255, 69, 58, 0.25)",
        "glow-orange": "0 0 40px rgba(255, 159, 10, 0.25)",
        "glow-purple": "0 0 40px rgba(191, 90, 242, 0.25)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      scale: {
        "102": "1.02",
        "103": "1.03",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

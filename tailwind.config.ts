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
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border-color)",
        input: "var(--color-gray-200)",
        ring: "var(--color-primary-400)",
        background: "var(--color-bg-primary)",
        foreground: "var(--color-text-primary)",
        primary: {
          50: "#E6F3FA",
          100: "#CCE7F5",
          200: "#99CFEB",
          300: "#66B7E1",
          400: "#339FD7",
          500: "#0077B6",
          600: "#005F92",
          700: "#00476D",
          800: "#002F49",
          900: "#001824",
          DEFAULT: "#0077B6",
        },
        secondary: {
          50: "#E6F5F3",
          100: "#CCEBE7",
          200: "#99D7CF",
          300: "#66C3B7",
          400: "#33AF9F",
          500: "#2A9D8F",
          600: "#227D72",
          700: "#195E56",
          800: "#113F39",
          900: "#081F1D",
          DEFAULT: "#2A9D8F",
        },
        success: {
          light: "#D1FAE5",
          DEFAULT: "#57CC99",
          dark: "#059669",
        },
        warning: {
          light: "#FEF3C7",
          DEFAULT: "#E9C46A",
          dark: "#92400E",
        },
        error: {
          light: "#FEE2E2",
          DEFAULT: "#E63946",
          dark: "#991B1B",
        },
        text: {
          primary: "#1A1A2E",
          secondary: "#6B7280",
          muted: "#9CA3AF",
        },
        // Legacy support while migrating
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Apple 2026 System Colors
        apple: {
          blue: {
            DEFAULT: "#007AFF",
            light: "#0A84FF",
            dark: "#0062CC",
          },
          green: {
            DEFAULT: "#34C759",
            light: "#30D158",
            dark: "#248A3D",
          },
          red: {
            DEFAULT: "#FF3B30",
            light: "#FF453A",
            dark: "#D70015",
          },
          orange: {
            DEFAULT: "#FF9500",
            light: "#FF9F0A",
            dark: "#C93400",
          },
          teal: {
            DEFAULT: "#5AC8FA",
            light: "#64D2FF",
            dark: "#0AADFF",
          },
          purple: {
            DEFAULT: "#AF52DE",
            light: "#BF5AF2",
            dark: "#8944AB",
          },
        },
        // Healthcare semantic colors
        healthcare: {
          primary: "#007AFF",
          success: "#34C759",
          warning: "#FF9500",
          critical: "#FF3B30",
          info: "#5AC8FA",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        card: "16px",
        button: "12px",
        // Apple Liquid Glass 2026 radius scale
        "glass-xs": "8px",
        "glass-sm": "12px",
        "glass-md": "16px",
        "glass-lg": "24px",
        "glass-xl": "32px",
        "glass-2xl": "40px",
        "glass-full": "9999px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-down": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-out-right": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "slide-out-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "slide-out-up": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-100%)" },
        },
        "slide-out-down": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(100%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 34, 125, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 34, 125, 0.6)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        // Apple Liquid Glass 2026 haptic feedback keyframes
        "haptic-light": {
          "0%": { transform: "scale(1)" },
          "30%": { transform: "scale(0.97)" },
          "70%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" },
        },
        "haptic-medium": {
          "0%": { transform: "scale(1)" },
          "25%": { transform: "scale(0.95)" },
          "65%": { transform: "scale(1.03)" },
          "100%": { transform: "scale(1)" },
        },
        "haptic-heavy": {
          "0%": { transform: "scale(1)" },
          "20%": { transform: "scale(0.92)" },
          "50%": { transform: "scale(1.05)" },
          "80%": { transform: "scale(0.98)" },
          "100%": { transform: "scale(1)" },
        },
        "specular-shimmer": {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "1" },
        },
        "stagger-fade-in": {
          "from": { opacity: "0", transform: "translateY(20px) scale(0.95)" },
          "to": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "slide-in-up": "slide-in-up 0.3s ease-out",
        "slide-in-down": "slide-in-down 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-out",
        "slide-out-left": "slide-out-left 0.3s ease-out",
        "slide-out-up": "slide-out-up 0.3s ease-out",
        "slide-out-down": "slide-out-down 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-out",
        "spin-slow": "spin-slow 3s linear infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "glow": "glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
        // Apple Liquid Glass 2026 haptic feedback animations
        "haptic-light": "haptic-light 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
        "haptic-medium": "haptic-medium 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
        "haptic-heavy": "haptic-heavy 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
        "specular-shimmer": "specular-shimmer 8s ease-in-out infinite",
        "stagger-fade-in": "stagger-fade-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards",
      },
      boxShadow: {
        // Base glass shadows
        "glass": "0 8px 32px 0 rgba(0, 34, 125, 0.08)",
        "glass-strong": "0 8px 32px 0 rgba(0, 34, 125, 0.15)",
        "glass-subtle": "0 8px 32px 0 rgba(0, 34, 125, 0.04)",
        "glass-light": "0 8px 32px rgba(0, 0, 0, 0.08)",
        "glass-dark": "0 8px 32px rgba(0, 0, 0, 0.4)",
        "glass-inset": "inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        "glass-elevated": "0 4px 16px rgba(0, 102, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        // Apple Liquid Glass 2026 shadow tokens
        "glass-2026-regular": "0 20px 60px -15px rgba(0, 0, 0, 0.08), 0 8px 24px -8px rgba(0, 0, 0, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.8)",
        "glass-2026-clear": "0 20px 60px -15px rgba(0, 0, 0, 0.04), 0 8px 24px -8px rgba(0, 0, 0, 0.03), inset 0 0 0 1px rgba(255, 255, 255, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.6)",
        "glass-2026-elevated": "0 25px 60px -12px rgba(0, 0, 0, 0.15), 0 12px 32px -8px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.7), inset 0 2px 0 rgba(255, 255, 255, 0.9)",
        "glass-2026-subtle": "0 12px 40px -10px rgba(0, 0, 0, 0.04), 0 4px 16px -6px rgba(0, 0, 0, 0.02), inset 0 0 0 1px rgba(255, 255, 255, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.6)",
        // Glow shadows
        "glow": "0 0 20px rgba(0, 34, 125, 0.3)",
        "glow-strong": "0 0 40px rgba(0, 34, 125, 0.6)",
        "glow-subtle": "0 0 10px rgba(0, 34, 125, 0.15)",
        // Apple glow colors
        "glow-blue": "0 4px 24px rgba(0, 122, 255, 0.3)",
        "glow-blue-intense": "0 8px 32px rgba(0, 122, 255, 0.4)",
        "glow-green": "0 4px 24px rgba(52, 199, 89, 0.3)",
        "glow-green-intense": "0 8px 32px rgba(52, 199, 89, 0.4)",
        "glow-red": "0 4px 24px rgba(255, 59, 48, 0.3)",
        "glow-red-intense": "0 8px 32px rgba(255, 59, 48, 0.4)",
        "glow-teal": "0 4px 24px rgba(90, 200, 250, 0.3)",
        "glow-purple": "0 4px 24px rgba(175, 82, 222, 0.3)",
        "glow-orange": "0 4px 24px rgba(255, 149, 0, 0.3)",
        // Inner glow shadows
        "inner-glow": "inset 0 1px 1px rgba(31, 168, 227, 0.5)",
        "inner-glow-strong": "inset 0 1px 1px rgba(31, 168, 227, 0.8)",
        "inner-glow-subtle": "inset 0 1px 1px rgba(31, 168, 227, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "2px",
        glass: "20px",
        "glass-heavy": "40px",
        // Apple Liquid Glass 2026 blur scale
        "glass-2026": "40px",
        "glass-2026-regular": "60px",
        "glass-2026-clear": "80px",
        "glass-2026-max": "120px",
      },
      // Apple Liquid Glass 2026 easing curves
      transitionTimingFunction: {
        "apple": "cubic-bezier(0.25, 1, 0.5, 1)",
        "apple-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "apple-ease-in": "cubic-bezier(0.42, 0, 1, 1)",
        "apple-ease-out": "cubic-bezier(0.25, 1, 0.5, 1)",
        "apple-ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        "apple-bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      // Apple Liquid Glass 2026 duration scale
      transitionDuration: {
        "instant": "100ms",
        "fast": "200ms",
        "normal": "300ms",
        "slow": "500ms",
        "slower": "700ms",
        "slowest": "1000ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

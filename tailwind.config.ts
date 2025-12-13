import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
      // Apple HIG Typography Scale
      fontSize: {
        // Using CSS variables for Dynamic Type support
        "large-title": [
          "var(--text-large-title)",
          {
            lineHeight: "var(--leading-large-title)",
            letterSpacing: "var(--tracking-large-title)",
          },
        ],
        "title1": [
          "var(--text-title1)",
          {
            lineHeight: "var(--leading-title1)",
            letterSpacing: "var(--tracking-title1)",
          },
        ],
        "title2": [
          "var(--text-title2)",
          {
            lineHeight: "var(--leading-title2)",
            letterSpacing: "var(--tracking-title2)",
          },
        ],
        "title3": [
          "var(--text-title3)",
          {
            lineHeight: "var(--leading-title3)",
            letterSpacing: "var(--tracking-title3)",
          },
        ],
        "headline": [
          "var(--text-headline)",
          {
            lineHeight: "var(--leading-headline)",
            letterSpacing: "var(--tracking-headline)",
          },
        ],
        "body": [
          "var(--text-body)",
          {
            lineHeight: "var(--leading-body)",
            letterSpacing: "var(--tracking-body)",
          },
        ],
        "callout": [
          "var(--text-callout)",
          {
            lineHeight: "var(--leading-callout)",
            letterSpacing: "var(--tracking-callout)",
          },
        ],
        "subhead": [
          "var(--text-subhead)",
          {
            lineHeight: "var(--leading-subhead)",
            letterSpacing: "var(--tracking-subhead)",
          },
        ],
        "footnote": [
          "var(--text-footnote)",
          {
            lineHeight: "var(--leading-footnote)",
            letterSpacing: "var(--tracking-footnote)",
          },
        ],
        "caption1": [
          "var(--text-caption1)",
          {
            lineHeight: "var(--leading-caption1)",
            letterSpacing: "var(--tracking-caption1)",
          },
        ],
        "caption2": [
          "var(--text-caption2)",
          {
            lineHeight: "var(--leading-caption2)",
            letterSpacing: "var(--tracking-caption2)",
          },
        ],
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
        // ============================================
        // HEALTHCARE COLOR SYSTEM (Psicologia das Cores na Saúde)
        // ============================================
        healthcare: {
          // Primárias - Confiança e Profissionalismo
          primary: "#0066CC",           // Azul Médico - CTAs, links, elementos interativos
          "primary-light": "#3385D6",   // Hover states
          "primary-dark": "#004C99",    // Active states

          // Secundárias - Autoridade e Estabilidade
          secondary: "#1E3A5F",         // Navy - Headers, textos importantes
          "secondary-light": "#2D4A6F",

          // Accent - Inovação Tecnológica
          accent: "#0D9488",            // Teal - Destaques, badges, innovation
          "accent-light": "#14B8A6",
        },

        // Sistema de Urgência Clínica (Simplificado)
        clinical: {
          // Crítico - Ativa resposta de ação
          critical: "#DC2626",          // Vermelho - Red Flags, emergências
          "critical-light": "#FEE2E2",  // Background de alerta crítico
          "critical-dark": "#B91C1C",

          // Atenção - Cautela sem alarme
          warning: "#D97706",           // Âmbar - Atenção necessária
          "warning-light": "#FEF3C7",   // Background de warning
          "warning-dark": "#B45309",

          // Estável - Esperança e vitalidade
          stable: "#059669",            // Verde - Estável, sucesso
          "stable-light": "#D1FAE5",    // Background de sucesso
          "stable-dark": "#047857",

          // Info - Informações gerais
          info: "#0066CC",              // Azul primário - Informações
          "info-light": "#DBEAFE",      // Background de info
        },

        // Neutros - Profissionalismo e Hierarquia
        neutral: {
          50: "#F8FAFC",    // Backgrounds claros
          100: "#F1F5F9",   // Cards secundários
          200: "#E2E8F0",   // Borders
          300: "#CBD5E1",   // Disabled states
          400: "#94A3B8",   // Placeholder text
          500: "#64748B",   // Secondary text
          600: "#475569",   // Primary text (light mode)
          700: "#334155",   // Headers (light mode)
          800: "#1E293B",   // Dark backgrounds
          900: "#0F172A",   // Darkest
          950: "#020617",   // Near black
        },

        // ============================================
        // iOS COLORS (Aliases para compatibilidade)
        // ============================================
        ios: {
          blue: "#0066CC",      // Mapeado para healthcare-primary
          green: "#059669",     // Mapeado para clinical-stable
          red: "#DC2626",       // Mapeado para clinical-critical
          orange: "#D97706",    // Mapeado para clinical-warning
          yellow: "#EAB308",    // Mantido
          purple: "#7C3AED",    // Atualizado para violet-600
          pink: "#EC4899",      // Mantido
          teal: "#0D9488",      // Mapeado para healthcare-accent
          indigo: "#4F46E5",    // Atualizado para indigo-600
          mint: "#10B981",      // Mantido emerald
          cyan: "#06B6D4",      // Mantido
        },

        // Medical (Aliases para compatibilidade)
        medical: {
          redFlag: "#DC2626",   // clinical-critical
          warning: "#D97706",   // clinical-warning
          safe: "#059669",      // clinical-stable
          info: "#0066CC",      // healthcare-primary
        },

        // Apple (Aliases para compatibilidade)
        apple: {
          blue: "#0066CC",
          green: "#059669",
          orange: "#D97706",
          red: "#DC2626",
          purple: "#7C3AED",
          pink: "#EC4899",
          teal: "#0D9488",
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
        // Glow Effects (Healthcare Colors)
        "glow-blue": "0 0 40px rgba(0, 102, 204, 0.25)",       // healthcare-primary
        "glow-green": "0 0 40px rgba(5, 150, 105, 0.25)",      // clinical-stable
        "glow-red": "0 0 40px rgba(220, 38, 38, 0.25)",        // clinical-critical
        "glow-orange": "0 0 40px rgba(217, 119, 6, 0.25)",     // clinical-warning
        "glow-purple": "0 0 40px rgba(124, 58, 237, 0.25)",    // violet-600
        "glow-teal": "0 0 40px rgba(13, 148, 136, 0.25)",      // healthcare-accent
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "128": "32rem",
        // Apple HIG Safe Areas
        "safe-top": "var(--safe-area-top)",
        "safe-bottom": "var(--safe-area-bottom)",
        "safe-left": "var(--safe-area-left)",
        "safe-right": "var(--safe-area-right)",
        // Apple HIG Touch Targets
        "touch": "44px",
        "touch-lg": "48px",
      },
      // Apple HIG Touch Target Minimums
      minWidth: {
        "touch": "44px",
        "touch-lg": "48px",
      },
      minHeight: {
        "touch": "44px",
        "touch-lg": "48px",
      },
      scale: {
        "102": "1.02",
        "103": "1.03",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    /**
     * Apple HIG RTL Support Plugin
     * @see https://developer.apple.com/design/human-interface-guidelines/right-to-left
     */
    plugin(function({ addUtilities, addVariant, matchUtilities, theme }) {
      // Add RTL/LTR variants
      addVariant('rtl', '[dir="rtl"] &')
      addVariant('ltr', '[dir="ltr"] &')
      addVariant('dir-rtl', 'html.dir-rtl &')
      addVariant('dir-ltr', 'html.dir-ltr &')

      // Logical property utilities
      const logicalUtilities = {
        // Margin logical properties
        '.ms-0': { 'margin-inline-start': '0' },
        '.ms-1': { 'margin-inline-start': theme('spacing.1') },
        '.ms-2': { 'margin-inline-start': theme('spacing.2') },
        '.ms-3': { 'margin-inline-start': theme('spacing.3') },
        '.ms-4': { 'margin-inline-start': theme('spacing.4') },
        '.ms-5': { 'margin-inline-start': theme('spacing.5') },
        '.ms-6': { 'margin-inline-start': theme('spacing.6') },
        '.ms-8': { 'margin-inline-start': theme('spacing.8') },
        '.ms-auto': { 'margin-inline-start': 'auto' },
        
        '.me-0': { 'margin-inline-end': '0' },
        '.me-1': { 'margin-inline-end': theme('spacing.1') },
        '.me-2': { 'margin-inline-end': theme('spacing.2') },
        '.me-3': { 'margin-inline-end': theme('spacing.3') },
        '.me-4': { 'margin-inline-end': theme('spacing.4') },
        '.me-5': { 'margin-inline-end': theme('spacing.5') },
        '.me-6': { 'margin-inline-end': theme('spacing.6') },
        '.me-8': { 'margin-inline-end': theme('spacing.8') },
        '.me-auto': { 'margin-inline-end': 'auto' },

        // Padding logical properties
        '.ps-0': { 'padding-inline-start': '0' },
        '.ps-1': { 'padding-inline-start': theme('spacing.1') },
        '.ps-2': { 'padding-inline-start': theme('spacing.2') },
        '.ps-3': { 'padding-inline-start': theme('spacing.3') },
        '.ps-4': { 'padding-inline-start': theme('spacing.4') },
        '.ps-5': { 'padding-inline-start': theme('spacing.5') },
        '.ps-6': { 'padding-inline-start': theme('spacing.6') },
        '.ps-8': { 'padding-inline-start': theme('spacing.8') },
        
        '.pe-0': { 'padding-inline-end': '0' },
        '.pe-1': { 'padding-inline-end': theme('spacing.1') },
        '.pe-2': { 'padding-inline-end': theme('spacing.2') },
        '.pe-3': { 'padding-inline-end': theme('spacing.3') },
        '.pe-4': { 'padding-inline-end': theme('spacing.4') },
        '.pe-5': { 'padding-inline-end': theme('spacing.5') },
        '.pe-6': { 'padding-inline-end': theme('spacing.6') },
        '.pe-8': { 'padding-inline-end': theme('spacing.8') },

        // Inset logical properties
        '.start-0': { 'inset-inline-start': '0' },
        '.start-1': { 'inset-inline-start': theme('spacing.1') },
        '.start-2': { 'inset-inline-start': theme('spacing.2') },
        '.start-4': { 'inset-inline-start': theme('spacing.4') },
        '.start-auto': { 'inset-inline-start': 'auto' },
        
        '.end-0': { 'inset-inline-end': '0' },
        '.end-1': { 'inset-inline-end': theme('spacing.1') },
        '.end-2': { 'inset-inline-end': theme('spacing.2') },
        '.end-4': { 'inset-inline-end': theme('spacing.4') },
        '.end-auto': { 'inset-inline-end': 'auto' },

        // Text alignment logical properties
        '.text-start': { 'text-align': 'start' },
        '.text-end': { 'text-align': 'end' },

        // Border radius logical properties
        '.rounded-s': { 
          'border-start-start-radius': theme('borderRadius.DEFAULT'),
          'border-end-start-radius': theme('borderRadius.DEFAULT')
        },
        '.rounded-e': { 
          'border-start-end-radius': theme('borderRadius.DEFAULT'),
          'border-end-end-radius': theme('borderRadius.DEFAULT')
        },
        '.rounded-ss': { 'border-start-start-radius': theme('borderRadius.DEFAULT') },
        '.rounded-se': { 'border-start-end-radius': theme('borderRadius.DEFAULT') },
        '.rounded-es': { 'border-end-start-radius': theme('borderRadius.DEFAULT') },
        '.rounded-ee': { 'border-end-end-radius': theme('borderRadius.DEFAULT') },

        '.rounded-s-lg': { 
          'border-start-start-radius': theme('borderRadius.lg'),
          'border-end-start-radius': theme('borderRadius.lg')
        },
        '.rounded-e-lg': { 
          'border-start-end-radius': theme('borderRadius.lg'),
          'border-end-end-radius': theme('borderRadius.lg')
        },
        '.rounded-s-xl': { 
          'border-start-start-radius': theme('borderRadius.xl'),
          'border-end-start-radius': theme('borderRadius.xl')
        },
        '.rounded-e-xl': { 
          'border-start-end-radius': theme('borderRadius.xl'),
          'border-end-end-radius': theme('borderRadius.xl')
        },
        '.rounded-s-2xl': { 
          'border-start-start-radius': theme('borderRadius.2xl'),
          'border-end-start-radius': theme('borderRadius.2xl')
        },
        '.rounded-e-2xl': { 
          'border-start-end-radius': theme('borderRadius.2xl'),
          'border-end-end-radius': theme('borderRadius.2xl')
        },
        '.rounded-s-3xl': { 
          'border-start-start-radius': theme('borderRadius.3xl'),
          'border-end-start-radius': theme('borderRadius.3xl')
        },
        '.rounded-e-3xl': { 
          'border-start-end-radius': theme('borderRadius.3xl'),
          'border-end-end-radius': theme('borderRadius.3xl')
        },

        // Border logical properties
        '.border-s': { 'border-inline-start-width': '1px' },
        '.border-e': { 'border-inline-end-width': '1px' },
        '.border-s-0': { 'border-inline-start-width': '0' },
        '.border-e-0': { 'border-inline-end-width': '0' },

        // Scroll margin/padding logical
        '.scroll-ms-0': { 'scroll-margin-inline-start': '0' },
        '.scroll-me-0': { 'scroll-margin-inline-end': '0' },
        '.scroll-ps-0': { 'scroll-padding-inline-start': '0' },
        '.scroll-pe-0': { 'scroll-padding-inline-end': '0' },
      }

      addUtilities(logicalUtilities)

      // RTL-specific icon utilities (Apple HIG)
      const iconUtilities = {
        // Flip directional icons in RTL
        '.rtl-flip': {},
        '[dir="rtl"] .rtl-flip': { transform: 'scaleX(-1)' },
        
        // Icon semantic classes
        '.icon-directional': {},
        '[dir="rtl"] .icon-directional': { transform: 'scaleX(-1)' },
        
        '.icon-navigation': {},
        '[dir="rtl"] .icon-navigation': { transform: 'scaleX(-1)' },
        
        '.icon-progress': {},
        '[dir="rtl"] .icon-progress': { transform: 'scaleX(-1)' },
        
        '.icon-static': { transform: 'none !important' },
        
        '.icon-audio': {},
        '[dir="rtl"] .icon-audio': { transform: 'scaleX(-1)' },
      }

      addUtilities(iconUtilities)

      // Number handling utilities (Apple HIG: "Don't reverse numerals")
      const numberUtilities = {
        '.number-preserve': { 
          direction: 'ltr',
          'unicode-bidi': 'embed'
        },
        '.number-isolate': {
          'unicode-bidi': 'isolate'
        }
      }

      addUtilities(numberUtilities)

      // Transform origin logical properties
      const originUtilities = {
        '.origin-start': { 'transform-origin': 'left' },
        '[dir="rtl"] .origin-start': { 'transform-origin': 'right' },
        '.origin-end': { 'transform-origin': 'right' },
        '[dir="rtl"] .origin-end': { 'transform-origin': 'left' },
      }

      addUtilities(originUtilities)

      // Space logical properties (gap-based spacing)
      const spaceUtilities = {
        '.space-x-start-2 > :not([hidden]) ~ :not([hidden])': { 
          'margin-inline-start': theme('spacing.2')
        },
        '.space-x-end-2 > :not([hidden]) ~ :not([hidden])': { 
          'margin-inline-end': theme('spacing.2')
        },
      }

      addUtilities(spaceUtilities)
    }),
  ],
};

export default config;

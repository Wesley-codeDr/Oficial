import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class' as const,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '320px',   // iPhone SE 1st gen, extreme small phones
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet portrait
      'lg': '1024px',  // Desktop / tablet landscape
      'xl': '1280px',  // Large desktop
      '2xl': '1536px', // Extra large desktop
    },
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['SF Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontWeight: {
        'apple-thin': '100',
        'apple-normal': '400',
        'apple-medium': '500',
        'apple-semibold': '600',
        'apple-bold': '700',
        'apple-black': '900',
      },
      letterSpacing: {
        'apple-tight': '-0.025em',
        'apple-display': '-0.04em',
        'apple-label': '0.1em',
        'apple-caps': '0.2em',
      },
      fontSize: {
        // Responsive typography with fluid scaling using clamp()
        'responsive-xs': ['clamp(0.625rem, 0.5rem + 0.5vw, 0.75rem)', { lineHeight: '1.5' }],
        'responsive-sm': ['clamp(0.75rem, 0.625rem + 0.5vw, 0.875rem)', { lineHeight: '1.5' }],
        'responsive-base': ['clamp(0.875rem, 0.75rem + 0.5vw, 1rem)', { lineHeight: '1.6' }],
        'responsive-lg': ['clamp(1rem, 0.875rem + 0.5vw, 1.125rem)', { lineHeight: '1.6' }],
        'responsive-xl': ['clamp(1.125rem, 1rem + 0.5vw, 1.25rem)', { lineHeight: '1.4' }],
        'responsive-2xl': ['clamp(1.25rem, 1.125rem + 0.5vw, 1.5rem)', { lineHeight: '1.3' }],
        'responsive-3xl': ['clamp(1.5rem, 1.25rem + 1vw, 1.875rem)', { lineHeight: '1.2' }],
        'responsive-4xl': ['clamp(1.875rem, 1.5rem + 1.5vw, 2.25rem)', { lineHeight: '1.1' }],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // Medical-specific colors (WellWave Palette)
        medical: {
          primary: '#004e92', // Deep Ocean Blue
          secondary: '#00c6ff', // Cyan/Teal
          accent: '#eef2f3', // Soft Light Blue
          redFlag: '#FF3B30',
          warning: '#FF9500',
          safe: '#34C759',
          info: '#5AC8FA',
        },
        // Apple accent colors - Native Pro Standards
        apple: {
          blue: '#0A84FF',
          green: '#30D158',
          orange: '#FF9F0A',
          red: '#FF453A',
          purple: '#BF5AF2',
          pink: '#FF375F',
          teal: '#64D2FF',
          gray: '#8E8E93',
        },
        // Glass effect specific colors
        glass: {
          background: 'rgba(255, 255, 255, 0.45)',
          border: 'rgba(255, 255, 255, 0.2)',
          highlight: 'rgba(255, 255, 255, 0.05)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'apple-cta': '16px', // Standard for Apple Buttons
        'apple-card': '32px', // Standard for Apple Cards
        'apple-input': '22px', // Standard for iOS Inputs
        '3xl': '1.5rem', 
        '4xl': '2rem', 
        '5xl': '2.75rem', 
      },
      animation: {
        // Animações suaves estilo Apple
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
        shimmer: 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blob: 'blob 7s infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
        xl: '20px',
        '2xl': '40px',
        '3xl': '50px',
        '4xl': '60px',
        '5xl': '80px', // For ultra-low focus depth
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.4, 0, 0.2, 1)',
        'apple-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'apple-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      boxShadow: {
        apple: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'apple-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'apple-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 25px 50px -12px rgba(0, 0, 0, 0.25)', // Enhanced glass shadow
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config

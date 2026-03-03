

/**
 * PERIOD TRACKER APP - TAILWIND CONFIGURATION
 * ============================================
 * This config extends the design system defined in index.css
 * All custom colors reference CSS variables for easy theming.
 * 
 * For backend developers:
 * - Colors are defined as CSS variables in index.css
 * - Use semantic class names (e.g., bg-primary, text-period)
 * - Cycle phases have dedicated color tokens
 */

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      /* Font families */
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        display: ['Quicksand', 'sans-serif']
      },

      /* Design system colors - all reference CSS variables */
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },

        /* Cycle phase colors */
        period: {
          DEFAULT: "hsl(var(--period))",
          light: "hsl(var(--period-light))"
        },
        ovulation: {
          DEFAULT: "hsl(var(--ovulation))",
          light: "hsl(var(--ovulation-light))"
        },
        fertile: {
          DEFAULT: "hsl(var(--fertile))",
          light: "hsl(var(--fertile-light))"
        },
        pms: {
          DEFAULT: "hsl(var(--pms))",
          light: "hsl(var(--pms-light))"
        },

        /* Mood colors */
        mood: {
          happy: "hsl(var(--mood-happy))",
          sad: "hsl(var(--mood-sad))",
          anxious: "hsl(var(--mood-anxious))",
          calm: "hsl(var(--mood-calm))",
          irritable: "hsl(var(--mood-irritable))",
          energetic: "hsl(var(--mood-energetic))"
        },

        /* Sidebar colors */
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        }
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)"
      },

      /* Box shadows */
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        glow: "var(--shadow-glow)"
      },

      /* Animations */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" }
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" }
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.5)", opacity: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "pulse-ring": "pulse-ring 1.5s ease-out infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';
import tailwindTypography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
        },

        card: "hsl(var(--card))",
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",

        sidebar: {
          background: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          accent: "hsl(var(--sidebar-accent))",
          border: "hsl(var(--sidebar-border))",
        },

        navy: {
          dark: "hsl(var(--navy-dark))",
          DEFAULT: "hsl(var(--navy))",
          light: "hsl(var(--navy-light))",
        },

        blue: {
          DEFAULT: "hsl(var(--blue))",
          light: "hsl(var(--blue-light))",
        },
        cyan: {
          DEFAULT: "hsl(var(--cyan))",
          light: "hsl(var(--cyan-light))",
        },
        
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
      },
      fontFamily: {
        heading: ["Orbitron", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",       // 12px
        md: "calc(var(--radius) - 2px)", // 10px
        sm: "calc(var(--radius) - 4px)", // 8px
      },
      keyframes: {
        "triangle-pop": { 
          "0%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
          "100%": { transform: "scale(0) rotate(180deg)", opacity: "0" }
         },
        "float-triangle": { 
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(10deg)" }
         },
        
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },

        "accordion-down": { 
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": { 
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },

        },
      },
      animation: {
        "triangle-pop": "triangle-pop 0.8s ease-out forwards",
        "float-triangle": "float-triangle 6s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      }
    },
  },
  plugins: [
    tailwindAnimate,
    tailwindTypography,
  ],
} satisfies Config;


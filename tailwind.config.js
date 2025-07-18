/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["dark"],
  darkMode: ["class"],
  theme: {
    extend: {
      backgroundImage: {
        "dotted-dark": `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 0.75C1.5 1.16421 1.16421 1.5 0.75 1.5C0.335786 1.5 0 1.16421 0 0.75C0 0.335786 0.335786 0 0.75 0C1.16421 0 1.5 0.335786 1.5 0.75Z' fill='%2339393D'/%3E%3C/svg%3E%0A");`,
        "dotted-light": `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 0.75C1.5 1.16421 1.16421 1.5 0.75 1.5C0.335786 1.5 0 1.16421 0 0.75C0 0.335786 0.335786 0 0.75 0C1.16421 0 1.5 0.335786 1.5 0.75Z' fill='%23D7DDE4'/%3E%3C/svg%3E%0A");`,
      },
      animation: {
        "spin-slow": "spin 7s linear infinite",
        "infinite-scroll-icons": "infinite-scroll-icons 25s linear infinite",
        "infinite-scroll-images":
          "infinite-scroll-images var(--scroll-duration, 20s) linear infinite",
      },
      keyframes: {
        "infinite-scroll-icons": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(calc(-250px * 5))",
          },
        },
        "infinite-scroll-images": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(calc(-1680px))",
          },
        },
      },
      colors: {
        gray: {
          100: "#f8f9fa",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#6c757d",
          700: "#373C42",
          800: "#343a40",
          900: "#1D2328",
          1000: "#0C0C0C",
        },
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
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      typography: (theme) => {
        return {
          DEFAULT: {
            css: {
              "code::before": { content: "none" },
              "code::after": { content: "none" },
              code: {
                padding: "0.2rem",
                backgroundColor: theme("colors.gray.500"),
                color: theme("colors.gray.100"),
                borderRadius: "0.4rem",
                fontWeight: "500",
                fontSize: "0.8rem",
              },
            },
          },
        };
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 0.5rem)",
        sm: "calc(var(--radius) - 1rem)",
      },
      boxShadow: {
        long: "0 10px 16px 0px rgb(0 0 0 / 0.1), 0 0px 1px 0px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("only-hover", "@media (hover: hover) { &:hover }");
    }),
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
};

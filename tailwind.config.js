/** @type {import('tailwindcss').Config} */
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
        "infinite-scroll-icons": "infinite-scroll 25s linear infinite",
        "infinite-scroll-images":
          "infinite-scroll-images var(--scroll-duration, 20s) linear infinite",
      },
      keyframes: {
        "infinite-scroll-icons": {
          "0%": { transform: "translateX(0)" },
          "100%": {
            transform: "translateX(calc(-250px * 5))",
          },
        },
        "infinite-scroll-images": {
          "0%": { transform: "translateX(0)" },
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
      },
      typography: (theme) => {
        return {
          DEFAULT: {
            css: {
              "code::before": {
                content: "none",
              },
              "code::after": {
                content: "none",
              },
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
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

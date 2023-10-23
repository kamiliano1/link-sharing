import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      purple: "hsl(252, 100%, 62%)",
      purpleHover: "hsl(252, 100%, 84%)",
      lightPurple: "hsl(252, 100%, 96%)",
      grey: "hsl(0, 0%, 45%)",
      darkGrey: "hsl(0, 0%, 20%)",
      lightGrey: "hsl(0, 0%, 98%)",
      borders: "hsl(0, 0%, 85%)",
      white: "hsl(0, 0%, 100%)",
      red: "hsl(0, 100%, 61%)",
      black: "hsl(0, 0%, 0%)",
    },

    fontSize: {
      headingM: [
        "2rem",
        {
          lineHeight: "150%",
          fontWeight: "700",
        },
      ],
      headingMmobile: [
        "1.5rem",
        {
          lineHeight: "150%",
          fontWeight: "700",
        },
      ],
      headingS: [
        "1rem",
        {
          lineHeight: "150%",
          fontWeight: "600",
        },
      ],
      bodyM: [
        "1rem",
        {
          lineHeight: "150%",
          fontWeight: "400",
        },
      ],
      bodyS: [
        ".875rem",
        {
          lineHeight: "150%",
          fontWeight: "400",
        },
      ],
      bodyXS: [
        ".75rem",
        {
          lineHeight: "150%",
          fontWeight: "400",
        },
      ],
    },
    extend: {
      keyframes: {
        hide: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        slideIn: {
          from: {
            transform: "translateX(calc(100% + var(--viewport-padding)))",
          },
          to: { transform: "translateX(0)" },
        },
        swipeOut: {
          from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
        },
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        hide: "hide 100ms ease-in",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 100ms ease-out",
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      screens: {
        sm: "690px",
      },
    },
  },
  plugins: [],
};
export default config;

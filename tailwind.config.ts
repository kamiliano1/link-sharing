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
        ".75rem",
        {
          lineHeight: "150%",
          fontWeight: "400",
        },
      ],
    },
    extend: {},
  },
  plugins: [],
};
export default config;

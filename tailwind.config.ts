import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#88113E",
          200: "#70181F",
        },
        neutral: {
          900: "#000000",
          100: "#FBF6EE",
          50: "#FCF8F3",
          200: '#D9D9D9'
        },
        text: {
          dark: "#443636",
        },
        accent: {
          100: "#FDA829",
        },
      },
    },
  },
  plugins: [],
};

export default config;

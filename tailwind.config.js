/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "blink-slide-left": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "20%": { transform: "translateX(0)", opacity: "0.5" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },
        "blink-slide-right": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "20%": { transform: "translateX(0)", opacity: "0.5" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },
        "slide-left": {
          "0%": { transform: "translateX(400px)" },
          "100%": { transform: "translateX(0px)" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-300px)" },
          "100%": { transform: "translateX(0px)" },
        },
        blink: {
          "0%": { opacity: "1" },
          "10%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "spin-right": {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(45deg)" },
          "100%": { transform: "rotate(90deg)" },
        },
        "spin-left": {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(-45deg)" },
          "100%": { transform: "rotate(-90deg)" },
        },
      },
      animation: {
        blink: "blink 0.8s ease-in-out",
        "blink-slide-left": "blink-slide-left 1s ease-in-out",
        "blink-slide-right": "blink-slide-right 1s ease-in-out",
        "slide-left": "slide-left 0.5s ease-in-out",
        "slide-right": "slide-right 0.5s ease-in-out",
        "spin-right": "spin-right 0.5s ease-in-out",
        "spin-left": "spin-left 0.5s ease-in-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "soft-black": "#171717",
        background: "#212121",
        gray: "#ACACAC",
        red: "#FF0000",
        "red-hover": "#E55050",
        "red-heart": "#C93D3D",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "montserrat-md": ["Montserrat Medium", "sans-serif"],
        "montserrat-sb": ["Montserrat SemiBold", "sans-serif"],
        "montserrat-r": ["Montserrat Regular", "sans-serif"],
        "montserrat-eb": ["Montserrat ExtraBold", "sans-serif"],
        "montserrat-b": ["Montserrat Bold", "sans-serif"],
      },
      colors: {
        "soft-black": "#171717",
        background: "#212121",
        "gray":"#ACACAC",
        "red":"#FF0000"
      },
    },
  },
  plugins: [],
};

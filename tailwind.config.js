/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["TMoneyDungunbaram", ...defaultTheme.fontFamily.sans],
        pretendard: ["Pretendard"],
      },
      colors: {
        main: {
          1: "#FF9B00",
          2: "#FFC900",
          3: "#FFE103",
          4: "#FFF09A",
          5: "#FFECBE",
        },
        system: {
          error: "#E92020",
          success: "#1DD923",
          blue: "#209CF5",
        },
        mono: {
          1: "#121212",
          2: "#5E5E5E",
          3: "#989898",
          4: "#CACACA",
          5: "#EBEBEB",
          6: "#F5F5F5",
        },
        background: "FFFBEF",
      },
    },
  },
  plugins: [],
};

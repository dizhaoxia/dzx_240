/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        cosmic: {
          900: "#0d0d1a",
          800: "#1a1a2e",
          700: "#252545",
          600: "#32325a",
        },
        neon: {
          cyan: "#00f5d4",
          orange: "#ff6b35",
          pink: "#ff2d78",
          purple: "#b24dff",
        },
      },
      fontFamily: {
        display: ['"ZCOOL KuaiLe"', "cursive"],
        body: ['"Noto Sans SC"', "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in": "slideIn 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "shake": "shake 0.5s ease-in-out",
        "star-twinkle": "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,245,212,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(0,245,212,0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      transparent: "transparent",
      white: {
        default: "#FFFFFF",
        mellow: "#F5F1EE",
      },
      black: {
        default: "#000000",
        light: "#0E0E0E",
      },
      grey: {
        default: "#5E5E5E",
        dark: "#181818",
      },
      purple: {
        default: "#7A6BF4",
        light: "#C3ACFF",
      },
      green: {
        default: "#2BD887",
        mid: "#8FE887",
        dark: "#25C17A",
        light: "#E5FFCE",
      },
      yellow: {
        default: "#FFC800",
        light: "#FFF7DF",
      },
      red: {
        default: "#F63F57",
        light: "#FFD3D9",
      },
      blue: {
        default: "#0B66F8",
        light: "#ACDAFF",
      },
      accent: {
        mint: "#D1DFEE",
        green: "#DCFF00",
        pink: "#FED8D7",
      },
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.375rem", // 22px
      "3xl": "1.5rem", // 24px
      "4xl": "1.625rem", // 26px
      "4.5xl": "1.685rem", // 27px
      "5xl": "1.75rem", // 28px
      "5.5xl": "1.875rem", // 30px
      "6xl": "2rem", // 32px
      "7xl": "2.125rem", // 34px
      "8xl": "2.25rem", // 36px
      "9xl": "2.375rem", // 38px
      "10xl": "2.5rem", // 40px
      "10.5xl": "2.56rem", // 41px
      "11xl": "2.625rem", // 42px
      "12xl": "2.75rem", // 44px
      "13xl": "3rem", // 48px
      "14xl": "3.25rem", // 52px
      "15xl": "3.375rem", // 54px
      "16xl": "3.5rem", // 56px
      "17xl": "3.75rem", // 60px
      "18xl": "4.25rem", // 68px
      "19xl": "4.5rem", // 72px
    },
    extend: {
      screens: {
        xs: "475px",
        ...defaultTheme.screens,
      },
      fontFamily: {
        inter: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        montserratAlt: [
          "var(--font-montserratAlt)",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      lineHeight: {
        tight: 1.1,
        snug: 1.2,
        normal: 1.4,
      },
      spacing: {
        4.5: "1.125rem", // 18px
        5.5: "1.375rem", // 22px
        7.5: "1.875rem", // 30px
        13: "3.25rem", // 50px
        15: "3.75rem", // 60px
        18: "4.5rem", // 72px
        22: "5.375rem", // 86px
        26: "6.5rem", // 104px
        30: "7.5rem", // 120px
        "1/2": "50%",
        "5/6": "83.33%",
      },
      scale: {
        85: ".85",
      },
      width: {
        85: "21.25rem", // 340px
      },
      minWidth: (theme) => ({
        ...theme("spacing"),
      }),
      maxWidth: (theme) => ({
        ...theme("spacing"),
        26: "6.5rem", // 104px
        78: "19.5rem", // 312px
        85: "21.25rem", // 340px
        104: "26rem", // 416px
        105: "26.25rem", // 420px
        140: "35rem", // 560px
        150: "37.5rem", // 600px
        160: "40rem", // 640px
        225: "56.25rem", // 900px
        240: "60rem", // 960px
      }),
      minHeight: (theme) => ({
        ...theme("spacing"),
        "screen-d": ["100vh", "100dvh"], // 100vh is fallback
        "screen-s": ["100vh", "100svh"], // 100vh is fallback
        "screen-l": ["100vh", "100lvh"], // 100vh is fallback
        "screen-v": ["100vh", "var(--visualvh, 100dvh)"], // 100vh is fallback
      }),
      height: (theme) => ({
        ...theme("spacing"),
        "screen-d": ["100vh", "100dvh"], // 100vh is fallback
        "screen-s": ["100vh", "100svh"], // 100vh is fallback
        "screen-l": ["100vh", "100lvh"], // 100vh is fallback
        "screen-v": ["100vh", "var(--visualvh, 100dvh)"], // 100vh is fallback
      }),
      backdropBlur: {
        32: "32px",
      },
      borderRadius: {
        "5xl": "40px",
      },
      blur: {
        xs: "1.5px",
      },
      keyframes: {
        appear: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(24px)" },
        },
        "float-3d-a": {
          "0%, 100%": {
            transform: "translateY(0) rotateX(0deg) rotateZ(0deg)",
          },
          "50%": {
            transform: "translateY(-10px) rotateX(8deg) rotateZ(-3deg)",
          },
        },
        "float-3d-b": {
          "0%, 100%": {
            transform: "translateY(0) rotateX(0deg) rotateZ(0deg)",
          },
          "50%": { transform: "translateY(8px) rotateX(-6deg) rotateZ(4deg)" },
        },
        "float-3d-c": {
          "0%, 100%": {
            transform: "translateY(0) rotateX(0deg) rotateZ(0deg)",
          },
          "50%": { transform: "translateY(-6px) rotateX(4deg) rotateZ(-6deg)" },
        },
      },
      animation: {
        appear: "appear 2s ease-out forwards",
        bounceSlow: "bounceSlow 5s ease-in-out infinite",
        "float-3d-a": "float-3d-a 8s ease-in-out infinite",
        "float-3d-b": "float-3d-b 8.5s ease-in-out infinite",
        "float-3d-c": "float-3d-c 9s ease-in-out infinite",
      },
    },
  },
}

const colors = require("tailwindcss/colors")
const starlightPlugin = require("@astrojs/starlight-tailwind")
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Your preferred accent color. Indigo is closest to Starlight’s defaults.
        accent: colors.cyan,
        // Your preferred gray scale. Zinc is closest to Starlight’s defaults.
        gray: colors.slate,
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Bitter", ...defaultTheme.fontFamily.serif],
      }
    },
  },
  plugins: [starlightPlugin()],
}

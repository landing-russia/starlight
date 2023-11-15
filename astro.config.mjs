import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Конспект",
      // logo: {
      //   src: "./src/assets/light-logo.svg",
      //   light: "./src/assets/light-logo.svg",
      //   dark: "./src/assets/dark-logo.svg"
      // },
      favicon: "/images/favicon.ico",
      social: {
        github: "https://github.com/landing-russia/starlight",
      },
      lastUpdated: true,
      editLink: {
        baseUrl: "https://github.com/landing-russia/starlight/edit/main/",
      },
      locales: {
        root: {
          label: "Россия",
          lang: "ru", // lang is required for root locales
        },
      },
      sidebar: [
        {
          label: "Git",
          autogenerate: { directory: "git" },
        },
        {
          label: "Django",
          autogenerate: { directory: "django" },
        },
        {
          label: "Astro",
          autogenerate: { directory: "astro" },
        },
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", link: "/guides/example/" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
        {
          label: "Trash",
          autogenerate: { directory: "trash" },
        },
      ],
      customCss: [
        "./src/tailwind.css",
        "@fontsource-variable/bitter",
        "@fontsource-variable/inter",
      ],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
})

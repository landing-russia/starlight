import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Конспект",
      favicon: "/images/favicon.ico",
      social: {
        github: "https://github.com/withastro/starlight",
      },
      locales: {
        root: {
          label: "Россия",
          lang: "ru", // lang is required for root locales
        },
      },
      sidebar: [
        {
          label: "Django",
          autogenerate: { directory: "django" },
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

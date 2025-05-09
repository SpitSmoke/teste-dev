import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rick and Morty Portal",
    short_name: "R&M Portal",
    description: "Explore o multiverso de Rick and Morty",
    start_url: "/",
    display: "standalone",
    background_color: "#121212",
    theme_color: "#44ffb2",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

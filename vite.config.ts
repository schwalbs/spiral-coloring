import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, import.meta.dirname, "");

  return defineConfig({
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "Tie Dye Spiral Coloring",
          short_name: "TieDyeSpiralColoring",
          description: "A web app for exploring tie dye spirals.",
          theme_color: "#0f1012",
          background_color: "#0f1012",
          display: "standalone",
          start_url: "/spiral-coloring/",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
    base: "/spiral-coloring/",
    server: {
      allowedHosts: env.ALLOWED_HOSTS?.split(",") ?? undefined,
    },
  });
};

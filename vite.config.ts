import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  worker: {
    plugins: [
      VitePWA({
        manifest: {
          short_name: "Weather App",
          name: "Weather App PWA",
          icons: [
            {
              src: "/images/logo.png",
              type: "image/png",
              sizes: "1024x1024",
              purpose: "any maskable",
            },
          ],
          start_url: ".",
          display: "standalone",
          theme_color: "#000",
          background_color: "#fff",
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.pathname.startsWith("/api"),
              handler: "CacheFirst" as const,
              options: {
                cacheName: "api-cache",
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      }),
    ],
  },
});

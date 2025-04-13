import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, __dirname, "");

  return defineConfig({
    plugins: [react()],
    base: "/spiral-coloring/",
    server: {
      allowedHosts: env.ALLOWED_HOSTS?.split(",") ?? undefined,
    },
  });
};

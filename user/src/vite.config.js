import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "http://13.233.227.13:4000/api/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => {
  const isGitHubPages = process.env.DEPLOY_TARGET === "gh-pages";

  return {
    plugins: [react(), tailwindcss()],
    base: isGitHubPages ? "/RyanGoose.github.io/" : "/",
  };
});
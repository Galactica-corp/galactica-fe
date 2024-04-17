import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { loadEnv } from "vite";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import removeConsole from "vite-plugin-remove-console";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProdMode = mode === "production";
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  console.log(process.env.VITE_SENTRY_AUTH_TOKEN);

  return {
    plugins: [
      nodePolyfills({
        include: ["buffer", "events"],
      }),
      react(),
      isProdMode && removeConsole(),
      tsconfigPaths(),
      svgr(),
      ViteEjsPlugin(),
      process.env.VITE_SENTRY === "on" &&
        isProdMode &&
        sentryVitePlugin({
          org: "occamfi",
          project: "galactica",
          authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
        }),
      !isProdMode &&
        checker({
          typescript: true,
          eslint: {
            lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
          },
          overlay: {
            initialIsOpen: false,
            position: "br",
          },
        }),
    ].filter(Boolean),
    build: {
      sourcemap: true,
    },
  };
});

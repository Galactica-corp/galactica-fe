import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import removeConsole from "vite-plugin-remove-console";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProdMode = mode === "production";
  return {
    plugins: [
      react(),
      isProdMode && removeConsole(),
      tsconfigPaths(),
      svgr(),
      ViteEjsPlugin(),
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
  };
});

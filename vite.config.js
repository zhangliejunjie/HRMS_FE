import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import shimReactPdf from "vite-plugin-shim-react-pdf";
// import reactRefresh from "@vitejs/plugin-react-refresh";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), shimReactPdf()],
});

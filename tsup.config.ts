import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.loader = { ...options.loader, ".css": "copy" };
    options.assetNames = "[name]";
  },
  outExtension({ format }) {
    return { js: format === "cjs" ? ".cjs" : ".js" };
  },
  onSuccess:
    "node -e \"const fs=require('fs'); fs.copyFileSync('src/demoLayer.css','dist/demoLayer.css')\"",
});

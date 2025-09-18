// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigpaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigpaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.tsx"],
    globals: true,
    environmentOptions: { jsdom: { url: "http://localhost/" } },
    // optional, if you import CSS or assets in components:
    css: true,
    coverage: { reporter: ["text", "html", "lcov"] },
  },
  resolve: { conditions: ["browser"] },
});

import { resolve } from "node:path"
import solid from "vite-plugin-solid"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      "@/lib/utils": resolve(__dirname, "./src/lib/utils"),
      "@better-auth-ui/solid": resolve(__dirname, "../solid/src"),
      "@better-auth-ui/core": resolve(__dirname, "../core/src")
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["tests/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["**/*.d.ts", "**/*.test.ts", "**/*.test.tsx"]
    }
  }
})

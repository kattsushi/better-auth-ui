import { describe, expect, it } from "vitest"

declare global {
  interface ImportMeta {
    glob: (
      pattern: string,
      options: { eager: true; query: "?raw"; import: "default" }
    ) => Record<string, string>
  }
}

const coreSources = import.meta.glob("../src/**/*.ts", {
  eager: true,
  query: "?raw",
  import: "default"
}) as Record<string, string>

const forbiddenImports = [
  "react",
  "solid-js",
  "@tanstack/react-query",
  "@tanstack/solid-query"
]

describe("core runtime import boundary", () => {
  it("keeps all core source modules free of framework imports", () => {
    const entries = Object.entries(coreSources)

    expect(entries.length).toBeGreaterThan(0)

    for (const [file, source] of entries) {
      for (const forbiddenImport of forbiddenImports) {
        const escapedImport = forbiddenImport.replaceAll("/", "\\/")

        expect(source, `${file} imports ${forbiddenImport}`).not.toMatch(
          new RegExp(`from ["']${escapedImport}["']`)
        )
        expect(
          source,
          `${file} dynamically imports ${forbiddenImport}`
        ).not.toMatch(new RegExp(`import\\(["']${escapedImport}["']\\)`))
      }
    }
  })
})

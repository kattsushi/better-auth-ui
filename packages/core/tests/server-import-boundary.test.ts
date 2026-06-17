import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

const serverRoot = join(process.cwd(), "src/server")
const forbiddenImports = [
  "react",
  "solid-js",
  "@tanstack/react-query",
  "@tanstack/solid-query"
]

function listTsFiles(dir: string): string[] {
  if (!existsSync(dir)) return []

  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    const stat = statSync(path)

    if (stat.isDirectory()) return listTsFiles(path)
    if (entry.endsWith(".ts")) return [path]
    return []
  })
}

describe("core server import boundary", () => {
  it("keeps core server modules free of framework imports", () => {
    const files = listTsFiles(serverRoot)

    expect(files.length).toBeGreaterThan(0)

    for (const file of files) {
      const source = readFileSync(file, "utf8")

      for (const forbiddenImport of forbiddenImports) {
        expect(source, `${file} imports ${forbiddenImport}`).not.toMatch(
          new RegExp(`from ["']${forbiddenImport.replaceAll("/", "\\/")}["']`)
        )
      }
    }
  })
})

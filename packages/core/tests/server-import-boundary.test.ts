import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

const boundaryRoots = [
  join(process.cwd(), "src/server"),
  join(process.cwd(), "src/lib/auth-query-options.ts"),
  join(process.cwd(), "src/lib/auth-mutation-options.ts")
]
const forbiddenImports = [
  "react",
  "solid-js",
  "@tanstack/react-query",
  "@tanstack/solid-query"
]

function listTsFiles(path: string): string[] {
  if (!existsSync(path)) return []

  const stat = statSync(path)
  if (stat.isFile()) return path.endsWith(".ts") ? [path] : []

  return readdirSync(path).flatMap((entry) => {
    const childPath = join(path, entry)
    const childStat = statSync(childPath)

    if (childStat.isDirectory()) return listTsFiles(childPath)
    if (entry.endsWith(".ts")) return [childPath]
    return []
  })
}

describe("core runtime import boundary", () => {
  it("keeps core server and client primitive modules free of framework imports", () => {
    const files = boundaryRoots.flatMap(listTsFiles)

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

import { describe, expect, it, vi } from "vitest"
import {
  type AuthMutationMeta,
  createAuthMutationDefinition,
  createAuthQueryDefinition
} from "../src"

describe("core client runtime factories", () => {
  it("creates query definitions with shared key semantics and throwing fetch options", async () => {
    const authFn = vi.fn(async (params) => ({ data: { params } }))
    const params = {
      query: { fresh: true },
      fetchOptions: { credentials: "include" }
    }
    const definition = createAuthQueryDefinition(
      authFn,
      ["auth", "getSession"] as const,
      params
    )
    const signal = new AbortController().signal

    expect(definition.queryKey).toEqual(["auth", "getSession", { fresh: true }])

    await definition.queryFn({ signal })

    expect(authFn).toHaveBeenCalledWith({
      query: { fresh: true },
      fetchOptions: { credentials: "include", signal, throw: true }
    })
  })

  it("uses null as the query partition when query params are absent", () => {
    const authFn = vi.fn(async () => ({ data: null }))
    const definition = createAuthQueryDefinition(authFn, [
      "auth",
      "getSession"
    ] as const)

    expect(definition.queryKey).toEqual(["auth", "getSession", null])
  })

  it("creates mutation definitions with throwing fetch options and optional meta", async () => {
    const authFn = vi.fn(async (variables) => ({ data: variables.email }))
    const meta: AuthMutationMeta = {
      invalidates: [["auth", "session"]],
      awaits: [["auth", "accounts"]]
    }
    const definition = createAuthMutationDefinition(
      authFn,
      ["auth", "signIn", "email"] as const,
      meta
    )

    expect(definition.mutationKey).toEqual(["auth", "signIn", "email"])
    expect(definition.meta).toBe(meta)

    await definition.mutationFn({
      email: "ada@example.com",
      fetchOptions: { credentials: "include" }
    })

    expect(authFn).toHaveBeenCalledWith({
      email: "ada@example.com",
      fetchOptions: { credentials: "include", throw: true }
    })
  })
})

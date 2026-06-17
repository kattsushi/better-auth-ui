import { describe, expect, it, vi } from "vitest"
import { authMutationOptions, authQueryOptions } from "../src"

describe("React client auth option factories", () => {
  it("builds query options with shared key semantics and throwing fetch options", async () => {
    const authFn = vi.fn(async ({ query, fetchOptions }) => ({
      data: { query, fetchOptions }
    }))
    const options = authQueryOptions(authFn, ["auth", "getSession"] as const, {
      query: { fresh: true },
      fetchOptions: { credentials: "include" }
    })
    const signal = new AbortController().signal

    expect(options.queryKey).toEqual(["auth", "getSession", { fresh: true }])
    await expect(
      (
        options as { queryFn?: (context: { signal: AbortSignal }) => unknown }
      ).queryFn?.({ signal })
    ).resolves.toEqual({
      data: {
        query: { fresh: true },
        fetchOptions: { credentials: "include", signal, throw: true }
      }
    })
  })

  it("builds mutation options that preserve mutation keys and throw on fetch errors", async () => {
    const authFn = vi.fn(async (variables) => ({ data: variables.email }))
    const options = authMutationOptions(authFn, ["auth", "signIn", "email"])

    expect(options.mutationKey).toEqual(["auth", "signIn", "email"])
    await expect(
      (
        options as {
          mutationFn?: (variables: {
            email: string
            fetchOptions: { credentials: string }
          }) => unknown
        }
      ).mutationFn?.({
        email: "ada@example.com",
        fetchOptions: { credentials: "include" }
      })
    ).resolves.toEqual({ data: "ada@example.com" })
    expect(authFn).toHaveBeenCalledWith({
      email: "ada@example.com",
      fetchOptions: { credentials: "include", throw: true }
    })
  })
})

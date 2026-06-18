import { describe, expect, expectTypeOf, it, vi } from "vitest"
import {
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery,
  type QueryClientLike,
  type ServerQueryClientLike
} from "../src/server"

type Options = {
  queryKey: readonly ["auth", "session"]
  queryFn: () => Promise<{ userId: string }>
}

describe("core generic server query-client delegation", () => {
  it("delegates ensure/prefetch/fetch to any structural query client", async () => {
    const options: Options = {
      queryKey: ["auth", "session"],
      queryFn: async () => ({ userId: "ada" })
    }
    const queryClient = {
      ensureQueryData: vi.fn(async (received: Options) => ({
        source: "ensure" as const,
        received
      })),
      prefetchQuery: vi.fn(async (received: Options) => {
        expect(received).toBe(options)
      }),
      fetchQuery: vi.fn((received: Options) => ({
        source: "fetch" as const,
        received
      }))
    }

    expectTypeOf(queryClient).toMatchTypeOf<
      QueryClientLike<
        Options,
        Promise<{ source: "ensure"; received: Options }>,
        { source: "fetch"; received: Options }
      >
    >()
    expectTypeOf(queryClient).toMatchTypeOf<ServerQueryClientLike<Options>>()

    const ensured = await ensureServerQuery(queryClient, options)
    const prefetched = await prefetchServerQuery(queryClient, options)
    const fetched = await fetchServerQuery(queryClient, options)

    expectTypeOf(ensured).toEqualTypeOf<{
      source: "ensure"
      received: Options
    }>()
    expectTypeOf(prefetched).toEqualTypeOf<void>()
    expectTypeOf(fetched).toEqualTypeOf<{
      source: "fetch"
      received: Options
    }>()

    expect(ensured).toEqual({ source: "ensure", received: options })
    expect(prefetched).toBeUndefined()
    expect(fetched).toEqual({ source: "fetch", received: options })
    expect(queryClient.ensureQueryData).toHaveBeenCalledWith(options)
    expect(queryClient.prefetchQuery).toHaveBeenCalledWith(options)
    expect(queryClient.fetchQuery).toHaveBeenCalledWith(options)
  })

  it("accepts clients with only the delegated method", async () => {
    const options = { queryKey: ["auth", "accounts"] as const }
    const ensureOnlyClient = {
      ensureQueryData: vi.fn((received: typeof options) => ({ received }))
    }

    const result = await ensureServerQuery(ensureOnlyClient, options)

    expectTypeOf(result).toEqualTypeOf<{ received: typeof options }>()
    expect(result).toEqual({ received: options })
  })
})

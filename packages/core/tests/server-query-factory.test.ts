import { describe, expect, it, vi } from "vitest"
import {
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery,
  sessionOptions
} from "../src/server"

describe("core server query adapter delegates", () => {
  it("passes the provided options object through query client helpers", () => {
    const options = { queryKey: ["auth", "session"] as const, queryFn: vi.fn() }
    const queryClient = {
      ensureQueryData: vi.fn((received) => ({ type: "ensure", received })),
      prefetchQuery: vi.fn((received) => ({ type: "prefetch", received })),
      fetchQuery: vi.fn((received) => ({ type: "fetch", received }))
    }

    expect(ensureServerQuery(queryClient, options)).toEqual({
      type: "ensure",
      received: options
    })
    expect(prefetchServerQuery(queryClient, options)).toEqual({
      type: "prefetch",
      received: options
    })
    expect(fetchServerQuery(queryClient, options)).toEqual({
      type: "fetch",
      received: options
    })
    expect(queryClient.ensureQueryData).toHaveBeenCalledWith(options)
    expect(queryClient.prefetchQuery).toHaveBeenCalledWith(options)
    expect(queryClient.fetchQuery).toHaveBeenCalledWith(options)
  })

  it("keeps descriptor metadata framework neutral", () => {
    const auth = { api: { getSession: vi.fn() } }
    const descriptor = sessionOptions(auth, { headers: new Headers() })

    expect(descriptor.meta).toEqual({
      package: "@better-auth-ui/core",
      runtime: "server",
      name: "session"
    })
  })
})

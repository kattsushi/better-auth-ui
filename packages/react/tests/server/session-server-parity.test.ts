import { authQueryKeys } from "@better-auth-ui/core"
import {
  type ServerQueryDescriptor,
  sessionOptions
} from "@better-auth-ui/core/server"
import { QueryClient } from "@tanstack/react-query"
import { describe, expect, expectTypeOf, it, vi } from "vitest"
import * as reactServer from "../../src/server"
import {
  adaptServerQueryOptions,
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery
} from "../../src/server"

describe("react server session parity", () => {
  it("uses core descriptors plus the React server adapter", async () => {
    const params = { headers: new Headers({ cookie: "sid=abc" }) }
    const data = { user: { id: "user-1" }, session: { id: "session-1" } }
    const auth = { api: { getSession: vi.fn(async () => data) } }

    const descriptor = sessionOptions(auth as never, params as never)
    const options = adaptServerQueryOptions(descriptor)

    expect(options.queryKey).toBe(authQueryKeys.session)
    await expect(descriptor.queryFn()).resolves.toBe(data)
    expect(auth.api.getSession).toHaveBeenCalledWith(params)
  })

  it("delegates ensure/prefetch/fetch through React-typed generic helpers", async () => {
    const data = { user: { id: "user-1" }, session: { id: "session-1" } }
    const descriptor: ServerQueryDescriptor<
      typeof authQueryKeys.session,
      typeof data
    > = {
      queryKey: authQueryKeys.session,
      queryFn: vi.fn(async () => data)
    }
    const queryClient = new QueryClient()
    const options = adaptServerQueryOptions(descriptor)

    const ensured = ensureServerQuery(queryClient, options)
    const prefetched = prefetchServerQuery(queryClient, options)
    const fetched = fetchServerQuery(queryClient, options)

    expectTypeOf(ensured).toEqualTypeOf<Promise<typeof data>>()
    expectTypeOf(prefetched).toEqualTypeOf<Promise<void>>()
    expectTypeOf(fetched).toEqualTypeOf<Promise<typeof data>>()
    await expect(ensured).resolves.toBe(data)
    await expect(prefetched).resolves.toBeUndefined()
    await expect(fetched).resolves.toBe(data)
    expect(descriptor.queryFn).toHaveBeenCalled()
  })

  it("does not export endpoint-specific server wrappers from React", () => {
    expect("sessionOptions" in reactServer).toBe(false)
    expect("ensureSession" in reactServer).toBe(false)
    expect("prefetchSession" in reactServer).toBe(false)
    expect("fetchSession" in reactServer).toBe(false)
  })
})

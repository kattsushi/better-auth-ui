import { authQueryKeys } from "@better-auth-ui/core"
import { describe, expect, it, vi } from "vitest"
import {
  ensureSession,
  fetchSession,
  prefetchSession,
  sessionOptions
} from "../../src/server"

describe("react server session parity", () => {
  it("keeps query key and delegates params through core-backed options", async () => {
    const params = { headers: new Headers({ cookie: "sid=abc" }) }
    const data = { user: { id: "user-1" }, session: { id: "session-1" } }
    const auth = { api: { getSession: vi.fn(async () => data) } }

    const options = sessionOptions(auth as never, params as never)

    expect(options.queryKey).toBe(authQueryKeys.session)
    await expect(
      (options.queryFn as (context: never) => Promise<unknown>)({} as never)
    ).resolves.toBe(data)
    expect(auth.api.getSession).toHaveBeenCalledWith(params)
  })

  it("delegates ensure/prefetch/fetch to the supplied query client", () => {
    const params = { headers: new Headers() }
    const auth = { api: { getSession: vi.fn() } }
    const queryClient = {
      ensureQueryData: vi.fn((options) => options),
      prefetchQuery: vi.fn((options) => options),
      fetchQuery: vi.fn((options) => options)
    }

    expect(
      ensureSession(queryClient as never, auth as never, params as never)
    ).toMatchObject({
      queryKey: authQueryKeys.session
    })
    expect(
      prefetchSession(queryClient as never, auth as never, params as never)
    ).toMatchObject({
      queryKey: authQueryKeys.session
    })
    expect(
      fetchSession(queryClient as never, auth as never, params as never)
    ).toMatchObject({
      queryKey: authQueryKeys.session
    })
    expect(queryClient.ensureQueryData).toHaveBeenCalledTimes(1)
    expect(queryClient.prefetchQuery).toHaveBeenCalledTimes(1)
    expect(queryClient.fetchQuery).toHaveBeenCalledTimes(1)
  })
})

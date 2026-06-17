import { describe, expect, it, vi } from "vitest"
import { authQueryKeys } from "../src"
import { sessionOptions } from "../src/server"

describe("core server session descriptor", () => {
  it("builds the session descriptor with the shared query key and server auth call", async () => {
    const session = { user: { id: "user-1" }, session: { id: "session-1" } }
    const params = { headers: new Headers({ cookie: "sid=abc" }) }
    const getSession = vi.fn(async (receivedParams: typeof params) => {
      expect(receivedParams).toBe(params)
      return session
    })
    const auth = { api: { getSession } }

    const descriptor = sessionOptions(auth, params)

    expect(descriptor.queryKey).toBe(authQueryKeys.session)
    await expect(descriptor.queryFn()).resolves.toBe(session)
    expect(getSession).toHaveBeenCalledTimes(1)
  })
})

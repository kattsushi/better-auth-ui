import { authQueryKeys } from "@better-auth-ui/core"
import {
  apiKeyQueryKeys,
  multiSessionQueryKeys,
  organizationQueryKeys,
  passkeyQueryKeys
} from "@better-auth-ui/core/plugins"
import { describe, expect, it, vi } from "vitest"
import {
  activeOrganizationOptions,
  ensureActiveOrganization,
  ensureListApiKeys,
  listApiKeysOptions,
  listDeviceSessionsOptions,
  listPasskeysOptions,
  sessionOptions
} from "../../src/server"

const queryClient = () => ({
  ensureQueryData: vi.fn((options) => options),
  prefetchQuery: vi.fn((options) => options),
  fetchQuery: vi.fn((options) => options)
})

describe("solid server parity", () => {
  it("exports core-backed server query options for representative scopes", async () => {
    const userId = "user-1"
    const query = { userId, organizationId: "org-1" }
    const params = { query }
    const sessionParams = { headers: new Headers({ cookie: "sid=abc" }) }
    const auth = {
      api: {
        getSession: vi.fn(async () => ({ user: { id: userId } })),
        listApiKeys: vi.fn(async () => ({ apiKeys: [] })),
        listDeviceSessions: vi.fn(async () => []),
        getFullOrganization: vi.fn(async () => ({ id: "org-1" })),
        listPasskeys: vi.fn(async () => [])
      }
    }

    expect(sessionOptions(auth as never, sessionParams as never).queryKey).toBe(
      authQueryKeys.session
    )
    expect(
      listApiKeysOptions(auth as never, userId, params as never).queryKey
    ).toEqual(apiKeyQueryKeys.list(userId, query))
    expect(
      listDeviceSessionsOptions(auth as never, userId, params as never).queryKey
    ).toEqual(multiSessionQueryKeys.list(userId, query))
    expect(
      activeOrganizationOptions(auth as never, userId, params as never).queryKey
    ).toEqual(organizationQueryKeys.activeOrganization(userId, query))
    expect(
      listPasskeysOptions(auth as never, userId, params as never).queryKey
    ).toEqual(passkeyQueryKeys.list(userId, query))

    const options = listApiKeysOptions(auth as never, userId, params as never)
    await (options.queryFn as (context: never) => Promise<unknown>)({} as never)
    expect(auth.api.listApiKeys).toHaveBeenCalledWith(params)
  })

  it("delegates helpers to the provided Solid Query client", () => {
    const client = queryClient()
    const userId = "user-1"
    const params = { query: { userId, organizationId: "org-1" } }
    const auth = {
      api: {
        listApiKeys: vi.fn(),
        getFullOrganization: vi.fn()
      }
    }

    ensureListApiKeys(client as never, auth as never, userId, params as never)
    ensureActiveOrganization(
      client as never,
      auth as never,
      userId,
      params as never
    )

    expect(client.ensureQueryData).toHaveBeenCalledTimes(2)
    expect(client.ensureQueryData.mock.calls[0]?.[0].queryKey).toEqual(
      apiKeyQueryKeys.list(userId, params.query)
    )
    expect(client.ensureQueryData.mock.calls[1]?.[0].queryKey).toEqual(
      organizationQueryKeys.activeOrganization(userId, params.query)
    )
  })
})

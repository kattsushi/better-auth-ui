import { authQueryKeys } from "@better-auth-ui/core"
import {
  apiKeyQueryKeys,
  multiSessionQueryKeys,
  passkeyQueryKeys
} from "@better-auth-ui/core/plugins"
import { describe, expect, it, vi } from "vitest"
import {
  accountInfoOptions,
  ensureAccountInfo,
  listApiKeysOptions,
  listDeviceSessionsOptions,
  listPasskeysOptions,
  listSessionsOptions
} from "../../src/server"

const queryClient = () => ({
  ensureQueryData: vi.fn((options) => options),
  prefetchQuery: vi.fn((options) => options),
  fetchQuery: vi.fn((options) => options)
})

describe("react server query parity", () => {
  it("keeps plugin/settings keys and params forwarding", async () => {
    const userId = "user-1"
    const query = { userId }
    const params = { query }
    const auth = {
      api: {
        listApiKeys: vi.fn(async () => ({ apiKeys: [] })),
        listDeviceSessions: vi.fn(async () => []),
        listPasskeys: vi.fn(async () => []),
        accountInfo: vi.fn(async () => null),
        listSessions: vi.fn(async () => [])
      }
    }

    expect(
      listApiKeysOptions(auth as never, userId, params as never).queryKey
    ).toEqual(apiKeyQueryKeys.list(userId, query))
    expect(
      listDeviceSessionsOptions(auth as never, userId, params as never).queryKey
    ).toEqual(multiSessionQueryKeys.list(userId, query))
    expect(
      listPasskeysOptions(auth as never, userId, params as never).queryKey
    ).toEqual(passkeyQueryKeys.list(userId, query))
    expect(
      accountInfoOptions(auth as never, userId, params as never).queryKey
    ).toEqual(authQueryKeys.accountInfo(userId, query))
    expect(
      listSessionsOptions(auth as never, userId, params as never).queryKey
    ).toEqual(authQueryKeys.listSessions(userId, query))

    const options = listApiKeysOptions(auth as never, userId, params as never)
    await (options.queryFn as (context: never) => Promise<unknown>)({} as never)
    expect(auth.api.listApiKeys).toHaveBeenCalledWith(params)
  })

  it("delegates representative helpers to query clients", () => {
    const client = queryClient()
    const params = { query: { userId: "user-1" } }
    const auth = { api: { accountInfo: vi.fn() } }

    ensureAccountInfo(client as never, auth as never, "user-1", params as never)
    expect(client.ensureQueryData).toHaveBeenCalledTimes(1)
    expect(client.ensureQueryData.mock.calls[0]?.[0].queryKey).toEqual(
      authQueryKeys.accountInfo("user-1", params.query)
    )
  })
})

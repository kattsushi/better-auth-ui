import { authQueryKeys } from "@better-auth-ui/core"
import {
  apiKeyQueryKeys,
  multiSessionQueryKeys,
  passkeyQueryKeys
} from "@better-auth-ui/core/plugins"
import {
  accountInfoOptions,
  listApiKeysOptions,
  listDeviceSessionsOptions,
  listPasskeysOptions,
  listSessionsOptions
} from "@better-auth-ui/core/server"
import { QueryClient } from "@tanstack/react-query"
import { describe, expect, it, vi } from "vitest"
import * as reactServer from "../../src/server"
import { adaptServerQueryOptions, ensureServerQuery } from "../../src/server"

describe("react server query parity", () => {
  it("keeps plugin/settings keys and params forwarding through core descriptors", async () => {
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
    await options.queryFn()
    expect(auth.api.listApiKeys).toHaveBeenCalledWith(params)
  })

  it("delegates representative helpers through the React server query client helper", async () => {
    const params = { query: { userId: "user-1" } }
    const data = { account: { id: "account-1" } }
    const auth = { api: { accountInfo: vi.fn(async () => data) } }
    const queryClient = new QueryClient()
    const options = adaptServerQueryOptions(
      accountInfoOptions(auth as never, "user-1", params as never)
    )

    await expect(ensureServerQuery(queryClient, options)).resolves.toBe(data)
    expect(auth.api.accountInfo).toHaveBeenCalledWith(params)
    expect(options.queryKey).toEqual(
      authQueryKeys.accountInfo("user-1", params.query)
    )
  })

  it("does not export plugin/settings endpoint wrappers from React server", () => {
    expect("listApiKeysOptions" in reactServer).toBe(false)
    expect("ensureAccountInfo" in reactServer).toBe(false)
    expect("listSessionsOptions" in reactServer).toBe(false)
  })
})

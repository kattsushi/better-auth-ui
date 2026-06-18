import { authQueryKeys } from "@better-auth-ui/core"
import {
  apiKeyQueryKeys,
  multiSessionQueryKeys,
  organizationQueryKeys,
  passkeyQueryKeys
} from "@better-auth-ui/core/plugins"
import {
  activeOrganizationOptions,
  listApiKeysOptions,
  listDeviceSessionsOptions,
  listPasskeysOptions,
  type ServerQueryDescriptor,
  sessionOptions
} from "@better-auth-ui/core/server"
import { QueryClient } from "@tanstack/solid-query"
import { describe, expect, expectTypeOf, it, vi } from "vitest"
import * as solidServer from "../../src/server"
import { adaptServerQueryOptions, ensureServerQuery } from "../../src/server"

describe("solid server parity", () => {
  it("uses core-backed server descriptors for representative scopes", async () => {
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
    await options.queryFn()
    expect(auth.api.listApiKeys).toHaveBeenCalledWith(params)
  })

  it("delegates through Solid-typed generic helpers and the Solid adapter", async () => {
    const userId = "user-1"
    const params = { query: { userId, organizationId: "org-1" } }
    const apiKeyData = { apiKeys: [{ id: "key-1" }] }
    const organizationData = { id: "org-1" }
    const queryClient = new QueryClient()
    const apiKeyDescriptor: ServerQueryDescriptor<
      ReturnType<typeof apiKeyQueryKeys.list>,
      typeof apiKeyData
    > = {
      queryKey: apiKeyQueryKeys.list(userId, params.query),
      queryFn: vi.fn(async () => apiKeyData)
    }
    const organizationDescriptor: ServerQueryDescriptor<
      ReturnType<typeof organizationQueryKeys.activeOrganization>,
      typeof organizationData
    > = {
      queryKey: organizationQueryKeys.activeOrganization(userId, params.query),
      queryFn: vi.fn(async () => organizationData)
    }
    const apiKeys = adaptServerQueryOptions(apiKeyDescriptor)
    const activeOrganization = adaptServerQueryOptions(organizationDescriptor)

    const apiKeyResult = ensureServerQuery(queryClient, apiKeys)
    const organizationResult = ensureServerQuery(
      queryClient,
      activeOrganization
    )

    expectTypeOf(apiKeyResult).toEqualTypeOf<Promise<typeof apiKeyData>>()
    expectTypeOf(organizationResult).toEqualTypeOf<
      Promise<typeof organizationData>
    >()
    await expect(apiKeyResult).resolves.toBe(apiKeyData)
    await expect(organizationResult).resolves.toBe(organizationData)
    expect(apiKeys.queryKey).toEqual(apiKeyQueryKeys.list(userId, params.query))
    expect(activeOrganization.queryKey).toEqual(
      organizationQueryKeys.activeOrganization(userId, params.query)
    )
  })

  it("does not export endpoint-specific server wrappers from Solid", () => {
    expect("listApiKeysOptions" in solidServer).toBe(false)
    expect("ensureListApiKeys" in solidServer).toBe(false)
    expect("activeOrganizationOptions" in solidServer).toBe(false)
    expect("ensureActiveOrganization" in solidServer).toBe(false)
  })
})

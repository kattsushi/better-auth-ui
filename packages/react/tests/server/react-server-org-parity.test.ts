import { organizationQueryKeys } from "@better-auth-ui/core/plugins"
import { describe, expect, it, vi } from "vitest"
import {
  activeOrganizationOptions,
  ensureActiveOrganization,
  hasPermissionOptions,
  listOrganizationMembersOptions,
  listOrganizationsOptions
} from "../../src/server"

const queryClient = () => ({
  ensureQueryData: vi.fn((options) => options),
  prefetchQuery: vi.fn((options) => options),
  fetchQuery: vi.fn((options) => options)
})

describe("react server organization parity", () => {
  it("keeps organization-shaped keys and forwards params", async () => {
    const userId = "user-1"
    const query = { organizationId: "org-1" }
    const params = { query }
    const permissionParams = {
      body: {
        organizationId: "org-1",
        permissions: { organization: ["update"] }
      }
    }
    const auth = {
      api: {
        getFullOrganization: vi.fn(async () => ({ id: "org-1" })),
        hasPermission: vi.fn(async () => ({ success: true })),
        listMembers: vi.fn(async () => ({ members: [] })),
        listOrganizations: vi.fn(async () => [])
      }
    }

    expect(
      activeOrganizationOptions(auth as never, userId, params as never).queryKey
    ).toEqual(organizationQueryKeys.activeOrganization(userId, query))
    expect(
      hasPermissionOptions(auth as never, userId, permissionParams as never)
        .queryKey
    ).toEqual(
      organizationQueryKeys.permissions.has(userId, permissionParams.body)
    )
    expect(
      listOrganizationMembersOptions(auth as never, userId, params as never)
        .queryKey
    ).toEqual(organizationQueryKeys.members.list(userId, query))
    expect(
      listOrganizationsOptions(auth as never, userId, params as never).queryKey
    ).toEqual(organizationQueryKeys.list(userId, query))

    const options = hasPermissionOptions(
      auth as never,
      userId,
      permissionParams as never
    )
    await (options.queryFn as (context: never) => Promise<unknown>)({} as never)
    expect(auth.api.hasPermission).toHaveBeenCalledWith(permissionParams)
  })

  it("delegates representative organization helpers", () => {
    const client = queryClient()
    const userId = "user-1"
    const params = { query: { organizationId: "org-1" } }
    const auth = { api: { getFullOrganization: vi.fn() } }

    ensureActiveOrganization(
      client as never,
      auth as never,
      userId,
      params as never
    )

    expect(client.ensureQueryData).toHaveBeenCalledTimes(1)
    expect(client.ensureQueryData.mock.calls[0]?.[0].queryKey).toEqual(
      organizationQueryKeys.activeOrganization(userId, params.query)
    )
  })
})

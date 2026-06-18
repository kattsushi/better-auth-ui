import { organizationQueryKeys } from "@better-auth-ui/core/plugins"
import {
  activeOrganizationOptions,
  ensureServerQuery,
  hasPermissionOptions,
  listOrganizationMembersOptions,
  listOrganizationsOptions
} from "@better-auth-ui/core/server"
import { describe, expect, it, vi } from "vitest"
import * as reactServer from "../../src/server"
import { adaptServerQueryOptions } from "../../src/server"

describe("react server organization parity", () => {
  it("keeps organization-shaped keys and forwards params from core descriptors", async () => {
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
    await options.queryFn()
    expect(auth.api.hasPermission).toHaveBeenCalledWith(permissionParams)
  })

  it("delegates representative organization descriptors through core helpers", () => {
    const client = { ensureQueryData: vi.fn((options) => options) }
    const userId = "user-1"
    const params = { query: { organizationId: "org-1" } }
    const auth = { api: { getFullOrganization: vi.fn() } }
    const options = adaptServerQueryOptions(
      activeOrganizationOptions(auth as never, userId, params as never)
    )

    ensureServerQuery(client, options)

    expect(client.ensureQueryData).toHaveBeenCalledTimes(1)
    expect(client.ensureQueryData.mock.calls[0]?.[0].queryKey).toEqual(
      organizationQueryKeys.activeOrganization(userId, params.query)
    )
  })

  it("does not export organization endpoint wrappers from React server", () => {
    expect("activeOrganizationOptions" in reactServer).toBe(false)
    expect("ensureActiveOrganization" in reactServer).toBe(false)
    expect("listOrganizationsOptions" in reactServer).toBe(false)
  })
})

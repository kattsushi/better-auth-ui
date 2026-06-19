import { describe, expect, expectTypeOf, it } from "vitest"
import * as reactServer from "../../react/src/server"
import type { ApiKeyAuthServer, OrganizationAuthServer } from "../src/server"
import * as solidServer from "../src/server"

const serverHelperExports = [
  "accountInfoOptions",
  "activeOrganizationOptions",
  "ensureAccountInfo",
  "ensureActiveOrganization",
  "ensureFullOrganization",
  "ensureHasPermission",
  "ensureListAccounts",
  "ensureListApiKeys",
  "ensureListDeviceSessions",
  "ensureListOrganizationInvitations",
  "ensureListOrganizationMembers",
  "ensureListOrganizations",
  "ensureListPasskeys",
  "ensureListSessions",
  "ensureListUserInvitations",
  "fetchAccountInfo",
  "fetchActiveOrganization",
  "fetchFullOrganization",
  "fetchHasPermission",
  "fetchListAccounts",
  "fetchListApiKeys",
  "fetchListDeviceSessions",
  "fetchListOrganizationInvitations",
  "fetchListOrganizationMembers",
  "fetchListOrganizations",
  "fetchListPasskeys",
  "fetchListSessions",
  "fetchListUserInvitations",
  "fullOrganizationOptions",
  "hasPermissionOptions",
  "listAccountsOptions",
  "listApiKeysOptions",
  "listDeviceSessionsOptions",
  "listOrganizationInvitationsOptions",
  "listOrganizationMembersOptions",
  "listOrganizationsOptions",
  "listPasskeysOptions",
  "listSessionsOptions",
  "listUserInvitationsOptions",
  "prefetchAccountInfo",
  "prefetchActiveOrganization",
  "prefetchFullOrganization",
  "prefetchHasPermission",
  "prefetchListAccounts",
  "prefetchListApiKeys",
  "prefetchListDeviceSessions",
  "prefetchListOrganizationInvitations",
  "prefetchListOrganizationMembers",
  "prefetchListOrganizations",
  "prefetchListPasskeys",
  "prefetchListSessions",
  "prefetchListUserInvitations",
  "sessionOptions",
  "ensureSession",
  "prefetchSession",
  "fetchSession"
] as const

describe("Solid server export parity", () => {
  it("matches React's true server-auth helper surface", () => {
    for (const exportName of serverHelperExports) {
      expect(exportName in reactServer, `React exports ${exportName}`).toBe(
        true
      )
      expect(exportName in solidServer, `Solid exports ${exportName}`).toBe(
        true
      )
    }
  })

  it("exposes plugin-specific Solid server auth types", () => {
    expectTypeOf<ApiKeyAuthServer>().toHaveProperty("api")
    expectTypeOf<OrganizationAuthServer>().toHaveProperty("api")
  })
})

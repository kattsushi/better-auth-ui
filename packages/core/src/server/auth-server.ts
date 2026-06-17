import type { Auth } from "better-auth"

export type AuthServer = Pick<Auth, "api">

export type ServerApiParams = {
  query?: Record<string, unknown>
  body?: Record<string, unknown>
  headers?: Headers
}

export type ServerApiMethod<
  TData = unknown,
  TParams extends ServerApiParams = ServerApiParams
> = (params: TParams) => Promise<TData>

export type ServerRecord = Record<string, unknown>

export type ApiKeyListData = { apiKeys: Array<ServerRecord> }
export type DeviceSessionListData = Array<ServerRecord>
export type PasskeyListData = Array<ServerRecord>
export type OrganizationListData = Array<ServerRecord>
export type OrganizationData = ServerRecord | null
export type PermissionData = ServerRecord
export type OrganizationMembersData = ServerRecord
export type OrganizationInvitationsData = ServerRecord
export type UserInvitationsData = ServerRecord

export type MagicLinkAuthServer = AuthServer

export type MultiSessionAuthServer = AuthServer & {
  api: AuthServer["api"] & {
    listDeviceSessions: ServerApiMethod<DeviceSessionListData>
  }
}

export type PasskeyAuthServer = AuthServer & {
  api: AuthServer["api"] & {
    listPasskeys: ServerApiMethod<PasskeyListData>
  }
}

export type ApiKeyAuthServer = AuthServer & {
  api: AuthServer["api"] & {
    listApiKeys: ServerApiMethod<ApiKeyListData>
  }
}

export type UsernameAuthServer = AuthServer

export type OrganizationAuthServer = AuthServer & {
  api: AuthServer["api"] & {
    getFullOrganization: ServerApiMethod<OrganizationData>
    hasPermission: ServerApiMethod<PermissionData>
    listInvitations: ServerApiMethod<OrganizationInvitationsData>
    listMembers: ServerApiMethod<OrganizationMembersData>
    listOrganizations: ServerApiMethod<OrganizationListData>
    listUserInvitations: ServerApiMethod<UserInvitationsData>
  }
}

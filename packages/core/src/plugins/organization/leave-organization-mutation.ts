import type { MutationOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import {
  type AuthMutationFnData,
  type AuthMutationFnVariables,
  authMutationOptions
} from "../../lib/auth-mutation-options"
import type { OrganizationAuthClient } from "./organization-auth-client"
import { organizationMutationKeys } from "./organization-mutation-keys"
import { organizationQueryKeys } from "./organization-query-keys"

export type LeaveOrganizationFn<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = TAuthClient["organization"]["leave"]

export type LeaveOrganizationParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = AuthMutationFnVariables<LeaveOrganizationFn<TAuthClient>>

export type LeaveOrganizationOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  ReturnType<typeof leaveOrganizationOptions<TAuthClient>>,
  "mutationKey" | "mutationFn" | "meta"
>

export const leaveOrganizationMeta = (userId: string | undefined) => ({
  awaits: [
    organizationQueryKeys.members.all(userId),
    organizationQueryKeys.fullDetails(userId)
  ],
  invalidates: [
    organizationQueryKeys.lists(userId),
    organizationQueryKeys.activeOrganizations(userId)
  ]
})

export function leaveOrganizationOptions<
  TAuthClient extends OrganizationAuthClient
>(authClient: TAuthClient, userId?: string) {
  return {
    ...authMutationOptions(
      authClient.organization.leave,
      organizationMutationKeys.leave
    ),
    meta: leaveOrganizationMeta(userId)
  } as MutationOptions<
    AuthMutationFnData<LeaveOrganizationFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<LeaveOrganizationFn<TAuthClient>>
  >
}

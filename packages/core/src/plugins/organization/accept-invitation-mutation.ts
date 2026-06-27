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

export type AcceptInvitationFn<TAuthClient extends OrganizationAuthClient> =
  TAuthClient["organization"]["acceptInvitation"]

export type AcceptInvitationParams<TAuthClient extends OrganizationAuthClient> =
  AuthMutationFnVariables<AcceptInvitationFn<TAuthClient>>

export type AcceptInvitationOptions<
  TAuthClient extends OrganizationAuthClient
> = Omit<
  ReturnType<typeof acceptInvitationOptions<TAuthClient>>,
  "mutationKey" | "mutationFn" | "meta"
>

export const acceptInvitationMeta = (userId: string | undefined) => ({
  awaits: [
    organizationQueryKeys.userInvitations.all(userId),
    organizationQueryKeys.lists(userId)
  ],
  invalidates: [
    organizationQueryKeys.fullDetails(userId),
    organizationQueryKeys.activeOrganizations(userId)
  ]
})

export function acceptInvitationOptions<
  TAuthClient extends OrganizationAuthClient
>(authClient: TAuthClient, userId?: string) {
  return {
    ...authMutationOptions(
      authClient.organization.acceptInvitation,
      organizationMutationKeys.acceptInvitation
    ),
    meta: acceptInvitationMeta(userId)
  } as MutationOptions<
    AuthMutationFnData<AcceptInvitationFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<AcceptInvitationFn<TAuthClient>>
  >
}

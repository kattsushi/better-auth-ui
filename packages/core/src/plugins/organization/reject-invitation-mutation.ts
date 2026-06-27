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

export type RejectInvitationFn<TAuthClient extends OrganizationAuthClient> =
  TAuthClient["organization"]["rejectInvitation"]

export type RejectInvitationParams<TAuthClient extends OrganizationAuthClient> =
  AuthMutationFnVariables<RejectInvitationFn<TAuthClient>>

export type RejectInvitationOptions<
  TAuthClient extends OrganizationAuthClient
> = Omit<
  ReturnType<typeof rejectInvitationOptions<TAuthClient>>,
  "mutationKey" | "mutationFn" | "meta"
>

export const rejectInvitationMeta = (userId: string | undefined) => ({
  awaits: [organizationQueryKeys.userInvitations.all(userId)]
})

export function rejectInvitationOptions<
  TAuthClient extends OrganizationAuthClient
>(authClient: TAuthClient, userId?: string) {
  return {
    ...authMutationOptions(
      authClient.organization.rejectInvitation,
      organizationMutationKeys.rejectInvitation
    ),
    meta: rejectInvitationMeta(userId)
  } as MutationOptions<
    AuthMutationFnData<RejectInvitationFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<RejectInvitationFn<TAuthClient>>
  >
}

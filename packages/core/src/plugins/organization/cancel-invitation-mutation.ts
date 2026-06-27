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

export type CancelInvitationFn<TAuthClient extends OrganizationAuthClient> =
  TAuthClient["organization"]["cancelInvitation"]

export type CancelInvitationParams<TAuthClient extends OrganizationAuthClient> =
  AuthMutationFnVariables<CancelInvitationFn<TAuthClient>>

export type CancelInvitationOptions<
  TAuthClient extends OrganizationAuthClient
> = Omit<
  ReturnType<typeof cancelInvitationOptions<TAuthClient>>,
  "mutationKey" | "mutationFn" | "meta"
>

export const cancelInvitationMeta = (userId: string | undefined) => ({
  awaits: [
    organizationQueryKeys.invitations.all(userId),
    organizationQueryKeys.fullDetails(userId)
  ]
})

export function cancelInvitationOptions<
  TAuthClient extends OrganizationAuthClient
>(authClient: TAuthClient, userId?: string) {
  return {
    ...authMutationOptions(
      authClient.organization.cancelInvitation,
      organizationMutationKeys.cancelInvitation
    ),
    meta: cancelInvitationMeta(userId)
  } as MutationOptions<
    AuthMutationFnData<CancelInvitationFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<CancelInvitationFn<TAuthClient>>
  >
}

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

export type RemoveMemberFn<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = TAuthClient["organization"]["removeMember"]

export type RemoveMemberParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = AuthMutationFnVariables<RemoveMemberFn<TAuthClient>>

export type RemoveMemberOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  ReturnType<typeof removeMemberOptions<TAuthClient>>,
  "mutationKey" | "mutationFn" | "meta"
>

export const removeMemberMeta = (userId: string | undefined) => ({
  awaits: [
    organizationQueryKeys.members.all(userId),
    organizationQueryKeys.fullDetails(userId)
  ],
  invalidates: [organizationQueryKeys.lists(userId)]
})

export function removeMemberOptions<TAuthClient extends OrganizationAuthClient>(
  authClient: TAuthClient,
  userId?: string
) {
  return {
    ...authMutationOptions(
      authClient.organization.removeMember,
      organizationMutationKeys.removeMember
    ),
    meta: removeMemberMeta(userId)
  } as MutationOptions<
    AuthMutationFnData<RemoveMemberFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<RemoveMemberFn<TAuthClient>>
  >
}

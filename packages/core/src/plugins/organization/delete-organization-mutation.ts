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

export type DeleteOrganizationFn<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = TAuthClient["organization"]["delete"]

export type DeleteOrganizationParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = AuthMutationFnVariables<DeleteOrganizationFn<TAuthClient>>

export type DeleteOrganizationOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  ReturnType<typeof deleteOrganizationOptions<TAuthClient>>,
  "mutationKey" | "mutationFn" | "meta"
>

export const deleteOrganizationMeta = (userId: string | undefined) => ({
  awaits: [organizationQueryKeys.lists(userId)],
  invalidates: [
    organizationQueryKeys.fullDetails(userId),
    organizationQueryKeys.activeOrganizations(userId)
  ]
})

export function deleteOrganizationOptions<
  TAuthClient extends OrganizationAuthClient
>(authClient: TAuthClient, userId?: string) {
  return {
    ...authMutationOptions(
      authClient.organization.delete,
      organizationMutationKeys.delete
    ),
    meta: deleteOrganizationMeta(userId)
  } as MutationOptions<
    AuthMutationFnData<DeleteOrganizationFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<DeleteOrganizationFn<TAuthClient>>
  >
}

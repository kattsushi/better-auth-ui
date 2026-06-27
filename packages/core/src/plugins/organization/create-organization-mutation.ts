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

export type CreateOrganizationFn<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = TAuthClient["organization"]["create"]

export type CreateOrganizationParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = AuthMutationFnVariables<CreateOrganizationFn<TAuthClient>>

export type CreateOrganizationOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  ReturnType<typeof createOrganizationOptions<TAuthClient>>,
  "mutationKey" | "mutationFn" | "meta"
>

export const createOrganizationMeta = (userId: string | undefined) => ({
  awaits: [organizationQueryKeys.lists(userId)],
  invalidates: [
    organizationQueryKeys.fullDetails(userId),
    organizationQueryKeys.activeOrganizations(userId)
  ]
})

export function createOrganizationOptions<
  TAuthClient extends OrganizationAuthClient
>(authClient: TAuthClient, userId?: string) {
  return {
    ...authMutationOptions(
      authClient.organization.create,
      organizationMutationKeys.create
    ),
    meta: createOrganizationMeta(userId)
  } as MutationOptions<
    AuthMutationFnData<CreateOrganizationFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<CreateOrganizationFn<TAuthClient>>
  >
}

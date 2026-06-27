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

export type SetActiveOrganizationFn<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = TAuthClient["organization"]["setActive"]

export type SetActiveOrganizationParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = AuthMutationFnVariables<SetActiveOrganizationFn<TAuthClient>>

export type SetActiveOrganizationOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  ReturnType<typeof setActiveOrganizationOptions<TAuthClient>>,
  "mutationKey" | "mutationFn" | "meta"
>

export const setActiveOrganizationMeta = (userId: string | undefined) => ({
  awaits: [organizationQueryKeys.activeOrganizations(userId)],
  invalidates: [organizationQueryKeys.lists(userId)]
})

export function setActiveOrganizationOptions<
  TAuthClient extends OrganizationAuthClient
>(authClient: TAuthClient, userId?: string) {
  return {
    ...authMutationOptions(
      authClient.organization.setActive,
      organizationMutationKeys.setActive
    ),
    meta: setActiveOrganizationMeta(userId)
  } as MutationOptions<
    AuthMutationFnData<SetActiveOrganizationFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<SetActiveOrganizationFn<TAuthClient>>
  >
}

import type { MutationOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import {
  type AuthMutationFn,
  type AuthMutationFnData,
  type AuthMutationFnVariables,
  authMutationOptions
} from "../../lib/auth-mutation-options"
import type { OrganizationAuthClient } from "./organization-auth-client"
import { organizationMutationKeys } from "./organization-mutation-keys"
import { organizationQueryKeys } from "./organization-query-keys"

export type UpdateOrganizationFn<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = TAuthClient["organization"]["update"]

export type UpdateOrganizationParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = AuthMutationFnVariables<UpdateOrganizationFn<TAuthClient>>

export type UpdateOrganizationOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  ReturnType<typeof updateOrganizationOptions<TAuthClient>>,
  "mutationKey" | "mutationFn" | "meta"
>

export const updateOrganizationMeta = (userId: string | undefined) => ({
  awaits: [
    organizationQueryKeys.lists(userId),
    organizationQueryKeys.fullDetails(userId),
    organizationQueryKeys.activeOrganizations(userId)
  ]
})

export function updateOrganizationOptions<
  TAuthClient extends OrganizationAuthClient
>(authClient: TAuthClient, userId?: string, organizationId?: string) {
  const baseOptions = authMutationOptions(
    authClient.organization.update,
    organizationMutationKeys.update
  )

  return {
    ...baseOptions,
    mutationFn: (params: UpdateOrganizationParams<TAuthClient>) => {
      const input = params as UpdateOrganizationParams<TAuthClient> & {
        fetchOptions?: Record<string, unknown>
        organizationId?: string
      }
      const mutation = authClient.organization.update as AuthMutationFn

      return mutation({
        ...params,
        organizationId: input.organizationId ?? organizationId,
        fetchOptions: { ...input.fetchOptions, throw: true }
      })
    },
    meta: updateOrganizationMeta(userId)
  } as unknown as MutationOptions<
    AuthMutationFnData<UpdateOrganizationFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<UpdateOrganizationFn<TAuthClient>>
  >
}

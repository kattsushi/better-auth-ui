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

export type UpdateMemberRoleFn<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = TAuthClient["organization"]["updateMemberRole"]

export type UpdateMemberRoleParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = AuthMutationFnVariables<UpdateMemberRoleFn<TAuthClient>>

export type UpdateMemberRoleOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  ReturnType<typeof updateMemberRoleOptions<TAuthClient>>,
  "mutationKey" | "mutationFn" | "meta"
>

export const memberRoleMeta = (userId: string | undefined) => ({
  awaits: [
    organizationQueryKeys.members.all(userId),
    organizationQueryKeys.fullDetails(userId)
  ],
  invalidates: [organizationQueryKeys.permissions.all(userId)]
})

export function updateMemberRoleOptions<
  TAuthClient extends OrganizationAuthClient
>(authClient: TAuthClient, userId?: string, organizationId?: string) {
  const baseOptions = authMutationOptions(
    authClient.organization.updateMemberRole,
    organizationMutationKeys.updateMemberRole
  )

  return {
    ...baseOptions,
    mutationFn: (params: UpdateMemberRoleParams<TAuthClient>) => {
      const input = params as UpdateMemberRoleParams<TAuthClient> & {
        fetchOptions?: Record<string, unknown>
        organizationId?: string
      }
      const mutation = authClient.organization
        .updateMemberRole as AuthMutationFn

      return mutation({
        ...params,
        organizationId: input.organizationId ?? organizationId,
        fetchOptions: { ...input.fetchOptions, throw: true }
      })
    },
    meta: memberRoleMeta(userId)
  } as unknown as MutationOptions<
    AuthMutationFnData<UpdateMemberRoleFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<UpdateMemberRoleFn<TAuthClient>>
  >
}

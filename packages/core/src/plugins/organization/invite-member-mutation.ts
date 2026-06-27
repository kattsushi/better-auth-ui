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

export type InviteMemberFn<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = TAuthClient["organization"]["inviteMember"]

export type InviteMemberParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = AuthMutationFnVariables<InviteMemberFn<TAuthClient>>

export type InviteMemberOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  ReturnType<typeof inviteMemberOptions<TAuthClient>>,
  "mutationKey" | "mutationFn" | "meta"
>

export const inviteMemberMeta = (userId: string | undefined) => ({
  awaits: [
    organizationQueryKeys.invitations.all(userId),
    organizationQueryKeys.fullDetails(userId)
  ]
})

export function inviteMemberOptions<TAuthClient extends OrganizationAuthClient>(
  authClient: TAuthClient,
  userId?: string,
  organizationId?: string
) {
  const baseOptions = authMutationOptions(
    authClient.organization.inviteMember,
    organizationMutationKeys.inviteMember
  )

  return {
    ...baseOptions,
    mutationFn: (params: InviteMemberParams<TAuthClient>) => {
      const input = params as InviteMemberParams<TAuthClient> & {
        fetchOptions?: Record<string, unknown>
        organizationId?: string
      }

      const inviteMember = authClient.organization
        .inviteMember as AuthMutationFn

      return inviteMember({
        ...params,
        organizationId: input.organizationId ?? organizationId,
        fetchOptions: { ...input.fetchOptions, throw: true }
      } as InviteMemberParams<TAuthClient>)
    },
    meta: inviteMemberMeta(userId)
  } as unknown as MutationOptions<
    AuthMutationFnData<InviteMemberFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<InviteMemberFn<TAuthClient>>
  >
}

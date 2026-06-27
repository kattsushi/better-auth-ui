import type { MutationOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import {
  type AuthMutationFnData,
  type AuthMutationFnVariables,
  authMutationOptions
} from "../../lib/auth-mutation-options"
import type { OrganizationAuthClient } from "./organization-auth-client"
import { organizationMutationKeys } from "./organization-mutation-keys"

export type CheckSlugFn<TAuthClient extends OrganizationAuthClient> =
  TAuthClient["organization"]["checkSlug"]

export type CheckSlugParams<TAuthClient extends OrganizationAuthClient> =
  AuthMutationFnVariables<CheckSlugFn<TAuthClient>>

export type CheckOrganizationSlugParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = CheckSlugParams<TAuthClient>

export type CheckSlugOptions<TAuthClient extends OrganizationAuthClient> = Omit<
  ReturnType<typeof checkSlugOptions<TAuthClient>>,
  "mutationKey" | "mutationFn"
>

export type CheckOrganizationSlugOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = CheckSlugOptions<TAuthClient>

/**
 * Mutation options factory for checking organization slug availability.
 *
 * @param authClient - The Better Auth organization client.
 */
export function checkSlugOptions<TAuthClient extends OrganizationAuthClient>(
  authClient: TAuthClient
) {
  return authMutationOptions(
    authClient.organization.checkSlug,
    organizationMutationKeys.checkSlug
  ) as MutationOptions<
    AuthMutationFnData<CheckSlugFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<CheckSlugFn<TAuthClient>>
  >
}

export const checkOrganizationSlugOptions = checkSlugOptions

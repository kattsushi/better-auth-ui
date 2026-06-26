import type { OrganizationAuthClient } from "@better-auth-ui/core/plugins/organization"
import { organizationMutationKeys } from "@better-auth-ui/core/plugins/organization"
import { updateOrganizationMeta } from "./metadata"
import {
  createOrganizationMutationOptions,
  type OrganizationMutationOptions,
  useOrganizationMutation
} from "./utils"

export type UpdateOrganizationParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Parameters<TAuthClient["organization"]["update"]>[0]

export type UpdateOrganizationOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = OrganizationMutationOptions<TAuthClient["organization"]["update"]>

export function updateOrganizationOptions<
  TAuthClient extends OrganizationAuthClient
>(authClient: TAuthClient) {
  return createOrganizationMutationOptions(
    authClient.organization.update,
    organizationMutationKeys.update
  )
}

export function useUpdateOrganization<
  TAuthClient extends OrganizationAuthClient
>(authClient: TAuthClient, options?: UpdateOrganizationOptions<TAuthClient>) {
  return useOrganizationMutation(
    authClient,
    authClient.organization.update,
    organizationMutationKeys.update,
    updateOrganizationMeta,
    options
  )
}

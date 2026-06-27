import {
  type CheckOrganizationSlugOptions,
  checkOrganizationSlugOptions,
  type OrganizationAuthClient
} from "@better-auth-ui/core/plugins/organization"
import { useMutation } from "@tanstack/solid-query"

export function useCheckOrganizationSlug<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  options?: CheckOrganizationSlugOptions<TAuthClient>
) {
  return useMutation(() => ({
    ...checkOrganizationSlugOptions(authClient),
    ...options
  }))
}

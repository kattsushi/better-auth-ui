import {
  type ListOrganizationInvitationsData,
  type ListOrganizationInvitationsParams,
  listOrganizationInvitationsOptions,
  type OrganizationAuthClient
} from "@better-auth-ui/core/plugins/organization"
import {
  createQuery,
  skipToken,
  type UseQueryOptions
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"
import { useSession } from "../../../../hooks/queries/use-session"
import { useActiveOrganization } from "./use-active-organization"

export type UseListOrganizationInvitationsOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  UseQueryOptions<
    ListOrganizationInvitationsData<TAuthClient>,
    BetterFetchError,
    ListOrganizationInvitationsData<TAuthClient>,
    ReturnType<
      typeof listOrganizationInvitationsOptions<TAuthClient>
    >["queryKey"]
  >,
  "queryKey" | "queryFn" | "initialData"
> &
  ListOrganizationInvitationsParams<TAuthClient>

export function useListOrganizationInvitations<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  options: UseListOrganizationInvitationsOptions<TAuthClient> = {}
) {
  const session = useSession(authClient)
  const activeOrganization = useActiveOrganization(authClient, {
    enabled: !options.query?.organizationId
  })

  return createQuery(() => {
    const userId = session.data?.user.id
    const { query, fetchOptions, ...queryOptions } = options
    const organizationId = query?.organizationId ?? activeOrganization.data?.id
    const { initialData: _initialData, ...baseOptions } =
      listOrganizationInvitationsOptions(authClient, userId, {
        query: { ...query, organizationId },
        fetchOptions
      })

    return {
      ...queryOptions,
      ...baseOptions,
      queryFn: userId && organizationId ? baseOptions.queryFn : skipToken
    }
  })
}

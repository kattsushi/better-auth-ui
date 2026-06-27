import {
  type ListOrganizationMembersData,
  type ListOrganizationMembersParams,
  listOrganizationMembersOptions,
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

export type UseListOrganizationMembersOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  UseQueryOptions<
    ListOrganizationMembersData<TAuthClient>,
    BetterFetchError,
    ListOrganizationMembersData<TAuthClient>,
    ReturnType<typeof listOrganizationMembersOptions<TAuthClient>>["queryKey"]
  >,
  "queryKey" | "queryFn" | "initialData"
> &
  ListOrganizationMembersParams<TAuthClient>

export function useListOrganizationMembers<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  options: UseListOrganizationMembersOptions<TAuthClient> = {}
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
      listOrganizationMembersOptions(authClient, userId, {
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

import {
  type ListOrganizationMembersData,
  type ListOrganizationMembersParams,
  listOrganizationMembersOptions,
  type OrganizationAuthClient
} from "@better-auth-ui/core/plugins/organization"
import {
  createQuery,
  type QueryClient,
  type QueryOptions,
  skipToken
} from "@tanstack/solid-query"
import type { Accessor } from "solid-js"
import { useSession } from "../../../../hooks/queries/use-session"
import { useActiveOrganization } from "./use-active-organization"

export type UseListOrganizationMembersOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Accessor<
  Omit<QueryOptions<ListOrganizationMembersData<TAuthClient>>, "queryKey"> &
    ListOrganizationMembersParams<TAuthClient>
>

export function useListOrganizationMembers<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  options?: UseListOrganizationMembersOptions<TAuthClient>,
  queryClient?: Accessor<QueryClient>
) {
  const session = useSession(authClient, undefined, queryClient)
  const activeOrganization = useActiveOrganization(
    authClient,
    () => ({
      enabled: !options?.().query?.organizationId
    }),
    queryClient
  )

  return createQuery(() => {
    const userId = session.data?.user.id
    const { query, fetchOptions, initialData, ...queryOptions } =
      options?.() ?? {}
    const organizationId = query?.organizationId ?? activeOrganization.data?.id
    const baseOptions = listOrganizationMembersOptions(authClient, userId, {
      query: { ...query, organizationId },
      fetchOptions
    })

    return {
      ...baseOptions,
      queryFn: userId && organizationId ? baseOptions.queryFn : skipToken,
      ...queryOptions,
      initialData: initialData as undefined
    }
  }, queryClient)
}

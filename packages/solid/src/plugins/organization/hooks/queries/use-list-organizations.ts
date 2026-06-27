import {
  type ListOrganizationsData,
  type ListOrganizationsParams,
  listOrganizationsOptions,
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

export type UseListOrganizationsOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Accessor<
  Omit<QueryOptions<ListOrganizationsData<TAuthClient>>, "queryKey"> &
    ListOrganizationsParams<TAuthClient>
>

export function useListOrganizations<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  options?: UseListOrganizationsOptions<TAuthClient>,
  queryClient?: Accessor<QueryClient>
) {
  const session = useSession(authClient, undefined, queryClient)

  return createQuery(() => {
    const userId = session.data?.user.id
    const { query, fetchOptions, initialData, ...queryOptions } =
      options?.() ?? {}
    const baseOptions = listOrganizationsOptions(authClient, userId, {
      query,
      fetchOptions
    })

    return {
      ...baseOptions,
      queryFn: userId ? baseOptions.queryFn : skipToken,
      ...queryOptions,
      initialData: initialData as undefined
    }
  }, queryClient)
}

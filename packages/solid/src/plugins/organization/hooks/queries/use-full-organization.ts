import {
  type FullOrganizationData,
  type FullOrganizationParams,
  fullOrganizationOptions,
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

export type UseFullOrganizationOptions<
  TAuthClient extends OrganizationAuthClient
> = Accessor<
  Omit<QueryOptions<FullOrganizationData<TAuthClient>>, "queryKey"> &
    FullOrganizationParams<TAuthClient>
>

export function useFullOrganization<TAuthClient extends OrganizationAuthClient>(
  authClient: TAuthClient,
  options?: UseFullOrganizationOptions<TAuthClient>,
  queryClient?: Accessor<QueryClient>
) {
  const session = useSession(authClient, undefined, queryClient)

  return createQuery(() => {
    const userId = session.data?.user.id
    const { query, fetchOptions, initialData, ...queryOptions } =
      options?.() ?? {}
    const baseOptions = fullOrganizationOptions(authClient, userId, {
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

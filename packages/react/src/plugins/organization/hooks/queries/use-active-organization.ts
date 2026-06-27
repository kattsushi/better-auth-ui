import {
  type ActiveOrganizationData,
  type ActiveOrganizationParams,
  activeOrganizationOptions,
  type OrganizationAuthClient,
  organizationPlugin
} from "@better-auth-ui/core/plugins/organization"
import {
  type QueryClient,
  skipToken,
  type UseQueryOptions,
  useQuery
} from "@tanstack/react-query"
import type { BetterFetchError } from "better-auth/client"
import { useSession } from "../../../../hooks/queries/use-session"
import { useAuthPlugin } from "../../../../hooks/use-auth-plugin"

export type UseActiveOrganizationOptions<
  TAuthClient extends OrganizationAuthClient
> = Omit<
  UseQueryOptions<
    ActiveOrganizationData<TAuthClient>,
    BetterFetchError,
    ActiveOrganizationData<TAuthClient>,
    ReturnType<typeof activeOrganizationOptions<TAuthClient>>["queryKey"]
  >,
  "queryKey" | "queryFn"
> &
  ActiveOrganizationParams<TAuthClient>

export function useActiveOrganization<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  options: UseActiveOrganizationOptions<TAuthClient> = {},
  queryClient?: QueryClient
) {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const userId = session?.user.id
  const { slug } = useAuthPlugin(organizationPlugin)
  const { query, fetchOptions, ...queryOptions } = options

  const baseOptions = activeOrganizationOptions(authClient, userId, {
    fetchOptions,
    query: slug ? { organizationSlug: slug } : query
  } as ActiveOrganizationParams<TAuthClient>)

  return useQuery(
    {
      ...queryOptions,
      ...baseOptions,
      queryFn:
        slug === null
          ? async () => null
          : userId
            ? baseOptions.queryFn
            : skipToken
    },
    queryClient
  )
}

import {
  type ApiKeyAuthClient,
  type ListApiKeysData,
  type ListApiKeysParams,
  listApiKeysOptions
} from "@better-auth-ui/core/plugins/api-key"
import {
  type QueryClient,
  skipToken,
  type UseQueryOptions,
  useQuery
} from "@tanstack/react-query"
import type { BetterFetchError } from "better-auth/client"
import { useSession } from "../../../../hooks/queries/use-session"

export type UseListApiKeysOptions<TAuthClient extends ApiKeyAuthClient> = Omit<
  UseQueryOptions<
    ListApiKeysData<TAuthClient>,
    BetterFetchError,
    ListApiKeysData<TAuthClient>,
    ReturnType<typeof listApiKeysOptions<TAuthClient>>["queryKey"]
  >,
  "queryKey" | "queryFn"
> &
  ListApiKeysParams<TAuthClient>

export function useListApiKeys<TAuthClient extends ApiKeyAuthClient>(
  authClient: TAuthClient,
  options: UseListApiKeysOptions<TAuthClient> = {},
  queryClient?: QueryClient
) {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const userId = session?.user.id

  const { query, fetchOptions, ...queryOptionsRest } = options
  const queryParams = query as
    | { configId?: string; organizationId?: string }
    | undefined
  const hasRequiredParams =
    queryParams?.configId === "organization"
      ? Boolean(queryParams.organizationId)
      : true

  const baseOptions = listApiKeysOptions(authClient, userId, {
    query,
    fetchOptions
  })

  return useQuery(
    {
      ...queryOptionsRest,
      ...baseOptions,
      queryFn: userId && hasRequiredParams ? baseOptions.queryFn : skipToken
    },
    queryClient
  )
}

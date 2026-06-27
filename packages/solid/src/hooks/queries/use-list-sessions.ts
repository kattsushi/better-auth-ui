import {
  type AuthClient,
  type ListSessionsData,
  type ListSessionsParams,
  listSessionsOptions
} from "@better-auth-ui/core"
import {
  type QueryClient,
  type UseQueryOptions,
  useQuery
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"

import { useSession } from "./use-session"

export type UseListSessionsOptions<TAuthClient extends AuthClient> = Omit<
  UseQueryOptions<
    ListSessionsData<TAuthClient>,
    BetterFetchError,
    ListSessionsData<TAuthClient>
  >,
  "queryKey" | "queryFn"
> &
  ListSessionsParams<TAuthClient>

export function useListSessions<TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options: UseListSessionsOptions<TAuthClient> = {},
  queryClient?: () => QueryClient
) {
  const { data: session } = useSession(authClient)
  const { query, fetchOptions, ...queryOptions } = options

  return useQuery(() => {
    return {
      ...listSessionsOptions(authClient, session?.user.id, {
        query,
        fetchOptions
      }),
      ...queryOptions
    }
  }, queryClient)
}

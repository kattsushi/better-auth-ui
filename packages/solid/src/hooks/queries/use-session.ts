import {
  type AuthClient,
  type SessionData,
  type SessionParams,
  sessionOptions
} from "@better-auth-ui/core"
import {
  type QueryClient,
  type UseQueryOptions,
  useQuery
} from "@tanstack/solid-query"

export type UseSessionOptions<TAuthClient extends AuthClient> = Partial<
  UseQueryOptions<SessionData<TAuthClient>>
> &
  SessionParams<TAuthClient>

export function useSession<TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options: UseSessionOptions<TAuthClient> = {},
  queryClient?: () => QueryClient
) {
  const { query, fetchOptions, ...queryOptions } = options

  return useQuery(() => {
    return {
      ...sessionOptions(authClient, {
        query,
        fetchOptions
      }),
      ...queryOptions
    }
  }, queryClient)
}

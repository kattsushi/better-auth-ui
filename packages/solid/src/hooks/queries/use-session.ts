import {
  type AuthClient,
  type authQueryKeys,
  type SessionData,
  type SessionOptions,
  type SessionParams,
  sessionOptions
} from "@better-auth-ui/core"
import {
  type QueryOptions as SolidQueryOptions,
  useQuery
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"

export type UseSessionOptions<TAuthClient extends AuthClient> = Omit<
  SolidQueryOptions<
    SessionData<TAuthClient>,
    BetterFetchError,
    SessionData<TAuthClient>,
    typeof authQueryKeys.session
  >,
  "initialData" | "queryKey" | "queryFn"
> &
  Omit<SessionOptions<TAuthClient>, "initialData"> &
  SessionParams<TAuthClient>

export function useSession<TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options: UseSessionOptions<TAuthClient> = {}
) {
  const { query, fetchOptions, ...queryOptions } = options

  return useQuery(() => {
    const { initialData: _initialData, ...baseOptions } = sessionOptions(
      authClient,
      { query, fetchOptions }
    )

    return {
      ...baseOptions,
      ...queryOptions
    }
  })
}

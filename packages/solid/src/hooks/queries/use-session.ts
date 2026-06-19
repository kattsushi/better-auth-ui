import {
  type SessionAuthClient,
  type SessionData,
  type SessionOptions,
  type SessionParams,
  sessionOptions
} from "@better-auth-ui/core"
import {
  createQuery,
  type QueryOptions,
  type UseQueryResult
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"

export type UseSessionOptions<TAuthClient extends SessionAuthClient> = Omit<
  QueryOptions<
    SessionData<TAuthClient>,
    BetterFetchError,
    SessionData<TAuthClient>
  >,
  "queryKey" | "queryFn"
> &
  SessionOptions<TAuthClient> &
  SessionParams<TAuthClient>

export function useSession<TAuthClient extends SessionAuthClient>(
  authClient: TAuthClient,
  options: UseSessionOptions<TAuthClient> = {}
): UseQueryResult<SessionData<TAuthClient>, BetterFetchError> {
  return createQuery(() => {
    const { query, fetchOptions, ...queryOptions } = options

    return {
      ...sessionOptions(authClient as never, { query, fetchOptions } as never),
      ...queryOptions
    } as never
  }) as UseQueryResult<SessionData<TAuthClient>, BetterFetchError>
}

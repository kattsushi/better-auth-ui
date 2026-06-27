import {
  type QueryClient,
  type QueryOptions,
  skipToken
} from "@tanstack/query-core"
import type { AuthClient, InferData } from "../lib/auth-client"
import { authQueryKeys } from "../lib/auth-query-keys"

export type ListSessionsData<TAuthClient extends AuthClient = AuthClient> =
  InferData<TAuthClient["listSessions"]>

export type ListSessionsParams<TAuthClient extends AuthClient> = Parameters<
  TAuthClient["listSessions"]
>[0]

export type ListSessionsOptions<TAuthClient extends AuthClient> = Partial<
  Omit<QueryOptions<ListSessionsData<TAuthClient>>, "queryKey">
> &
  ListSessionsParams<TAuthClient>

export type ListSession<TAuthClient extends AuthClient = AuthClient> =
  NonNullable<ListSessionsData<TAuthClient>>[number]

/**
 * Query options factory for the current user's active sessions.
 *
 * @param authClient - The Better Auth client.
 * @param userId - The current signed-in user's ID. Used for cache partitioning.
 * @param params - Parameters forwarded to `authClient.listSessions`.
 */
export function listSessionsOptions<TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  userId?: string,
  params?: ListSessionsParams<TAuthClient>
) {
  type TData = ListSessionsData<TAuthClient>
  const queryKey = authQueryKeys.listSessions(userId, params?.query)

  return {
    queryKey,
    queryFn: userId
      ? ({ signal }) =>
          authClient.listSessions({
            ...params,
            fetchOptions: { ...params?.fetchOptions, signal, throw: true }
          }) as Promise<TData>
      : skipToken
  } satisfies QueryOptions
}

export const ensureListSessions = <TAuthClient extends AuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId?: string,
  options?: ListSessionsOptions<TAuthClient>
) => {
  const { fetchOptions, query, ...queryOptions } = options ?? {}

  return queryClient.ensureQueryData({
    ...listSessionsOptions(authClient, userId, { query, fetchOptions }),
    ...queryOptions
  })
}
export const prefetchListSessions = <TAuthClient extends AuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId?: string,
  options?: ListSessionsOptions<TAuthClient>
) => {
  const { fetchOptions, query, ...queryOptions } = options ?? {}

  return queryClient.prefetchQuery({
    ...listSessionsOptions(authClient, userId, { query, fetchOptions }),
    ...queryOptions
  })
}

export const fetchListSessions = <TAuthClient extends AuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId?: string,
  options?: ListSessionsOptions<TAuthClient>
) => {
  const { fetchOptions, query, ...queryOptions } = options ?? {}

  return queryClient.fetchQuery({
    ...listSessionsOptions(authClient, userId, { query, fetchOptions }),
    ...queryOptions
  })
}

import type { BetterFetchOption } from "better-auth/client"

export type QueryKey = readonly unknown[]

/**
 * Read-style Better Auth client method (params shape `{ query?, fetchOptions? }`).
 * Mutation-style endpoints use `AuthMutationFn` instead.
 */
export type AuthQueryFn<TData = unknown> = (params: {
  query?: Record<string, unknown>
  fetchOptions?: BetterFetchOption
}) => Promise<{ data: TData }>

export type AuthQueryFnData<TFn> =
  TFn extends AuthQueryFn<infer TData> ? TData : never

/**
 * Final query key produced by client auth query factories: the caller's prefix
 * followed by `params.query ?? null`.
 */
export type AuthQueryKey<
  TFn extends AuthQueryFn = AuthQueryFn,
  TPrefix extends QueryKey = QueryKey
> = readonly [...TPrefix, NonNullable<Parameters<TFn>[0]>["query"] | null]

export type AuthQueryDefinition<
  TFn extends AuthQueryFn,
  TPrefix extends QueryKey
> = {
  queryKey: AuthQueryKey<TFn, TPrefix>
  queryFn: (context: { signal?: AbortSignal }) => Promise<AuthQueryFnData<TFn>>
}

export function createAuthQueryKey<
  TFn extends AuthQueryFn,
  const TPrefix extends QueryKey
>(queryKey: TPrefix, params?: Parameters<TFn>[0]): AuthQueryKey<TFn, TPrefix> {
  return [...queryKey, params?.query ?? null] as AuthQueryKey<TFn, TPrefix>
}

export function createAuthQueryDefinition<
  TFn extends AuthQueryFn,
  const TPrefix extends QueryKey
>(
  authFn: TFn,
  queryKey: TPrefix,
  params?: Parameters<TFn>[0]
): AuthQueryDefinition<TFn, TPrefix> {
  return {
    queryKey: createAuthQueryKey<TFn, TPrefix>(queryKey, params),
    queryFn: ({ signal }) =>
      authFn({
        ...params,
        fetchOptions: { ...params?.fetchOptions, signal, throw: true }
      }) as Promise<AuthQueryFnData<TFn>>
  }
}

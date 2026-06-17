import {
  type AuthQueryFn,
  type AuthQueryFnData,
  type AuthQueryKey as CoreAuthQueryKey,
  createAuthQueryDefinition
} from "@better-auth-ui/core"
import {
  type DataTag,
  type QueryKey,
  queryOptions,
  type UseQueryOptions
} from "@tanstack/react-query"
import type { BetterFetchError } from "better-auth/client"

export type { AuthQueryFn, AuthQueryFnData }

/**
 * Final query key produced by {@link authQueryOptions}: the caller's prefix
 * followed by `params.query ?? null`.
 */
export type AuthQueryKey<
  TFn extends AuthQueryFn = AuthQueryFn,
  TPrefix extends QueryKey = QueryKey
> = CoreAuthQueryKey<TFn, TPrefix>

/**
 * Return type of {@link authQueryOptions}. Named so TypeScript emits
 * `DataTag<…>` by reference in the `.d.ts`, instead of the raw
 * `{ [dataTagSymbol]: … }` intersection — which triggers a declaration-emit
 * bug where `dataTagSymbol` isn't re-imported at the use site and silently
 * breaks `setQueryData`/`getQueryData` type inference at the consumer.
 */
export type AuthQueryOptions<
  TFn extends AuthQueryFn = AuthQueryFn,
  TPrefix extends QueryKey = QueryKey
> = Omit<
  UseQueryOptions<
    AuthQueryFnData<TFn>,
    BetterFetchError,
    AuthQueryFnData<TFn>,
    AuthQueryKey<TFn, TPrefix>
  >,
  "queryKey"
> & {
  queryKey: DataTag<
    AuthQueryKey<TFn, TPrefix>,
    AuthQueryFnData<TFn>,
    BetterFetchError
  >
}

/**
 * Build `queryOptions` for a Better Auth endpoint.
 *
 * Injects React Query's `signal` and `throw: true` into `fetchOptions` so the
 * request is cancelled on unmount and errors surface as `BetterFetchError`
 * instead of `{ data, error }`.
 *
 * @param authFn - Better Auth client method (e.g. `authClient.getSession`).
 * @param queryKey - Scope prefix for the key. `params.query` is appended automatically.
 * @param params - Parameters forwarded to `authFn`.
 */
export function authQueryOptions<
  TFn extends AuthQueryFn,
  const TPrefix extends QueryKey
>(
  authFn: TFn,
  queryKey: TPrefix,
  params?: Parameters<TFn>[0]
): AuthQueryOptions<TFn, TPrefix> {
  return queryOptions<AuthQueryFnData<TFn>, BetterFetchError>(
    createAuthQueryDefinition(authFn, queryKey, params)
  ) as AuthQueryOptions<TFn, TPrefix>
}

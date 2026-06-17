import {
  type AuthQueryFn,
  type AuthQueryFnData,
  type AuthQueryKey as CoreAuthQueryKey,
  createAuthQueryDefinition
} from "@better-auth-ui/core"
import {
  type CreateQueryOptions,
  type DataTag,
  type QueryKey,
  queryOptions
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"

export type { AuthQueryFn, AuthQueryFnData }

export type AuthQueryKey<
  TFn extends AuthQueryFn = AuthQueryFn,
  TPrefix extends QueryKey = QueryKey
> = CoreAuthQueryKey<TFn, TPrefix>

export type AuthQueryOptions<
  TFn extends AuthQueryFn = AuthQueryFn,
  TPrefix extends QueryKey = QueryKey
> = Omit<
  CreateQueryOptions<
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

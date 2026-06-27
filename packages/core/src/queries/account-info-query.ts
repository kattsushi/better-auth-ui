import {
  type DataTag,
  type QueryClient,
  type QueryOptions,
  skipToken
} from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import type { AuthClient, InferData } from "../lib/auth-client"
import { authQueryKeys } from "../lib/auth-query-keys"

export type AccountInfoData<TAuthClient extends AuthClient = AuthClient> =
  InferData<TAuthClient["accountInfo"]>

export type AccountInfoParams<TAuthClient extends AuthClient> = Parameters<
  TAuthClient["accountInfo"]
>[0]

export type AccountInfoOptions<TAuthClient extends AuthClient> = Omit<
  ReturnType<typeof accountInfoOptions<TAuthClient>>,
  "queryKey" | "queryFn"
>

/**
 * Query options factory for provider-specific account info.
 *
 * @param authClient - The Better Auth client.
 * @param userId - The current signed-in user's ID. Used for cache partitioning.
 * @param params - Parameters forwarded to `authClient.accountInfo`.
 */
export function accountInfoOptions<TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  userId?: string,
  params?: AccountInfoParams<TAuthClient>
) {
  type TData = AccountInfoData<TAuthClient>
  const queryKey = authQueryKeys.accountInfo(userId, params?.query)

  const canFetch = Boolean(userId && params?.query?.accountId)

  const options = {
    queryKey,
    queryFn: canFetch
      ? ({ signal }) =>
          authClient.accountInfo({
            ...params,
            fetchOptions: { ...params?.fetchOptions, signal, throw: true }
          })
      : skipToken
  } as QueryOptions<TData, BetterFetchError, TData, typeof queryKey>

  return options as typeof options & {
    queryKey: DataTag<typeof queryKey, TData, BetterFetchError>
  }
}

export const ensureAccountInfo = <TAuthClient extends AuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  params?: AccountInfoParams<TAuthClient>
) => queryClient.ensureQueryData(accountInfoOptions(authClient, userId, params))

export const prefetchAccountInfo = <TAuthClient extends AuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  params?: AccountInfoParams<TAuthClient>
) => queryClient.prefetchQuery(accountInfoOptions(authClient, userId, params))

export const fetchAccountInfo = <TAuthClient extends AuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  params?: AccountInfoParams<TAuthClient>
) => queryClient.fetchQuery(accountInfoOptions(authClient, userId, params))

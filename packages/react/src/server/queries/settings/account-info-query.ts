import {
  type AccountInfo,
  type AccountInfoData,
  type AccountInfoParams,
  type AuthServer,
  accountInfoOptions as coreAccountInfoOptions
} from "@better-auth-ui/core/server"
import type { QueryClient } from "@tanstack/react-query"
import {
  adaptServerQueryOptions,
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery
} from "../../query-adapter"

export type { AccountInfo, AccountInfoData, AccountInfoParams }

export function accountInfoOptions<TAuth extends AuthServer>(
  auth: TAuth,
  userId: string,
  params: AccountInfoParams<TAuth>
) {
  return adaptServerQueryOptions(coreAccountInfoOptions(auth, userId, params))
}

export const ensureAccountInfo = <TAuth extends AuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: AccountInfoParams<TAuth>
) =>
  ensureServerQuery<AccountInfoData<TAuth>>(
    queryClient,
    accountInfoOptions(auth, userId, params)
  )

export const prefetchAccountInfo = <TAuth extends AuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: AccountInfoParams<TAuth>
) => prefetchServerQuery(queryClient, accountInfoOptions(auth, userId, params))

export const fetchAccountInfo = <TAuth extends AuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: AccountInfoParams<TAuth>
) =>
  fetchServerQuery<AccountInfoData<TAuth>>(
    queryClient,
    accountInfoOptions(auth, userId, params)
  )

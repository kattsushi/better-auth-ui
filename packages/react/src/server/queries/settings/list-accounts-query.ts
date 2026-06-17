import {
  type AuthServer,
  listAccountsOptions as coreListAccountsOptions,
  type ListAccount,
  type ListAccountsData,
  type ListAccountsParams
} from "@better-auth-ui/core/server"
import type { QueryClient } from "@tanstack/react-query"
import {
  adaptServerQueryOptions,
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery
} from "../../query-adapter"

export type { ListAccount, ListAccountsData, ListAccountsParams }

export function listAccountsOptions<TAuth extends AuthServer>(
  auth: TAuth,
  userId: string,
  params: ListAccountsParams<TAuth>
) {
  return adaptServerQueryOptions(coreListAccountsOptions(auth, userId, params))
}

export const ensureListAccounts = <TAuth extends AuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListAccountsParams<TAuth>
) =>
  ensureServerQuery<ListAccountsData<TAuth>>(
    queryClient,
    listAccountsOptions(auth, userId, params)
  )

export const prefetchListAccounts = <TAuth extends AuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListAccountsParams<TAuth>
) => prefetchServerQuery(queryClient, listAccountsOptions(auth, userId, params))

export const fetchListAccounts = <TAuth extends AuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListAccountsParams<TAuth>
) =>
  fetchServerQuery<ListAccountsData<TAuth>>(
    queryClient,
    listAccountsOptions(auth, userId, params)
  )

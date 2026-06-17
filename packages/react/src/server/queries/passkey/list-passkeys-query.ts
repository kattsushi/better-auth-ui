import {
  listPasskeysOptions as coreListPasskeysOptions,
  type ListPasskey,
  type ListPasskeysData,
  type ListPasskeysParams,
  type PasskeyAuthServer
} from "@better-auth-ui/core/server"
import type { QueryClient } from "@tanstack/react-query"
import {
  adaptServerQueryOptions,
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery
} from "../../query-adapter"

export type { ListPasskey, ListPasskeysData, ListPasskeysParams }

export function listPasskeysOptions<TAuth extends PasskeyAuthServer>(
  auth: TAuth,
  userId: string,
  params: ListPasskeysParams<TAuth>
) {
  return adaptServerQueryOptions(coreListPasskeysOptions(auth, userId, params))
}

export const ensureListPasskeys = <TAuth extends PasskeyAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListPasskeysParams<TAuth>
) =>
  ensureServerQuery<ListPasskeysData<TAuth>>(
    queryClient,
    listPasskeysOptions(auth, userId, params)
  )

export const prefetchListPasskeys = <TAuth extends PasskeyAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListPasskeysParams<TAuth>
) => prefetchServerQuery(queryClient, listPasskeysOptions(auth, userId, params))

export const fetchListPasskeys = <TAuth extends PasskeyAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListPasskeysParams<TAuth>
) =>
  fetchServerQuery<ListPasskeysData<TAuth>>(
    queryClient,
    listPasskeysOptions(auth, userId, params)
  )

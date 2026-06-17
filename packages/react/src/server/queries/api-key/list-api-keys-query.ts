import {
  type ApiKeyAuthServer,
  listApiKeysOptions as coreListApiKeysOptions,
  type ListApiKeysData,
  type ListApiKeysParams,
  type ListedApiKey
} from "@better-auth-ui/core/server"
import type { QueryClient } from "@tanstack/react-query"
import {
  adaptServerQueryOptions,
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery
} from "../../query-adapter"

export type { ListApiKeysData, ListApiKeysParams, ListedApiKey }

export function listApiKeysOptions<TAuth extends ApiKeyAuthServer>(
  auth: TAuth,
  userId: string,
  params: ListApiKeysParams<TAuth>
) {
  return adaptServerQueryOptions(coreListApiKeysOptions(auth, userId, params))
}

export const ensureListApiKeys = <TAuth extends ApiKeyAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListApiKeysParams<TAuth>
) =>
  ensureServerQuery<ListApiKeysData<TAuth>>(
    queryClient,
    listApiKeysOptions(auth, userId, params)
  )

export const prefetchListApiKeys = <TAuth extends ApiKeyAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListApiKeysParams<TAuth>
) => prefetchServerQuery(queryClient, listApiKeysOptions(auth, userId, params))

export const fetchListApiKeys = <TAuth extends ApiKeyAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListApiKeysParams<TAuth>
) =>
  fetchServerQuery<ListApiKeysData<TAuth>>(
    queryClient,
    listApiKeysOptions(auth, userId, params)
  )

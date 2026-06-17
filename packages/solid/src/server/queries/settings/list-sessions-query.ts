import {
  type AuthServer,
  listSessionsOptions as coreListSessionsOptions,
  type ListSession,
  type ListSessionsData,
  type ListSessionsParams
} from "@better-auth-ui/core/server"
import type { QueryClient } from "@tanstack/solid-query"
import {
  adaptServerQueryOptions,
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery
} from "../../query-adapter"

export type { ListSession, ListSessionsData, ListSessionsParams }

export function listSessionsOptions<TAuth extends AuthServer>(
  auth: TAuth,
  userId: string,
  params: ListSessionsParams<TAuth>
) {
  return adaptServerQueryOptions(coreListSessionsOptions(auth, userId, params))
}

export const ensureListSessions = <TAuth extends AuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListSessionsParams<TAuth>
) =>
  ensureServerQuery<ListSessionsData<TAuth>>(
    queryClient,
    listSessionsOptions(auth, userId, params)
  )

export const prefetchListSessions = <TAuth extends AuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListSessionsParams<TAuth>
) => prefetchServerQuery(queryClient, listSessionsOptions(auth, userId, params))

export const fetchListSessions = <TAuth extends AuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListSessionsParams<TAuth>
) =>
  fetchServerQuery<ListSessionsData<TAuth>>(
    queryClient,
    listSessionsOptions(auth, userId, params)
  )

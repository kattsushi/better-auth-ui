import {
  listDeviceSessionsOptions as coreListDeviceSessionsOptions,
  type ListDeviceSession,
  type ListDeviceSessionsData,
  type ListDeviceSessionsParams,
  type MultiSessionAuthServer
} from "@better-auth-ui/core/server"
import type { QueryClient } from "@tanstack/react-query"
import {
  adaptServerQueryOptions,
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery
} from "../../query-adapter"

export type {
  ListDeviceSession,
  ListDeviceSessionsData,
  ListDeviceSessionsParams
}

export function listDeviceSessionsOptions<TAuth extends MultiSessionAuthServer>(
  auth: TAuth,
  userId: string,
  params: ListDeviceSessionsParams<TAuth>
) {
  return adaptServerQueryOptions(
    coreListDeviceSessionsOptions(auth, userId, params)
  )
}

export const ensureListDeviceSessions = <TAuth extends MultiSessionAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListDeviceSessionsParams<TAuth>
) =>
  ensureServerQuery<ListDeviceSessionsData<TAuth>>(
    queryClient,
    listDeviceSessionsOptions(auth, userId, params)
  )

export const prefetchListDeviceSessions = <
  TAuth extends MultiSessionAuthServer
>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListDeviceSessionsParams<TAuth>
) =>
  prefetchServerQuery(
    queryClient,
    listDeviceSessionsOptions(auth, userId, params)
  )

export const fetchListDeviceSessions = <TAuth extends MultiSessionAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListDeviceSessionsParams<TAuth>
) =>
  fetchServerQuery<ListDeviceSessionsData<TAuth>>(
    queryClient,
    listDeviceSessionsOptions(auth, userId, params)
  )

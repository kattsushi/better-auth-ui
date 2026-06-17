import {
  hasPermissionOptions as coreHasPermissionOptions,
  type HasPermissionData,
  type HasPermissionParams,
  type OrganizationAuthServer
} from "@better-auth-ui/core/server"
import type { QueryClient } from "@tanstack/react-query"
import {
  adaptServerQueryOptions,
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery
} from "../../query-adapter"

export type { HasPermissionData, HasPermissionParams }

export function hasPermissionOptions<TAuth extends OrganizationAuthServer>(
  auth: TAuth,
  userId: string,
  params: HasPermissionParams<TAuth>
) {
  return adaptServerQueryOptions(coreHasPermissionOptions(auth, userId, params))
}

export const ensureHasPermission = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: HasPermissionParams<TAuth>
) =>
  ensureServerQuery<HasPermissionData<TAuth>>(
    queryClient,
    hasPermissionOptions(auth, userId, params)
  )

export const prefetchHasPermission = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: HasPermissionParams<TAuth>
) =>
  prefetchServerQuery(queryClient, hasPermissionOptions(auth, userId, params))

export const fetchHasPermission = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: HasPermissionParams<TAuth>
) =>
  fetchServerQuery<HasPermissionData<TAuth>>(
    queryClient,
    hasPermissionOptions(auth, userId, params)
  )

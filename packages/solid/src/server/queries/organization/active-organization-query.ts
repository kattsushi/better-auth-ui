import {
  type ActiveOrganizationData,
  type ActiveOrganizationParams,
  activeOrganizationOptions as coreActiveOrganizationOptions,
  type OrganizationAuthServer
} from "@better-auth-ui/core/server"
import type { QueryClient } from "@tanstack/solid-query"
import {
  adaptServerQueryOptions,
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery
} from "../../query-adapter"

export type { ActiveOrganizationData, ActiveOrganizationParams }

export function activeOrganizationOptions<TAuth extends OrganizationAuthServer>(
  auth: TAuth,
  userId: string,
  params: ActiveOrganizationParams<TAuth>
) {
  return adaptServerQueryOptions(
    coreActiveOrganizationOptions(auth, userId, params)
  )
}

export const ensureActiveOrganization = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ActiveOrganizationParams<TAuth>
) =>
  ensureServerQuery<ActiveOrganizationData<TAuth>>(
    queryClient,
    activeOrganizationOptions(auth, userId, params)
  )

export const prefetchActiveOrganization = <
  TAuth extends OrganizationAuthServer
>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ActiveOrganizationParams<TAuth>
) =>
  prefetchServerQuery(
    queryClient,
    activeOrganizationOptions(auth, userId, params)
  )

export const fetchActiveOrganization = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ActiveOrganizationParams<TAuth>
) =>
  fetchServerQuery<ActiveOrganizationData<TAuth>>(
    queryClient,
    activeOrganizationOptions(auth, userId, params)
  )

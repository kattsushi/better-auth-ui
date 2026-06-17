import {
  fullOrganizationOptions as coreFullOrganizationOptions,
  type FullOrganizationData,
  type FullOrganizationParams,
  type OrganizationAuthServer
} from "@better-auth-ui/core/server"
import type { QueryClient } from "@tanstack/solid-query"
import {
  adaptServerQueryOptions,
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery
} from "../../query-adapter"

export type { FullOrganizationData, FullOrganizationParams }

export function fullOrganizationOptions<TAuth extends OrganizationAuthServer>(
  auth: TAuth,
  userId: string,
  params: FullOrganizationParams<TAuth>
) {
  return adaptServerQueryOptions(
    coreFullOrganizationOptions(auth, userId, params)
  )
}

export const ensureFullOrganization = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: FullOrganizationParams<TAuth>
) =>
  ensureServerQuery<FullOrganizationData<TAuth>>(
    queryClient,
    fullOrganizationOptions(auth, userId, params)
  )

export const prefetchFullOrganization = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: FullOrganizationParams<TAuth>
) =>
  prefetchServerQuery(
    queryClient,
    fullOrganizationOptions(auth, userId, params)
  )

export const fetchFullOrganization = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: FullOrganizationParams<TAuth>
) =>
  fetchServerQuery<FullOrganizationData<TAuth>>(
    queryClient,
    fullOrganizationOptions(auth, userId, params)
  )

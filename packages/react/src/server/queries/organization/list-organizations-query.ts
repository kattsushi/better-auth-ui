import {
  listOrganizationsOptions as coreListOrganizationsOptions,
  type ListOrganization,
  type ListOrganizationsData,
  type ListOrganizationsParams,
  type OrganizationAuthServer
} from "@better-auth-ui/core/server"
import type { QueryClient } from "@tanstack/react-query"
import {
  adaptServerQueryOptions,
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery
} from "../../query-adapter"

export type { ListOrganization, ListOrganizationsData, ListOrganizationsParams }

export function listOrganizationsOptions<TAuth extends OrganizationAuthServer>(
  auth: TAuth,
  userId: string,
  params: ListOrganizationsParams<TAuth>
) {
  return adaptServerQueryOptions(
    coreListOrganizationsOptions(auth, userId, params)
  )
}

export const ensureListOrganizations = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListOrganizationsParams<TAuth>
) =>
  ensureServerQuery<ListOrganizationsData<TAuth>>(
    queryClient,
    listOrganizationsOptions(auth, userId, params)
  )

export const prefetchListOrganizations = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListOrganizationsParams<TAuth>
) =>
  prefetchServerQuery(
    queryClient,
    listOrganizationsOptions(auth, userId, params)
  )

export const fetchListOrganizations = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListOrganizationsParams<TAuth>
) =>
  fetchServerQuery<ListOrganizationsData<TAuth>>(
    queryClient,
    listOrganizationsOptions(auth, userId, params)
  )

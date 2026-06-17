import {
  listOrganizationMembersOptions as coreListOrganizationMembersOptions,
  type ListOrganizationMembersData,
  type ListOrganizationMembersParams,
  type OrganizationAuthServer
} from "@better-auth-ui/core/server"
import type { QueryClient } from "@tanstack/solid-query"
import {
  adaptServerQueryOptions,
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery
} from "../../query-adapter"

export type { ListOrganizationMembersData, ListOrganizationMembersParams }

export function listOrganizationMembersOptions<
  TAuth extends OrganizationAuthServer
>(auth: TAuth, userId: string, params: ListOrganizationMembersParams<TAuth>) {
  return adaptServerQueryOptions(
    coreListOrganizationMembersOptions(auth, userId, params)
  )
}

export const ensureListOrganizationMembers = <
  TAuth extends OrganizationAuthServer
>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListOrganizationMembersParams<TAuth>
) =>
  ensureServerQuery<ListOrganizationMembersData<TAuth>>(
    queryClient,
    listOrganizationMembersOptions(auth, userId, params)
  )

export const prefetchListOrganizationMembers = <
  TAuth extends OrganizationAuthServer
>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListOrganizationMembersParams<TAuth>
) =>
  prefetchServerQuery(
    queryClient,
    listOrganizationMembersOptions(auth, userId, params)
  )

export const fetchListOrganizationMembers = <
  TAuth extends OrganizationAuthServer
>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListOrganizationMembersParams<TAuth>
) =>
  fetchServerQuery<ListOrganizationMembersData<TAuth>>(
    queryClient,
    listOrganizationMembersOptions(auth, userId, params)
  )

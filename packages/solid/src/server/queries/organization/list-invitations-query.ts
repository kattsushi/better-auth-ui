import {
  listOrganizationInvitationsOptions as coreListOrganizationInvitationsOptions,
  type ListOrganizationInvitationsData,
  type ListOrganizationInvitationsParams,
  type OrganizationAuthServer
} from "@better-auth-ui/core/server"
import type { QueryClient } from "@tanstack/solid-query"
import {
  adaptServerQueryOptions,
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery
} from "../../query-adapter"

export type {
  ListOrganizationInvitationsData,
  ListOrganizationInvitationsParams
}

export function listOrganizationInvitationsOptions<
  TAuth extends OrganizationAuthServer
>(
  auth: TAuth,
  userId: string,
  params: ListOrganizationInvitationsParams<TAuth>
) {
  return adaptServerQueryOptions(
    coreListOrganizationInvitationsOptions(auth, userId, params)
  )
}

export const ensureListOrganizationInvitations = <
  TAuth extends OrganizationAuthServer
>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListOrganizationInvitationsParams<TAuth>
) =>
  ensureServerQuery<ListOrganizationInvitationsData<TAuth>>(
    queryClient,
    listOrganizationInvitationsOptions(auth, userId, params)
  )

export const prefetchListOrganizationInvitations = <
  TAuth extends OrganizationAuthServer
>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListOrganizationInvitationsParams<TAuth>
) =>
  prefetchServerQuery(
    queryClient,
    listOrganizationInvitationsOptions(auth, userId, params)
  )

export const fetchListOrganizationInvitations = <
  TAuth extends OrganizationAuthServer
>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListOrganizationInvitationsParams<TAuth>
) =>
  fetchServerQuery<ListOrganizationInvitationsData<TAuth>>(
    queryClient,
    listOrganizationInvitationsOptions(auth, userId, params)
  )

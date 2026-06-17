import {
  listUserInvitationsOptions as coreListUserInvitationsOptions,
  type ListUserInvitationsData,
  type ListUserInvitationsParams,
  type OrganizationAuthServer
} from "@better-auth-ui/core/server"
import type { QueryClient } from "@tanstack/solid-query"
import {
  adaptServerQueryOptions,
  ensureServerQuery,
  fetchServerQuery,
  prefetchServerQuery
} from "../../query-adapter"

export type { ListUserInvitationsData, ListUserInvitationsParams }

export function listUserInvitationsOptions<
  TAuth extends OrganizationAuthServer
>(auth: TAuth, userId: string, params: ListUserInvitationsParams<TAuth>) {
  return adaptServerQueryOptions(
    coreListUserInvitationsOptions(auth, userId, params)
  )
}

export const ensureListUserInvitations = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListUserInvitationsParams<TAuth>
) =>
  ensureServerQuery<ListUserInvitationsData<TAuth>>(
    queryClient,
    listUserInvitationsOptions(auth, userId, params)
  )

export const prefetchListUserInvitations = <
  TAuth extends OrganizationAuthServer
>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListUserInvitationsParams<TAuth>
) =>
  prefetchServerQuery(
    queryClient,
    listUserInvitationsOptions(auth, userId, params)
  )

export const fetchListUserInvitations = <TAuth extends OrganizationAuthServer>(
  queryClient: QueryClient,
  auth: TAuth,
  userId: string,
  params: ListUserInvitationsParams<TAuth>
) =>
  fetchServerQuery<ListUserInvitationsData<TAuth>>(
    queryClient,
    listUserInvitationsOptions(auth, userId, params)
  )

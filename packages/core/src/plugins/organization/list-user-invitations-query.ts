import type { DataTag, QueryClient, QueryOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import type { InferData } from "../../lib/auth-client"
import type { OrganizationAuthClient } from "./organization-auth-client"
import { organizationQueryKeys } from "./organization-query-keys"

export type ListUserInvitationsData<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = InferData<TAuthClient["organization"]["listUserInvitations"]>

export type ListUserInvitationsParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Parameters<TAuthClient["organization"]["listUserInvitations"]>[0]

export type ListUserInvitationsOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  ReturnType<typeof listUserInvitationsOptions<TAuthClient>>,
  "queryKey" | "queryFn"
>

export function listUserInvitationsOptions<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListUserInvitationsParams<TAuthClient>
) {
  type TData = ListUserInvitationsData<TAuthClient>
  const queryKey = organizationQueryKeys.userInvitations.list(
    userId,
    params?.query
  )

  const options = {
    queryKey,
    queryFn: ({ signal }) =>
      authClient.organization.listUserInvitations({
        ...params,
        fetchOptions: { ...params?.fetchOptions, signal, throw: true }
      }) as Promise<TData>
  } as QueryOptions<TData, BetterFetchError, TData, typeof queryKey>

  return options as typeof options & {
    queryKey: DataTag<typeof queryKey, TData, BetterFetchError>
  }
}

export const ensureListUserInvitations = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListUserInvitationsParams<TAuthClient>
) =>
  queryClient.ensureQueryData(
    listUserInvitationsOptions(authClient, userId, params)
  )

export const prefetchListUserInvitations = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListUserInvitationsParams<TAuthClient>
) =>
  queryClient.prefetchQuery(
    listUserInvitationsOptions(authClient, userId, params)
  )

export const fetchListUserInvitations = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListUserInvitationsParams<TAuthClient>
) =>
  queryClient.fetchQuery(listUserInvitationsOptions(authClient, userId, params))

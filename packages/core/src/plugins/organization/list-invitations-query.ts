import type { DataTag, QueryClient, QueryOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import type { InferData } from "../../lib/auth-client"
import type { OrganizationAuthClient } from "./organization-auth-client"
import { organizationQueryKeys } from "./organization-query-keys"

export type ListOrganizationInvitationsData<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = InferData<TAuthClient["organization"]["listInvitations"]>

export type ListOrganizationInvitationsParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Parameters<TAuthClient["organization"]["listInvitations"]>[0]

export type ListOrganizationInvitationsOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  ReturnType<typeof listOrganizationInvitationsOptions<TAuthClient>>,
  "queryKey" | "queryFn"
>

export function listOrganizationInvitationsOptions<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListOrganizationInvitationsParams<TAuthClient>
) {
  type TData = ListOrganizationInvitationsData<TAuthClient>
  const queryKey = organizationQueryKeys.invitations.list(userId, params?.query)

  const options = {
    queryKey,
    queryFn: ({ signal }) =>
      authClient.organization.listInvitations({
        ...params,
        fetchOptions: { ...params?.fetchOptions, signal, throw: true }
      }) as Promise<TData>
  } as QueryOptions<TData, BetterFetchError, TData, typeof queryKey>

  return options as typeof options & {
    queryKey: DataTag<typeof queryKey, TData, BetterFetchError>
  }
}

export const ensureListOrganizationInvitations = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListOrganizationInvitationsParams<TAuthClient>
) =>
  queryClient.ensureQueryData(
    listOrganizationInvitationsOptions(authClient, userId, params)
  )

export const prefetchListOrganizationInvitations = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListOrganizationInvitationsParams<TAuthClient>
) =>
  queryClient.prefetchQuery(
    listOrganizationInvitationsOptions(authClient, userId, params)
  )

export const fetchListOrganizationInvitations = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListOrganizationInvitationsParams<TAuthClient>
) =>
  queryClient.fetchQuery(
    listOrganizationInvitationsOptions(authClient, userId, params)
  )

import type { DataTag, QueryClient, QueryOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import type { InferData } from "../../lib/auth-client"
import type { OrganizationAuthClient } from "./organization-auth-client"
import { organizationQueryKeys } from "./organization-query-keys"

export type ListOrganizationMembersData<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = InferData<TAuthClient["organization"]["listMembers"]>

export type ListOrganizationMembersParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Parameters<TAuthClient["organization"]["listMembers"]>[0]

export type ListOrganizationMembersOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  ReturnType<typeof listOrganizationMembersOptions<TAuthClient>>,
  "queryKey" | "queryFn"
>

export function listOrganizationMembersOptions<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListOrganizationMembersParams<TAuthClient>
) {
  type TData = ListOrganizationMembersData<TAuthClient>
  const queryKey = organizationQueryKeys.members.list(userId, params?.query)

  const options = {
    queryKey,
    queryFn: ({ signal }) =>
      authClient.organization.listMembers({
        ...params,
        fetchOptions: { ...params?.fetchOptions, signal, throw: true }
      }) as Promise<TData>
  } as QueryOptions<TData, BetterFetchError, TData, typeof queryKey>

  return options as typeof options & {
    queryKey: DataTag<typeof queryKey, TData, BetterFetchError>
  }
}

export const ensureListOrganizationMembers = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListOrganizationMembersParams<TAuthClient>
) =>
  queryClient.ensureQueryData(
    listOrganizationMembersOptions(authClient, userId, params)
  )

export const prefetchListOrganizationMembers = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListOrganizationMembersParams<TAuthClient>
) =>
  queryClient.prefetchQuery(
    listOrganizationMembersOptions(authClient, userId, params)
  )

export const fetchListOrganizationMembers = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListOrganizationMembersParams<TAuthClient>
) =>
  queryClient.fetchQuery(
    listOrganizationMembersOptions(authClient, userId, params)
  )

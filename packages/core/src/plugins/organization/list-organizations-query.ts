import type { DataTag, QueryClient, QueryOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import type { InferData } from "../../lib/auth-client"
import type { OrganizationAuthClient } from "./organization-auth-client"
import { organizationQueryKeys } from "./organization-query-keys"

export type ListOrganizationsData<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = InferData<TAuthClient["organization"]["list"]>

export type ListOrganization<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = NonNullable<ListOrganizationsData<TAuthClient>>[number]

export type ListOrganizationsParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Parameters<TAuthClient["organization"]["list"]>[0]

export type ListOrganizationsOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  ReturnType<typeof listOrganizationsOptions<TAuthClient>>,
  "queryKey" | "queryFn"
>

export function listOrganizationsOptions<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListOrganizationsParams<TAuthClient>
) {
  type TData = ListOrganizationsData<TAuthClient>
  const queryKey = organizationQueryKeys.list(userId, params?.query)

  const options = {
    queryKey,
    queryFn: ({ signal }) =>
      authClient.organization.list({
        ...params,
        fetchOptions: { ...params?.fetchOptions, signal, throw: true }
      }) as Promise<TData>
  } as QueryOptions<TData, BetterFetchError, TData, typeof queryKey>

  return options as typeof options & {
    queryKey: DataTag<typeof queryKey, TData, BetterFetchError>
  }
}

export const ensureListOrganizations = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  params?: ListOrganizationsParams<TAuthClient>
) =>
  queryClient.ensureQueryData(
    listOrganizationsOptions(authClient, userId, params)
  )

export const prefetchListOrganizations = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  params?: ListOrganizationsParams<TAuthClient>
) =>
  queryClient.prefetchQuery(
    listOrganizationsOptions(authClient, userId, params)
  )

export const fetchListOrganizations = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  params?: ListOrganizationsParams<TAuthClient>
) =>
  queryClient.fetchQuery(listOrganizationsOptions(authClient, userId, params))

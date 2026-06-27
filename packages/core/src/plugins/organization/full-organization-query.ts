import type { DataTag, QueryClient, QueryOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import type { InferData } from "../../lib/auth-client"
import type { OrganizationAuthClient } from "./organization-auth-client"
import { organizationQueryKeys } from "./organization-query-keys"

export type FullOrganizationData<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = InferData<TAuthClient["organization"]["getFullOrganization"]>

export type FullOrganizationParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Parameters<TAuthClient["organization"]["getFullOrganization"]>[0]

export type FullOrganizationOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  ReturnType<typeof fullOrganizationOptions<TAuthClient>>,
  "queryKey" | "queryFn"
>

export function fullOrganizationOptions<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  userId: string | undefined,
  params?: FullOrganizationParams<TAuthClient>
) {
  type TData = FullOrganizationData<TAuthClient>
  const queryKey = organizationQueryKeys.fullDetail(userId, params?.query)

  const options = {
    queryKey,
    queryFn: ({ signal }) =>
      authClient.organization.getFullOrganization({
        ...params,
        fetchOptions: { ...params?.fetchOptions, signal, throw: true }
      }) as Promise<TData>
  } as QueryOptions<TData, BetterFetchError, TData, typeof queryKey>

  return options as typeof options & {
    queryKey: DataTag<typeof queryKey, TData, BetterFetchError>
  }
}

export const ensureFullOrganization = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params?: FullOrganizationParams<TAuthClient>
) =>
  queryClient.ensureQueryData(
    fullOrganizationOptions(authClient, userId, params)
  )

export const prefetchFullOrganization = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params?: FullOrganizationParams<TAuthClient>
) =>
  queryClient.prefetchQuery(fullOrganizationOptions(authClient, userId, params))

export const fetchFullOrganization = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params?: FullOrganizationParams<TAuthClient>
) => queryClient.fetchQuery(fullOrganizationOptions(authClient, userId, params))

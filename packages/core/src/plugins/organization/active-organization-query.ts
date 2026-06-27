import type { DataTag, QueryClient, QueryOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import type { FullOrganizationParams } from "./full-organization-query"
import type { ListOrganization } from "./list-organizations-query"
import type { OrganizationAuthClient } from "./organization-auth-client"
import { organizationQueryKeys } from "./organization-query-keys"

// The active-organization cache holds a `ListOrganization`-shaped value even
// though we fetch via `getFullOrganization`. The `members`/`invitations`
// fields are intentionally discarded by the `as Promise<TData>` cast in
// `queryFn` below so that `setActive`'s optimistic update — which can only
// produce a list-shaped org — never corrupts a full-detail cache entry.
export type ActiveOrganizationData<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = ListOrganization<TAuthClient> | null

export type ActiveOrganizationParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = FullOrganizationParams<TAuthClient>

export type ActiveOrganizationOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  ReturnType<typeof activeOrganizationOptions<TAuthClient>>,
  "queryKey" | "queryFn"
>

export function activeOrganizationOptions<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ActiveOrganizationParams<TAuthClient>
) {
  type TData = ActiveOrganizationData<TAuthClient>
  const queryKey = organizationQueryKeys.activeOrganization(
    userId,
    params?.query
  )

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

export const ensureActiveOrganization = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ActiveOrganizationParams<TAuthClient>
) =>
  queryClient.ensureQueryData(
    activeOrganizationOptions(authClient, userId, params)
  )

export const prefetchActiveOrganization = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ActiveOrganizationParams<TAuthClient>
) =>
  queryClient.prefetchQuery(
    activeOrganizationOptions(authClient, userId, params)
  )

export const fetchActiveOrganization = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ActiveOrganizationParams<TAuthClient>
) =>
  queryClient.fetchQuery(activeOrganizationOptions(authClient, userId, params))

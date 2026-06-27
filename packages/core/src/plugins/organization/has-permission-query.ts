import type { DataTag, QueryClient, QueryOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import type { InferData } from "../../lib/auth-client"
import type { OrganizationAuthClient } from "./organization-auth-client"
import { organizationQueryKeys } from "./organization-query-keys"

export type HasPermissionData<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = InferData<TAuthClient["organization"]["hasPermission"]>

export type HasPermissionParams<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Parameters<TAuthClient["organization"]["hasPermission"]>[0]

export type HasPermissionOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  ReturnType<typeof hasPermissionOptions<TAuthClient>>,
  "queryKey" | "queryFn"
>

export function hasPermissionOptions<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  userId: string | undefined,
  params: HasPermissionParams<TAuthClient>
) {
  type TData = HasPermissionData<TAuthClient>
  // `hasPermission` is the only org client method without a `query` field — its
  // params are flat — so the cache-key query portion is everything except
  // `fetchOptions`.
  const { fetchOptions, ...query } = params
  const queryKey = organizationQueryKeys.permissions.has(userId, query)

  const options = {
    queryKey,
    queryFn: ({ signal }) =>
      authClient.organization.hasPermission({
        ...query,
        fetchOptions: { ...fetchOptions, signal, throw: true }
      }) as Promise<TData>
  } as QueryOptions<TData, BetterFetchError, TData, typeof queryKey>

  return options as typeof options & {
    queryKey: DataTag<typeof queryKey, TData, BetterFetchError>
  }
}

export const ensureHasPermission = <TAuthClient extends OrganizationAuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params: HasPermissionParams<TAuthClient>
) =>
  queryClient.ensureQueryData(hasPermissionOptions(authClient, userId, params))

export const prefetchHasPermission = <
  TAuthClient extends OrganizationAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params: HasPermissionParams<TAuthClient>
) => queryClient.prefetchQuery(hasPermissionOptions(authClient, userId, params))

export const fetchHasPermission = <TAuthClient extends OrganizationAuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string | undefined,
  params: HasPermissionParams<TAuthClient>
) => queryClient.fetchQuery(hasPermissionOptions(authClient, userId, params))

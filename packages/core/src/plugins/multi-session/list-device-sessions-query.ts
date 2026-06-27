import type { DataTag, QueryClient, QueryOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import type { InferData } from "../../lib/auth-client"
import type { MultiSessionAuthClient } from "./multi-session-auth-client"
import { multiSessionQueryKeys } from "./multi-session-query-keys"

export type ListDeviceSessionsData<
  TAuthClient extends MultiSessionAuthClient = MultiSessionAuthClient
> = InferData<TAuthClient["multiSession"]["listDeviceSessions"]>

export type ListDeviceSession<
  TAuthClient extends MultiSessionAuthClient = MultiSessionAuthClient
> = NonNullable<ListDeviceSessionsData<TAuthClient>>[number]

export type ListDeviceSessionsParams<
  TAuthClient extends MultiSessionAuthClient = MultiSessionAuthClient
> = Parameters<TAuthClient["multiSession"]["listDeviceSessions"]>[0]

export type ListDeviceSessionsOptions<
  TAuthClient extends MultiSessionAuthClient = MultiSessionAuthClient
> = Omit<
  ReturnType<typeof listDeviceSessionsOptions<TAuthClient>>,
  "queryKey" | "queryFn"
>

export function listDeviceSessionsOptions<
  TAuthClient extends MultiSessionAuthClient
>(
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListDeviceSessionsParams<TAuthClient>
) {
  type TData = ListDeviceSessionsData<TAuthClient>
  const queryKey = multiSessionQueryKeys.list(userId, params?.query)

  const options = {
    queryKey,
    queryFn: ({ signal }) =>
      authClient.multiSession.listDeviceSessions({
        ...params,
        fetchOptions: { ...params?.fetchOptions, signal, throw: true }
      }) as Promise<TData>
  } as QueryOptions<TData, BetterFetchError, TData, typeof queryKey>

  return options as typeof options & {
    queryKey: DataTag<typeof queryKey, TData, BetterFetchError>
  }
}

export const ensureListDeviceSessions = <
  TAuthClient extends MultiSessionAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  params?: ListDeviceSessionsParams<TAuthClient>
) =>
  queryClient.ensureQueryData(
    listDeviceSessionsOptions(authClient, userId, params)
  )

export const prefetchListDeviceSessions = <
  TAuthClient extends MultiSessionAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  params?: ListDeviceSessionsParams<TAuthClient>
) =>
  queryClient.prefetchQuery(
    listDeviceSessionsOptions(authClient, userId, params)
  )

export const fetchListDeviceSessions = <
  TAuthClient extends MultiSessionAuthClient
>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  params?: ListDeviceSessionsParams<TAuthClient>
) =>
  queryClient.fetchQuery(listDeviceSessionsOptions(authClient, userId, params))

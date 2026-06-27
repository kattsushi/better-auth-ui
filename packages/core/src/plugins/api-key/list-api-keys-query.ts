import type { DataTag, QueryClient, QueryOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import type { InferData } from "../../lib/auth-client"
import type { ApiKeyAuthClient } from "./api-key-auth-client"
import { apiKeyQueryKeys } from "./api-key-query-keys"

export type ListApiKeysData<
  TAuthClient extends ApiKeyAuthClient = ApiKeyAuthClient
> = InferData<TAuthClient["apiKey"]["list"]>

export type ListApiKeysParams<
  TAuthClient extends ApiKeyAuthClient = ApiKeyAuthClient
> = Parameters<TAuthClient["apiKey"]["list"]>[0]

export type ListedApiKey<
  TAuthClient extends ApiKeyAuthClient = ApiKeyAuthClient
> = NonNullable<ListApiKeysData<TAuthClient>>["apiKeys"][number]

export type ListApiKeysOptions<
  TAuthClient extends ApiKeyAuthClient = ApiKeyAuthClient
> = Omit<
  ReturnType<typeof listApiKeysOptions<TAuthClient>>,
  "queryKey" | "queryFn"
>

export function listApiKeysOptions<TAuthClient extends ApiKeyAuthClient>(
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListApiKeysParams<TAuthClient>
) {
  type TData = ListApiKeysData<TAuthClient>
  const queryKey = apiKeyQueryKeys.list(userId, params?.query)

  const options = {
    queryKey,
    queryFn: ({ signal }) =>
      authClient.apiKey.list({
        ...params,
        fetchOptions: { ...params?.fetchOptions, signal, throw: true }
      }) as Promise<TData>
  } as QueryOptions<TData, BetterFetchError, TData, typeof queryKey>

  return options as typeof options & {
    queryKey: DataTag<typeof queryKey, TData, BetterFetchError>
  }
}

export const ensureListApiKeys = <TAuthClient extends ApiKeyAuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  params?: ListApiKeysParams<TAuthClient>
) => queryClient.ensureQueryData(listApiKeysOptions(authClient, userId, params))

export const prefetchListApiKeys = <TAuthClient extends ApiKeyAuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  params?: ListApiKeysParams<TAuthClient>
) => queryClient.prefetchQuery(listApiKeysOptions(authClient, userId, params))

export const fetchListApiKeys = <TAuthClient extends ApiKeyAuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  params?: ListApiKeysParams<TAuthClient>
) => queryClient.fetchQuery(listApiKeysOptions(authClient, userId, params))

import type { DataTag, QueryClient, QueryOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import type { InferData } from "../../lib/auth-client"
import type { PasskeyAuthClient } from "./passkey-auth-client"
import { passkeyQueryKeys } from "./passkey-query-keys"

export type ListPasskeysData<
  TAuthClient extends PasskeyAuthClient = PasskeyAuthClient
> = InferData<TAuthClient["passkey"]["listUserPasskeys"]>

export type ListPasskeysParams<
  TAuthClient extends PasskeyAuthClient = PasskeyAuthClient
> = Parameters<TAuthClient["passkey"]["listUserPasskeys"]>[0]

export type ListPasskey<
  TAuthClient extends PasskeyAuthClient = PasskeyAuthClient
> = NonNullable<ListPasskeysData<TAuthClient>>[number]

export type ListPasskeysOptions<
  TAuthClient extends PasskeyAuthClient = PasskeyAuthClient
> = Omit<
  ReturnType<typeof listPasskeysOptions<TAuthClient>>,
  "queryKey" | "queryFn"
>

export function listPasskeysOptions<TAuthClient extends PasskeyAuthClient>(
  authClient: TAuthClient,
  userId: string | undefined,
  params?: ListPasskeysParams<TAuthClient>
) {
  type TData = ListPasskeysData<TAuthClient>
  const queryKey = passkeyQueryKeys.list(userId, params?.query)

  const options = {
    queryKey,
    queryFn: ({ signal }) =>
      authClient.passkey.listUserPasskeys({
        ...params,
        fetchOptions: { ...params?.fetchOptions, signal, throw: true }
      }) as Promise<TData>
  } as QueryOptions<TData, BetterFetchError, TData, typeof queryKey>

  return options as typeof options & {
    queryKey: DataTag<typeof queryKey, TData, BetterFetchError>
  }
}

export const ensureListPasskeys = <TAuthClient extends PasskeyAuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  params?: ListPasskeysParams<TAuthClient>
) =>
  queryClient.ensureQueryData(listPasskeysOptions(authClient, userId, params))

export const prefetchListPasskeys = <TAuthClient extends PasskeyAuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  params?: ListPasskeysParams<TAuthClient>
) => queryClient.prefetchQuery(listPasskeysOptions(authClient, userId, params))

export const fetchListPasskeys = <TAuthClient extends PasskeyAuthClient>(
  queryClient: QueryClient,
  authClient: TAuthClient,
  userId: string,
  params?: ListPasskeysParams<TAuthClient>
) => queryClient.fetchQuery(listPasskeysOptions(authClient, userId, params))

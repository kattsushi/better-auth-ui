import {
  type ListPasskeysData,
  type ListPasskeysParams,
  listPasskeysOptions,
  type PasskeyAuthClient
} from "@better-auth-ui/core/plugins/passkey"
import {
  createQuery,
  skipToken,
  type UseQueryOptions
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"
import { useSession } from "../../../../hooks/queries/use-session"

export type UseListPasskeysOptions<TAuthClient extends PasskeyAuthClient> =
  Omit<
    UseQueryOptions<
      ListPasskeysData<TAuthClient>,
      BetterFetchError,
      ListPasskeysData<TAuthClient>,
      ReturnType<typeof listPasskeysOptions<TAuthClient>>["queryKey"]
    >,
    "queryKey" | "queryFn" | "initialData"
  > &
    ListPasskeysParams<TAuthClient>

export function useListPasskeys<TAuthClient extends PasskeyAuthClient>(
  authClient: TAuthClient,
  options: UseListPasskeysOptions<TAuthClient> = {}
) {
  const session = useSession(authClient)

  return createQuery(() => {
    const userId = session.data?.user.id
    const { query, fetchOptions, ...queryOptions } = options
    const { initialData: _initialData, ...baseOptions } = listPasskeysOptions(
      authClient,
      userId,
      { query, fetchOptions }
    )

    return {
      ...queryOptions,
      ...baseOptions,
      queryFn: userId ? baseOptions.queryFn : skipToken
    }
  })
}

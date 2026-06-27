import {
  type ListPasskeysData,
  type ListPasskeysParams,
  listPasskeysOptions,
  type PasskeyAuthClient
} from "@better-auth-ui/core/plugins/passkey"
import {
  createQuery,
  type QueryClient,
  type QueryOptions,
  skipToken
} from "@tanstack/solid-query"
import type { Accessor } from "solid-js"
import { useSession } from "../../../../hooks/queries/use-session"

export type UseListPasskeysOptions<TAuthClient extends PasskeyAuthClient> =
  Accessor<
    Omit<QueryOptions<ListPasskeysData<TAuthClient>>, "queryKey"> &
      ListPasskeysParams<TAuthClient>
  >

export function useListPasskeys<TAuthClient extends PasskeyAuthClient>(
  authClient: TAuthClient,
  options?: UseListPasskeysOptions<TAuthClient>,
  queryClient?: Accessor<QueryClient>
) {
  const sessionQuery = useSession(authClient, undefined, queryClient)

  return createQuery(() => {
    const userId = sessionQuery.data?.user.id
    const { query, fetchOptions, initialData, ...queryOptions } =
      options?.() ?? {}
    const baseOptions = listPasskeysOptions(authClient, userId, {
      query,
      fetchOptions
    })

    return {
      ...baseOptions,
      queryFn: userId ? baseOptions.queryFn : skipToken,
      ...queryOptions,
      initialData: initialData as undefined
    }
  }, queryClient)
}

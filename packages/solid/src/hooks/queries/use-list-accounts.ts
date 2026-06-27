import {
  type AuthClient,
  type authQueryKeys,
  type ListAccountsData,
  type ListAccountsParams,
  listAccountsOptions
} from "@better-auth-ui/core"
import {
  type QueryOptions as SolidQueryOptions,
  useQuery
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"
import { useSession } from "./use-session"

export type UseListAccountsOptions<TAuthClient extends AuthClient> = Omit<
  SolidQueryOptions<
    ListAccountsData<TAuthClient>,
    BetterFetchError,
    ListAccountsData<TAuthClient>,
    ReturnType<typeof authQueryKeys.listAccounts>
  >,
  "initialData" | "queryKey" | "queryFn"
> &
  ListAccountsParams<TAuthClient>

export function useListAccounts<TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options: UseListAccountsOptions<TAuthClient> = {}
) {
  const session = useSession(authClient)
  const userId = () => session.data?.user.id
  const { query, fetchOptions, ...queryOptions } = options

  return useQuery(() => {
    const { initialData: _initialData, ...baseOptions } = listAccountsOptions(
      authClient,
      userId(),
      {
        query,
        fetchOptions
      }
    )

    return {
      ...baseOptions,
      ...queryOptions
    }
  })
}

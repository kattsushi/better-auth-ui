import {
  type AccountInfoData,
  type AccountInfoParams,
  type AuthClient,
  accountInfoOptions,
  type authQueryKeys
} from "@better-auth-ui/core"
import {
  type QueryOptions as SolidQueryOptions,
  useQuery
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"
import { useSession } from "./use-session"

export type UseAccountInfoOptions<TAuthClient extends AuthClient> = Omit<
  SolidQueryOptions<
    AccountInfoData<TAuthClient>,
    BetterFetchError,
    AccountInfoData<TAuthClient>,
    ReturnType<typeof authQueryKeys.accountInfo>
  >,
  "initialData" | "queryKey" | "queryFn"
> &
  Partial<NonNullable<AccountInfoParams<TAuthClient>>>

export function useAccountInfo<TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options: UseAccountInfoOptions<TAuthClient> = {}
) {
  const session = useSession(authClient)
  const userId = () => session.data?.user.id
  const { query, fetchOptions, ...queryOptions } = options

  return useQuery(() => {
    const { initialData: _initialData, ...baseOptions } = accountInfoOptions(
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

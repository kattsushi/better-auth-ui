import {
  type AccountInfoOptions,
  type AccountInfoParams,
  type AuthClient,
  accountInfoOptions
} from "@better-auth-ui/core"
import { useQuery } from "@tanstack/solid-query"
import { getSessionUserId } from "../../queries/create-user-scoped-query"
import { useSession } from "./use-session"

export type UseAccountInfoOptions<TAuthClient extends AuthClient> = Omit<
  AccountInfoOptions<TAuthClient>,
  "enabled" | "initialData"
> &
  Partial<NonNullable<AccountInfoParams<TAuthClient>>> & {
    enabled?: boolean | ((query: never) => boolean)
  }

export function useAccountInfo<TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options: UseAccountInfoOptions<TAuthClient> = {}
) {
  const session = useSession(authClient)
  const userId = () => getSessionUserId(session)
  const { query, fetchOptions, enabled, ...restOptions } = options
  const queryOptions = restOptions as Omit<
    AccountInfoOptions<TAuthClient>,
    "enabled" | "initialData"
  >

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
      ...queryOptions,
      ...baseOptions,
      enabled: (queryState) =>
        Boolean(userId() && query?.accountId) &&
        (typeof enabled === "function"
          ? enabled(queryState as never)
          : enabled !== false)
    }
  })
}

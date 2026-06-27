import {
  type AuthClient,
  type authQueryKeys,
  type ListSessionsData,
  type ListSessionsParams,
  listSessionsOptions
} from "@better-auth-ui/core"
import {
  type QueryOptions as SolidQueryOptions,
  useQuery
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"
import { useSession } from "./use-session"

export type UseListSessionsOptions<TAuthClient extends AuthClient> = Omit<
  SolidQueryOptions<
    ListSessionsData<TAuthClient>,
    BetterFetchError,
    ListSessionsData<TAuthClient>,
    ReturnType<typeof authQueryKeys.listSessions>
  >,
  "initialData" | "queryKey" | "queryFn"
> &
  Partial<NonNullable<ListSessionsParams<TAuthClient>>>

export function useListSessions<TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options: UseListSessionsOptions<TAuthClient> = {}
) {
  const session = useSession(authClient)
  const userId = () => session.data?.user.id
  const { query, fetchOptions, ...queryOptions } = options

  return useQuery(() => {
    const { initialData: _initialData, ...baseOptions } = listSessionsOptions(
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

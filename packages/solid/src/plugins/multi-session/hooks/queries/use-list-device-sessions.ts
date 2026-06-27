import {
  type ListDeviceSessionsData,
  type ListDeviceSessionsParams,
  listDeviceSessionsOptions,
  type MultiSessionAuthClient
} from "@better-auth-ui/core/plugins/multi-session"
import {
  createQuery,
  skipToken,
  type UseQueryOptions
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"
import { useSession } from "../../../../hooks/queries/use-session"

export type UseListDeviceSessionsOptions<
  TAuthClient extends MultiSessionAuthClient
> = Omit<
  UseQueryOptions<
    ListDeviceSessionsData<TAuthClient>,
    BetterFetchError,
    ListDeviceSessionsData<TAuthClient>,
    ReturnType<typeof listDeviceSessionsOptions<TAuthClient>>["queryKey"]
  >,
  "queryKey" | "queryFn" | "initialData"
> &
  ListDeviceSessionsParams<TAuthClient>

export function useListDeviceSessions<
  TAuthClient extends MultiSessionAuthClient
>(
  authClient: TAuthClient,
  options: UseListDeviceSessionsOptions<TAuthClient> = {}
) {
  const session = useSession(authClient)

  return createQuery(() => {
    const userId = session.data?.user.id
    const { query, fetchOptions, ...queryOptions } = options
    const { initialData: _initialData, ...baseOptions } =
      listDeviceSessionsOptions(authClient, userId, { query, fetchOptions })

    return {
      ...queryOptions,
      ...baseOptions,
      queryFn: userId ? baseOptions.queryFn : skipToken
    }
  })
}

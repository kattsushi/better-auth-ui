import {
  type ListDeviceSessionsData,
  type ListDeviceSessionsParams,
  listDeviceSessionsOptions,
  type MultiSessionAuthClient
} from "@better-auth-ui/core/plugins/multi-session"
import {
  createQuery,
  type QueryClient,
  type QueryOptions,
  skipToken
} from "@tanstack/solid-query"
import type { Accessor } from "solid-js"
import { useSession } from "../../../../hooks/queries/use-session"

export type UseListDeviceSessionsOptions<
  TAuthClient extends MultiSessionAuthClient
> = Accessor<
  Omit<QueryOptions<ListDeviceSessionsData<TAuthClient>>, "queryKey"> &
    ListDeviceSessionsParams<TAuthClient>
>

export function useListDeviceSessions<
  TAuthClient extends MultiSessionAuthClient
>(
  authClient: TAuthClient,
  options?: UseListDeviceSessionsOptions<TAuthClient>,
  queryClient?: Accessor<QueryClient>
) {
  const session = useSession(authClient, undefined, queryClient)

  return createQuery(() => {
    const userId = session.data?.user.id
    const { query, fetchOptions, initialData, ...queryOptions } =
      options?.() ?? {}
    const baseOptions = listDeviceSessionsOptions(authClient, userId, {
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

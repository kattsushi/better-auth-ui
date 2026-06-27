import {
  type ApiKeyAuthClient,
  type ListApiKeysData,
  type ListApiKeysParams,
  listApiKeysOptions
} from "@better-auth-ui/core/plugins/api-key"
import {
  createQuery,
  type QueryClient,
  type QueryOptions,
  skipToken
} from "@tanstack/solid-query"
import type { Accessor } from "solid-js"
import { useSession } from "../../../../hooks/queries/use-session"

export type UseListApiKeysOptions<TAuthClient extends ApiKeyAuthClient> =
  Accessor<
    Omit<QueryOptions<ListApiKeysData<TAuthClient>>, "queryKey"> &
      ListApiKeysParams<TAuthClient>
  >

export function useListApiKeys<TAuthClient extends ApiKeyAuthClient>(
  authClient: TAuthClient,
  options?: UseListApiKeysOptions<TAuthClient>,
  queryClient?: Accessor<QueryClient>
) {
  const session = useSession(authClient, undefined, queryClient)

  return createQuery(() => {
    const userId = session.data?.user.id
    const { query, fetchOptions, initialData, ...queryOptions } =
      options?.() ?? {}
    const queryParams = query as
      | { configId?: string; organizationId?: string }
      | undefined
    const hasRequiredParams =
      queryParams?.configId === "organization"
        ? Boolean(queryParams.organizationId)
        : true
    const baseOptions = listApiKeysOptions(authClient, userId, {
      query,
      fetchOptions
    })

    return {
      ...baseOptions,
      queryFn: userId && hasRequiredParams ? baseOptions.queryFn : skipToken,
      ...queryOptions,
      initialData: initialData as undefined
    }
  }, queryClient)
}

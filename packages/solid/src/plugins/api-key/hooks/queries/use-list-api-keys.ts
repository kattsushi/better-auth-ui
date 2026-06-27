import {
  type ApiKeyAuthClient,
  type ListApiKeysData,
  type ListApiKeysParams,
  listApiKeysOptions
} from "@better-auth-ui/core/plugins/api-key"
import {
  createQuery,
  skipToken,
  type UseQueryOptions
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"
import { useSession } from "../../../../hooks/queries/use-session"

export type UseListApiKeysOptions<TAuthClient extends ApiKeyAuthClient> = Omit<
  UseQueryOptions<
    ListApiKeysData<TAuthClient>,
    BetterFetchError,
    ListApiKeysData<TAuthClient>,
    ReturnType<typeof listApiKeysOptions<TAuthClient>>["queryKey"]
  >,
  "queryKey" | "queryFn" | "initialData"
> &
  ListApiKeysParams<TAuthClient>

export function useListApiKeys<TAuthClient extends ApiKeyAuthClient>(
  authClient: TAuthClient,
  options: UseListApiKeysOptions<TAuthClient> = {}
) {
  const session = useSession(authClient)

  return createQuery(() => {
    const userId = session.data?.user.id
    const { query, fetchOptions, ...queryOptionsRest } = options
    const queryParams = query as
      | { configId?: string; organizationId?: string }
      | undefined
    const hasRequiredParams =
      queryParams?.configId === "organization"
        ? Boolean(queryParams.organizationId)
        : true
    const { initialData: _initialData, ...baseOptions } = listApiKeysOptions(
      authClient,
      userId,
      {
        query,
        fetchOptions
      }
    )

    return {
      ...queryOptionsRest,
      ...baseOptions,
      queryFn: userId && hasRequiredParams ? baseOptions.queryFn : skipToken
    }
  })
}

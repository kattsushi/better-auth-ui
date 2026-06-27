import {
  type ActiveOrganizationData,
  type ActiveOrganizationParams,
  activeOrganizationOptions,
  type OrganizationAuthClient
} from "@better-auth-ui/core/plugins/organization"
import {
  createQuery,
  skipToken,
  type UseQueryOptions
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"
import { useSession } from "../../../../hooks/queries/use-session"
import { useOrganizationSlug } from "../../queries/plugin"

export type UseActiveOrganizationOptions<
  TAuthClient extends OrganizationAuthClient
> = Omit<
  UseQueryOptions<
    ActiveOrganizationData<TAuthClient>,
    BetterFetchError,
    ActiveOrganizationData<TAuthClient>,
    ReturnType<typeof activeOrganizationOptions<TAuthClient>>["queryKey"]
  >,
  "queryKey" | "queryFn" | "initialData"
> &
  ActiveOrganizationParams<TAuthClient>

export function useActiveOrganization<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  options: UseActiveOrganizationOptions<TAuthClient> = {}
) {
  const session = useSession(authClient)
  const slug = useOrganizationSlug()

  return createQuery(() => {
    const userId = session.data?.user.id
    const { query, fetchOptions, ...queryOptionsRest } = options
    const effectiveQuery = slug ? { organizationSlug: slug } : query
    const { initialData: _initialData, ...baseOptions } =
      activeOrganizationOptions(authClient, userId, {
        query: effectiveQuery,
        fetchOptions
      } as ActiveOrganizationParams<TAuthClient>)

    return {
      ...queryOptionsRest,
      ...baseOptions,
      queryFn:
        slug === null
          ? async () => null
          : userId
            ? baseOptions.queryFn
            : skipToken
    }
  })
}

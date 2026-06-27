import {
  type ListOrganizationsData,
  type ListOrganizationsParams,
  listOrganizationsOptions,
  type OrganizationAuthClient
} from "@better-auth-ui/core/plugins/organization"
import {
  createQuery,
  skipToken,
  type UseQueryOptions
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"
import { useSession } from "../../../../hooks/queries/use-session"

export type UseListOrganizationsOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  UseQueryOptions<
    ListOrganizationsData<TAuthClient>,
    BetterFetchError,
    ListOrganizationsData<TAuthClient>,
    ReturnType<typeof listOrganizationsOptions<TAuthClient>>["queryKey"]
  >,
  "queryKey" | "queryFn" | "initialData"
> &
  ListOrganizationsParams<TAuthClient>

export function useListOrganizations<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  options: UseListOrganizationsOptions<TAuthClient> = {}
) {
  const session = useSession(authClient)

  return createQuery(() => {
    const userId = session.data?.user.id
    const { query, fetchOptions, ...queryOptionsRest } = options
    const { initialData: _initialData, ...baseOptions } =
      listOrganizationsOptions(authClient, userId, { query, fetchOptions })

    return {
      ...queryOptionsRest,
      ...baseOptions,
      queryFn: userId ? baseOptions.queryFn : skipToken
    }
  })
}

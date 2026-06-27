import {
  type FullOrganizationData,
  type FullOrganizationParams,
  fullOrganizationOptions,
  type OrganizationAuthClient
} from "@better-auth-ui/core/plugins/organization"
import {
  createQuery,
  skipToken,
  type UseQueryOptions
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"
import { useSession } from "../../../../hooks/queries/use-session"

export type UseFullOrganizationOptions<
  TAuthClient extends OrganizationAuthClient
> = Omit<
  UseQueryOptions<
    FullOrganizationData<TAuthClient>,
    BetterFetchError,
    FullOrganizationData<TAuthClient>,
    ReturnType<typeof fullOrganizationOptions<TAuthClient>>["queryKey"]
  >,
  "queryKey" | "queryFn" | "initialData"
> &
  FullOrganizationParams<TAuthClient>

export function useFullOrganization<TAuthClient extends OrganizationAuthClient>(
  authClient: TAuthClient,
  options: UseFullOrganizationOptions<TAuthClient> = {}
) {
  const session = useSession(authClient)

  return createQuery(() => {
    const userId = session.data?.user.id
    const { query, fetchOptions, ...queryOptions } = options
    const { initialData: _initialData, ...baseOptions } =
      fullOrganizationOptions(authClient, userId, { query, fetchOptions })

    return {
      ...queryOptions,
      ...baseOptions,
      queryFn: userId ? baseOptions.queryFn : skipToken
    }
  })
}

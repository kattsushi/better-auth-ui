import {
  type ListUserInvitationsData,
  type ListUserInvitationsParams,
  listUserInvitationsOptions,
  type OrganizationAuthClient
} from "@better-auth-ui/core/plugins/organization"
import {
  createQuery,
  skipToken,
  type UseQueryOptions
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"
import { useSession } from "../../../../hooks/queries/use-session"

export type UseListUserInvitationsOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  UseQueryOptions<
    ListUserInvitationsData<TAuthClient>,
    BetterFetchError,
    ListUserInvitationsData<TAuthClient>,
    ReturnType<typeof listUserInvitationsOptions<TAuthClient>>["queryKey"]
  >,
  "queryKey" | "queryFn" | "initialData"
> &
  ListUserInvitationsParams<TAuthClient>

export function useListUserInvitations<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  options: UseListUserInvitationsOptions<TAuthClient> = {}
) {
  const session = useSession(authClient)

  return createQuery(() => {
    const userId = session.data?.user.id
    const { query, fetchOptions, ...queryOptions } = options
    const { initialData: _initialData, ...baseOptions } =
      listUserInvitationsOptions(authClient, userId, { query, fetchOptions })

    return {
      ...queryOptions,
      ...baseOptions,
      queryFn: userId ? baseOptions.queryFn : skipToken
    }
  })
}

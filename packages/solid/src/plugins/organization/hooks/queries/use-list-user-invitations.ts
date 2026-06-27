import {
  type ListUserInvitationsData,
  type ListUserInvitationsParams,
  listUserInvitationsOptions,
  type OrganizationAuthClient
} from "@better-auth-ui/core/plugins/organization"
import {
  createQuery,
  type QueryClient,
  type QueryOptions,
  skipToken
} from "@tanstack/solid-query"
import type { Accessor } from "solid-js"
import { useSession } from "../../../../hooks/queries/use-session"

export type UseListUserInvitationsOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Accessor<
  Omit<QueryOptions<ListUserInvitationsData<TAuthClient>>, "queryKey"> &
    ListUserInvitationsParams<TAuthClient>
>

export function useListUserInvitations<
  TAuthClient extends OrganizationAuthClient
>(
  authClient: TAuthClient,
  options?: UseListUserInvitationsOptions<TAuthClient>,
  queryClient?: Accessor<QueryClient>
) {
  const session = useSession(authClient, undefined, queryClient)

  return createQuery(() => {
    const userId = session.data?.user.id
    const { query, fetchOptions, initialData, ...queryOptions } =
      options?.() ?? {}
    const baseOptions = listUserInvitationsOptions(authClient, userId, {
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

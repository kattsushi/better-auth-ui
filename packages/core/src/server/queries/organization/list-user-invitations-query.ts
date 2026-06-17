import { organizationQueryKeys } from "../../../plugins/organization/organization-query-keys"
import type { OrganizationAuthServer } from "../../auth-server"
import { createServerQueryDescriptor } from "../../query-factory"

export type ListUserInvitationsData<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = Awaited<ReturnType<TAuth["api"]["listUserInvitations"]>>

export type ListUserInvitationsParams<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = Parameters<TAuth["api"]["listUserInvitations"]>[0]

export function listUserInvitationsOptions<
  TAuth extends OrganizationAuthServer
>(auth: TAuth, userId: string, params: ListUserInvitationsParams<TAuth>) {
  type TData = ListUserInvitationsData<TAuth>
  const queryKey = organizationQueryKeys.userInvitations.list(
    userId,
    params?.query
  )

  return createServerQueryDescriptor<typeof queryKey, TData>({
    queryKey,
    queryFn: () => auth.api.listUserInvitations(params) as Promise<TData>,
    name: "listUserInvitations"
  })
}

import { organizationQueryKeys } from "../../../plugins/organization/organization-query-keys"
import type { OrganizationAuthServer } from "../../auth-server"
import { createServerQueryDescriptor } from "../../query-factory"

export type ListOrganizationInvitationsData<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = Awaited<ReturnType<TAuth["api"]["listInvitations"]>>

export type ListOrganizationInvitationsParams<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = Parameters<TAuth["api"]["listInvitations"]>[0]

export function listOrganizationInvitationsOptions<
  TAuth extends OrganizationAuthServer
>(
  auth: TAuth,
  userId: string,
  params: ListOrganizationInvitationsParams<TAuth>
) {
  type TData = ListOrganizationInvitationsData<TAuth>
  const queryKey = organizationQueryKeys.invitations.list(userId, params?.query)

  return createServerQueryDescriptor<typeof queryKey, TData>({
    queryKey,
    queryFn: () => auth.api.listInvitations(params) as Promise<TData>,
    name: "listOrganizationInvitations"
  })
}

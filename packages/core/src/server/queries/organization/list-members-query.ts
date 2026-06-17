import { organizationQueryKeys } from "../../../plugins/organization/organization-query-keys"
import type { OrganizationAuthServer } from "../../auth-server"
import { createServerQueryDescriptor } from "../../query-factory"

export type ListOrganizationMembersData<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = Awaited<ReturnType<TAuth["api"]["listMembers"]>>

export type ListOrganizationMembersParams<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = Parameters<TAuth["api"]["listMembers"]>[0]

export function listOrganizationMembersOptions<
  TAuth extends OrganizationAuthServer
>(auth: TAuth, userId: string, params: ListOrganizationMembersParams<TAuth>) {
  type TData = ListOrganizationMembersData<TAuth>
  const queryKey = organizationQueryKeys.members.list(userId, params?.query)

  return createServerQueryDescriptor<typeof queryKey, TData>({
    queryKey,
    queryFn: () => auth.api.listMembers(params) as Promise<TData>,
    name: "listOrganizationMembers"
  })
}

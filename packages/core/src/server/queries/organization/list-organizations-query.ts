import { organizationQueryKeys } from "../../../plugins/organization/organization-query-keys"
import type { OrganizationAuthServer } from "../../auth-server"
import { createServerQueryDescriptor } from "../../query-factory"

export type ListOrganizationsData<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = Awaited<ReturnType<TAuth["api"]["listOrganizations"]>>

export type ListOrganization<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> =
  NonNullable<ListOrganizationsData<TAuth>> extends Array<infer TOrganization>
    ? TOrganization
    : never

export type ListOrganizationsParams<TAuth extends OrganizationAuthServer> =
  Parameters<TAuth["api"]["listOrganizations"]>[0]

export function listOrganizationsOptions<TAuth extends OrganizationAuthServer>(
  auth: TAuth,
  userId: string,
  params: ListOrganizationsParams<TAuth>
) {
  type TData = ListOrganizationsData<TAuth>
  const queryKey = organizationQueryKeys.list(userId, params?.query)

  return createServerQueryDescriptor<typeof queryKey, TData>({
    queryKey,
    queryFn: () => auth.api.listOrganizations(params) as Promise<TData>,
    name: "listOrganizations"
  })
}

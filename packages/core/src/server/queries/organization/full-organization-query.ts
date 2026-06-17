import { organizationQueryKeys } from "../../../plugins/organization/organization-query-keys"
import type { OrganizationAuthServer } from "../../auth-server"
import { createServerQueryDescriptor } from "../../query-factory"

export type FullOrganizationData<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = Awaited<ReturnType<TAuth["api"]["getFullOrganization"]>>

export type FullOrganizationParams<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = Parameters<TAuth["api"]["getFullOrganization"]>[0]

export function fullOrganizationOptions<TAuth extends OrganizationAuthServer>(
  auth: TAuth,
  userId: string,
  params: FullOrganizationParams<TAuth>
) {
  type TData = FullOrganizationData<TAuth>
  const queryKey = organizationQueryKeys.fullDetail(userId, params?.query)

  return createServerQueryDescriptor<typeof queryKey, TData>({
    queryKey,
    queryFn: () => auth.api.getFullOrganization(params) as Promise<TData>,
    name: "fullOrganization"
  })
}

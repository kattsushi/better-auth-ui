import { organizationQueryKeys } from "../../../plugins/organization/organization-query-keys"
import type { OrganizationAuthServer } from "../../auth-server"
import { createServerQueryDescriptor } from "../../query-factory"
import type { FullOrganizationParams } from "./full-organization-query"
import type { ListOrganization } from "./list-organizations-query"

export type ActiveOrganizationData<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = ListOrganization<TAuth>

export type ActiveOrganizationParams<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = FullOrganizationParams<TAuth>

export function activeOrganizationOptions<TAuth extends OrganizationAuthServer>(
  auth: TAuth,
  userId: string,
  params: ActiveOrganizationParams<TAuth>
) {
  type TData = ActiveOrganizationData<TAuth>
  const queryKey = organizationQueryKeys.activeOrganization(
    userId,
    params?.query
  )

  return createServerQueryDescriptor<typeof queryKey, TData>({
    queryKey,
    queryFn: () => auth.api.getFullOrganization(params) as Promise<TData>,
    name: "activeOrganization"
  })
}

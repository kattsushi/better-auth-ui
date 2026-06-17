import { organizationQueryKeys } from "../../../plugins/organization/organization-query-keys"
import type { OrganizationAuthServer } from "../../auth-server"
import { createServerQueryDescriptor } from "../../query-factory"

export type HasPermissionData<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = Awaited<ReturnType<TAuth["api"]["hasPermission"]>>

export type HasPermissionParams<
  TAuth extends OrganizationAuthServer = OrganizationAuthServer
> = Parameters<TAuth["api"]["hasPermission"]>[0]

export function hasPermissionOptions<TAuth extends OrganizationAuthServer>(
  auth: TAuth,
  userId: string,
  params: HasPermissionParams<TAuth>
) {
  type TData = HasPermissionData<TAuth>
  const queryKey = organizationQueryKeys.permissions.has(userId, params?.body)

  return createServerQueryDescriptor<typeof queryKey, TData>({
    queryKey,
    queryFn: () => auth.api.hasPermission(params) as Promise<TData>,
    name: "hasPermission"
  })
}

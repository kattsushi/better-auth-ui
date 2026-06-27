import {
  type HasPermissionData,
  type HasPermissionParams,
  hasPermissionOptions,
  type OrganizationAuthClient
} from "@better-auth-ui/core/plugins/organization"
import {
  createQuery,
  skipToken,
  type UseQueryOptions
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"
import { useSession } from "../../../../hooks/queries/use-session"
import { useActiveOrganization } from "./use-active-organization"

export type UseHasPermissionOptions<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
> = Omit<
  UseQueryOptions<
    HasPermissionData<TAuthClient>,
    BetterFetchError,
    HasPermissionData<TAuthClient>,
    ReturnType<typeof hasPermissionOptions<TAuthClient>>["queryKey"]
  >,
  "queryKey" | "queryFn" | "initialData"
> &
  HasPermissionParams<TAuthClient>

export function useHasPermission<TAuthClient extends OrganizationAuthClient>(
  authClient: TAuthClient,
  options: UseHasPermissionOptions<TAuthClient>
) {
  const session = useSession(authClient)
  const activeOrganization = useActiveOrganization(authClient, {
    enabled: !options.organizationId
  })

  return createQuery(() => {
    const userId = session.data?.user.id
    const {
      fetchOptions,
      permissions,
      organizationId: optionsOrganizationId,
      ...queryOptions
    } = options
    const organizationId = optionsOrganizationId ?? activeOrganization.data?.id
    const { initialData: _initialData, ...baseOptions } = hasPermissionOptions(
      authClient,
      userId,
      { fetchOptions, organizationId, permissions }
    )

    return {
      ...queryOptions,
      ...baseOptions,
      queryFn: userId && organizationId ? baseOptions.queryFn : skipToken
    }
  })
}

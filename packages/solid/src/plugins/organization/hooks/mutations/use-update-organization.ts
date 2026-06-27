import {
  type OrganizationAuthClient,
  type UpdateOrganizationOptions,
  updateOrganizationOptions
} from "@better-auth-ui/core/plugins/organization"
import { useMutation } from "@tanstack/solid-query"
import { useSession } from "../../../../hooks/queries/use-session"
import { useActiveOrganization } from "../queries"

export function useUpdateOrganization<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
>(authClient: TAuthClient, options?: UpdateOrganizationOptions<TAuthClient>) {
  const session = useSession(authClient)
  const activeOrganization = useActiveOrganization(authClient)

  return useMutation(() => {
    const userId = session.data?.user.id

    return {
      ...updateOrganizationOptions(
        authClient,
        userId,
        activeOrganization.data?.id
      ),
      ...options
    }
  })
}

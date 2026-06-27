import {
  type OrganizationAuthClient,
  type UpdateMemberRoleOptions,
  updateMemberRoleOptions
} from "@better-auth-ui/core/plugins/organization"
import { useMutation } from "@tanstack/solid-query"
import { useSession } from "../../../../hooks/queries/use-session"
import { useActiveOrganization } from "../queries"

export function useUpdateMemberRole(
  authClient: OrganizationAuthClient,
  options?: UpdateMemberRoleOptions<OrganizationAuthClient>
) {
  const session = useSession(authClient)
  const activeOrganization = useActiveOrganization(authClient)

  return useMutation(() => {
    const userId = session.data?.user.id

    return {
      ...updateMemberRoleOptions(
        authClient,
        userId,
        activeOrganization.data?.id
      ),
      ...options
    }
  })
}

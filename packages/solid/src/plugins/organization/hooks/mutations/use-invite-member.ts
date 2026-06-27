import {
  type InviteMemberOptions,
  inviteMemberOptions,
  type OrganizationAuthClient
} from "@better-auth-ui/core/plugins/organization"
import { useMutation } from "@tanstack/solid-query"
import { useSession } from "../../../../hooks/queries/use-session"
import { useActiveOrganization } from "../queries"

export function useInviteMember<TAuthClient extends OrganizationAuthClient>(
  authClient: TAuthClient,
  options?: InviteMemberOptions<TAuthClient>
) {
  const session = useSession(authClient)
  const activeOrganization = useActiveOrganization(authClient)

  return useMutation(() => {
    const userId = session.data?.user.id

    return {
      ...inviteMemberOptions(authClient, userId, activeOrganization.data?.id),
      ...options
    }
  })
}

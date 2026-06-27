import {
  type AcceptInvitationOptions,
  acceptInvitationOptions,
  type OrganizationAuthClient
} from "@better-auth-ui/core/plugins/organization"
import { useMutation } from "@tanstack/solid-query"
import { useSession } from "../../../../hooks/queries/use-session"

export function useAcceptInvitation<TAuthClient extends OrganizationAuthClient>(
  authClient: TAuthClient,
  options?: AcceptInvitationOptions<TAuthClient>
) {
  const session = useSession(authClient)

  return useMutation(() => {
    const userId = session.data?.user.id

    return {
      ...acceptInvitationOptions(authClient, userId),
      ...options
    }
  })
}

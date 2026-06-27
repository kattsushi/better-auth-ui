import {
  type OrganizationAuthClient,
  type RemoveMemberOptions,
  removeMemberOptions
} from "@better-auth-ui/core/plugins/organization"
import { useMutation } from "@tanstack/solid-query"
import { useSession } from "../../../../hooks/queries/use-session"

export function useRemoveMember<TAuthClient extends OrganizationAuthClient>(
  authClient: TAuthClient,
  options?: RemoveMemberOptions<TAuthClient>
) {
  const session = useSession(authClient)

  return useMutation(() => {
    const userId = session.data?.user.id

    return {
      ...removeMemberOptions(authClient, userId),
      ...options
    }
  })
}

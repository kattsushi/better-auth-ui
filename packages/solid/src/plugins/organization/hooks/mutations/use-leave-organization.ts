import {
  type LeaveOrganizationOptions,
  leaveOrganizationOptions,
  type OrganizationAuthClient
} from "@better-auth-ui/core/plugins/organization"
import { useMutation } from "@tanstack/solid-query"
import { useSession } from "../../../../hooks/queries/use-session"

export function useLeaveOrganization<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
>(authClient: TAuthClient, options?: LeaveOrganizationOptions<TAuthClient>) {
  const session = useSession(authClient)

  return useMutation(() => {
    const userId = session.data?.user.id

    return {
      ...leaveOrganizationOptions(authClient, userId),
      ...options
    }
  })
}

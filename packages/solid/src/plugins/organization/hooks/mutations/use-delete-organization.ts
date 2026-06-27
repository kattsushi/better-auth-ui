import {
  type DeleteOrganizationOptions,
  deleteOrganizationOptions,
  type OrganizationAuthClient
} from "@better-auth-ui/core/plugins/organization"
import { useMutation } from "@tanstack/solid-query"
import { useSession } from "../../../../hooks/queries/use-session"

export function useDeleteOrganization<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
>(authClient: TAuthClient, options?: DeleteOrganizationOptions<TAuthClient>) {
  const session = useSession(authClient)

  return useMutation(() => {
    const userId = session.data?.user.id

    return {
      ...deleteOrganizationOptions(authClient, userId),
      ...options
    }
  })
}

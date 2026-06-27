import {
  type CreateOrganizationOptions,
  createOrganizationOptions,
  type OrganizationAuthClient
} from "@better-auth-ui/core/plugins/organization"
import { useMutation } from "@tanstack/solid-query"
import { useSession } from "../../../../hooks/queries/use-session"

export function useCreateOrganization<
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
>(authClient: TAuthClient, options?: CreateOrganizationOptions<TAuthClient>) {
  const session = useSession(authClient)

  return useMutation(() => {
    const userId = session.data?.user.id

    return {
      ...createOrganizationOptions(authClient, userId),
      ...options
    }
  })
}

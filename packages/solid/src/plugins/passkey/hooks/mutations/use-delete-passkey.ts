import {
  type DeletePasskeyOptions,
  deletePasskeyOptions,
  type PasskeyAuthClient
} from "@better-auth-ui/core/plugins/passkey"
import { useMutation } from "@tanstack/solid-query"
import { useSession } from "../../../../hooks/queries/use-session"

export function useDeletePasskey<TAuthClient extends PasskeyAuthClient>(
  authClient: TAuthClient,
  options?: DeletePasskeyOptions<TAuthClient>
) {
  const session = useSession(authClient)

  return useMutation(() => {
    const userId = session.data?.user.id

    return {
      ...deletePasskeyOptions(authClient, userId),
      ...options
    }
  })
}

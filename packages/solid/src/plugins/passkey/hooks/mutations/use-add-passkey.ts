import {
  type AddPasskeyOptions,
  addPasskeyOptions,
  type PasskeyAuthClient
} from "@better-auth-ui/core/plugins/passkey"
import { useMutation } from "@tanstack/solid-query"
import { useSession } from "../../../../hooks/queries/use-session"

export function useAddPasskey<TAuthClient extends PasskeyAuthClient>(
  authClient: TAuthClient,
  options?: AddPasskeyOptions<TAuthClient>
) {
  const session = useSession(authClient)

  return useMutation(() => {
    const userId = session.data?.user.id

    return {
      ...addPasskeyOptions(authClient, userId),
      ...options
    }
  })
}

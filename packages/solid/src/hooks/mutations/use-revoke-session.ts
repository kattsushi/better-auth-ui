import {
  type AuthClient,
  type RevokeSessionOptions,
  revokeSessionOptions
} from "@better-auth-ui/core"
import { useMutation } from "@tanstack/solid-query"
import { useSession } from "../queries/use-session"

export function useRevokeSession<TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: RevokeSessionOptions<TAuthClient>
) {
  const session = useSession(authClient)

  return useMutation(() => {
    const userId = session.data?.user.id

    return {
      ...revokeSessionOptions(authClient, userId),
      ...options
    }
  })
}

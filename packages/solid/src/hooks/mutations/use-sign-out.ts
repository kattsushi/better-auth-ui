import {
  type AuthClient,
  type SignOutOptions,
  signOutOptions
} from "@better-auth-ui/core"
import { useMutation } from "@tanstack/solid-query"

export function useSignOut<TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: SignOutOptions<TAuthClient>
) {
  return useMutation(() => ({
    ...signOutOptions(authClient),
    ...options
  }))
}

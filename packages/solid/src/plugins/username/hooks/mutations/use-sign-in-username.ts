import {
  type SignInUsernameOptions,
  signInUsernameOptions,
  type UsernameAuthClient
} from "@better-auth-ui/core/plugins/username"
import { useMutation } from "@tanstack/solid-query"

export function useSignInUsername<TAuthClient extends UsernameAuthClient>(
  authClient: TAuthClient,
  options?: SignInUsernameOptions<TAuthClient>
) {
  return useMutation(() => ({
    ...signInUsernameOptions(authClient),
    ...options
  }))
}

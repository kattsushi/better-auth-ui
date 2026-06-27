import {
  type IsUsernameAvailableOptions,
  isUsernameAvailableOptions,
  type UsernameAuthClient
} from "@better-auth-ui/core/plugins/username"
import { useMutation } from "@tanstack/solid-query"

export function useIsUsernameAvailable<TAuthClient extends UsernameAuthClient>(
  authClient: TAuthClient,
  options?: IsUsernameAvailableOptions<TAuthClient>
) {
  return useMutation(() => ({
    ...isUsernameAvailableOptions(authClient),
    ...options
  }))
}

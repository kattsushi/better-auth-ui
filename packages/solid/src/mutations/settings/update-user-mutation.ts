import {
  type AuthClient,
  type UpdateUserOptions,
  updateUserOptions
} from "@better-auth-ui/core"
import { createMutation } from "@tanstack/solid-query"

export function updateUserMutation<TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: UpdateUserOptions<TAuthClient>
) {
  return createMutation(() => ({
    ...updateUserOptions(authClient),
    ...options
  }))
}

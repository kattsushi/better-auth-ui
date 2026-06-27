import {
  type PasskeyAuthClient,
  type SignInPasskeyOptions,
  signInPasskeyOptions
} from "@better-auth-ui/core/plugins/passkey"
import { useMutation } from "@tanstack/solid-query"

export function useSignInPasskey<TAuthClient extends PasskeyAuthClient>(
  authClient: TAuthClient,
  options?: SignInPasskeyOptions<TAuthClient>
) {
  return useMutation(() => ({
    ...signInPasskeyOptions(authClient),
    ...options
  }))
}

import type { MutationOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import {
  type AuthMutationFnData,
  type AuthMutationFnVariables,
  authMutationOptions
} from "../../lib/auth-mutation-options"
import { authQueryKeys } from "../../lib/auth-query-keys"
import type { PasskeyAuthClient } from "./passkey-auth-client"
import { passkeyMutationKeys } from "./passkey-mutation-keys"

export type SignInPasskeyFn<TAuthClient extends PasskeyAuthClient> =
  TAuthClient["signIn"]["passkey"]

export type SignInPasskeyParams<TAuthClient extends PasskeyAuthClient> =
  AuthMutationFnVariables<SignInPasskeyFn<TAuthClient>>

export type SignInPasskeyOptions<TAuthClient extends PasskeyAuthClient> = Omit<
  ReturnType<typeof signInPasskeyOptions<TAuthClient>>,
  "mutationKey" | "mutationFn" | "meta"
>

/**
 * Mutation options factory for passkey sign-in.
 *
 * @param authClient - The Better Auth passkey client.
 */
export function signInPasskeyOptions<TAuthClient extends PasskeyAuthClient>(
  authClient: TAuthClient
) {
  return {
    ...authMutationOptions(
      authClient.signIn.passkey,
      passkeyMutationKeys.signIn
    ),
    meta: {
      awaits: [authQueryKeys.session]
    }
  } as MutationOptions<
    AuthMutationFnData<SignInPasskeyFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<SignInPasskeyFn<TAuthClient>>
  >
}

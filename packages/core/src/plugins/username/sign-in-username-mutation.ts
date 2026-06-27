import type { MutationOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import {
  type AuthMutationFnData,
  type AuthMutationFnVariables,
  authMutationOptions
} from "../../lib/auth-mutation-options"
import { authQueryKeys } from "../../lib/auth-query-keys"
import type { UsernameAuthClient } from "./username-auth-client"
import { usernameMutationKeys } from "./username-mutation-keys"

export type SignInUsernameFn<TAuthClient extends UsernameAuthClient> =
  TAuthClient["signIn"]["username"]

export type SignInUsernameParams<TAuthClient extends UsernameAuthClient> =
  AuthMutationFnVariables<SignInUsernameFn<TAuthClient>>

export type SignInUsernameOptions<TAuthClient extends UsernameAuthClient> =
  Omit<
    ReturnType<typeof signInUsernameOptions<TAuthClient>>,
    "mutationKey" | "mutationFn" | "meta"
  >

/**
 * Mutation options factory for username/password sign-in.
 *
 * @param authClient - The Better Auth username client.
 */
export function signInUsernameOptions<TAuthClient extends UsernameAuthClient>(
  authClient: TAuthClient
) {
  return {
    ...authMutationOptions(
      authClient.signIn.username,
      usernameMutationKeys.signIn
    ),
    meta: {
      awaits: [authQueryKeys.session]
    }
  } as MutationOptions<
    AuthMutationFnData<SignInUsernameFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<SignInUsernameFn<TAuthClient>>
  >
}

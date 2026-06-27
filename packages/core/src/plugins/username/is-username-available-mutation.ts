import type { MutationOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import {
  type AuthMutationFnData,
  type AuthMutationFnVariables,
  authMutationOptions
} from "../../lib/auth-mutation-options"
import type { UsernameAuthClient } from "./username-auth-client"
import { usernameMutationKeys } from "./username-mutation-keys"

export type IsUsernameAvailableFn<TAuthClient extends UsernameAuthClient> =
  TAuthClient["isUsernameAvailable"]

export type IsUsernameAvailableParams<TAuthClient extends UsernameAuthClient> =
  AuthMutationFnVariables<IsUsernameAvailableFn<TAuthClient>>

export type IsUsernameAvailableOptions<TAuthClient extends UsernameAuthClient> =
  Omit<
    ReturnType<typeof isUsernameAvailableOptions<TAuthClient>>,
    "mutationKey" | "mutationFn"
  >

/**
 * Mutation options factory for checking username availability.
 *
 * Modeled as a mutation because callers typically trigger the check on
 * user action (debounced input, form submit) rather than on mount.
 *
 * @param authClient - The Better Auth username client.
 */
export function isUsernameAvailableOptions<
  TAuthClient extends UsernameAuthClient
>(authClient: TAuthClient) {
  return authMutationOptions(
    authClient.isUsernameAvailable,
    usernameMutationKeys.isUsernameAvailable
  ) as MutationOptions<
    AuthMutationFnData<IsUsernameAvailableFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<IsUsernameAvailableFn<TAuthClient>>
  >
}

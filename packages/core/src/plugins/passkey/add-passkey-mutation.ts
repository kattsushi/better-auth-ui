import type { MutationOptions } from "@tanstack/query-core"
import type { BetterFetchError } from "better-auth/client"
import {
  type AuthMutationFnData,
  type AuthMutationFnVariables,
  authMutationOptions
} from "../../lib/auth-mutation-options"
import type { PasskeyAuthClient } from "./passkey-auth-client"
import { passkeyMutationKeys } from "./passkey-mutation-keys"
import { passkeyQueryKeys } from "./passkey-query-keys"

export type AddPasskeyFn<TAuthClient extends PasskeyAuthClient> =
  TAuthClient["passkey"]["addPasskey"]

export type AddPasskeyParams<TAuthClient extends PasskeyAuthClient> =
  AuthMutationFnVariables<AddPasskeyFn<TAuthClient>>

export type AddPasskeyOptions<TAuthClient extends PasskeyAuthClient> = Omit<
  ReturnType<typeof addPasskeyOptions<TAuthClient>>,
  "mutationKey" | "mutationFn" | "meta"
>

/**
 * Mutation options factory for registering a new passkey.
 *
 * @param authClient - The Better Auth passkey client.
 * @param userId - The current signed-in user's ID. Used for cache partitioning.
 */
export function addPasskeyOptions<TAuthClient extends PasskeyAuthClient>(
  authClient: TAuthClient,
  userId?: string
) {
  return {
    ...authMutationOptions(
      authClient.passkey.addPasskey,
      passkeyMutationKeys.addPasskey
    ),
    meta: {
      awaits: [passkeyQueryKeys.lists(userId)]
    }
  } as MutationOptions<
    AuthMutationFnData<AddPasskeyFn<TAuthClient>>,
    BetterFetchError,
    AuthMutationFnVariables<AddPasskeyFn<TAuthClient>>
  >
}

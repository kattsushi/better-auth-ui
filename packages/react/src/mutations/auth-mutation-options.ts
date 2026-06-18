import {
  type AuthMutationDefinition,
  type AuthMutationFn,
  type AuthMutationFnData,
  type AuthMutationFnVariables,
  type AuthMutationMeta,
  type AuthMutationOptionsAdapter,
  createAuthMutationDefinition
} from "@better-auth-ui/core"
import {
  type MutationKey,
  mutationOptions,
  type UseMutationOptions
} from "@tanstack/react-query"
import type { BetterFetchError } from "better-auth/client"

export type {
  AuthMutationFn,
  AuthMutationFnData,
  AuthMutationFnVariables,
  AuthMutationMeta
}

/**
 * Return type of {@link authMutationOptions}, matching the shape produced by
 * TanStack Query's own `mutationOptions` helper.
 */
export type AuthMutationOptions<
  TFn extends AuthMutationFn,
  TMutationKey extends MutationKey = MutationKey
> = AuthMutationOptionsAdapter<
  TFn,
  TMutationKey,
  UseMutationOptions<
    AuthMutationFnData<TFn>,
    BetterFetchError,
    AuthMutationFnVariables<TFn>
  >
>

/**
 * Build `mutationOptions` for a write-style Better Auth endpoint.
 *
 * Injects `throw: true` into `fetchOptions` so the promise rejects with a
 * `BetterFetchError` on failure instead of resolving to `{ data, error }`.
 *
 * @param authFn - Better Auth client method (e.g. `authClient.emailOtp.sendVerificationOtp`).
 * @param mutationKey - Stable key for the mutation (used by `useIsMutating`, `MutationCache`, …).
 */
export function adaptAuthMutationDefinition<
  TFn extends AuthMutationFn,
  const TMutationKey extends MutationKey
>(
  definition: AuthMutationDefinition<TFn, TMutationKey>
): AuthMutationOptions<TFn, TMutationKey> {
  return mutationOptions<
    AuthMutationFnData<TFn>,
    BetterFetchError,
    AuthMutationFnVariables<TFn>
  >(definition) as AuthMutationOptions<TFn, TMutationKey>
}

export function authMutationOptions<
  TFn extends AuthMutationFn,
  const TMutationKey extends MutationKey
>(
  authFn: TFn,
  mutationKey: TMutationKey,
  meta?: AuthMutationMeta
): AuthMutationOptions<TFn, TMutationKey> {
  return adaptAuthMutationDefinition(
    createAuthMutationDefinition(authFn, mutationKey, meta)
  )
}

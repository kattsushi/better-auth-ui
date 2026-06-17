import {
  type AuthMutationFn,
  type AuthMutationFnData,
  type AuthMutationFnVariables,
  createAuthMutationDefinition
} from "@better-auth-ui/core"
import {
  type MutationKey,
  mutationOptions,
  type UseMutationOptions
} from "@tanstack/react-query"
import type { BetterFetchError } from "better-auth/client"

export type { AuthMutationFn, AuthMutationFnData, AuthMutationFnVariables }

/**
 * Return type of {@link authMutationOptions}, matching the shape produced by
 * TanStack Query's own `mutationOptions` helper.
 */
export type AuthMutationOptions<
  TFn extends AuthMutationFn,
  TMutationKey extends MutationKey = MutationKey
> = Omit<
  UseMutationOptions<
    AuthMutationFnData<TFn>,
    BetterFetchError,
    AuthMutationFnVariables<TFn>
  >,
  "mutationKey"
> & {
  mutationKey: TMutationKey
}

/**
 * Build `mutationOptions` for a write-style Better Auth endpoint.
 *
 * Injects `throw: true` into `fetchOptions` so the promise rejects with a
 * `BetterFetchError` on failure instead of resolving to `{ data, error }`.
 *
 * @param authFn - Better Auth client method (e.g. `authClient.emailOtp.sendVerificationOtp`).
 * @param mutationKey - Stable key for the mutation (used by `useIsMutating`, `MutationCache`, …).
 */
export function authMutationOptions<
  TFn extends AuthMutationFn,
  const TMutationKey extends MutationKey
>(
  authFn: TFn,
  mutationKey: TMutationKey
): AuthMutationOptions<TFn, TMutationKey> {
  return mutationOptions<
    AuthMutationFnData<TFn>,
    BetterFetchError,
    AuthMutationFnVariables<TFn>
  >(createAuthMutationDefinition(authFn, mutationKey)) as AuthMutationOptions<
    TFn,
    TMutationKey
  >
}

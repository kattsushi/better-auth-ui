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
  type CreateMutationOptions,
  type MutationKey,
  mutationOptions
} from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"

export type {
  AuthMutationFn,
  AuthMutationFnData,
  AuthMutationFnVariables,
  AuthMutationMeta
}

export type AuthMutationOptions<
  TFn extends AuthMutationFn,
  TMutationKey extends MutationKey = MutationKey
> = AuthMutationOptionsAdapter<
  TFn,
  TMutationKey,
  CreateMutationOptions<
    AuthMutationFnData<TFn>,
    BetterFetchError,
    AuthMutationFnVariables<TFn>
  >
>

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

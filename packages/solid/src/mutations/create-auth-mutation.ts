import {
  type AuthMutationFn,
  type AuthMutationFnData,
  type AuthMutationFnVariables,
  type AuthMutationMeta,
  createAuthMutationDefinition,
  type MutationKey
} from "@better-auth-ui/core"
import { adaptAuthMutationDefinition } from "./auth-mutation-options"

export type MutationMethod<TData = unknown> = AuthMutationFn &
  ((params?: AuthMutationFnVariables<AuthMutationFn>) => Promise<TData>)

export type MutationParams<TMethod extends AuthMutationFn> =
  AuthMutationFnVariables<TMethod>
export type MutationData<TMethod extends AuthMutationFn> =
  AuthMutationFnData<TMethod>

export type { AuthMutationMeta }

export function createAuthMutationOptions<
  TMethod extends AuthMutationFn,
  const TMutationKey extends MutationKey
>(authFn: TMethod, mutationKey: TMutationKey, meta?: AuthMutationMeta) {
  return adaptAuthMutationDefinition(
    createAuthMutationDefinition(authFn, mutationKey, meta)
  )
}

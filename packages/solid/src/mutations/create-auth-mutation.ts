import {
  type AuthMutationMeta,
  createAuthMutationDefinition,
  type MutationKey
} from "@better-auth-ui/core"
import { mutationOptions } from "@tanstack/solid-query"
import type { BetterFetchError } from "better-auth/client"

// biome-ignore lint/suspicious/noExplicitAny: Better Auth client methods have intentionally variable generated params.
export type MutationMethod<TData = unknown> = (params?: any) => Promise<TData>

export type MutationParams<TMethod extends MutationMethod> =
  Parameters<TMethod>[0]
export type MutationData<TMethod extends MutationMethod> = Awaited<
  ReturnType<TMethod>
>

export type { AuthMutationMeta }

export function createAuthMutationOptions<
  TMethod extends MutationMethod,
  const TMutationKey extends MutationKey
>(authFn: TMethod, mutationKey: TMutationKey, meta?: AuthMutationMeta) {
  return mutationOptions<
    MutationData<TMethod>,
    BetterFetchError,
    MutationParams<TMethod>
  >(createAuthMutationDefinition(authFn, mutationKey, meta))
}

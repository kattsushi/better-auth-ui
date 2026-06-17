import type { BetterFetchOption } from "better-auth/client"

export type MutationKey = readonly unknown[]
type AuthMutationQueryKey = readonly unknown[]

/**
 * Write-style Better Auth client method. Variables are a single object that
 * may carry top-level params plus `fetchOptions`.
 */
export type AuthMutationFn = (
  // biome-ignore lint/suspicious/noExplicitAny: variance bridge for arbitrary Better Auth client methods
  variables: any
) => Promise<unknown>

export type AuthMutationFnData<TFn extends AuthMutationFn> = Awaited<
  ReturnType<TFn>
>

export type AuthMutationFnVariables<TFn extends AuthMutationFn> =
  Parameters<TFn>[0] extends infer P
    ? undefined extends P
      ? // biome-ignore lint/suspicious/noConfusingVoidType: void allows no-arg mutate
        NonNullable<P> | void
      : P
    : never

export type AuthMutationMeta = {
  invalidates?: Array<AuthMutationQueryKey>
  awaits?: Array<AuthMutationQueryKey>
}

export type AuthMutationDefinition<
  TFn extends AuthMutationFn,
  TMutationKey extends MutationKey = MutationKey
> = {
  mutationKey: TMutationKey
  mutationFn: (
    variables: AuthMutationFnVariables<TFn>
  ) => Promise<AuthMutationFnData<TFn>>
  meta?: AuthMutationMeta
}

export function createAuthMutationDefinition<
  TFn extends AuthMutationFn,
  const TMutationKey extends MutationKey
>(
  authFn: TFn,
  mutationKey: TMutationKey,
  meta?: AuthMutationMeta
): AuthMutationDefinition<TFn, TMutationKey> {
  const mutationFn = (variables: AuthMutationFnVariables<TFn>) => {
    const vars = (variables ?? {}) as { fetchOptions?: BetterFetchOption }

    return authFn({
      ...vars,
      fetchOptions: { ...vars.fetchOptions, throw: true }
    }) as Promise<AuthMutationFnData<TFn>>
  }

  return {
    mutationKey,
    mutationFn,
    ...(meta ? { meta } : {})
  }
}

import type { APIError } from "better-auth"

export type ServerQueryDescriptor<
  TQueryKey extends readonly unknown[],
  TData,
  TError = APIError
> = {
  queryKey: TQueryKey
  queryFn: () => Promise<TData>
  meta?: {
    package: "@better-auth-ui/core"
    runtime: "server"
    name: string
  }
  /** Type-only marker for framework adapters. */
  __error?: TError
}

export function createServerQueryDescriptor<
  const TQueryKey extends readonly unknown[],
  TData,
  TError = APIError
>(input: {
  queryKey: TQueryKey
  queryFn: () => Promise<TData>
  name: string
}): ServerQueryDescriptor<TQueryKey, TData, TError> {
  return {
    queryKey: input.queryKey,
    queryFn: input.queryFn,
    meta: {
      package: "@better-auth-ui/core",
      runtime: "server",
      name: input.name
    }
  }
}

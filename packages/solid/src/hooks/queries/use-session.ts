import {
  type AuthClient,
  type SessionData,
  type SessionOptions,
  type SessionParams,
  sessionOptions
} from "@better-auth-ui/core"
import { createQuery } from "@tanstack/solid-query"

export type UseSessionOptions<TAuthClient extends AuthClient> =
  SessionOptions<TAuthClient> & SessionParams<TAuthClient>

export function useSession<TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options: UseSessionOptions<TAuthClient> = {}
) {
  const { query, fetchOptions, initialData, ...queryOptions } = options
  const baseOptions = sessionOptions(authClient, { query, fetchOptions })

  if (initialData !== undefined) {
    return createQuery(() => ({
      ...baseOptions,
      ...queryOptions,
      initialData: initialData as
        | SessionData<TAuthClient>
        | (() => SessionData<TAuthClient>)
    }))
  }

  return createQuery(() => ({
    ...baseOptions,
    ...queryOptions,
    initialData: undefined
  }))
}

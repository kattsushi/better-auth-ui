import type { Session } from "better-auth/types"
import { type Accessor, createResource } from "solid-js"
import { useAuthContext } from "../../lib/auth-context"

interface CreateSessionOptions {
  initialValue?: Session | null
}

interface CreateSessionReturn {
  session: Accessor<Session | null>
  isLoading: Accessor<boolean>
  error: Accessor<Error | null>
  refetch: () => void
}

/**
 * Hook for fetching the current session.
 *
 * Uses createResource for reactive session fetching.
 *
 * @returns Object with session accessor, loading state, error state, and refetch function
 */
export function createSession(
  options?: CreateSessionOptions
): CreateSessionReturn {
  const { authClient } = useAuthContext()

  const [session, { refetch, mutate }] = createResource(async () => {
    const result = await authClient.getSession()
    return result.data as Session | null
  })

  return {
    session: () => session() ?? null,
    isLoading: () => session.loading,
    error: () => session.error as Error | null,
    refetch
  }
}

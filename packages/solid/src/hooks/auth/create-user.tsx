import type { User } from "better-auth/types"
import { type Accessor, createResource } from "solid-js"
import { useAuthContext } from "../../lib/auth-context"

interface CreateUserOptions {
  initialValue?: User | null
}

interface CreateUserReturn {
  user: Accessor<User | null>
  isLoading: Accessor<boolean>
  error: Accessor<Error | null>
  refetch: () => void
}

/**
 * Hook for fetching the current authenticated user.
 *
 * Uses createResource for reactive user fetching.
 *
 * @returns Object with user accessor, loading state, error state, and refetch function
 */
export function createUser(options?: CreateUserOptions): CreateUserReturn {
  const { authClient } = useAuthContext()

  const [userData, { refetch }] = createResource(async () => {
    const result = await authClient.getSession()
    return result.data?.user ?? null
  })

  return {
    user: () => userData() ?? null,
    isLoading: () => userData.loading,
    error: () => userData.error as Error | null,
    refetch
  }
}

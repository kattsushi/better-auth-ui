import { type Accessor, createSignal } from "solid-js"
import { useAuthContext } from "../../lib/auth-context"

interface SignOutReturn {
  isLoading: Accessor<boolean>
  error: Accessor<Error | null>
  signOut: (options?: {
    fetchOptions?: {
      throw?: boolean
    }
  }) => Promise<void>
}

/**
 * Hook for signing out.
 *
 * @returns Object with isLoading, error signals and signOut function
 */
export function createSignOut(): SignOutReturn {
  const { authClient } = useAuthContext()

  const [isLoading, setIsLoading] = createSignal(false)
  const [error, setError] = createSignal<Error | null>(null)

  const signOut = async (options?: {
    fetchOptions?: {
      throw?: boolean
    }
  }) => {
    setIsLoading(true)
    setError(null)

    try {
      await authClient.signOut({
        fetchOptions: options?.fetchOptions ?? { throw: true }
      })
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e))
      setError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    signOut
  }
}

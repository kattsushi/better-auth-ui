import type { User } from "better-auth/types"
import { type Accessor, createSignal } from "solid-js"
import { useAuthContext } from "../../lib/auth-context"

interface UserSettings {
  name?: string
  image?: string
  email?: string
  emailVerified?: boolean
}

interface CreateUserSettingsReturn {
  user: Accessor<User | null>
  isLoading: Accessor<boolean>
  error: Accessor<Error | null>
  updateUser: (data: Partial<UserSettings>) => Promise<void>
  refetch: () => void
}

/**
 * Hook for managing user settings.
 *
 * Provides access to user data and update functionality.
 *
 * @returns Object with user accessor, loading state, error state, updateUser function, and refetch
 */
export function createUserSettings(): CreateUserSettingsReturn {
  const { authClient } = useAuthContext()

  const [user, setUser] = createSignal<User | null>(null)
  const [isLoading, setIsLoading] = createSignal(false)
  const [error, setError] = createSignal<Error | null>(null)

  const updateUser = async (data: Partial<UserSettings>) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authClient.updateUser({
        ...data,
        fetchOptions: { throw: true }
      })
      setUser(result.data.user as User | null)
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e))
      setError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const refetch = async () => {
    setIsLoading(true)
    try {
      const result = await authClient.getSession()
      setUser(result.data?.user ?? null)
    } catch (e) {
      setError(e as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    isLoading,
    error,
    updateUser,
    refetch
  }
}

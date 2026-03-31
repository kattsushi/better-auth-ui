import { type Accessor, createSignal } from "solid-js"
import { useAuthContext } from "../../lib/auth-context"

interface ChangePasswordOptions {
  newPassword: string
  currentPassword?: string
  fetchOptions?: {
    throw?: boolean
  }
}

interface CreatePasswordReturn {
  isLoading: Accessor<boolean>
  error: Accessor<Error | null>
  changePassword: (options: ChangePasswordOptions) => Promise<void>
}

/**
 * Hook for changing user password.
 *
 * @returns Object with isLoading, error signals and changePassword function
 */
export function createPassword(): CreatePasswordReturn {
  const { authClient } = useAuthContext()

  const [isLoading, setIsLoading] = createSignal(false)
  const [error, setError] = createSignal<Error | null>(null)

  const changePassword = async (options: ChangePasswordOptions) => {
    setIsLoading(true)
    setError(null)

    try {
      await authClient.changePassword({
        newPassword: options.newPassword,
        currentPassword: options.currentPassword,
        fetchOptions: options.fetchOptions ?? { throw: true }
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
    changePassword
  }
}

import { type Accessor, createSignal } from "solid-js"
import { useAuthContext } from "../../lib/auth-context"

interface TwoFactorOptions {
  code: string
  fetchOptions?: {
    throw?: boolean
  }
}

interface CreateTwoFactorReturn {
  isLoading: Accessor<boolean>
  error: Accessor<Error | null>
  enable: (options: TwoFactorOptions) => Promise<void>
  disable: (options: TwoFactorOptions) => Promise<void>
}

/**
 * Hook for managing two-factor authentication.
 *
 * @returns Object with isLoading, error signals and enable/disable functions
 */
export function createTwoFactor(): CreateTwoFactorReturn {
  const { authClient } = useAuthContext()

  const [isLoading, setIsLoading] = createSignal(false)
  const [error, setError] = createSignal<Error | null>(null)

  const enable = async (options: TwoFactorOptions) => {
    setIsLoading(true)
    setError(null)

    try {
      await authClient.mfa.enable({
        code: options.code,
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

  const disable = async (options: TwoFactorOptions) => {
    setIsLoading(true)
    setError(null)

    try {
      await authClient.mfa.disable({
        code: options.code,
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
    enable,
    disable
  }
}

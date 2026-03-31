import { type Accessor, createSignal } from "solid-js"
import { useAuthContext } from "../../lib/auth-context"

interface SignInSocialOptions {
  provider: string
  callbackURL?: string
  fetchOptions?: {
    throw?: boolean
  }
}

interface SignInSocialReturn {
  isLoading: Accessor<boolean>
  error: Accessor<Error | null>
  signInSocial: (options: SignInSocialOptions) => Promise<void>
}

/**
 * Hook for OAuth/social sign-in.
 *
 * Initiates OAuth flow by redirecting to the provider.
 *
 * @returns Object with isLoading, error signals and signInSocial function
 */
export function createSignInSocial(): SignInSocialReturn {
  const { authClient } = useAuthContext()

  const [isLoading, setIsLoading] = createSignal(false)
  const [error, setError] = createSignal<Error | null>(null)

  const signInSocial = async (options: SignInSocialOptions) => {
    setIsLoading(true)
    setError(null)

    try {
      await authClient.signIn.social({
        provider: options.provider,
        callbackURL: options.callbackURL,
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
    signInSocial
  }
}

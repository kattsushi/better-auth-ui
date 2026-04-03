import { type Accessor, createSignal } from "solid-js"
import { useAuthContext } from "../../lib/auth-context"

interface SignInEmailOptions {
  email: string
  password: string
  callbackURL?: string
  fetchOptions?: {
    throw?: boolean
  }
}

interface SignInEmailReturn {
  isLoading: Accessor<boolean>
  error: Accessor<Error | null>
  signInEmail: (options: SignInEmailOptions) => Promise<void>
}

/**
 * Hook for email/password sign-in.
 *
 * @returns Object with isLoading, error signals and signInEmail function
 */
export function createSignInEmail(): SignInEmailReturn {
  const { authClient, loadSession } = useAuthContext()

  const [isLoading, setIsLoading] = createSignal(false)
  const [error, setError] = createSignal<Error | null>(null)

  const signInEmail = async (options: SignInEmailOptions) => {
    setIsLoading(true)
    setError(null)

    try {
      await authClient.signIn.email({
        email: options.email,
        password: options.password,
        callbackURL: options.callbackURL,
        fetchOptions: options.fetchOptions ?? { throw: true }
      })

      // Reload session after successful sign-in
      await loadSession()

      // Client-side redirect to callbackURL
      const redirectTo = options.callbackURL ?? "/dashboard"
      if (typeof window !== "undefined") {
        window.location.href = redirectTo
      }
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
    signInEmail
  }
}

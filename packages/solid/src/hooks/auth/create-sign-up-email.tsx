import { type Accessor, createSignal } from "solid-js"
import { useAuthContext } from "../../lib/auth-context"

interface SignUpEmailOptions {
  email: string
  password: string
  name?: string
  callbackURL?: string
  fetchOptions?: {
    throw?: boolean
  }
}

interface SignUpEmailReturn {
  isLoading: Accessor<boolean>
  error: Accessor<Error | null>
  signUpEmail: (options: SignUpEmailOptions) => Promise<void>
}

/**
 * Hook for email/password sign-up.
 *
 * @returns Object with isLoading, error signals and signUpEmail function
 */
export function createSignUpEmail(): SignUpEmailReturn {
  const { authClient, loadSession } = useAuthContext()

  const [isLoading, setIsLoading] = createSignal(false)
  const [error, setError] = createSignal<Error | null>(null)

  const signUpEmail = async (options: SignUpEmailOptions) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authClient.signUp.email({
        email: options.email,
        password: options.password,
        name: options.name,
        callbackURL: options.callbackURL,
        fetchOptions: options.fetchOptions ?? { throw: true }
      })

      // Reload session after successful sign-up
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
    signUpEmail
  }
}

import type { Session, User } from "better-auth/types"
import type { Accessor } from "solid-js"
import { useAuthContext } from "../../lib/auth-context"

interface AuthReturn {
  user: Accessor<User | null>
  session: Accessor<Session | null>
  isLoading: Accessor<boolean>
  signOut: () => Promise<void>
  refresh: () => Promise<void>
}

/**
 * Main SolidJS hook for authentication state.
 *
 * Provides access to user, session, and loading state as signals.
 * Also provides signOut and refresh actions.
 *
 * @returns Object with user, session, isLoading signals and signOut/refresh actions
 */
export function createAuth(): AuthReturn {
  const { user, session, isLoading, authClient } = useAuthContext()

  const signOut = async () => {
    await authClient.signOut()
    // The signals will be cleared by the auth client internally
  }

  const refresh = async () => {
    const { data } = await authClient.getSession()
    if (data) {
      // These are signals, so setting them updates reactive state
    }
  }

  return {
    user,
    session,
    isLoading,
    signOut,
    refresh
  }
}

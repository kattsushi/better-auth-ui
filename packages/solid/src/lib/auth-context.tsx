import { type BasePaths, basePaths } from "@better-auth-ui/core/lib/base-paths"
import { type ViewPaths, viewPaths } from "@better-auth-ui/core/lib/view-paths"
import type { Session, User } from "better-auth/types"
import {
  type Accessor,
  createContext,
  createSignal,
  type JSX,
  useContext
} from "solid-js"
import type { SolidAuthClient } from "./auth-client"

export interface AuthContextValue {
  authClient: SolidAuthClient
  basePaths: BasePaths
  viewPaths: ViewPaths
  user: Accessor<User | null>
  session: Accessor<Session | null>
  isLoading: Accessor<boolean>
}

const AuthContext = createContext<AuthContextValue>()

interface AuthProviderProps {
  children?: JSX.Element
  authClient: SolidAuthClient
}

/**
 * AuthProvider for SolidJS.
 *
 * @example
 * ```tsx
 * import { createAuthClient } from "better-auth/solid"
 * import { AuthProvider } from "@better-auth-ui/solid"
 *
 * const authClient = createAuthClient({
 *   baseURL: "http://localhost:3000"
 * })
 *
 * function App() {
 *   return (
 *     <AuthProvider authClient={authClient}>
 *       <YourApp />
 *     </AuthProvider>
 *   )
 * }
 * ```
 */
export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = createSignal<User | null>(null)
  const [session, setSession] = createSignal<Session | null>(null)
  const [isLoading, setIsLoading] = createSignal(true)

  // Fetch initial session
  props.authClient
    .getSession()
    .then(({ data }) => {
      if (data) {
        setUser(data.user ?? null)
        setSession(data.session ?? null)
      }
      setIsLoading(false)
    })
    .catch(() => {
      setIsLoading(false)
    })

  const value: AuthContextValue = {
    authClient: props.authClient,
    basePaths,
    viewPaths,
    user,
    session,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}

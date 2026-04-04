import type { BasePaths } from "@better-auth-ui/core/lib/base-paths"
import { basePaths as defaultBasePaths } from "@better-auth-ui/core/lib/base-paths"
import type { ViewPaths } from "@better-auth-ui/core/lib/view-paths"
import { viewPaths as defaultViewPaths } from "@better-auth-ui/core/lib/view-paths"
import type { Session, User } from "better-auth/types"
import { type Accessor, createSignal, type JSX, onMount } from "solid-js"
import type { SolidAuthClient } from "./auth-client"

// Simple localization - can be extended later
interface Localization {
  auth: {
    signIn: string
    signUp: string
    signOut: string
    email: string
    password: string
    name: string
    emailPlaceholder: string
    passwordPlaceholder: string
    namePlaceholder: string
    forgotPasswordLink: string
    needToCreateAnAccount: string
    alreadyHaveAnAccount: string
    or: string
    verifyYourEmail: string
    verificationEmailSent: string
    passwordsDoNotMatch: string
  }
  settings: {
    account: string
    security: string
    profile: string
    appearance: string
    theme: string
    system: string
    light: string
    dark: string
    saveChanges: string
  }
}

const defaultLocalization: Localization = {
  auth: {
    signIn: "Sign In",
    signUp: "Sign Up",
    signOut: "Sign Out",
    email: "Email",
    password: "Password",
    name: "Name",
    emailPlaceholder: "email@example.com",
    passwordPlaceholder: "Enter your password",
    namePlaceholder: "Your name",
    forgotPasswordLink: "Forgot password?",
    needToCreateAnAccount: "Don't have an account?",
    alreadyHaveAnAccount: "Already have an account?",
    or: "or",
    verifyYourEmail: "Please verify your email",
    verificationEmailSent: "Verification email sent",
    passwordsDoNotMatch: "Passwords do not match"
  },
  settings: {
    account: "Account",
    security: "Security",
    profile: "Profile",
    appearance: "Appearance",
    theme: "Theme",
    system: "System",
    light: "Light",
    dark: "Dark",
    saveChanges: "Save changes"
  }
}

export interface AuthContextValue {
  authClient: SolidAuthClient
  basePaths: BasePaths
  viewPaths: ViewPaths
  user: Accessor<User | null>
  session: Accessor<Session | null>
  isLoading: Accessor<boolean>
  /** Call this after hydration to load the session */
  loadSession: () => void | Promise<void>
  /** Navigate to a path */
  navigate?: (opts: { to: string }) => void
  /** List of configured social providers */
  socialProviders?: { id: string; name: string }[]
  /** Email and password authentication configuration */
  emailAndPassword?: {
    enabled: boolean
    forgotPassword?: boolean
    requireEmailVerification?: boolean
    minPasswordLength?: number
    maxPasswordLength?: number
    confirmPassword?: boolean
    rememberMe?: boolean
  }
  /** Whether magic link authentication is enabled */
  magicLink?: boolean
  /** Localization strings for UI */
  localization: Localization
  /** Link component for navigation */
  Link?: (props: {
    href: string
    children?: JSX.Element
    [key: string]: any
  }) => JSX.Element
  /** Default redirect path after authentication */
  redirectTo: string
}

const STORE_KEY = Symbol.for("@better-auth-ui/solid/store")

interface GlobalAuthStore {
  value: AuthContextValue | null
  userSignal: ReturnType<typeof createSignal<User | null>>
  sessionSignal: ReturnType<typeof createSignal<Session | null>>
  loadingSignal: ReturnType<typeof createSignal<boolean>>
  client: SolidAuthClient | null
  clientFactory: (() => SolidAuthClient) | null
}

function getStore(): GlobalAuthStore {
  const g = globalThis as any
  if (!g[STORE_KEY]) {
    g[STORE_KEY] = {
      value: null,
      userSignal: createSignal<User | null>(null),
      sessionSignal: createSignal<Session | null>(null),
      loadingSignal: createSignal(true),
      client: null,
      clientFactory: null
    } as GlobalAuthStore
  }
  return g[STORE_KEY]
}

/**
 * Set a factory function to create the auth client lazily.
 * This is useful for SSR where the client can't be created at module load time.
 */
export function setAuthClientFactory(factory: () => SolidAuthClient) {
  const store = getStore()
  store.clientFactory = factory
}

interface AuthProviderProps {
  children?: JSX.Element
  authClient: SolidAuthClient
  /** Optional navigate function for redirecting after auth actions */
  navigate?: (opts: { to: string }) => void
}

export function AuthProvider(props: AuthProviderProps) {
  const store = getStore()
  const [user, setUser] = store.userSignal
  const [session, setSession] = store.sessionSignal
  const [isLoading, setIsLoading] = store.loadingSignal

  store.client = props.authClient

  const loadSession = () => {
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
  }

  // Load session after hydration (onMount only runs on client)
  onMount(() => {
    loadSession()
  })

  store.value = {
    authClient: props.authClient,
    basePaths: defaultBasePaths,
    viewPaths: defaultViewPaths,
    user,
    session,
    isLoading,
    loadSession,
    navigate: props.navigate,
    socialProviders: [],
    emailAndPassword: { enabled: true },
    magicLink: false,
    localization: defaultLocalization,
    redirectTo: "/dashboard"
  }

  return <>{props.children}</>
}

export function useAuthContext(): AuthContextValue {
  const store = getStore()

  // Try to use clientFactory if available (for SSR/lazy init)
  if (store.clientFactory && !store.client) {
    store.client = store.clientFactory()
  }

  // If no provider has set the value yet, build one from the client
  if (!store.value && store.client) {
    return {
      authClient: store.client,
      basePaths: defaultBasePaths,
      viewPaths: defaultViewPaths,
      user: store.userSignal[0],
      session: store.sessionSignal[0],
      isLoading: store.loadingSignal[0],
      loadSession: () => {},
      navigate: undefined,
      socialProviders: [],
      emailAndPassword: {
        enabled: true,
        forgotPassword: true,
        confirmPassword: true
      },
      magicLink: true,
      localization: defaultLocalization,
      redirectTo: "/dashboard"
    }
  }

  return store.value!
}

import { createAuthClient as createBetterAuthClient } from "better-auth/solid"

// Tipo base para el auth client
export interface SolidAuthClient {
  getSession: () => Promise<{
    data: {
      user: {
        id: string
        email: string
        name: string
        image: string | null
        emailVerified: boolean
        createdAt: Date
        updatedAt: Date
      } | null
      session: {
        id: string
        userId: string
        expiresAt: Date
        token: string
        createdAt: Date
        updatedAt: Date
        ipAddress: string | null
        userAgent: string | null
      } | null
    } | null
  }>
  signIn: {
    email: (options: {
      email: string
      password: string
      callbackURL?: string
      fetchOptions?: { throw?: boolean }
    }) => Promise<{ data: { user: unknown; session: unknown } }>
    social: (options: {
      provider: string
      callbackURL?: string
      fetchOptions?: { throw?: boolean }
    }) => Promise<void>
    magicLink: (options: {
      email: string
      callbackURL?: string
      fetchOptions?: { throw?: boolean }
    }) => Promise<void>
  }
  signUp: {
    email: (options: {
      email: string
      password: string
      name?: string
      callbackURL?: string
      fetchOptions?: { throw?: boolean }
    }) => Promise<{ data: { user: unknown; session: unknown } }>
  }
  signOut: (options?: { fetchOptions?: { throw?: boolean } }) => Promise<void>
  updateUser: (options: {
    name?: string
    image?: string
    fetchOptions?: { throw?: boolean }
  }) => Promise<{ data: { user: unknown } }>
  changePassword: (options: {
    newPassword: string
    currentPassword?: string
    fetchOptions?: { throw?: boolean }
  }) => Promise<void>
  mfa: {
    enable: (options: {
      code: string
      fetchOptions?: { throw?: boolean }
    }) => Promise<void>
    disable: (options: {
      code: string
      fetchOptions?: { throw?: boolean }
    }) => Promise<void>
  }
}

/**
 * Factory function para crear un auth client real de better-auth/solid.
 *
 * Si se pasa `authClient` en las props del AuthProvider, ese se usa directamente.
 * Esta factory solo se invoca como fallback cuando no se provee un client externo.
 *
 * @example
 * ```tsx
 * // Opción 1: Pasar client directamente (recomendado)
 * import { createAuthClient } from "better-auth/solid"
 * const authClient = createAuthClient()
 * <AuthProvider authClient={authClient} />
 *
 * // Opción 2: Usar factory (fallback)
 * <AuthProvider baseURL="http://localhost:3000" />
 * ```
 */
export function createAuthClientFactory(config?: {
  baseURL?: string
  basePath?: string
  authURL?: string
}): SolidAuthClient {
  console.log("DEBUG: createAuthClientFactory called", config)
  const client = createBetterAuthClient({
    baseURL: config?.baseURL,
    basePath: config?.basePath,
    authURL: config?.authURL
  }) as unknown as SolidAuthClient

  // Wrap signUp.email to add logging
  const originalSignUpEmail = client.signUp.email
  client.signUp.email = async (options) => {
    console.log("DEBUG: client.signUp.email called with", options)
    try {
      const result = await originalSignUpEmail(options)
      console.log("DEBUG: client.signUp.email success", result)
      return result
    } catch (e) {
      console.error("DEBUG: client.signUp.email error", e)
      throw e
    }
  }

  return client
}

// Alias para compatibilidad
export type AuthClient = SolidAuthClient

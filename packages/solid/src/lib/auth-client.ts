// Tipo base para el auth client - se usará sin el import de better-auth/solid
// porque mejor-auth puede no estar instalado en tiempo de desarrollo
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

// Factory function para crear el auth client
export function createAuthClientFactory(config?: {
  baseURL?: string
  basePath?: string
  authURL?: string
}): SolidAuthClient {
  // En desarrollo, devolvemos un mock
  // En producción, usarías: import { createAuthClient } from "better-auth/solid"
  return {
    getSession: async () => ({ data: null }),
    signIn: {
      email: async () => ({ data: { user: null, session: null } }),
      social: async () => {},
      magicLink: async () => {}
    },
    signUp: {
      email: async () => ({ data: { user: null, session: null } })
    },
    signOut: async () => {},
    updateUser: async () => ({ data: { user: null } }),
    changePassword: async () => {},
    mfa: {
      enable: async () => {},
      disable: async () => {}
    }
  }
}

// Alias para compatibilidad
export type AuthClient = SolidAuthClient

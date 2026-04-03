import { multiSessionClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/solid"
import type { SolidAuthClient } from "@better-auth-ui/solid"

/**
 * Lazy auth client for SolidJS + TanStack Start.
 * 
 * createAuthClient tries to access window.location.origin on init,
 * which fails during SSR. This getter creates the client only on the client.
 */
let authClientInstance: SolidAuthClient | null = null

export function getAuthClient(): SolidAuthClient {
  if (!authClientInstance) {
    authClientInstance = createAuthClient({
      baseURL: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
      plugins: [multiSessionClient()]
    }) as unknown as SolidAuthClient
  }
  return authClientInstance
}

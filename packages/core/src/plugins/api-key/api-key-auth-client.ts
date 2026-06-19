import type { apiKeyClient } from "@better-auth/api-key/client"
import type { createAuthClient } from "better-auth/client"
import type { OmitUseKeys } from "../../lib/auth-client"

export type ApiKeyAuthClient = OmitUseKeys<
  ReturnType<
    typeof createAuthClient<{ plugins: [ReturnType<typeof apiKeyClient>] }>
  >
>

import type { passkeyClient } from "@better-auth/passkey/client"
import type { createAuthClient } from "better-auth/client"
import type { OmitUseKeys } from "../../lib/auth-client"

export type PasskeyAuthClient = OmitUseKeys<
  ReturnType<
    typeof createAuthClient<{ plugins: [ReturnType<typeof passkeyClient>] }>
  >
>

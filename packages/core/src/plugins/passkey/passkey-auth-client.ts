import type { passkeyClient } from "@better-auth/passkey/client"
import type { InferClientAPI } from "better-auth/client"

export type PasskeyAuthClient = InferClientAPI<{
  plugins: [ReturnType<typeof passkeyClient>]
}>

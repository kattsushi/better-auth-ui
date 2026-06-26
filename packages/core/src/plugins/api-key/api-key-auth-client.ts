import type { apiKeyClient } from "@better-auth/api-key/client"
import type { InferClientAPI } from "better-auth/client"

export type ApiKeyAuthClient = InferClientAPI<{
  plugins: [ReturnType<typeof apiKeyClient>]
}>

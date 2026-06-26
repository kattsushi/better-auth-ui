import type { InferClientAPI } from "better-auth/client"
import type { magicLinkClient } from "better-auth/client/plugins"

export type MagicLinkAuthClient = InferClientAPI<{
  plugins: [ReturnType<typeof magicLinkClient>]
}>

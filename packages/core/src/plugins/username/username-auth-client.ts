import type { InferClientAPI } from "better-auth/client"
import type { usernameClient } from "better-auth/client/plugins"

export type UsernameAuthClient = InferClientAPI<{
  plugins: [ReturnType<typeof usernameClient>]
}>

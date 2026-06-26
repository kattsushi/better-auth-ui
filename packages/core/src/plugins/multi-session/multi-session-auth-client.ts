import type { InferClientAPI } from "better-auth/client"
import type { multiSessionClient } from "better-auth/client/plugins"

export type MultiSessionAuthClient = InferClientAPI<{
  plugins: [ReturnType<typeof multiSessionClient>]
}>

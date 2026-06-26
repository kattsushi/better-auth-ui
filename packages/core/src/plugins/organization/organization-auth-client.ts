import type { InferClientAPI } from "better-auth/client"
import type { organizationClient } from "better-auth/client/plugins"

export type OrganizationAuthClient = InferClientAPI<{
  plugins: [ReturnType<typeof organizationClient<object>>]
}>

import type { Auth } from "better-auth"
import type {
  magicLink,
  multiSession,
  organization,
  username
} from "better-auth/plugins"

export type AuthServer = Pick<Auth, "api">

export type MagicLinkAuthServer = Pick<
  Auth<{ plugins: [ReturnType<typeof magicLink>] }>,
  "api"
>

export type MultiSessionAuthServer = Pick<
  Auth<{ plugins: [ReturnType<typeof multiSession>] }>,
  "api"
>

export type UsernameAuthServer = Pick<
  Auth<{ plugins: [ReturnType<typeof username>] }>,
  "api"
>

export type OrganizationAuthServer = Pick<
  Auth<{ plugins: [ReturnType<typeof organization>] }>,
  "api"
>

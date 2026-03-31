import { createAuth } from "@better-auth-ui/solid"

import { ForgotPassword } from "./forgot-password"
import { MagicLink } from "./magic-link"
import type { SocialLayout } from "./provider-buttons"
import { ResetPassword } from "./reset-password"
import { SignIn } from "./sign-in"
import { SignOut } from "./sign-out"
import { SignUp } from "./sign-up"

export type AuthView =
  | "signIn"
  | "signUp"
  | "magicLink"
  | "forgotPassword"
  | "resetPassword"
  | "signOut"

export type AuthProps = {
  className?: string
  path?: string
  socialLayout?: SocialLayout
  socialPosition?: "top" | "bottom"
  view?: AuthView
}

/**
 * Render the selected authentication view component.
 *
 * The view is determined by the explicit `view` prop or, if absent, resolved from `path` using the application's auth view paths.
 *
 * @param path - Route path used to resolve an auth view when `view` is not provided
 * @param socialLayout - Social layout to apply to the component
 * @param socialPosition - Social position to apply to the component
 * @param view - Explicit auth view to render (e.g., "signIn", "signUp")
 * @returns The rendered authentication view element
 * @throws Error if neither `view` nor `path` is provided
 * @throws Error if the resolved view is not a valid auth view
 */
export function Auth(props: AuthProps) {
  const auth = createAuth()

  const viewPaths = {
    auth: {
      signIn: "sign-in",
      signUp: "sign-up",
      forgotPassword: "forgot-password",
      resetPassword: "reset-password",
      magicLink: "magic-link",
      signOut: "sign-out"
    }
  }

  if (!props.view && !props.path) {
    throw new Error("[Better Auth UI] Either `view` or `path` must be provided")
  }

  const currentView = props.view

  switch (currentView) {
    case "signIn":
      return (
        <SignIn
          className={props.className}
          socialLayout={props.socialLayout}
          socialPosition={props.socialPosition}
        />
      )
    case "signUp":
      return (
        <SignUp
          className={props.className}
          socialLayout={props.socialLayout}
          socialPosition={props.socialPosition}
        />
      )
    case "magicLink":
      return (
        <MagicLink
          className={props.className}
          socialLayout={props.socialLayout}
          socialPosition={props.socialPosition}
        />
      )
    case "forgotPassword":
      return <ForgotPassword className={props.className} />
    case "resetPassword":
      return <ResetPassword className={props.className} />
    case "signOut":
      return <SignOut className={props.className} />
    default:
      throw new Error(
        `[Better Auth UI] Valid views are: ${Object.keys(viewPaths.auth).join(", ")}`
      )
  }
}

export { AuthProvider } from "./auth-provider"
export { ForgotPassword } from "./forgot-password"
export { MagicLink } from "./magic-link"
export { MagicLinkButton } from "./magic-link-button"
export type { SocialLayout } from "./provider-buttons"
export { ProviderButtons } from "./provider-buttons"
export { ResetPassword } from "./reset-password"
export { SignIn } from "./sign-in"
export { SignOut } from "./sign-out"
export { SignUp } from "./sign-up"

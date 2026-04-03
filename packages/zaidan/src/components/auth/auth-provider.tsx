import type { SolidAuthClient } from "@better-auth-ui/solid"
import {
  AuthProvider as AuthProviderPrimitive,
  createAuthClientFactory
} from "@better-auth-ui/solid"
import type { Component, JSX } from "solid-js"

interface ZaidanAuthProviderProps {
  children: JSX.Element
  /** Pass a pre-built auth client directly (recommended). If omitted, one is created from baseURL/basePath/authURL. */
  authClient?: SolidAuthClient
  baseURL?: string
  basePath?: string
  authURL?: string
  /** Where to redirect after sign-in/sign-up */
  redirectTo?: string
  /** Navigation function from the router (e.g. useNavigate()) */
  navigate?: (opts: { to: string }) => void
  /** Link component wrapper for router-aware links */
  Link?: Component<{ href: string; children?: any; [key: string]: any }>
}

export function AuthProvider(props: ZaidanAuthProviderProps) {
  const authClient =
    props.authClient ??
    createAuthClientFactory({
      baseURL: props.baseURL,
      basePath: props.basePath,
      authURL: props.authURL
    })

  return (
    <AuthProviderPrimitive authClient={authClient} navigate={props.navigate}>
      {props.children}
    </AuthProviderPrimitive>
  )
}

export type { ZaidanAuthProviderProps as AuthProviderProps }

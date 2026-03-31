import { AuthProvider as AuthProviderPrimitive } from "@better-auth-ui/solid"
import type { ParentComponent } from "solid-js"

interface ZaidanAuthProviderProps {
  children: ParentComponent
  baseURL?: string
  basePath?: string
  authURL?: string
}

export function AuthProvider(props: ZaidanAuthProviderProps) {
  return (
    <AuthProviderPrimitive
      baseURL={props.baseURL}
      basePath={props.basePath}
      authURL={props.authURL}
    >
      {props.children}
    </AuthProviderPrimitive>
  )
}

export type { ZaidanAuthProviderProps as AuthProviderProps }

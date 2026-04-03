import { AuthProvider } from "@better-auth-ui/zaidan"
import { Link, useNavigate } from "@tanstack/solid-router"
import type { JSX } from "solid-js"
import { getAuthClient } from "@/lib/auth-client"

export function Providers({ children }: { children: JSX.Element }) {
  const navigate = useNavigate()
  
  return (
    <AuthProvider
      authClient={getAuthClient()}
      baseURL={typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}
      redirectTo="/dashboard"
      navigate={navigate}
      Link={({ href, ...props }: { href: string; [key: string]: any }) => <Link to={href} {...props} />}
    >
      {children}
    </AuthProvider>
  )
}

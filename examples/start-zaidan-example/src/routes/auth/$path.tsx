import { Auth } from "@better-auth-ui/zaidan"
import { createFileRoute, redirect } from "@tanstack/solid-router"

const validAuthPaths = [
  "sign-in",
  "sign-up",
  "magic-link",
  "forgot-password",
  "reset-password",
  "sign-out",
]

export const Route = createFileRoute("/auth/$path")({
  beforeLoad({ params: { path } }) {
    if (!validAuthPaths.includes(path)) {
      throw redirect({ to: "/" })
    }
  },
  component: AuthPage,
})

function AuthPage() {
  const params = Route.useParams()

  return (
    <div class="grow flex items-center justify-center p-4 md:p-6">
      <Auth path={params().path} />
    </div>
  )
}

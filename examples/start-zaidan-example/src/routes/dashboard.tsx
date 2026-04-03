import { Spinner, UserButton } from "@better-auth-ui/zaidan"
import { useAuthContext } from "@better-auth-ui/solid"
import { createFileRoute } from "@tanstack/solid-router"
import { Show } from "solid-js"

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
})

function Dashboard() {
  const { user, isLoading } = useAuthContext()

  return (
    <div class="min-h-svh flex flex-col items-center justify-center gap-4">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <p class="text-muted-foreground">
        Welcome{user()?.name ? `, ${user()?.name}` : ""}!
      </p>
      <Show when={!isLoading()} fallback={<Spinner />}>
        <UserButton />
      </Show>
    </div>
  )
}

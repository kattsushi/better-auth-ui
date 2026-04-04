import { Settings } from "@better-auth-ui/zaidan"
import { createAuth } from "@better-auth-ui/solid"
import { createFileRoute, redirect } from "@tanstack/solid-router"
import { Show } from "solid-js"

const validSettingsPaths = ["account", "security"]

export const Route = createFileRoute("/settings/$path")({
  beforeLoad({ params: { path } }) {
    if (!validSettingsPaths.includes(path)) {
      throw redirect({ to: "/" })
    }
  },
  component: SettingsPage,
})

function SettingsPage() {
  const { user, isLoading } = createAuth()
  const params = Route.useParams()

  return (
    <div class="w-full max-w-6xl mx-auto p-4 md:p-6">
      <Show when={!isLoading() && user()}>
        <Settings path={params().path} />
      </Show>
    </div>
  )
}

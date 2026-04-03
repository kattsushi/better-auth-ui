import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/settings/")({
  component: SettingsIndex,
})

function SettingsIndex() {
  // Redirect to /settings/account
  if (typeof window !== "undefined") {
    window.location.href = "/settings/account"
  }
  return null
}

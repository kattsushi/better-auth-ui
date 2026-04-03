import { createFileRoute } from "@tanstack/solid-router"
import { UserButton } from "@better-auth-ui/zaidan"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
    <div class="min-h-screen flex items-center justify-center flex-col gap-4">
      <UserButton />
    </div>
  )
}

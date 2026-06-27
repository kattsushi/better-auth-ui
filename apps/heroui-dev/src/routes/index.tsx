import { UserButton } from "@better-auth-ui/heroui"
import { useSession } from "@better-auth-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { authClient } from "../lib/auth-client"

export const Route = createFileRoute("/")({ component: App })

function App() {
  const { data: session } = useSession(authClient)

  session?.user

  return (
    <div className="grow flex items-center justify-center flex-col gap-4">
      <UserButton />
    </div>
  )
}

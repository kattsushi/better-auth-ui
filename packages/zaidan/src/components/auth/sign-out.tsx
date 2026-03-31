import { createSignOut } from "@better-auth-ui/solid"
import { onMount } from "solid-js"

import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

export type SignOutProps = {
  className?: string
}

/**
 * Signs the current user out on mount and renders a centered loading card while the operation completes.
 *
 * @param className - Optional additional class names appended to the root Card
 * @returns The loading Card element shown during sign-out
 */
export function SignOut(props: SignOutProps) {
  const { signOut, isLoading } = createSignOut()

  onMount(() => {
    signOut()
  })

  return (
    <Card
      class={cn("w-full max-w-sm bg-transparent border-none", props.className)}
    >
      <CardContent class="flex items-center justify-center">
        <Spinner class="mx-auto my-auto" />
      </CardContent>
    </Card>
  )
}

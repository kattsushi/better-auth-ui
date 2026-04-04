import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type ActiveSessionsProps = {
  className?: string
}

/**
 * Render a card listing all active sessions for the current user with revoke controls.
 *
 * Shows each session's browser, OS, IP address, and creation time. The current session is marked
 * and navigates to sign-out on click, while other sessions can be revoked individually.
 *
 * @returns A JSX element containing the sessions card
 */
export function ActiveSessions(props: ActiveSessionsProps) {
  // TODO: Replace with createListSessions and createRevokeSession hooks
  // TODO: Get current session from auth context
  const sessions: any[] = []
  const currentSessionToken: string | null = null

  return (
    <Card class={`w-full py-4 md:py-6 gap-4 ${props.className || ""}`}>
      <CardHeader class="px-4 md:px-6 gap-0">
        <CardTitle class="text-xl">Active sessions</CardTitle>
      </CardHeader>

      <CardContent class="px-4 md:px-6 grid gap-3">
        <p class="text-sm text-muted-foreground">
          Coming soon — Session management is under development.
        </p>

        {/* TODO: Render ActiveSession components when hooks are available */}
        {/*
        <For each={sessions?.toSorted((session) => session.id === currentSessionToken ? -1 : 1)}>
          {(session) => <ActiveSession session={session} />}
        </For>
        */}
      </CardContent>
    </Card>
  )
}

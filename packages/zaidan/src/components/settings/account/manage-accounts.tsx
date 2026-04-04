import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export type ManageAccountsProps = {
  className?: string
}

/**
 * Render a card that lists and manages all device sessions for the current user.
 *
 * Shows each session with user information and actions to switch to or revoke a session.
 * When device session data is loading, a pending placeholder row is displayed.
 *
 * @returns A JSX element containing the accounts management card
 */
export function ManageAccounts(props: ManageAccountsProps) {
  // TODO: Implement with createListDeviceSessions hook from @better-auth-ui/solid
  // Currently a stub that shows coming soon
  return (
    <Card class={`w-full py-4 md:py-6 gap-4 ${props.className || ""}`}>
      <CardHeader class="px-4 md:px-6 gap-0">
        <CardTitle class="text-xl">Manage Accounts</CardTitle>
      </CardHeader>

      <CardContent class="px-4 md:px-6 grid gap-3">
        <p class="text-sm text-muted-foreground">
          Coming soon — Multi-session account management is under development.
        </p>
      </CardContent>

      <CardFooter class="px-4 md:px-6">
        <Button variant="secondary" disabled>
          Add account
        </Button>
      </CardFooter>
    </Card>
  )
}

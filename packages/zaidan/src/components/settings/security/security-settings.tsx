import { Show } from "solid-js"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { ActiveSessions } from "./active-sessions"
import { ChangePassword } from "./change-password"
import { LinkedAccounts } from "./linked-accounts"

export type SecuritySettingsProps = {
  className?: string
  onPasswordChange?: () => void
  onTwoFactorEnable?: () => void
  onTwoFactorDisable?: () => void
  onSessionRevoke?: (sessionId: string) => void
  onLogoutAll?: () => void
}

/**
 * Security settings component with Password, Two-Factor, Linked Accounts, and Sessions.
 * Reusable - uses auth context internally for user data.
 */
export function SecuritySettings(props: SecuritySettingsProps) {
  return (
    <div class="flex w-full flex-col gap-4 md:gap-6">
      <PasswordSection onPasswordChange={props.onPasswordChange} />
      <TwoFactorSection
        onTwoFactorEnable={props.onTwoFactorEnable}
        onTwoFactorDisable={props.onTwoFactorDisable}
      />
      <LinkedAccounts />
      <ActiveSessions />
    </div>
  )
}

/**
 * Password section with change password button.
 */
function PasswordSection(props: { onPasswordChange?: () => void }) {
  return <ChangePassword />
}

/**
 * Two-factor authentication section.
 */
function TwoFactorSection(props: {
  onTwoFactorEnable?: () => void
  onTwoFactorDisable?: () => void
}) {
  const hasTwoFactor = () => false

  return (
    <Card class="w-full py-4 md:py-6 gap-4">
      <CardHeader class="px-4 md:px-6 gap-0">
        <CardTitle class="text-xl">Two-Factor Authentication</CardTitle>
      </CardHeader>

      <CardContent class="px-4 md:px-6">
        <p class="text-sm text-muted-foreground">
          {hasTwoFactor()
            ? "Your account is protected with two-factor authentication."
            : "Add an extra layer of security to your account."}
        </p>
      </CardContent>

      <CardFooter class="px-4 md:px-6">
        <Show
          when={hasTwoFactor()}
          fallback={
            <Button onClick={props.onTwoFactorEnable}>
              Enable two-factor authentication
            </Button>
          }
        >
          <Button variant="outline" onClick={props.onTwoFactorDisable}>
            Disable two-factor authentication
          </Button>
        </Show>
      </CardFooter>
    </Card>
  )
}
